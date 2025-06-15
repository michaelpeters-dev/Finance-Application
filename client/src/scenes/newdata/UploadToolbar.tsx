import { Box, Button, Typography, useTheme } from "@mui/material";
import { Lock } from "@mui/icons-material";
import FlexBetween from "@/components/FlexBetween";

interface UploadToolbarProps {
  onSelectFile: (file: File | null) => void;
  onUploadClick: () => void;
}

const UploadToolbar = ({ onSelectFile, onUploadClick }: UploadToolbarProps) => {
  const { palette } = useTheme();

  return (
    <FlexBetween
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      {/* HEADER */}
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="h3" gutterBottom>
          Upload Data
        </Typography>
        <Typography variant="h6" color={palette.grey[700]}>
          Upload a `.json` or `.txt` file containing KPI, Product, and
          Transaction data. This feature is disabled in production for safety.
        </Typography>
      </Box>

      {/* FILE BUTTONS */}
      <Box display="flex" gap="1rem" alignItems="center">
        <Button
          component="label"
          disabled
          sx={{
            backgroundColor: palette.primary[500],
            color: palette.grey[900],
            fontWeight: 600,
            borderRadius: "6px",
            px: "1.5rem",
            py: "0.4rem",
            textTransform: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            cursor: "not-allowed",
          }}
        >
          SELECT FILE
          <input
            type="file"
            accept=".json,.txt"
            hidden
            disabled
            onChange={(e) => onSelectFile(e.target.files?.[0] || null)}
          />
        </Button>

        <Button
          onClick={onUploadClick}
          startIcon={<Lock />}
          sx={{
            backgroundColor: palette.secondary[500],
            color: palette.grey[900],
            fontWeight: 600,
            px: "1.5rem",
            py: "0.4rem",
            borderRadius: "6px",
            textTransform: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          UPLOAD
        </Button>
      </Box>
    </FlexBetween>
  );
};

export default UploadToolbar;
