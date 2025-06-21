import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Slider, Typography, useTheme } from "@mui/material";
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

const MONTH_SHORT_MAP: { [key: string]: string } = {
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

const PolynomialRegression = () => {
  const { palette } = useTheme();
  const [showPrediction, setShowPrediction] = useState(false);
  const [degree, setDegree] = useState(2);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];

    const monthData = kpiData[0].monthlyData;
    const currentLength = monthData.length;

    const formatted: Array<DataPoint> = monthData.map(({ revenue }, i) => [
      i,
      revenue,
    ]);

    const regressionLine = regression.polynomial(formatted, { order: degree });

    type ChartData = {
      name: string;
      "Actual Revenue"?: number;
      "Regression Line"?: number;
      "Predicted Revenue"?: number;
    };

    const chartData: ChartData[] = [];

    for (let i = 0; i < currentLength; i++) {
      chartData.push({
        name: MONTH_SHORT_MAP[monthData[i].month] || monthData[i].month,
        "Actual Revenue": monthData[i].revenue,
        "Regression Line": regressionLine.predict(i)[1],
      });
    }

    if (showPrediction) {
      const startIdx = currentLength - 1;
      const predictedStart = regressionLine.predict(startIdx)[1];
      chartData[startIdx]["Predicted Revenue"] = predictedStart;

      for (let i = 1; i <= 12; i++) {
        const index = startIdx + i;
        const predicted = regressionLine.predict(index)[1];
        const name =
          MONTH_SHORT_MAP[monthData[index % 12]?.month] ||
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ][index % 12];

        chartData.push({
          name,
          ...(predicted > 0 ? { "Predicted Revenue": predicted } : {}),
        });
      }
    }

    return chartData;
  }, [kpiData, degree, showPrediction]);

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
              Polynomial Regression Model (Degree {degree})
            </Typography>
          </Box>

          <FlexBetween gap="1rem">
            <Box width={150}>
              <Typography
                variant="body2"
                color={palette.grey[300]}
                gutterBottom
              >
                Degree: {degree}
              </Typography>
              <Slider
                value={degree}
                min={1}
                max={5}
                step={1}
                onChange={(_: Event, newValue: number | number[]) =>
                  setDegree(newValue as number)
                }
                valueLabelDisplay="auto"
                sx={{
                  color: palette.secondary.main,
                  "& .MuiSlider-thumb": {
                    backgroundColor: "white",
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: palette.secondary.main,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: palette.grey[700],
                  },
                }}
              />
            </Box>

            <Button
              onClick={() => setShowPrediction(!showPrediction)}
              sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[400],
                "&:hover": { backgroundColor: palette.grey[300] },
              }}
            >
              {showPrediction ? "Hide" : "Show"} Prediction
            </Button>
          </FlexBetween>
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
                offset: -50,
                style: { fontSize: 14 },
              }}
            />

            <YAxis
              domain={[10000, "dataMax"]}
              tickCount={6}
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
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Box>
  );
};

export default PolynomialRegression;
