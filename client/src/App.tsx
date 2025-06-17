import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "@/scenes/dashboard";
import Landing from "@/scenes/landing";
import Sidebar from "./scenes/sidebar";
import Topbar from "@/scenes/topbar";
import LinearRegression from "@/scenes/linearregression";
import MyData from "./scenes/mydata";
import NewData from "./scenes/newdata";
import PolynomialRegression from "./scenes/polynomialregression";
import TimeSeriesForecast from "./scenes/timeseriesforecast";
import AnomalyDetection from "./scenes/anomolydetection";
import RiskPrediction from "./scenes/riskprediction";
import SmartSummary from "./scenes/smartsummary";

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box width="100%" height="100%">
      <Box display="flex">
        {!isLandingPage && (
          <Box
            sx={{
              width: isSidebarOpen ? "256px" : "64px",
              transition: "width 0.3s",
              flexShrink: 0,
            }}
          >
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          </Box>
        )}

        <Box flexGrow={1} minWidth={0} overflow="auto">
          {!isLandingPage && <Topbar isSidebarOpen={isSidebarOpen} />}
          <Box mt={isLandingPage ? 0 : "64px"}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/dashboard"
                element={<Dashboard isSidebarOpen={isSidebarOpen} />}
              />
              <Route path="/linearregression" element={<LinearRegression />} />
              <Route
                path="/polynomialregression"
                element={<PolynomialRegression />}
              />
              <Route
                path="/timeseriesforecast"
                element={<TimeSeriesForecast />}
              />
              <Route path="/anomolydetection" element={<AnomalyDetection />} />
              <Route path="/riskprediction" element={<RiskPrediction />} />
              <Route path="/smartsummary" element={<SmartSummary />} />
              <Route
                path="/mydata"
                element={<MyData isSidebarOpen={isSidebarOpen} />}
              />
              <Route
                path="/newdata"
                element={<NewData isSidebarOpen={isSidebarOpen} />}
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContent />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
