import { Box, Button, Typography, useTheme } from "@mui/material";
import { Download } from "@mui/icons-material";

const sampleData = {
  kpis: [
    {
      totalProfit: 12345,
      totalRevenue: 23456,
      totalExpenses: 11111,
      expensesByCategory: { Marketing: 4000, RnD: 2000 },
      monthlyData: [
        {
          month: "January",
          revenue: 10000,
          expenses: 7000,
          operationalExpenses: 4000,
          nonOperationalExpenses: 3000,
        },
      ],
      dailyData: [{ date: "2025-01-01", revenue: 300, expenses: 200 }],
    },
  ],
  products: [{ price: 99, expense: 45 }],
  transactions: [{ buyer: "Alice", amount: 99, productIds: [] }],
};

const SampleViewer = () => {
  const { palette } = useTheme();

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(sampleData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "sample-data.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* HEADER */}
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="h3" gutterBottom>
          Sample Upload Format
        </Typography>
        <Typography variant="h6" color={palette.grey[700]}>
          This is what valid sample data should look like in your upload file.
        </Typography>
      </Box>

      {/* JSON VIEWER */}
      <Box
        sx={{
          fontFamily: "monospace",
          backgroundColor: palette.grey[900],
          color: palette.grey[100],
          padding: "1rem",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
          margin: "0 1rem 1rem 1rem",
          flexGrow: 1,
          maxHeight: "570px",
          overflowY: "auto",
        }}
      >
        {JSON.stringify(sampleData, null, 2)}
      </Box>

      {/* DOWNLOAD BUTTON */}
      <Box textAlign="right" px={2} pb={2}>
        <Button
          onClick={handleDownload}
          startIcon={<Download />}
          sx={{
            backgroundColor: palette.primary[500],
            color: palette.grey[900],
            fontWeight: 600,
            px: "1.5rem",
            py: "0.4rem",
            borderRadius: "6px",
            textTransform: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: palette.primary[400],
            },
          }}
        >
          DOWNLOAD SAMPLE
        </Button>
      </Box>
    </>
  );
};

export default SampleViewer;
