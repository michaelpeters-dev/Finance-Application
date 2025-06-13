import { Paper, Box, Typography, Divider, Avatar } from "@mui/material";
import profile from "@/assets/images/guest.jpg";

const UserPopup = () => {
  return (
    <Paper
      sx={{
        position: "absolute",
        top: 48,
        right: 0,
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
        Profile
      </Typography>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 1 }} />

      <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
        <Avatar alt="Guest" src={profile} sx={{ width: 40, height: 40 }} />
        <Box>
          <Typography variant="body1" fontWeight={500}>
            Guest
          </Typography>
          <Typography variant="caption" color="gray">
            User
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          px: 1,
          py: 0.75,
          bgcolor: "#2d2d34",
          borderRadius: 1,
          color: "gray",
          fontSize: "0.8rem",
        }}
      >
        You are currently signed in as a Guest User.
      </Box>
    </Paper>
  );
};

export default UserPopup;
