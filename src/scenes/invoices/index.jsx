import { Box, Button, Typography, useTheme, IconButton, Tooltip, Paper } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FinancialEdit from "../dashboard/FinancialEdit";
import FilterListIcon from '@mui/icons-material/FilterList';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const Invoices = ({ financialData, header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filteredData, setFilteredData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFinancial, setSelectedFinancial] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (financialData && financialData.length > 0) {
      setFilteredData(financialData);
    }
  }, [financialData]);

  const handleFilter = (status) => {
    setActiveFilter(status);
    if (status === "All") {
      setFilteredData(financialData);
    } else {
      const filtered = financialData.filter((item) => item.paymentStatus === status);
      setFilteredData(filtered);
    }
  };

  const handleEdit = (financial) => {
    setSelectedFinancial(financial);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await fetch(
          `https://dashboard-gb84.onrender.com/financialDashboard/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete record");
        }

        setFilteredData((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete record");
      }
    }
  };

  const handleEditSuccess = (updatedFinancial) => {
    setFilteredData((prev) =>
      prev.map((item) =>
        item.id === updatedFinancial.id ? updatedFinancial : item
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return '#4CAF50';  // Material Green
      case 'Unpaid':
        return '#FF9800';  // Material Orange
      case 'Overdue':
        return '#f44336';  // Material Red
      case 'Approved':
        return '#4CAF50';  // Material Green
      case 'Rejected':
        return '#f44336';  // Material Red
      case 'Pending':
        return '#2196F3';  // Material Blue
      default:
        return '#757575';  // Material Grey
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircleIcon sx={{ color: "#ffffff", mr: 1 }} />;
      case 'Unpaid':
        return <ErrorIcon sx={{ color: "#ffffff", mr: 1 }} />;
      case 'Overdue':
        return <WarningIcon sx={{ color: "#ffffff", mr: 1 }} />;
      default:
        return null;
    }
  };

  const columns = [
    { 
      field: "id", 
      headerName: "ID", 
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "billDate",
      headerName: "Bill Date",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
          <AttachMoneyIcon sx={{ color: "#4CAF50", mr: 0.5 }} />
          <Typography fontWeight="bold">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box
          width="120px"
          m="0 auto"
          p="6px 10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={getStatusColor(params.value)}
          borderRadius="20px"
        >
          {getStatusIcon(params.value)}
          <Typography color="#ffffff" fontWeight="500" fontSize="13px">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "claimStatus",
      headerName: "Claim Status",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box
          width="120px"
          m="0 auto"
          p="6px 10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={getStatusColor(params.value)}
          borderRadius="20px"
        >
          {getStatusIcon(params.value)}
          <Typography color="#ffffff" fontWeight="500" fontSize="13px">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box display="flex" gap={1} justifyContent="center" width="100%">
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleEdit(params.row)}
              sx={{ 
                backgroundColor: '#2196F3',
                '&:hover': {
                  backgroundColor: '#1976D2',
                },
                width: '32px',
                height: '32px',
              }}
            >
              <EditIcon sx={{ color: '#fff', fontSize: '18px' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              sx={{ 
                backgroundColor: '#f44336',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
                width: '32px',
                height: '32px',
              }}
            >
              <DeleteIcon sx={{ color: '#fff', fontSize: '18px' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title={header} subtitle="List of Invoice Balances" />

      {/* Filter Buttons */}
      <Box 
        sx={{ 
          mt: 2, 
          mb: 3, 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          backgroundColor: '#fff',
          p: 2,
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <Box display="flex" alignItems="center">
          <FilterListIcon sx={{ color: '#757575', mr: 1 }} />
          <Typography color="#424242" fontWeight="500">
            Filter:
          </Typography>
        </Box>
        <Box display="flex" gap="10px" flexWrap="wrap">
          <Button 
            variant="contained"
            onClick={() => handleFilter("All")}
            sx={{ 
              backgroundColor: activeFilter === "All" ? '#2196F3' : '#f5f5f5',
              color: activeFilter === "All" ? '#fff' : '#757575',
              '&:hover': {
                backgroundColor: activeFilter === "All" ? '#1976D2' : '#e0e0e0',
              },
              fontWeight: '500',
              boxShadow: 'none',
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
            }}
          >
            All
          </Button>
          <Button 
            variant="contained"
            onClick={() => handleFilter("Overdue")}
            sx={{ 
              backgroundColor: activeFilter === "Overdue" ? '#f44336' : '#f5f5f5',
              color: activeFilter === "Overdue" ? '#fff' : '#757575',
              '&:hover': {
                backgroundColor: activeFilter === "Overdue" ? '#d32f2f' : '#e0e0e0',
              },
              fontWeight: '500',
              boxShadow: 'none',
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
            }}
          >
            Overdue
          </Button>
          <Button 
            variant="contained"
            onClick={() => handleFilter("Paid")}
            sx={{ 
              backgroundColor: activeFilter === "Paid" ? '#4CAF50' : '#f5f5f5',
              color: activeFilter === "Paid" ? '#fff' : '#757575',
              '&:hover': {
                backgroundColor: activeFilter === "Paid" ? '#388E3C' : '#e0e0e0',
              },
              fontWeight: '500',
              boxShadow: 'none',
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
            }}
          >
            Paid
          </Button>
          <Button 
            variant="contained"
            onClick={() => handleFilter("Unpaid")}
            sx={{ 
              backgroundColor: activeFilter === "Unpaid" ? '#FF9800' : '#f5f5f5',
              color: activeFilter === "Unpaid" ? '#fff' : '#757575',
              '&:hover': {
                backgroundColor: activeFilter === "Unpaid" ? '#F57C00' : '#e0e0e0',
              },
              fontWeight: '500',
              boxShadow: 'none',
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
            }}
          >
            Unpaid
          </Button>
        </Box>
      </Box>

      {/* DataGrid */}
      <Paper
        elevation={0}
        sx={{ 
          height: "75vh",
          backgroundColor: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          '& .MuiDataGrid-root': {
            border: 'none',
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
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f5f5f5',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: 'none',
              color: '#424242',
              fontWeight: 600,
              fontSize: '14px',
            },
            '& .MuiDataGrid-row': {
              color: '#424242',
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#f8f9fa',
              },
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: '#fff',
            },
            '& .MuiCheckbox-root': {
              color: '#757575',
            },
            '& .MuiDataGrid-cellContent': {
              color: '#424242',
            },
          }}
        />
      </Paper>
      
      <FinancialEdit
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSuccess={handleEditSuccess}
        financial={selectedFinancial}
      />
    </Box>
  );
};

export default Invoices;
