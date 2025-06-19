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
        height: "100vh",
        overflow: "hidden",
        padding: "2rem 1rem",
        paddingLeft: isSidebarOpen ? "20px" : "20px",
        paddingRight: isSidebarOpen ? "20px" : "20px",
        boxSizing: "border-box",
      }}
    >
      <Box
        display="grid"
        width="100%"
        height="93%"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
                gridAutoRows: "1fr",
                gridTemplateAreas: gridTemplateLargeScreens,
                gap: "1.5rem",
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "auto",
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
