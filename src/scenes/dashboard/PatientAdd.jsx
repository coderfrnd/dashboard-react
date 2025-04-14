import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Tooltip,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Close as CloseIcon, Help as HelpIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const AddPatientModal = ({ open, onClose, onSuccess }) => {
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    allergies: "",
    chronicConditions: "",
    lastVisit: dayjs(),
    status: true,
    email: "",
    phone: "",
    gender: "",
    address: "",
    emergencyContact: "",
    insuranceInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genderOptions = ['Male', 'Female', 'Other'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!newPatient.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!newPatient.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(newPatient.age) || newPatient.age < 0 || newPatient.age > 150) {
      newErrors.age = 'Please enter a valid age';
    }
    
    if (!newPatient.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }
    
    if (newPatient.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newPatient.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (newPatient.phone && !/^\+?[\d\s-]{10,}$/.test(newPatient.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!newPatient.gender) {
      newErrors.gender = 'Gender is required';
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

  const handleDateChange = (date) => {
    setNewPatient(prev => ({
      ...prev,
      lastVisit: date
    }));
  };

  const handleStatusChange = (e) => {
    setNewPatient(prev => ({
      ...prev,
      status: e.target.checked
    }));
  };

  const handleSubmit = async () => {
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }
      
      const savedPatient = await response.json();
      onSuccess?.(savedPatient);
      
      // Reset form
      setNewPatient({
        name: "",
        age: "",
        bloodGroup: "",
        allergies: "",
        chronicConditions: "",
        lastVisit: dayjs(),
        status: true,
        email: "",
        phone: "",
        gender: "",
        address: "",
        emergencyContact: "",
        insuranceInfo: "",
      });
      setErrors({});
      onClose();
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
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#1a237e' }}>
          Add New Patient
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[700],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Basic Information Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1a237e' }}>
              Basic Information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
              InputLabelProps={{
                sx: { color: '#424242' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#bdbdbd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#757575',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a237e',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#212121',
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.gender}>
              <InputLabel sx={{ color: '#424242' }}>Gender</InputLabel>
              <Select
                name="gender"
                value={newPatient.gender}
                onChange={handleInputChange}
                label="Gender"
                sx={{
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#bdbdbd',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#757575',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1a237e',
                  },
                  '& .MuiSelect-select': {
                    color: '#212121',
                  }
                }}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors.gender && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.gender}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={newPatient.age}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.age}
              helperText={errors.age}
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.bloodGroup}>
              <InputLabel>Blood Group</InputLabel>
              <Select
                name="bloodGroup"
                value={newPatient.bloodGroup}
                onChange={handleInputChange}
                label="Blood Group"
              >
                {bloodGroups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
              {errors.bloodGroup && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.bloodGroup}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1a237e' }}>
              Contact Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={newPatient.email}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={newPatient.phone}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={newPatient.address}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
            />
          </Grid>

          {/* Medical Information Section */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1a237e' }}>
              Medical Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Allergies"
              name="allergies"
              value={newPatient.allergies}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              placeholder="List any allergies"
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Chronic Conditions"
              name="chronicConditions"
              value={newPatient.chronicConditions}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              placeholder="List any chronic conditions"
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Last Visit"
                value={newPatient.lastVisit}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { borderRadius: '8px' }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Emergency Contact"
              name="emergencyContact"
              value={newPatient.emergencyContact}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Insurance Information"
              name="insuranceInfo"
              value={newPatient.insuranceInfo}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              InputProps={{
                sx: { borderRadius: '8px' }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={newPatient.status}
                  onChange={handleStatusChange}
                  name="status"
                  color="primary"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#1a237e',
                      '&:hover': {
                        backgroundColor: 'rgba(26, 35, 126, 0.08)',
                      },
                      '&.Mui-disabled': {
                        color: 'rgba(26, 35, 126, 0.5)',
                      },
                      '& + .MuiSwitch-track': {
                        backgroundColor: '#1a237e !important',
                        opacity: 1,
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#1a237e !important',
                      opacity: 1,
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: '#757575 !important',
                      opacity: 1,
                    },
                    '& .MuiSwitch-thumb': {
                      backgroundColor: newPatient.status ? '#1a237e' : '#f5f5f5',
                      border: '1px solid #bdbdbd',
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ color: '#424242' }}>Active Status</Typography>
                  <Tooltip title="Toggle patient's active status in the system">
                    <HelpIcon fontSize="small" sx={{ color: '#757575', cursor: 'help' }} />
                  </Tooltip>
                </Box>
              }
            />
          </Grid>
        </Grid>

        {errors.submit && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {errors.submit}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <Button 
          onClick={onClose}
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            color: '#ffffff',
            borderColor: '#757575',
            backgroundColor: '#424242',
            '&:hover': {
              backgroundColor: '#212121',
              borderColor: '#424242',
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            backgroundColor: '#1a237e',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#0d1757',
            },
            '&:disabled': {
              backgroundColor: 'rgba(26, 35, 126, 0.5)',
              color: 'rgba(255, 255, 255, 0.7)',
            }
          }}
        >
          {loading ? 'Adding Patient...' : 'Add Patient'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPatientModal;
