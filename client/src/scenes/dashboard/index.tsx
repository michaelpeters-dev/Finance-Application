import { Box, useMediaQuery, useTheme } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

interface DashboardProps {
  isSidebarOpen: boolean;
}

// Grid layout for large screens
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

// Stacked grid layout for small screens
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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        minHeight: "100vh", // Ensures full vertical coverage
        padding: "2rem 1rem 4rem 1rem",
        paddingLeft: isSidebarOpen ? "20px" : "20px", // Can be adjusted for sidebar width
        paddingRight: isSidebarOpen ? "20px" : "20px",
        transition: "padding-left 0.3s ease", // Smooth sidebar toggle
        overflowX: "hidden", // Prevent horizontal scroll
        overflowY: "visible", // Allow vertical content to expand
      }}
    >
      <Box
        display="grid"
        sx={
          isAboveMediumScreens
            ? {
                // Responsive grid for large screens (3-column layout)
                gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
                gridTemplateRows: "repeat(10, 60px)",
                gridTemplateAreas: gridTemplateLargeScreens,
                gap: "1.5rem",
              }
            : {
                // Stacked layout for smaller screens
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
