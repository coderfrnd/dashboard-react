import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

const AddPatientModal = ({ open, onClose, onSuccess }) => {
  const [newPatient, setNewPatient] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://dashboard-gb84.onrender.com/patientDashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newPatient,
            age: Number(newPatient.age),
            status: newPatient.status === "true" || newPatient.status === true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }
      const savedPatient = await response.json()
      onSuccess?.(savedPatient)
      setNewPatient({
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
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Patient</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Name"
          name="name"
          value={newPatient.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={newPatient.age}
          onChange={handleInputChange}
        />
        <TextField
          label="Blood Group"
          name="bloodGroup"
          value={newPatient.bloodGroup}
          onChange={handleInputChange}
        />
        <TextField
          label="Allergies"
          name="allergies"
          value={newPatient.allergies}
          onChange={handleInputChange}
        />
        <TextField
          label="Chronic Conditions"
          name="chronicConditions"
          value={newPatient.chronicConditions}
          onChange={handleInputChange}
        />
        <TextField
          label="Last Visit"
          name="lastVisit"
          type="date"
          value={newPatient.lastVisit}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Status (true/false)"
          name="status"
          value={newPatient.status}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          name="email"
          value={newPatient.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Phone"
          name="phone"
          value={newPatient.phone}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPatientModal;
