import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState, useEffect } from "react";

const PatientEdit = ({ open, onClose, onSuccess, patient }) => {
  const [editedPatient, setEditedPatient] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    allergies: "",
    chronicConditions: "",
    lastVisit: "",
    status: false,
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (patient) {
      setEditedPatient({
        ...patient,
        lastVisit: patient.lastVisit?.split('T')[0] || '', // Format date for input
      });
    }
  }, [patient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setEditedPatient((prev) => ({
      ...prev,
      status: e.target.checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://dashboard-gb84.onrender.com/patientDashboard/${patient.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editedPatient,
            age: Number(editedPatient.age),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update patient");
      }
      
      const updatedPatient = await response.json();
      onSuccess?.(updatedPatient);
      onClose();
    } catch (err) {
      console.error("Error updating patient:", err);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '90vh',
          maxHeight: '95vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          py: 3, 
          px: 3,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}
      >
        Edit Patient Details
      </DialogTitle>
      <DialogContent
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 3,
          py: 4,
          px: 3,
          overflowY: 'auto',
          flex: 1,
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: '4px'
          }
        }}
      >
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={editedPatient.name}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={editedPatient.age}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        />
        <TextField
          fullWidth
          label="Blood Group"
          name="bloodGroup"
          value={editedPatient.bloodGroup}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        />
        <TextField
          fullWidth
          label="Allergies"
          name="allergies"
          value={editedPatient.allergies}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        />
        <TextField
          fullWidth
          label="Chronic Conditions"
          name="chronicConditions"
          value={editedPatient.chronicConditions}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        />
        <TextField
          fullWidth
          label="Last Visit"
          name="lastVisit"
          type="date"
          value={editedPatient.lastVisit}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={editedPatient.status}
              onChange={handleStatusChange}
              name="status"
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: '#ff1744',
                  '&.Mui-checked': {
                    color: '#4caf50',
                  },
                  '&.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#4caf50',
                  },
                },
                '& .MuiSwitch-track': {
                  backgroundColor: '#ff1744',
                },
              }}
            />
          }
          label={editedPatient.status ? "Active" : "Inactive"}
          sx={{
            '& .MuiFormControlLabel-label': {
              color: editedPatient.status ? '#4caf50' : '#ff1744',
              fontWeight: 500
            }
          }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={editedPatient.email}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={editedPatient.phone}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        />
      </DialogContent>
      <DialogActions 
        sx={{ 
          py: 3, 
          px: 3,
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: '#fff',
          position: 'sticky',
          bottom: 0,
          zIndex: 1
        }}
      >
        <Button 
          onClick={onClose} 
          sx={{
            color: '#000000',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
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

export default PatientEdit; 