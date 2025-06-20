import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
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
  Scatter,
  ScatterChart,
} from "recharts";
import * as tf from "@tensorflow/tfjs";

const RiskPrediction = () => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();

  const [showPrediction, setShowPrediction] = useState(true);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [predictions, setPredictions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const data = useMemo(() => {
    if (!kpiData) return [];

    return kpiData[0].monthlyData.map(
      ({
        month,
        revenue,
        expenses,
      }: {
        month: string;
        revenue: string | number;
        expenses: string | number;
      }) => {
        const rev =
          typeof revenue === "string"
            ? parseFloat(revenue.replace(/[$,]/g, ""))
            : revenue || 0;
        const exp =
          typeof expenses === "string"
            ? parseFloat(expenses.replace(/[$,]/g, ""))
            : expenses || 0;

        return {
          name: month,
          revenue: rev,
          expenses: exp,
          riskLabel: exp / rev > 0.8 ? 1 : 0,
        };
      }
    );
  }, [kpiData]);

  useEffect(() => {
    if (!data.length) return;

    const train = async () => {
      setLoading(true);

      const revenues = data.map((d) => d.revenue);
      const expenses = data.map((d) => d.expenses);

      const revMin = Math.min(...revenues);
      const revMax = Math.max(...revenues);
      const expMin = Math.min(...expenses);
      const expMax = Math.max(...expenses);

      const scale = (val: number, min: number, max: number) =>
        max === min ? 0 : (val - min) / (max - min);

      const features = data.map((d) => [
        scale(d.revenue, revMin, revMax),
        scale(d.expenses, expMin, expMax),
      ]);
      const xs = tf.tensor2d(features, [data.length, 2]);
      const ys = tf.tensor2d(
        data.map((d) => [d.riskLabel]),
        [data.length, 1]
      );

      const model = tf.sequential();
      model.add(
        tf.layers.dense({ units: 1, activation: "sigmoid", inputShape: [2] })
      );
      model.compile({
        optimizer: tf.train.adam(0.01),
        loss: "binaryCrossentropy",
        metrics: ["accuracy"],
      });

      await model.fit(xs, ys, { epochs: 200, verbose: 0 });

      setModel(model);
      setLoading(false);
    };

    train();
  }, [data]);

  useEffect(() => {
    if (!model || !data.length) return;

    const predict = async () => {
      setLoading(true);

      const revenues = data.map((d) => d.revenue);
      const expenses = data.map((d) => d.expenses);

      const revMin = Math.min(...revenues);
      const revMax = Math.max(...revenues);
      const expMin = Math.min(...expenses);
      const expMax = Math.max(...expenses);

      const scale = (val: number, min: number, max: number) =>
        max === min ? 0 : (val - min) / (max - min);

      const features = data.map((d) => [
        scale(d.revenue, revMin, revMax),
        scale(d.expenses, expMin, expMax),
      ]);
      const inputTensor = tf.tensor2d(features, [data.length, 2]);

      const preds = model.predict(inputTensor) as tf.Tensor;
      const predValues = await preds.data();

      setPredictions(Array.from(predValues));
      setLoading(false);
    };

    predict();
  }, [model, data]);

  const chartData = useMemo(() => {
    if (predictions.length !== data.length) return data;
    return data.map((d, i) => ({ ...d, riskScore: predictions[i] ?? 0 }));
  }, [data, predictions]);

  return (
    <Box px="1.1rem" py="1.1rem">
      <DashboardBox
        width="100%"
        height="calc(100vh - 100px)"
        p="1.5rem"
        borderRadius="12px"
        bgcolor={palette.grey[800]}
        boxShadow="0 0 8px rgba(0,0,0,0.15)"
      >
        <FlexBetween mb="1.5rem" gap="1rem" flexWrap="wrap">
          <Box>
            <Typography variant="h3" gutterBottom>
              Monthly Risk Prediction
            </Typography>
            <Typography variant="h6" color={palette.grey[700]}>
              Actual risk label vs. predicted risk probability from logistic
              regression model with TensorFlow.
            </Typography>
          </Box>
          <Button
            onClick={() => setShowPrediction((prev) => !prev)}
            sx={{
              color: palette.grey[900],
              backgroundColor: palette.grey[400],
              "&:hover": { backgroundColor: palette.grey[300] },
            }}
          >
            {showPrediction ? "Hide" : "Show"} Risk Probability
          </Button>
        </FlexBetween>

        {loading ? (
          <Box
            height="calc(100vh - 200px)"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : showPrediction ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              margin={{ top: 20, right: 40, left: 10, bottom: 80 }}
              data={chartData}
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
                  offset: 0,
                  style: { fontSize: 14 },
                }}
              />
              <YAxis
                domain={[0, 1]}
                axisLine={false}
                tickLine={false}
                style={{ fontSize: 12 }}
                tickCount={6}
                label={{
                  value: "Risk Probability",
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(val, name) =>
                  name === "riskScore"
                    ? `${(Number(val) * 100).toFixed(1)}%`
                    : val
                }
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="riskScore"
                stroke={palette.secondary[500]}
                strokeWidth={2}
                dot={{ r: 3 }}
                legendType="line"
                name="Risk Probability"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 40, left: 10, bottom: 80 }}
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[700]} />
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
                  offset: 0,
                  style: { fontSize: 14 },
                }}
              />
              <YAxis
                domain={[0, 1]}
                axisLine={false}
                tickLine={false}
                style={{ fontSize: 12 }}
                tickCount={6}
                label={{
                  value: "Risk Label",
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(val, name) =>
                  name === "riskLabel"
                    ? val === 1
                      ? "High Risk"
                      : "Low Risk"
                    : val
                }
              />
              <Legend verticalAlign="top" height={36} />
              <Scatter
                name="Risk Label"
                dataKey="riskLabel"
                data={chartData}
                fill={palette.primary.main}
                shape="circle"
                legendType="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </DashboardBox>
    </Box>
  );
};

export default RiskPrediction;
