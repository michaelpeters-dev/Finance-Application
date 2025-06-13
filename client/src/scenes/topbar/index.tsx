import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  ClickAwayListener,
  useTheme,
} from "@mui/material";
import { Bell, Settings, User, Search as SearchIcon } from "lucide-react";
import BellPopup from "@/scenes/topbar/BellPopup";
import SettingsPopup from "@/scenes/topbar/SettingsPopup";
import UserPopup from "@/scenes/topbar/UserPopup";

interface TopbarProps {
  isSidebarOpen: boolean;
}

const Topbar = ({ isSidebarOpen }: TopbarProps) => {
  const [open, setOpen] = useState<"bell" | "settings" | "user" | null>(null);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const { palette } = useTheme();

  const togglePopup = (key: "bell" | "settings" | "user") => {
    if (key === "bell") setHasUnreadNotifications(false);
    setOpen((prev) => (prev === key ? null : key));
  };

  const handleClose = () => setOpen(null);

  return (
    <Box
      position="fixed"
      top={0}
      left={isSidebarOpen ? "256px" : "64px"}
      right={0}
      height="64px"
      zIndex={1000}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      bgcolor="#2d2d34"
      borderBottom="1px solid rgba(255,255,255,0.05)"
      sx={{ transition: "left 0.3s ease" }}
    >
      {/* Icons */}
      <Box ml="auto">
        <ClickAwayListener onClickAway={handleClose}>
          <Box display="flex" alignItems="center" gap={1.5} position="relative">
            {/* Bell icon */}
            <Box position="relative">
              <IconButton onClick={() => togglePopup("bell")}>
                <Bell size={18} color="#ccc" />
              </IconButton>
              {hasUnreadNotifications && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    bgcolor: palette.primary[400],
                    borderRadius: "50%",
                  }}
                />
              )}
            </Box>
            {open === "bell" && <BellPopup />}

            {/* Settings icon */}
            <IconButton onClick={() => togglePopup("settings")}>
              <Settings size={18} color="#ccc" />
            </IconButton>
            {open === "settings" && <SettingsPopup />}

            {/* User icon */}
            <IconButton onClick={() => togglePopup("user")}>
              <User size={18} color="#ccc" />
            </IconButton>
            {open === "user" && <UserPopup />}
          </Box>
        </ClickAwayListener>
      </Box>
    </Box>
  );
};

export default Topbar;
