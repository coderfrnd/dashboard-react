import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";

const StaffEdit = ({ open, onClose, onSuccess, staff }) => {
  const [editedStaff, setEditedStaff] = useState({
    name: "",
    department: "",
    shift: "",
    onDuty: false,
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (staff) {
      setEditedStaff({
        ...staff,
      });
    }
  }, [staff]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    setEditedStaff((prev) => ({
      ...prev,
      onDuty: e.target.checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Sending update request with data:', editedStaff);
      const response = await fetch(
        `https://dashboard-gb84.onrender.com/staffDashboard/${staff.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedStaff),
        }
      );

      const responseText = await response.text();
      console.log('Server response:', response.status, responseText);

      if (!response.ok) {
        throw new Error(`Failed to update staff: ${response.status} ${responseText}`);
      }

      const updatedStaff = JSON.parse(responseText);
      console.log('Successfully updated staff:', updatedStaff);
      
      if (typeof onSuccess === 'function') {
        onSuccess(updatedStaff);
      } else {
        console.error('onSuccess is not a function:', onSuccess);
      }
      onClose(); // Close the dialog after successful update
    } catch (err) {
      console.error("Error updating staff:", err);
      alert(err.message);
    }
  };

  const departments = ["Cardiology", "Neurology", "Orthopedics"];
  const shifts = ["Morning", "Evening", "Night"];

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
      <DialogTitle>Edit Staff Details</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            value={editedStaff.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Department"
            name="department"
            value={editedStaff.department}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Shift"
            name="shift"
            value={editedStaff.shift}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={editedStaff.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={editedStaff.phone}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={editedStaff.onDuty}
                onChange={handleSwitchChange}
                name="onDuty"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#1a237e',
                    '&:hover': {
                      backgroundColor: 'rgba(26, 35, 126, 0.08)',
                    },
                    '& .MuiSwitch-thumb': {
                      backgroundColor: '#1a237e',
                      border: '1px solid #1a237e',
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: '#1a237e',
                    },
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#1a237e',
                  },
                  '& .MuiSwitch-thumb': {
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #bdbdbd',
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: '#757575',
                  },
                  '&:hover .MuiSwitch-thumb': {
                    backgroundColor: editedStaff.onDuty ? '#1a237e' : '#f5f5f5',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  },
                }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ color: '#424242', fontWeight: 500 }}>
                  {editedStaff.onDuty ? "Currently On Duty" : "Currently Off Duty"}
                </Typography>
                <Chip 
                  label={editedStaff.onDuty ? "Active" : "Inactive"} 
                  size="small"
                  color={editedStaff.onDuty ? "primary" : "default"}
                  sx={{ 
                    backgroundColor: editedStaff.onDuty ? "rgba(26, 35, 126, 0.1)" : "rgba(189, 189, 189, 0.1)",
                    color: editedStaff.onDuty ? "#1a237e" : "#757575",
                    fontWeight: 500,
                    border: editedStaff.onDuty ? "1px solid rgba(26, 35, 126, 0.3)" : "1px solid rgba(189, 189, 189, 0.3)",
                  }}
                />
              </Box>
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StaffEdit; 