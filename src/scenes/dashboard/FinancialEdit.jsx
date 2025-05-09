import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";

const FinancialEdit = ({ open, onClose, onSuccess, financial }) => {
  const [editedFinancial, setEditedFinancial] = useState({
    billDate: "",
    amount: "",
    paymentStatus: "",
    claimStatus: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (financial) {
      setEditedFinancial({
        ...financial,
      });
    }
  }, [financial]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFinancial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://dashboard-gb84.onrender.com/financialDashboard/${financial.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedFinancial),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update financial record");
      }

      const updatedFinancial = await response.json();
      if (onSuccess) {
        onSuccess(updatedFinancial);
      }
      onClose();
    } catch (err) {
      console.error("Error updating financial record:", err);
      alert("Failed to update financial record. Please try again.");
    }
  };

  const paymentStatuses = ["Paid", "Unpaid", "Overdue"];
  const claimStatuses = ["Approved", "Rejected", "Pending"];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: "12px",
        },
      }}
    >
      <DialogTitle>Edit Financial Record</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField
            label="Bill Date"
            name="billDate"
            type="date"
            value={editedFinancial.billDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={editedFinancial.amount}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            select
            label="Payment Status"
            name="paymentStatus"
            value={editedFinancial.paymentStatus}
            onChange={handleInputChange}
            fullWidth
          >
            {paymentStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Claim Status"
            name="claimStatus"
            value={editedFinancial.claimStatus}
            onChange={handleInputChange}
            fullWidth
          >
            {claimStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={editedFinancial.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={editedFinancial.phone}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          sx={{
            backgroundColor: '#1a237e',
            color: '#ffffff',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#0d1757',
            },
            '&:disabled': {
              backgroundColor: 'rgba(26, 35, 126, 0.5)',
              color: 'rgba(255, 255, 255, 0.7)',
            }
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinancialEdit; 