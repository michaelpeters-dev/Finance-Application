import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";

const LinearRegression = () => {
  const { palette } = useTheme();
  const [showPrediction, setShowPrediction] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }: { revenue: number }, i: number) => [i, revenue]
    );

    const regressionLine = regression.linear(formatted);

    return monthData.map(
      ({ month, revenue }: { month: string; revenue: number }, i: number) => ({
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      })
    );
  }, [kpiData]);

  return (
    <Box px={2} py={2}>
      <DashboardBox
        width="100%"
        height="calc(100vh - 100px)"
        p="1.5rem"
        borderRadius="12px"
        bgcolor={palette.grey[800]}
        boxShadow="0 0 8px rgba(0, 0, 0, 0.15)"
      >
        <FlexBetween mb="1.5rem" gap="1rem" flexWrap="wrap">
          <Box>
            <Typography variant="h3" gutterBottom>
              Annual Revenue Projection
            </Typography>
            <Typography variant="h6" color={palette.grey[700]}>
              Charted revenue and predicted revenue based on a simple linear
              regression model
            </Typography>
          </Box>
          <Button
            onClick={() => setShowPrediction(!showPrediction)}
            sx={{
              color: palette.grey[900],
              backgroundColor: palette.grey[400],
              "&:hover": {
                backgroundColor: palette.grey[300],
              },
            }}
          >
            {showPrediction ? "Hide" : "Show"} Prediction
          </Button>
        </FlexBetween>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 20, right: 40, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              interval={0}
              tickLine={false}
              style={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={100}
              label={{
                value: "Month",
                position: "bottom",
                offset: -45,
                style: { fontSize: 14 },
              }}
            />

            <YAxis
              domain={[12000, 26000]}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
              tickFormatter={(v) => `$${v}`}
            >
              <Label
                value="Revenue in USD"
                angle={-90}
                offset={-5}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
            {showPrediction && (
              <Line
                type="monotone"
                dataKey="Predicted Revenue"
                stroke={palette.secondary[500]}
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Box>
  );
};

export default LinearRegression;
