import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="calc(100vh - 120px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap="2rem"
      px={{ xs: "1rem", md: "4rem" }}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          color: "white",
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Take Control of Your Finances
      </Typography>
      <Typography
        variant="h6"
        color="#ccc"
        maxWidth="600px"
        fontFamily="'Inter', sans-serif"
      >
        Visualize, analyze, and predict your financial future with intelligent
        dashboards, real-time data, and AI-driven forecasts.
      </Typography>
      <Button
        onClick={() => navigate("/dashboard")}
        sx={{
          fontSize: "1rem",
          padding: "0.75rem 2rem",
          borderRadius: "50px",
          background: "white",
          color: "black",
          fontWeight: "bold",
          fontFamily: "'Inter', sans-serif",
          boxShadow: "0px 4px 12px rgba(255,255,255,0.1)",
          transition: "0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 8px 20px rgba(255,255,255,0.2)",
          },
        }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default HeroSection;
