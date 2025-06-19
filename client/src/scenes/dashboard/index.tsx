// src/scenes/Dashboard/index.tsx
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

interface DashboardProps {
  isSidebarOpen: boolean;
}

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = ({ isSidebarOpen }: DashboardProps) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        minHeight: "100vh", // Ensures it fills the page height
        padding: "2rem 1rem 4rem 1rem",
        paddingLeft: isSidebarOpen ? "20px" : "20px",
        paddingRight: isSidebarOpen ? "20px" : "20px",
        transition: "padding-left 0.3s ease",
        overflowX: "hidden", // Prevent horizontal scroll
        overflowY: "visible", // Allow natural vertical scrolling
      }}
    >
      <Box
        display="grid"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
                gridTemplateRows: "repeat(10, 60px)",
                gridTemplateAreas: gridTemplateLargeScreens,
                gap: "1.5rem",
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "70px",
                gridTemplateAreas: gridTemplateSmallScreens,
                gap: "1.5rem",
              }
        }
      >
        <Row1 />
        <Row2 />
        <Row3 />
      </Box>
    </Box>
  );
};

export default Dashboard;
