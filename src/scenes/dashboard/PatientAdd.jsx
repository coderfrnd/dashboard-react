import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const PatientAdd = () => {
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    allergies: "",
    chronicConditions: "",
    lastVisit: dayjs(),
    nextAppointment: null,
    diagnosis: "",
    status: true,
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genderOptions = ['Male', 'Female', 'Other'];

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!newPatient.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Age validation
    if (!newPatient.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(newPatient.age) || newPatient.age < 0 || newPatient.age > 150) {
      newErrors.age = 'Please enter a valid age between 0 and 150';
    }
    
    // Gender validation
    if (!newPatient.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    // Blood group validation
    if (!newPatient.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }
    
    // Email validation
    if (newPatient.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(newPatient.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (newPatient.phone && !/^\+?[\d\s-]{10,}$/.test(newPatient.phone)) {
      newErrors.phone = 'Please enter a valid phone number (minimum 10 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (field, date) => {
    setNewPatient(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
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
            lastVisit: newPatient.lastVisit.format('YYYY-MM-DD'),
            nextAppointment: newPatient.nextAppointment?.format('YYYY-MM-DD') || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }
      
      navigate('/patient');
    } catch (err) {
      console.error(err);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to add patient. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 4, color: '#1a237e', fontWeight: 600 }}>
          Add New Patient
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: '#1a237e', fontWeight: 500 }}>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="name"
                value={newPatient.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={newPatient.age}
                onChange={handleInputChange}
                error={!!errors.age}
                helperText={errors.age}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl 
                fullWidth 
                required 
                error={!!errors.gender}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={newPatient.gender}
                  onChange={handleInputChange}
                  label="Gender"
                  sx={{
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl 
                fullWidth 
                required 
                error={!!errors.bloodGroup}
              >
                <InputLabel>Blood Group</InputLabel>
                <Select
                  name="bloodGroup"
                  value={newPatient.bloodGroup}
                  onChange={handleInputChange}
                  label="Blood Group"
                  sx={{
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }}
                >
                  {bloodGroups.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 2, color: '#1a237e', fontWeight: 500 }}>
                Contact Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={newPatient.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={newPatient.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>

            {/* Medical Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 2, color: '#1a237e', fontWeight: 500 }}>
                Medical Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Allergies"
                name="allergies"
                value={newPatient.allergies}
                onChange={handleInputChange}
                multiline
                rows={2}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Chronic Conditions"
                name="chronicConditions"
                value={newPatient.chronicConditions}
                onChange={handleInputChange}
                multiline
                rows={2}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                name="diagnosis"
                value={newPatient.diagnosis}
                onChange={handleInputChange}
                multiline
                rows={2}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>

            {/* Appointment Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, mt: 2, color: '#1a237e', fontWeight: 500 }}>
                Appointment Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Last Visit"
                  value={newPatient.lastVisit}
                  onChange={(date) => handleDateChange('lastVisit', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                          backgroundColor: '#fff',
                        }
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Next Appointment"
                  value={newPatient.nextAppointment}
                  onChange={(date) => handleDateChange('nextAppointment', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                          backgroundColor: '#fff',
                        }
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newPatient.status}
                    onChange={(e) => handleInputChange({
                      target: {
                        name: 'status',
                        value: e.target.checked
                      }
                    })}
                    name="status"
                  />
                }
                label="Active Status"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: '#1a237e',
                    '&:hover': {
                      bgcolor: '#0d1757',
                    },
                    borderRadius: 1,
                    textTransform: 'none',
                  }}
                >
                  {loading ? 'Saving...' : 'Add Patient'}
                </Button>
              </Box>
            </Grid>
          </Grid>

          {errors.submit && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {errors.submit}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default PatientAdd;
