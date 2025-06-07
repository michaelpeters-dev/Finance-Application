import { useRef } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { useNavigate } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import TimelineIcon from "@mui/icons-material/Timeline";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import HeroSection from "@/scenes/landing/HeroSection";

const FeatureCard = ({
  title,
  icon,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) => {
  return (
    <Box
      p={3}
      flex={1}
      minWidth="280px"
      maxWidth="350px"
      borderRadius="0.75rem"
      bgcolor="#1c1f2a"
      boxShadow="0 0 12px rgba(0,0,0,0.2)"
      textAlign="center"
      fontFamily="'Inter', sans-serif"
      sx={{
        transition: "0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
        },
      }}
    >
      <Box mb={2}>{icon}</Box>
      <Typography variant="h6" color="white" fontWeight="600" gutterBottom>
        {title}
      </Typography>
      <Typography color="#aab" fontSize="0.95rem">
        {description}
      </Typography>
    </Box>
  );
};

const Landing = () => {
  const { palette } = useTheme();
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const helpRef = useRef(null);

  const scrollTo = (ref: any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
      sx={{
        overflowY: "auto",
        scrollBehavior: "smooth",
        backgroundColor: "#0d1117",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Box
        position="relative"
        zIndex={1}
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        px="2rem"
      >
        {/* Navbar */}
        <FlexBetween py="1.25rem" color="white">
          <FlexBetween gap="0.75rem">
            <img
              src="/logo_rounded_borders.png"
              alt="Finance App Icon"
              width={45}
            />
            <Typography variant="h4" fontSize="16px" fontWeight="bold">
              Finance App
            </Typography>
          </FlexBetween>
          <FlexBetween gap="2rem">
            <Typography
              onClick={() => scrollTo(aboutRef)}
              sx={{
                cursor: "pointer",
                color: "#bbb",
                "&:hover": { color: "white" },
              }}
            >
              About
            </Typography>
            <Typography
              onClick={() => scrollTo(featuresRef)}
              sx={{
                cursor: "pointer",
                color: "#bbb",
                "&:hover": { color: "white" },
              }}
            >
              Features
            </Typography>
            <Typography
              onClick={() => scrollTo(helpRef)}
              sx={{
                cursor: "pointer",
                color: "#bbb",
                "&:hover": { color: "white" },
              }}
            >
              Help
            </Typography>
          </FlexBetween>
        </FlexBetween>

        <HeroSection />

        {/* About Section */}
        <Box ref={aboutRef} id="about" py="5rem" textAlign="center">
          <Typography variant="h4" color="white" mb={3}>
            About Us
          </Typography>
          <Typography
            color="#bbb"
            maxWidth="750px"
            mx="auto"
            fontSize="1.05rem"
            lineHeight={1.7}
          >
            Finance App is a modern financial analytics tool designed to help
            businesses make smarter decisions. Built with performance, clarity,
            and insight at its core, we help teams scale with confidence.
          </Typography>
        </Box>

        {/* Features Section */}
        <Box
          ref={featuresRef}
          id="features"
          py="5rem"
          px="2rem"
          textAlign="center"
        >
          <Typography variant="h4" color="white" mb={4}>
            Core Features
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap="2rem"
          >
            <FeatureCard
              title="Real-Time Insights"
              icon={<SpeedIcon sx={{ fontSize: 40, color: "white" }} />}
              description="Track finances in real-time with live updates."
            />
            <FeatureCard
              title="AI Predictions"
              icon={<TimelineIcon sx={{ fontSize: 40, color: "white" }} />}
              description="Leverage machine learning to forecast your financial future."
            />
            <FeatureCard
              title="Custom Dashboards"
              icon={
                <DashboardCustomizeIcon sx={{ fontSize: 40, color: "white" }} />
              }
              description="Structured data views to show you what matters most."
            />
          </Box>
        </Box>

        {/* Help Section */}
        <Box ref={helpRef} id="help" py="5rem" textAlign="center">
          <Typography variant="h4" color="white" mb={3}>
            Need Help?
          </Typography>
          <Typography
            color="#bbb"
            maxWidth="700px"
            mx="auto"
            fontSize="1.05rem"
          >
            Email our support team to get the most out of Finance App.
          </Typography>
          <Box mt={4}>
            <Button
              href=""
              sx={{
                backgroundColor: "white",
                color: "black",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#eee" },
              }}
            >
              Email Support
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
