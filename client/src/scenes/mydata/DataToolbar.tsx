import { Box, Button, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { saveAs } from "file-saver";

interface DataToolbarProps {
  isReloading: boolean;
  onRefresh: () => void;
  currentKpis: any[];
  currentProducts: any[];
  currentTransactions: any[];
}

// Converts an array of objects to a CSV format and triggers file download
const exportToCSV = (data: any[], filename: string) => {
  const csv = [
    Object.keys(data[0]).join(","), // CSV header
    ...data.map((row) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};

const DataToolbar = ({
  isReloading,
  onRefresh,
  currentKpis,
  currentProducts,
  currentTransactions,
}: DataToolbarProps) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        padding: "1rem",
        transition: "padding-left 0.3s ease",
      }}
    >
      {/* Header with title and description */}
      <FlexBetween gap="1rem" flexWrap="wrap">
        <Box>
          <Typography variant="h3" gutterBottom>
            My Data
          </Typography>
          <Typography variant="h6" color={palette.grey[700]}>
            View, refresh or export the raw filtered data used across your
            dashboards (limited to 1000 entries per table)
          </Typography>
        </Box>

        {/* Buttons for refreshing and exporting data */}
        <Box display="flex" gap="1rem" flexWrap="wrap">
          <Button
            onClick={onRefresh}
            disabled={isReloading}
            sx={{
              backgroundColor: palette.primary[500],
              color: palette.grey[900],
              fontWeight: 600,
              borderRadius: "6px",
              px: "1.5rem",
              py: "0.4rem",
              textTransform: "none",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              "&:hover": { backgroundColor: palette.primary[400] },
            }}
          >
            {isReloading ? "Refreshing..." : "REFRESH DATA"}
          </Button>

          <Button
            onClick={() => {
              exportToCSV(currentKpis, "kpis.csv");
              exportToCSV(currentProducts, "products.csv");
              exportToCSV(currentTransactions, "transactions.csv");
            }}
            sx={{
              backgroundColor: palette.secondary[500],
              color: palette.grey[900],
              fontWeight: 600,
              borderRadius: "6px",
              px: "1.5rem",
              py: "0.4rem",
              textTransform: "none",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              "&:hover": { backgroundColor: palette.secondary[400] },
            }}
          >
            EXPORT ALL TO CSV
          </Button>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default DataToolbar;
