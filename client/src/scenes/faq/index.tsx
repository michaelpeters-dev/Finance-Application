import { Box, Typography, useTheme } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";

const Bullet = ({ text }: { text: string }) => {
  const { palette } = useTheme();
  return (
    <Box
      component="li"
      sx={{
        color: palette.grey[300],
        fontSize: "0.95rem",
        lineHeight: 1.8,
        listStyleType: "disc",
        paddingLeft: "1rem",
        marginBottom: "0.75rem",
      }}
    >
      {text}
    </Box>
  );
};

const FAQ = () => {
  const { palette } = useTheme();

  return (
    <Box px={2} py={2}>
      <DashboardBox
        width="100%"
        height="calc(100vh - 100px)"
        p="1.5rem"
        borderRadius="12px"
        bgcolor={palette.grey[800]}
        boxShadow="0 0 8px rgba(0, 0, 0, 0.15)"
        sx={{ overflowY: "scroll" }}
      >
        <Typography variant="h3" gutterBottom>
          FAQ and Feature Guide
        </Typography>

        <Typography variant="h5" mt={4} gutterBottom>
          🛠 Dashboard Overview
        </Typography>
        <ul>
          <Bullet text="The dashboard aggregates KPIs (Key Performance Indicators) such as monthly revenue, expenses, profit, and pricing distributions. It can be used to understand business trends over time." />
        </ul>
        <ul>
          <Bullet text='"Revenue and Expenses": Compares monthly revenue vs. expenses. Top line: Revenue; Bottom line: Expenses.' />
          <Bullet text='"Profit and Revenue": Shows how revenue and profit vary. Helps assess margins.' />
          <Bullet text='"Revenue Month by Month": Bar chart of total revenue per month.' />
        </ul>

        <Typography variant="h5" mt={4} gutterBottom>
          🛠 My Data
        </Typography>
        <ul>
          <Bullet text="Represents the sample data used in this application in its rawest format." />
        </ul>

        <Typography variant="h5" mt={4} gutterBottom>
          🛠 Upload New Data
        </Typography>
        <ul>
          <Bullet text="Apologies for the inconvinience, this feature has been disabled as this application is still in production." />
        </ul>

        <Typography variant="h5" mt={4} gutterBottom>
          🛠 Machine Learning Predictions
        </Typography>
        <ul>
          <Bullet text="Linear Regression: Predicts revenue trend based on a simple straight-line fit. The dotted line represents the future prediction on the same axis for the next year." />
          <Bullet text="Polynomial Regression: Uses curved trends to fit non-linear revenue trajectories. The dotted line represents the future prediction on the same axis for the next year." />
          <Bullet text="Time Series Forecast: Uses a TensorFlow model to forecast future values considering historical seasonality. The dotted line represents the future prediction on the same axis for the next year." />
          <Bullet text="Anomaly Detection: Flags months with statistically unusual lower and higher revenue values (Z-score method)." />
          <Bullet text="Risk Prediction: Uses logistic regression to estimate monthly risk probability." />
          <Bullet text="Smart Summary: Generates AI-based executive-level insights for CROs and finance stakeholders. Certain metrics are calculated and included in the summary." />
        </ul>

        <Typography variant="h5" mt={4} gutterBottom>
          🛠 Interpreting Key Metrics
        </Typography>
        <ul>
          <Bullet text="Profit = Revenue - Expenses. Track profitability." />
          <Bullet text="Regression Line: Indicates central trend." />
          <Bullet text="Predicted Revenue: Forward-looking model outcome." />
          <Bullet text="Anomalies: Bars above upper threshold suggest outliers." />
          <Bullet text="Risk Probability: Value near 1 indicates high risk." />
        </ul>

        <Typography variant="h5" mt={4} gutterBottom>
          🛠 Troubleshooting
        </Typography>
        <ul>
          <Bullet text='If "Smart Summary" fails to load, please try later. Too many requests may cause the model to fail to return requests.' />
          <Bullet text='If data is not updating, use the "Refresh Data" button in the My Data tab.' />
        </ul>
      </DashboardBox>
    </Box>
  );
};

export default FAQ;
