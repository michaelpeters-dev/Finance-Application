import { useMemo, useState, useEffect } from "react";
import { Box, Typography, useTheme, Slider } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
  Cell,
  ReferenceLine,
} from "recharts";

const AnomalyDetectionZScore = () => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();

  // Calculate mean and std once
  const { mean, std, revenues } = useMemo(() => {
    if (!kpiData) return { mean: 0, std: 0, revenues: [] };
    const revenues = kpiData[0].monthlyData.map(({ revenue }) => revenue);
    const mean = revenues.reduce((acc, val) => acc + val, 0) / revenues.length;
    const std = Math.sqrt(
      revenues.reduce((acc, val) => acc + (val - mean) ** 2, 0) /
        revenues.length
    );
    return { mean, std, revenues };
  }, [kpiData]);

  // Function to calculate anomaly count for given threshold
  const getAnomalyCount = (threshold: number) => {
    if (std === 0) return 0;
    return revenues.filter((r) => Math.abs((r - mean) / std) > threshold)
      .length;
  };

  // Find recommended threshold on mount or data change
  const [threshold, setThreshold] = useState(2);
  const [recommendedThreshold, setRecommendedThreshold] = useState(2);

  useEffect(() => {
    if (!revenues.length) return;
    const maxAnomalies = Math.floor(revenues.length * 0.2);
    let foundThreshold = 2; // default
    for (let t = 1; t <= 4; t += 0.1) {
      const count = getAnomalyCount(t);
      if (count <= maxAnomalies) {
        foundThreshold = parseFloat(t.toFixed(1));
        break;
      }
    }
    setRecommendedThreshold(foundThreshold);
    setThreshold(foundThreshold);
  }, [mean, std, revenues]);

  const chartData = useMemo(() => {
    if (!kpiData) return [];

    return kpiData[0].monthlyData.map(({ month, revenue }) => {
      const zScore = std === 0 ? 0 : (revenue - mean) / std;
      const isAnomaly = Math.abs(zScore) > threshold;
      return {
        name: month,
        Revenue: revenue, // Capital R here
        zScore,
        isAnomaly,
      };
    });
  }, [kpiData, threshold, mean, std]);

  // Upper and lower threshold revenue values for reference lines
  const upperThresholdValue = mean + threshold * std;
  const lowerThresholdValue = mean - threshold * std;

  return (
    <Box px={2} py={2}>
      <DashboardBox
        width="100%"
        height="calc(100vh - 100px)"
        p="1.5rem"
        borderRadius="12px"
        bgcolor={palette.grey[800]}
        boxShadow="0 0 8px rgba(0,0,0,0.15)"
      >
        <FlexBetween mb="1.5rem" gap="1rem" flexWrap="wrap" alignItems="center">
          <Box>
            <Typography variant="h3" gutterBottom>
              Revenue Anomaly Detection
            </Typography>
            <Typography variant="h6" color={palette.grey[700]}>
              Highlights months with revenue anomalies based on z-score
              threshold
            </Typography>
            <Typography mt={0.5} variant="caption" color={palette.grey[700]}>
              Your calculated and recommended starting threshold:{" "}
              <strong>{recommendedThreshold}</strong>
            </Typography>
          </Box>

          <Box width={240}>
            <Typography
              variant="body2"
              color={palette.grey[300]}
              gutterBottom
              textAlign="center"
            >
              Anomaly Threshold: {threshold.toFixed(1)}
            </Typography>
            <Slider
              value={threshold}
              min={1}
              max={4}
              step={0.1}
              onChange={(_, val) => setThreshold(val as number)}
              valueLabelDisplay="auto"
              aria-label="Anomaly Threshold"
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
        </FlexBetween>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 40, left: 10, bottom: 50 }}
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
                offset: -55,
                style: { fontSize: 14 },
              }}
            />

            <YAxis
              domain={["auto", "auto"]}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: 12 }}
              tickFormatter={(v) => `$${v}`}
            >
              <Label
                value="Revenue in USD"
                angle={-90}
                offset={-5}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
              labelFormatter={(label) => `Month: ${label}`}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <Box
                      sx={{
                        bgcolor: "#fff",
                        p: 1,
                        borderRadius: 1,
                        color: "#000000",
                        fontSize: 12,
                      }}
                    >
                      <div>{`Month: ${label}`}</div>
                      <div>{`Revenue: $${data.Revenue.toLocaleString()}`}</div>{" "}
                      {/* Capital R */}
                      <div>{`Z-Score: ${data.zScore.toFixed(2)}`}</div>
                      <div
                        style={{
                          color: data.isAnomaly ? "orange" : palette.grey[400],
                          fontWeight: "bold",
                        }}
                      >
                        {data.isAnomaly ? "Anomaly detected" : "Normal range"}
                      </div>
                    </Box>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              iconType="square"
              iconSize={12}
              wrapperStyle={{ paddingBottom: "1rem" }}
            />

            <ReferenceLine
              y={upperThresholdValue}
              stroke="orange"
              strokeDasharray="3 3"
              label={{
                value: `Upper Threshold (+${threshold.toFixed(1)}σ)`,
                position: "right",
                fill: "orange",
                fontSize: 12,
                offset: 5,
              }}
            />
            <ReferenceLine
              y={lowerThresholdValue}
              stroke="orange"
              strokeDasharray="3 3"
              label={{
                value: `Lower Threshold (-${threshold.toFixed(1)}σ)`,
                position: "right",
                fill: "orange",
                fontSize: 12,
                offset: 5,
              }}
            />

            <Bar
              dataKey="Revenue"
              stroke={palette.primary.main}
              fill={palette.primary.main}
              isAnimationActive={true}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isAnomaly ? "orange" : palette.primary.main}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Box>
  );
};

export default AnomalyDetectionZScore;
