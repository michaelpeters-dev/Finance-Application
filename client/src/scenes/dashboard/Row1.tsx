import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(
        ({ month, revenue }: { month: string; revenue: number }) => {
          return {
            name: month.substring(0, 3),
            revenue: revenue,
          };
        }
      )
    );
  }, [data]);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(
        ({
          month,
          revenue,
          expenses,
        }: {
          month: string;
          revenue: number;
          expenses: number;
        }) => {
          return {
            name: month.substring(0, 3),
            revenue: revenue,
            expenses: expenses,
          };
        }
      )
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(
        ({
          month,
          revenue,
          expenses,
        }: {
          month: string;
          revenue: number;
          expenses: number;
        }) => {
          return {
            name: month.substring(0, 3),
            revenue: revenue,
            profit: (revenue - expenses).toFixed(2),
          };
        }
      )
    );
  }, [data]);

  const revenueGrowth = useMemo(() => {
    if (!data || data[0].monthlyData.length < 2) return null;
    const monthlyData = data[0].monthlyData;
    const last = monthlyData[monthlyData.length - 1].revenue;
    const secondLast = monthlyData[monthlyData.length - 2].revenue;
    const growth = ((last - secondLast) / secondLast) * 100;
    return growth >= 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
  }, [data]);

  const latestProfitMargin = useMemo(() => {
    if (!data) return null;
    const lastMonth = data[0].monthlyData.at(-1);
    if (!lastMonth) return null;

    const { revenue, expenses } = lastMonth;
    const profitMargin = ((revenue - expenses) / revenue) * 100;
    const formatted =
      profitMargin >= 0
        ? `+${profitMargin.toFixed(1)}%`
        : `${profitMargin.toFixed(1)}%`;
    return formatted;
  }, [data]);

  const ytdRevenueGrowth = useMemo(() => {
    if (!data || data[0].monthlyData.length < 12) return null;

    const jan = data[0].monthlyData[0].revenue;
    const dec = data[0].monthlyData[11].revenue;
    const growth = ((dec - jan) / jan) * 100;

    return growth >= 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
  }, [data]);

  return (
    <>
      <DashboardBox
        gridArea="a"
        sx={{
          minHeight: { xs: "480px", sm: "480px", md: "auto" },
          pb: {
            xs: "3rem",
            sm: "2.5rem",
            md: 0,
            "@media (min-width: 1400px) and (max-width: 2560px)": "1.5rem",
            "@media (min-width: 2560px)": "1.5rem",
          },
        }}
      >
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line represents revenue, bottom line represents expenses"
          sideText={revenueGrowth || "N/A"}
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox
        gridArea="b"
        sx={{
          minHeight: { xs: "480px", sm: "480px", md: "auto" },
          pb: {
            xs: "3rem",
            sm: "2.5rem",
            md: 0,
            "@media (min-width: 1400px) and (max-width: 2560px)": "1.5rem",
            "@media (min-width: 2880px)": "1.5rem",
          },
        }}
      >
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Purple line represents revenue, green line represents revenue"
          sideText={latestProfitMargin || "N/A"}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
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
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox
        gridArea="c"
        sx={{ minHeight: { xs: "380px", sm: "380px", md: "auto" } }}
      >
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="Graph representing the revenue month by month"
          sideText={ytdRevenueGrowth || "N/A"}
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
