import { Box, Button, Typography, useTheme } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";

const Invoices = ({ financialData , header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (financialData && financialData.length > 0) {
      setFilteredData(financialData);
    }
  }, [financialData]);

  const handleFilter = (status) => {
    if (status === "All") {
      setFilteredData(financialData);
    } else {
      const filtered = financialData.filter((item) => item.paymentStatus === status);
      setFilteredData(filtered);
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "billDate",
      headerName: "Bill Date",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => {
        const amount = params.row?.amount ?? 0;
        return (
          <Typography color={colors?.greenAccent?.[500] || "green"}>
            ${amount}
          </Typography>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      renderCell: (params) => {
        const status = params.row?.paymentStatus || "Unknown";
        let color =
          status === "Paid"
            ? colors?.greenAccent?.[400]
            : status === "Unpaid"
            ? colors?.redAccent?.[400]
            : colors?.orangeAccent?.[400];

        return (
          <Typography color={color || "gray"}>
            {status}
          </Typography>
        );
      },
    },
    {
      field: "claimStatus",
      headerName: "Claim Status",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title={header} subtitle="List of Invoice Balances" />

      {/* Filter Buttons */}
      <Box display="flex" gap="10px" mt={2}>
        <Button variant="contained" onClick={() => handleFilter("All")}>
          All
        </Button>
        <Button variant="contained" color="error" onClick={() => handleFilter("Overdue")}>
          Overdue
        </Button>
        <Button variant="contained" color="success" onClick={() => handleFilter("Paid")}>
          Paid
        </Button>
        <Button variant="contained" color="warning" onClick={() => handleFilter("Unpaid")}>
          Unpaid
        </Button>
      </Box>

      {/* DataGrid */}
      <Box
        mt="20px"
        height="75vh"
        maxWidth="100%"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]} 
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Invoices;
