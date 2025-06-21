import { Box, useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataGridSectionProps {
  title: string;
  sideText: string;
  rows: any[];
  columns: GridColDef[];
}

const DataGridSection = ({
  title,
  sideText,
  rows,
  columns,
}: DataGridSectionProps) => {
  const { palette } = useTheme();

  // Custom styling for the MUI DataGrid component
  const gridSx = {
    "& .MuiDataGrid-root": {
      color: palette.grey[300],
      border: "none",
      backgroundColor: "transparent",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: `1px solid ${palette.grey[800]} !important`,
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: `1px solid ${palette.grey[800]} !important`,
    },
    "& .MuiDataGrid-columnSeparator": {
      visibility: "hidden",
    },
    "& .MuiDataGrid-virtualScroller": {
      overflowX: "auto",
    },
  };

  return (
    <>
      {/* Section header with title and side text */}
      <BoxHeader title={title} sideText={sideText} />

      {/* Scrollable container for the DataGrid */}
      <Box
        mt="0.5rem"
        p="0 0.5rem"
        flexGrow={1}
        minHeight={0}
        height="100%"
        maxWidth="100%"
        overflow="auto"
        sx={gridSx}
      >
        <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          autoHeight={false}
        />
      </Box>
    </>
  );
};

export default DataGridSection;
