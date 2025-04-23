import { 
  Box, 
  Button, 
  Typography, 
  useTheme, 
  Grid 
} from "@mui/material";
import { Header } from "../../components";
import { tokens } from "../../theme";
import { useState, useEffect, useContext } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { ToggledContext } from "../../App";
import InvoiceCard from "../../components/InvoiceCard";
import FinancialEdit from "../dashboard/FinancialEdit";

const Invoices = ({ financialData, header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { patientData } = useContext(ToggledContext);

  const [filteredData, setFilteredData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFinancial, setSelectedFinancial] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (financialData?.length) {
      setFilteredData(financialData);
    }
  }, [financialData]);

  const handleFilter = (status) => {
    setActiveFilter(status);
    if (status === "All") {
      setFilteredData(financialData);
    } else {
      setFilteredData(financialData.filter(item => item.paymentStatus === status));
    }
  };

  const handleEdit = (financial) => {
    setSelectedFinancial(financial);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const response = await fetch(`https://dashboard-gb84.onrender.com/financialDashboard/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete record");

      setFilteredData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete record");
    }
  };

  const handleClaimStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "Approved" ? "Rejected" : "Approved";
    const financial = filteredData.find(item => item.id === id);

    try {
      const response = await fetch(`https://dashboard-gb84.onrender.com/financialDashboard/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...financial, claimStatus: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update claim status");

      const updatedFinancial = await response.json();
      setFilteredData(prev =>
        prev.map(item => (item.id === id ? updatedFinancial : item))
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update claim status");
    }
  };

  const handleEditSuccess = (updatedFinancial) => {
    setFilteredData(prev =>
      prev.map(item => (item.id === updatedFinancial.id ? updatedFinancial : item))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "#4CAF50";
      case "Unpaid": return "#FF9800";
      case "Overdue": return "#F44336";
      case "Approved": return "#4CAF50";
      case "Rejected": return "#F44336";
      case "Pending": return "#2196F3";
      default: return "#9E9E9E";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid": return <CheckCircleIcon sx={{ color: "#fff" }} />;
      case "Unpaid": return <ErrorIcon sx={{ color: "#fff" }} />;
      case "Overdue": return <WarningIcon sx={{ color: "#fff" }} />;
      default: return null;
    }
  };

  const getPatientName = (id) => {
    return patientData?.find(p => p.id === id)?.name || "Unknown Patient";
  };

  return (
    <Box m="20px">
      <Header title={header} subtitle="List of Invoice Balances" />

      {/* Filter Buttons */}
      <Box
        sx={{
          mt: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: "8px",
        }}
      >
        <Box display="flex" alignItems="center">
          <FilterListIcon sx={{ color: "#666", mr: 1 }} />
          <Typography color="#666" fontWeight={500}>
            Filter:
          </Typography>
        </Box>

        <Box display="flex" gap="10px" flexWrap="wrap">
          {["All", "Overdue", "Paid", "Unpaid"].map(status => (
            <Button
              key={status}
              variant="contained"
              onClick={() => handleFilter(status)}
              sx={{
                backgroundColor: activeFilter === status ? getStatusColor(status) : "#e0e0e0",
                color: activeFilter === status ? "#fff" : "#666",
                "&:hover": {
                  backgroundColor: getStatusColor(status),
                  color: "#fff",
                },
                textTransform: "none",
                borderRadius: "4px",
              }}
            >
              {status}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Financial Cards Grid */}
      <Grid container spacing={2}>
        {filteredData.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <InvoiceCard
              item={item}
              getPatientName={getPatientName}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleClaimStatusChange={handleClaimStatusChange}
            />
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
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
