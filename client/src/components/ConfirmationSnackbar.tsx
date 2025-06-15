import { Box, Snackbar, useTheme } from "@mui/material";

interface ConfirmationSnackbarProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmationSnackbar = ({ open, onClose }: ConfirmationSnackbarProps) => {
  const { palette } = useTheme();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
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
        Data has been refreshed successfully.
      </Box>
    </Snackbar>
  );
};

export default ConfirmationSnackbar;
