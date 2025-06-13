import { Paper, Box, Typography, Divider } from "@mui/material";

const BellPopup = () => {
  return (
    <Paper
      sx={{
        position: "absolute",
        top: 48,
        right: 96,
        bgcolor: "#1f2026",
        color: "white",
        p: 2,
        borderRadius: 2,
        width: 260,
        zIndex: 1500,
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Notifications
      </Typography>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.1)",
          mb: 1,
        }}
      />

      <Box
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          bgcolor: "#2d2d34",
          "&:hover": {
            bgcolor: "#3a3a42",
          },
          transition: "all 0.2s",
          cursor: "pointer",
        }}
      >
        <Typography variant="body2" color="white">
          Welcome to Finance Application!
        </Typography>

        <Typography variant="caption" color="gray">
          Just now
        </Typography>
      </Box>
    </Paper>
  );
};

export default BellPopup;
