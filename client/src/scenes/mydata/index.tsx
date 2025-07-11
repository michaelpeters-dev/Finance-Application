import { Box, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import DashboardBox from "@/components/DashboardBox";
import DataToolbar from "@/scenes/mydata/DataToolbar";
import DataGridSection from "@/scenes/mydata/DataGridSection";
import ConfirmationSnackbar from "@/components/ConfirmationSnackbar";

// Define grid layout for large screens
const gridTemplateLargeScreens = `
  "buttons buttons buttons"
  "k k k"
  "l m m"
`;

// Define grid layout for small screens
const gridTemplateSmallScreens = `
  "buttons"
  "k"
  "k"
  "l"
  "m"
`;

const MyData = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { palette } = useTheme();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  // Fetch KPI, product, and transaction data from the API
  const { data: kpiData, refetch: refetchKpis } = useGetKpisQuery();
  const { data: productData, refetch: refetchProducts } = useGetProductsQuery();
  const { data: transactionData, refetch: refetchTransactions } =
    useGetTransactionsQuery();

  // States to store filtered versions of the datasets
  const [filteredKpis, setFilteredKpis] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);

  const [isReloading, setIsReloading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Limit datasets to a maximum of 1000 entries
  const limitedKpis = useMemo(() => kpiData?.slice(0, 1000) || [], [kpiData]);
  const limitedProducts = useMemo(
    () => productData?.slice(0, 1000) || [],
    [productData]
  );
  const limitedTransactions = useMemo(
    () => transactionData?.slice(0, 1000) || [],
    [transactionData]
  );

  // Use filtered data if available, else fall back to limited data
  const currentKpis = filteredKpis.length ? filteredKpis : limitedKpis;
  const currentProducts = filteredProducts.length
    ? filteredProducts
    : limitedProducts;
  const currentTransactions = filteredTransactions.length
    ? filteredTransactions
    : limitedTransactions;

  // Reset all filters and refetch fresh data from the backend
  const resetFilters = async () => {
    setIsReloading(true);
    setFilteredKpis([]);
    setFilteredProducts([]);
    setFilteredTransactions([]);

    await Promise.all([
      refetchKpis(),
      refetchProducts(),
      refetchTransactions(),
    ]);

    setIsReloading(false);
    setOpenSnackbar(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "visible",
        padding: "2rem 1rem 4rem 1rem",
        paddingLeft: isSidebarOpen ? "20px" : "20px",
        paddingRight: isSidebarOpen ? "20px" : "20px",
        transition: "padding-left 0.3s ease",
      }}
    >
      {/* Grid layout with responsive template based on screen size */}
      <Box
        display="grid"
        width="100%"
        gap="1.5rem"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gridTemplateRows: "auto auto 1fr",
                gridTemplateAreas: gridTemplateLargeScreens,
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "auto",
                gridTemplateAreas: gridTemplateSmallScreens,
              }
        }
      >
        {/* Toolbar with data refresh and export controls */}
        <DashboardBox gridArea="buttons">
          <DataToolbar
            isReloading={isReloading}
            onRefresh={resetFilters}
            currentKpis={currentKpis}
            currentProducts={currentProducts}
            currentTransactions={currentTransactions}
          />
        </DashboardBox>

        {/* KPI data grid */}
        <DashboardBox
          gridArea="k"
          sx={{ height: "145px", display: "flex", flexDirection: "column" }}
        >
          <DataGridSection
            title="Key Performance Indicator Data (KPI)"
            sideText={`${currentKpis.length} KPI`}
            rows={currentKpis}
            columns={[
              { field: "_id", headerName: "ID", flex: 1 },
              { field: "totalRevenue", headerName: "Revenue", flex: 1 },
              { field: "totalExpenses", headerName: "Expenses", flex: 1 },
              { field: "totalProfit", headerName: "Profit", flex: 1 },
            ]}
          />
        </DashboardBox>

        {/* Product data grid */}
        <DashboardBox
          gridArea="l"
          sx={{ height: "550px", display: "flex", flexDirection: "column" }}
        >
          <DataGridSection
            title="Product Data"
            sideText={`${currentProducts.length} Products`}
            rows={currentProducts}
            columns={[
              { field: "_id", headerName: "ID", flex: 1 },
              {
                field: "expense",
                headerName: "Expense",
                flex: 0.5,
                renderCell: (params) => `$${params.value}`,
              },
              {
                field: "price",
                headerName: "Price",
                flex: 0.5,
                renderCell: (params) => `$${params.value}`,
              },
            ]}
          />
        </DashboardBox>

        {/* Transaction data grid */}
        <DashboardBox
          gridArea="m"
          sx={{ height: "550px", display: "flex", flexDirection: "column" }}
        >
          <DataGridSection
            title="Transaction Data"
            sideText={`${currentTransactions.length} Transactions`}
            rows={currentTransactions}
            columns={[
              { field: "_id", headerName: "ID", flex: 1 },
              { field: "buyer", headerName: "Buyer", flex: 0.67 },
              {
                field: "amount",
                headerName: "Amount",
                flex: 0.35,
                renderCell: (params) => `$${params.value}`,
              },
              {
                field: "productIds",
                headerName: "Count",
                flex: 0.1,
                renderCell: (params) => (params.value as string[]).length,
              },
            ]}
          />
        </DashboardBox>
      </Box>

      {/* Snackbar to confirm data refresh */}
      <ConfirmationSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Data has been refreshed succesfully"
      />
    </Box>
  );
};

export default MyData;
