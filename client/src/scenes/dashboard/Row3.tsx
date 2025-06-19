import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            { name: key, value: value },
            {
              name: `${key} of Total`,
              value: totalExpenses - (value as number),
            },
          ];
        }
      );
    }
  }, [kpiData]);

  const topExpenseCategory = useMemo(() => {
    if (!kpiData || !kpiData[0]?.expensesByCategory) return null;
    const totalExpenses = kpiData[0].totalExpenses;
    const categories = kpiData[0].expensesByCategory;
    if (!totalExpenses || Object.keys(categories).length === 0) return null;

    let topCategory = "";
    let maxValue = 0;

    for (const [category, value] of Object.entries(categories)) {
      if (value > maxValue) {
        maxValue = value;
        topCategory = category;
      }
    }

    const percentage = (maxValue / totalExpenses) * 100;
    return `${topCategory} +${percentage.toFixed(1)}%`;
  }, [kpiData]);

  const productColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    { field: "buyer", headerName: "Buyer", flex: 0.67 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  const [noteText, setNoteText] = useState(() => {
    return (
      localStorage.getItem("dashboard-notes") ||
      `- Q1 focus: Improve user retention.\n- Finalize A/B test for homepage redesign.\n- Analyze churn data by segment\n- Schedule team sync with design team.\n- Reminder: Set KPI review meeting.`
    );
  });

  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    localStorage.setItem("dashboard-notes", noteText);
  }, [noteText]);

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      const len = textAreaRef.current.value.length;
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  return (
    <>
      <DashboardBox
        gridArea="g"
        sx={{ minHeight: { xs: "310px", sm: "310px", md: "auto" } }}
      >
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[400],
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
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox
        gridArea="h"
        sx={{ minHeight: { xs: "310px", sm: "310px", md: "auto" } }}
      >
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[400],
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
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox
        gridArea="i"
        sx={{ minHeight: { xs: "260px", sm: "260px", md: "auto" } }}
      >
        <BoxHeader
          title="Expense Breakdown By Category"
          sideText={topExpenseCategory ?? "N/A"}
        />
        <FlexBetween
          mt="0.5rem"
          mb="0.5rem"
          gap="2.4rem"
          p="0 -2rem"
          textAlign="center"
        >
          {pieChartData
            ?.filter((data) => data[0].name && data[0].name !== "$*")
            .map((data, i) => (
              <Box key={`${data[0].name}-${i}`}>
                <PieChart width={150} height={80}>
                  <Pie
                    stroke="none"
                    data={data}
                    innerRadius={15}
                    outerRadius={32}
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h5">{data[0].name}</Typography>
              </Box>
            ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox
        gridArea="j"
        sx={{
          minHeight: { xs: "220px", sm: "220px", md: "auto" },
          display: "flex",
          flexDirection: "column",
          overflowY: "auto", // ✅ enables vertical scroll for notes only
          maxHeight: { xs: "340px", sm: "340px", md: "360px" }, // ✅ caps height so scroll is possible
        }}
      >
        <BoxHeader title="Quick Notes" sideText="" />
        <Box
          position="relative"
          sx={{
            width: "100%",
            paddingRight: "6rem",
            paddingLeft: "1.1rem",
            paddingTop: "0.3rem",
            backgroundColor: "transparent",
            color: palette.grey[400],
            fontSize: "0.94rem",
            fontFamily: "inherit",
            lineHeight: 1.6,
            boxSizing: "border-box",
          }}
        >
          <Button
            onClick={() => setIsEditing(!isEditing)}
            sx={{
              position: "absolute",
              top: "-1.3rem",
              right: "0.8rem",
              backgroundColor: palette.grey[400],
              color: palette.grey[900],
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "0.5rem",
              px: "1.25rem",
              py: "0.25rem",
              zIndex: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: palette.grey[300],
              },
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>

          {isEditing ? (
            <Box
              component="textarea"
              ref={textAreaRef}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Notes..."
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  setIsEditing(false);
                }
              }}
              sx={{
                width: "100%",
                minHeight: "8.5rem",
                maxHeight: "16rem",
                paddingRight: "6rem",
                paddingLeft: "0rem",
                paddingTop: "0.5rem",
                border: "none",
                outline: "none",
                resize: "none",
                overflowY: "auto",
                backgroundColor: "transparent",
                color: `${palette.grey[700]}`,
                fontSize: "0.8rem",
                fontFamily: "inherit",
                lineHeight: 1.6,
                boxSizing: "border-box",
              }}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                color: `${palette.grey[700]}`,
                fontSize: "0.8rem",
                fontFamily: "inherit",
                lineHeight: 1.6,
                minHeight: "9rem",
                paddingRight: "6rem",
                paddingTop: "0.5rem",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
              onClick={() => setIsEditing(true)}
            >
              {noteText || "Click to add notes..."}
            </Typography>
          )}
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
