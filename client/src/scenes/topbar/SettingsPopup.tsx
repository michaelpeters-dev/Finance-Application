import { Paper, Typography, Divider } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { Lock } from "lucide-react";

const SettingsPopup = () => {
  return (
    <Paper
      sx={{
        position: "absolute",
        top: 48,
        right: 48,
        width: 260,
        bgcolor: "#1f2026",
        color: "white",
        p: 2,
        borderRadius: 2,
        zIndex: 1500,
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Settings
      </Typography>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.1)",
          mb: 1,
        }}
      />

      <FlexBetween
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          bgcolor: "#2d2d34",
          cursor: "not-allowed",
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: "#3a3a42",
          },
        }}
      >
        <Typography variant="body2">Language: English</Typography>
        <Lock size={14} color="#aaa" />
      </FlexBetween>
    </Paper>
  );
};

export default SettingsPopup;
