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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Patient Details</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Name"
          name="name"
          value={editedPatient.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={editedPatient.age}
          onChange={handleInputChange}
        />
        <TextField
          label="Blood Group"
          name="bloodGroup"
          value={editedPatient.bloodGroup}
          onChange={handleInputChange}
        />
        <TextField
          label="Allergies"
          name="allergies"
          value={editedPatient.allergies}
          onChange={handleInputChange}
        />
        <TextField
          label="Chronic Conditions"
          name="chronicConditions"
          value={editedPatient.chronicConditions}
          onChange={handleInputChange}
        />
        <TextField
          label="Last Visit"
          name="lastVisit"
          type="date"
          value={editedPatient.lastVisit}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={editedPatient.status}
              onChange={handleStatusChange}
              name="status"
            />
          }
          label="Active Status"
        />
        <TextField
          label="Email"
          name="email"
          value={editedPatient.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Phone"
          name="phone"
          value={editedPatient.phone}
          onChange={handleInputChange}
        />
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

export default PatientEdit; 