import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import UploadToolbar from "@/scenes/newdata/UploadToolbar";
import SampleViewer from "@/scenes/newdata/SampleViewer";
import ConfirmationSnackbar from "@/components/ConfirmationSnackbar";

interface UploadDataProps {
  isSidebarOpen: boolean;
}

const UploadData = ({ isSidebarOpen }: UploadDataProps) => {
  const { palette } = useTheme();

  // State for selected file
  const [file, setFile] = useState<File | null>(null);

  // Snackbar visibility state
  const [open, setOpen] = useState(false);

  // Handle upload attempt while upload functionality is disabled
  const handleDisabledClick = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)", // Account for top nav height
        overflowX: "hidden",
        padding: "2rem 1rem 4rem 1rem",
        paddingLeft: isSidebarOpen ? "20px" : "20px",
        paddingRight: isSidebarOpen ? "20px" : "20px",
        transition: "padding-left 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Toolbar for file selection and (disabled) upload */}
      <DashboardBox sx={{ flexShrink: 0 }}>
        <UploadToolbar
          onSelectFile={setFile}
          onUploadClick={handleDisabledClick}
        />
      </DashboardBox>

      {/* Viewer for JSON file structure preview */}
      <DashboardBox
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <SampleViewer />
      </DashboardBox>

      {/* Snackbar to inform users that uploads are disabled */}
      <ConfirmationSnackbar
        open={open}
        onClose={() => setOpen(false)}
        message="Upload is currently disabled in production."
      />
    </Box>
  );
};

export default UploadData;
