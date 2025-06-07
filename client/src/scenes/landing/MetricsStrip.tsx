import { Box, Typography } from "@mui/material";

const MetricsStrip = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      gap="2rem"
      py="3rem"
      flexWrap="wrap"
      textAlign="center"
    >
      <Typography color="#888" fontWeight="500">
        3.2M+ transactions tracked
      </Typography>
      <Typography color="#888" fontWeight="500">
        820+ organizations onboarded
      </Typography>
      <Typography color="#888" fontWeight="500">
        $14M+ in forecasts generated
      </Typography>
    </Box>
  );
};

export default MetricsStrip;
