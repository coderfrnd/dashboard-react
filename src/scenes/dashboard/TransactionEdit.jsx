import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";

const TransactionEdit = ({ open, onClose, onSuccess, transaction }) => {
  const [editedTransaction, setEditedTransaction] = useState({
    patientName: "",
    email: "",
    amount: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    if (transaction) {
      setEditedTransaction({
        ...transaction,
        date: transaction.date?.split("T")[0] || "", // Format date for input
      });
    }
  }, [transaction]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://dashboard-gb84.onrender.com/transactions/${transaction.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTransaction),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      const updatedTransaction = await response.json();
      onSuccess?.(updatedTransaction);
      onClose();
    } catch (err) {
      console.error("Error updating transaction:", err);
    }
  };

  const statuses = ["paid", "unpaid", "overdue"];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Patient Name"
          name="patientName"
          value={editedTransaction.patientName}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          name="email"
          value={editedTransaction.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={editedTransaction.amount}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: "$",
          }}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={editedTransaction.date}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          select
          label="Status"
          name="status"
          value={editedTransaction.status}
          onChange={handleInputChange}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionEdit; 