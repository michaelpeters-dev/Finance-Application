import { Box, Snackbar, useTheme } from "@mui/material";

interface ConfirmationSnackbarProps {
  open: boolean; // Controls visibility of the Snackbar
  onClose: () => void; // Callback when the Snackbar closes
  message: string; // Message content to display
}

const ConfirmationSnackbar = ({
  open,
  onClose,
  message,
}: ConfirmationSnackbarProps) => {
  const { palette } = useTheme();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {/* Inner message box with custom styling */}
      <Box
        sx={{
          backgroundColor: palette.primary[500],
          color: palette.grey[900],
          px: 2,
          py: 1.2,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          fontWeight: 600,
        }}
      >
        {message}
      </Box>
    </Snackbar>
  );
};

export default ConfirmationSnackbar;
