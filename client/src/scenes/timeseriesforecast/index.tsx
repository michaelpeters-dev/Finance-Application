import { useMemo, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from "recharts";
// @ts-ignore
import ARIMA from "arima";

const MONTH_SHORT = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const linearForecast = (values: number[], months: number) => {
  const points = values.map((v, i) => [i, v]);
  // @ts-ignore
  const { equation } = regression.linear(points);
  const [slope, intercept] = equation;
  return Array.from(
    { length: months },
    (_, i) => slope * (values.length + i) + intercept
  );
};

const TimeSeriesForecast = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  const [showForecast, setShowForecast] = useState(false);

  const chartData = useMemo(() => {
    if (!data) return [];

    const monthlyData = data[0].monthlyData;
    const actuals = monthlyData.map(({ revenue }) => revenue);
    const scale = 10000;
    const scaled = actuals.map((v) => v / scale);

    let forecast: number[] = [];
    if (showForecast) {
      try {
        const arima = new ARIMA({
          p: 2,
          d: 1,
          q: 1,
          P: 1,
          D: 1,
          Q: 1,
          s: 12,
          verbose: false,
        }).train(scaled);
        const raw = arima.predict(12)[0];
        const offset = 30886.92;
        // @ts-ignore
        forecast = raw.map((v) => v * scale - offset);
        const range = Math.max(...forecast) - Math.min(...forecast);
        if (range < scale * 0.01) forecast = linearForecast(actuals, 12);
      } catch {
        forecast = linearForecast(actuals, 12);
      }
    }

    let year = new Date().getFullYear();
    const months = Object.values(MONTH_SHORT);
    const lastMonthIndex = months.indexOf(
      // @ts-ignore
      MONTH_SHORT[monthlyData[monthlyData.length - 1].month]
    );

    const minRevenue = actuals.reduce((a, b) => a + b, 0) / actuals.length / 2;
    const lastActualIndex = monthlyData.length - 1;

    const points = monthlyData.map(({ month, revenue }, i) => {
      // @ts-ignore
      if (MONTH_SHORT[month] === "Jan" && i !== 0) year++;
      return {
        // @ts-ignore
        name: `${MONTH_SHORT[month]} ${year}`,
        "Actual Revenue": revenue,
        "Forecasted Revenue": i === lastActualIndex ? revenue : undefined,
      };
    });

    if (showForecast) {
      let forecastYear = year;
      for (let i = 0; i < forecast.length; i++) {
        const monthIndex = (lastMonthIndex + 1 + i) % 12;
        if (monthIndex === 0 && i !== 0) forecastYear++;
        points.push({
          name: `${months[monthIndex]} ${forecastYear}`,
          "Actual Revenue": NaN,
          "Forecasted Revenue": Math.max(forecast[i], minRevenue),
        });
      }
    }

    return points;
  }, [data, showForecast]);

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
              Revenue Time Series Forecast
            </Typography>
            <Typography variant="h6" color={palette.grey[700]}>
              ARIMA Model Forecast (12 months)
            </Typography>
          </Box>
          <Button
            onClick={() => setShowForecast(!showForecast)}
            sx={{
              color: palette.grey[900],
              backgroundColor: palette.grey[400],
              "&:hover": { backgroundColor: palette.grey[300] },
            }}
          >
            {showForecast ? "Hide" : "Show"} Forecast
          </Button>
        </FlexBetween>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 40, left: 10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: 12 }}
              tickFormatter={(str) =>
                typeof str === "string" ? str.split(" ")[0] : str
              }
            >
              <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
              domain={[0, "dataMax"]}
              tickCount={6}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: 12 }}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
            >
              <Label
                value="Revenue in USD"
                angle={-90}
                offset={-5}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
            <Legend verticalAlign="top" height={36} />

            <Line
              key="actual"
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 3 }}
            />
            {showForecast && (
              <Line
                key="forecast"
                type="monotone"
                dataKey="Forecasted Revenue"
                stroke={palette.secondary.main}
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Box>
  );
};

export default TimeSeriesForecast;
