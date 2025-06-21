import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { MonthlyData } from "@/state/types";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[500], palette.tertiary[500]];

  // API data
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  // Format operational expenses for line chart
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({
          month,
          operationalExpenses,
          nonOperationalExpenses,
        }: {
          month: string;
          operationalExpenses: number;
          nonOperationalExpenses: number;
        }) => ({
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        })
      )
    );
  }, [operationalData]);

  // Format product data for scatter chart
  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(
        ({
          _id,
          price,
          expense,
        }: {
          _id: string;
          price: number;
          expense: number;
        }) => ({
          id: _id,
          price,
          expense,
        })
      )
    );
  }, [productData]);

  // Calculate latest operational expense ratio (for BoxHeader)
  const operationalExpenseRatio = useMemo(() => {
    if (!operationalData || operationalData[0].monthlyData.length === 0)
      return null;

    const latestMonth = operationalData[0].monthlyData.at(-1);
    if (!latestMonth) return null;

    const { operationalExpenses, nonOperationalExpenses } = latestMonth;
    const total = operationalExpenses + nonOperationalExpenses;
    if (total === 0) return null;

    const ratio = (operationalExpenses / total) * 100;
    return `${ratio.toFixed(1)}%`;
  }, [operationalData]);

  // Calculate campaign performance metrics vs target
  const targetSalesData = useMemo(() => {
    if (!operationalData) return null;

    const totalSales = operationalData[0].monthlyData.reduce(
      (sum, month: MonthlyData) => sum + month.revenue,
      0
    );

    const target = 100_000;
    const percent = (totalSales / target) * 100;

    return {
      totalSales,
      target,
      percentToTarget: percent.toFixed(1),
    };
  }, [operationalData]);

  // Compare revenue change month-over-month
  const revenueChangeText = useMemo(() => {
    if (!operationalData || operationalData[0].monthlyData.length < 2)
      return null;

    const monthlyData = operationalData[0].monthlyData;
    const prev = monthlyData[monthlyData.length - 2].revenue;
    const curr = monthlyData[monthlyData.length - 1].revenue;

    const change = ((curr - prev) / prev) * 100;

    return change < 0
      ? `Losses are up ${Math.abs(change).toFixed(1)}%`
      : `Revenue grew by ${change.toFixed(1)}%`;
  }, [operationalData]);

  // Compare profit margin change month-over-month
  const profitMarginChangeText = useMemo(() => {
    if (!operationalData || operationalData[0].monthlyData.length < 2)
      return null;

    const monthlyData = operationalData[0].monthlyData;
    const prev = monthlyData[monthlyData.length - 2];
    const curr = monthlyData[monthlyData.length - 1];

    const prevMargin = ((prev.revenue - prev.expenses) / prev.revenue) * 100;
    const currMargin = ((curr.revenue - curr.expenses) / curr.revenue) * 100;
    const change = currMargin - prevMargin;

    return change >= 0
      ? `Margins are up by ${change.toFixed(1)}% from last month.`
      : `Margins are down ${Math.abs(change).toFixed(1)}% from last month.`;
  }, [operationalData]);

  // Pie chart data for achieved vs target
  const pieData = useMemo(() => {
    if (!targetSalesData) return [];

    const achieved = targetSalesData.totalSales;
    const target = targetSalesData.target;

    if (achieved <= target) {
      return [
        { name: "Achieved", value: achieved },
        { name: "Remaining", value: target - achieved },
      ];
    } else {
      return [
        { name: "Target", value: target },
        { name: "Overachieved", value: achieved - target },
      ];
    }
  }, [targetSalesData]);

  // Calculate average product profit margin
  const avgProductProfitMargin = useMemo(() => {
    if (!productData || productData.length === 0) return null;

    const validProducts = productData.filter((p) => p.price > 0);
    const totalMargin = validProducts.reduce((sum, p) => {
      const profit = p.price - p.expense;
      return sum + (profit / p.price) * 100;
    }, 0);

    const avgMargin = totalMargin / validProducts.length;
    return `${avgMargin >= 0 ? "+" : ""}${avgMargin.toFixed(1)}%`;
  }, [productData]);

  return (
    <>
      {/* Line Chart: Operational vs Non-Operational Expenses */}
      <DashboardBox
        gridArea="d"
        sx={{ minHeight: { xs: "390px", sm: "390px", md: "auto" } }}
      >
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText={operationalExpenseRatio || "N/A"}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Pie Chart and description text: Target vs Actual */}
      <DashboardBox
        gridArea="e"
        sx={{ minHeight: { xs: "340px", sm: "340px", md: "auto" } }}
      >
        <BoxHeader
          title="Campaigns and Targets"
          sideText={
            targetSalesData?.percentToTarget
              ? `+${targetSalesData.percentToTarget}%`
              : "N/A"
          }
        />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          {/* Pie Chart */}
          <PieChart
            width={110}
            height={100}
            margin={{ top: 0, right: -10, left: 10, bottom: 0 }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>

          {/* Sales Target Summary */}
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              {targetSalesData?.totalSales ?? "N/A"}
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>

          {/* Revenue & Margin Text Summary */}
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">{revenueChangeText ?? "N/A"}</Typography>

            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              {profitMarginChangeText ?? "N/A"}
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      {/* Scatter Chart: Product Price vs Expense */}
      <DashboardBox
        gridArea="f"
        sx={{ minHeight: { xs: "340px", sm: "340px", md: "auto" } }}
      >
        <BoxHeader
          title="Product Prices vs Expenses"
          sideText={avgProductProfitMargin ?? "N/A"}
        />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 25, bottom: 40, left: -10 }}>
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
