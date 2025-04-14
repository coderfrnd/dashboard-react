import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  FormControlLabel,
  Switch,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  Fade,
  Zoom,
  Avatar,
  Chip,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext, useState } from "react";
import { ToggledContext } from "../../App";
import { 
  Help as HelpIcon, 
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  ContactPhone as EmergencyIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Oncology",
  "Emergency",
  "General Medicine",
  "Surgery",
  "Dermatology",
  "Ophthalmology",
  "ENT",
  "Gynecology",
  "Psychiatry",
  "Dental",
  "Physiotherapy",
  "Laboratory",
  "Pharmacy",
  "Radiology"
];

const shifts = ["Morning", "Evening", "Night"];

const positions = [
  "Doctor",
  "Nurse",
  "Technician",
  "Administrator",
  "Receptionist",
  "Pharmacist",
  "Lab Technician",
  "Radiologist",
  "Physiotherapist",
  "Dentist",
  "Counselor",
  "Security",
  "Housekeeping",
  "IT Support",
  "HR Manager",
  "Finance Officer"
];

const employmentTypes = [
  "Full Time",
  "Part Time",
  "Contract",
  "Intern",
  "Trainee",
  "Consultant"
];

const qualificationLevels = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Diploma",
  "Certificate",
  "Specialization"
];

const specializations = {
  "Doctor": [
    "General Physician",
    "Cardiologist",
    "Neurologist",
    "Orthopedic Surgeon",
    "Pediatrician",
    "Oncologist",
    "Emergency Medicine",
    "Surgeon",
    "Dermatologist",
    "Ophthalmologist",
    "ENT Specialist",
    "Gynecologist",
    "Psychiatrist"
  ],
  "Nurse": [
    "Registered Nurse",
    "Licensed Practical Nurse",
    "Nurse Practitioner",
    "Clinical Nurse Specialist",
    "Emergency Nurse",
    "ICU Nurse",
    "Operating Room Nurse",
    "Pediatric Nurse"
  ],
  "Technician": [
    "Lab Technician",
    "X-Ray Technician",
    "ECG Technician",
    "Ultrasound Technician",
    "Dental Technician",
    "Pharmacy Technician",
    "IT Technician"
  ]
};

const initialValues = {
  name: "",
  department: "",
  shift: "",
  onDuty: false,
  email: "",
  phone: "",
  position: "",
  joiningDate: "",
  salary: "",
  emergencyContact: "",
  address: "",
  employmentType: "",
  qualification: "",
  specialization: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  department: yup.string().required("Department is required"),
  shift: yup.string().required("Shift is required"),
  onDuty: yup.boolean().required("Duty status is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  position: yup.string().required("Position is required"),
  joiningDate: yup.string().required("Joining date is required"),
  salary: yup.string().required("Salary is required"),
  emergencyContact: yup.string().required("Emergency contact is required"),
  address: yup.string().required("Address is required"),
  employmentType: yup.string().required("Employment type is required"),
  qualification: yup.string().required("Qualification is required"),
  specialization: yup.string().when("position", {
    is: (val) => ["Doctor", "Nurse", "Technician"].includes(val),
    then: yup.string().required("Specialization is required for this position"),
    otherwise: yup.string(),
  }),
});

const Form = () => {
  const { setstaffData } = useContext(ToggledContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (values, actions) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://dashboard-gb84.onrender.com/staffDashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create new staff");
      }

      const data = await response.json();
      setstaffData((prev) => [...prev, data]);
      actions.resetForm({ values: initialValues });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while creating staff.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE STAFF" subtitle="Create a New Staff Profile" />

      <Fade in={true} timeout={800}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: "16px",
            backgroundColor: "white",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: "linear-gradient(90deg, #1a237e, #3949ab, #5c6bc0)",
            },
          }}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Basic Information Section */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: "#1a237e",
                          width: 48,
                          height: 48,
                          boxShadow: "0 4px 8px rgba(26, 35, 126, 0.3)",
                        }}
                      >
                        <PersonIcon fontSize="large" />
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#1a237e",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        Basic Information
                        <Tooltip title="Enter staff's basic details">
                          <HelpIcon fontSize="small" sx={{ color: "#757575", cursor: "help" }} />
                        </Tooltip>
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Full Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& fieldset": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#424242",
                          "&.Mui-focused": {
                            color: "#1a237e",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#212121",
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={touched.department && Boolean(errors.department)}>
                      <InputLabel sx={{ color: "#424242" }}>Department</InputLabel>
                      <Select
                        value={values.department}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="department"
                        label="Department"
                        startAdornment={
                          <InputAdornment position="start">
                            <WorkIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        }
                        sx={{
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                          "& .MuiSelect-select": {
                            color: "#212121",
                            display: "flex",
                            alignItems: "center",
                          },
                          "& .MuiInputAdornment-root": {
                            marginRight: 1,
                          },
                        }}
                      >
                        {departments.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.department && errors.department && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                          {errors.department}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={touched.shift && Boolean(errors.shift)}>
                      <InputLabel sx={{ color: "#424242" }}>Shift</InputLabel>
                      <Select
                        value={values.shift}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="shift"
                        label="Shift"
                        startAdornment={
                          <InputAdornment position="start">
                            <CalendarIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        }
                        sx={{
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                          "& .MuiSelect-select": {
                            color: "#212121",
                            display: "flex",
                            alignItems: "center",
                          },
                          "& .MuiInputAdornment-root": {
                            marginRight: 1,
                          },
                        }}
                      >
                        {shifts.map((shift) => (
                          <MenuItem key={shift} value={shift}>
                            {shift}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.shift && errors.shift && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                          {errors.shift}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={touched.position && Boolean(errors.position)}>
                      <InputLabel sx={{ color: "#424242" }}>Position</InputLabel>
                      <Select
                        value={values.position}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="position"
                        label="Position"
                        startAdornment={
                          <InputAdornment position="start">
                            <WorkIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        }
                        sx={{
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                          "& .MuiSelect-select": {
                            color: "#212121",
                            display: "flex",
                            alignItems: "center",
                          },
                          "& .MuiInputAdornment-root": {
                            marginRight: 1,
                          },
                        }}
                      >
                        {positions.map((pos) => (
                          <MenuItem key={pos} value={pos}>
                            {pos}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.position && errors.position && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                          {errors.position}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Contact Information Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 3, borderColor: "#e0e0e0", borderWidth: "1px" }} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: "#3949ab",
                          width: 48,
                          height: 48,
                          boxShadow: "0 4px 8px rgba(57, 73, 171, 0.3)",
                        }}
                      >
                        <EmailIcon fontSize="large" />
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#1a237e",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        Contact Information
                        <Tooltip title="Enter staff's contact details">
                          <HelpIcon fontSize="small" sx={{ color: "#757575", cursor: "help" }} />
                        </Tooltip>
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& fieldset": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#424242",
                          "&.Mui-focused": {
                            color: "#1a237e",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#212121",
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& fieldset": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#424242",
                          "&.Mui-focused": {
                            color: "#1a237e",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#212121",
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      name="address"
                      multiline
                      rows={2}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& fieldset": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#424242",
                          "&.Mui-focused": {
                            color: "#1a237e",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#212121",
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                        },
                      }}
                    />
                  </Grid>

                  {/* Employment Details Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 3, borderColor: "#e0e0e0", borderWidth: "1px" }} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: "#5c6bc0",
                          width: 48,
                          height: 48,
                          boxShadow: "0 4px 8px rgba(92, 107, 192, 0.3)",
                        }}
                      >
                        <WorkIcon fontSize="large" />
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#1a237e",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        Employment Details
                        <Tooltip title="Enter staff's employment information">
                          <HelpIcon fontSize="small" sx={{ color: "#757575", cursor: "help" }} />
                        </Tooltip>
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={touched.employmentType && Boolean(errors.employmentType)}>
                      <InputLabel sx={{ color: "#424242" }}>Employment Type</InputLabel>
                      <Select
                        value={values.employmentType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="employmentType"
                        label="Employment Type"
                        startAdornment={
                          <InputAdornment position="start">
                            <WorkIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        }
                        sx={{
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        }}
                      >
                        {employmentTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.employmentType && errors.employmentType && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                          {errors.employmentType}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={touched.qualification && Boolean(errors.qualification)}>
                      <InputLabel sx={{ color: "#424242" }}>Qualification Level</InputLabel>
                      <Select
                        value={values.qualification}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="qualification"
                        label="Qualification Level"
                        startAdornment={
                          <InputAdornment position="start">
                            <WorkIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        }
                        sx={{
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        }}
                      >
                        {qualificationLevels.map((level) => (
                          <MenuItem key={level} value={level}>
                            {level}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.qualification && errors.qualification && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                          {errors.qualification}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {["Doctor", "Nurse", "Technician"].includes(values.position) && (
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.specialization && Boolean(errors.specialization)}>
                        <InputLabel sx={{ color: "#424242" }}>Specialization</InputLabel>
                        <Select
                          value={values.specialization}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="specialization"
                          label="Specialization"
                          startAdornment={
                            <InputAdornment position="start">
                              <WorkIcon sx={{ color: "#757575" }} />
                            </InputAdornment>
                          }
                          sx={{
                            borderRadius: "12px",
                            transition: "all 0.3s ease",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#bdbdbd",
                              borderWidth: "1.5px",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#757575",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1a237e",
                              borderWidth: "2px",
                            },
                          }}
                        >
                          {specializations[values.position]?.map((spec) => (
                            <MenuItem key={spec} value={spec}>
                              {spec}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.specialization && errors.specialization && (
                          <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                            {errors.specialization}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="date"
                      label="Joining Date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.joiningDate}
                      name="joiningDate"
                      error={touched.joiningDate && Boolean(errors.joiningDate)}
                      helperText={touched.joiningDate && errors.joiningDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& fieldset": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#424242",
                          "&.Mui-focused": {
                            color: "#1a237e",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#212121",
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Salary"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.salary}
                      name="salary"
                      error={touched.salary && Boolean(errors.salary)}
                      helperText={touched.salary && errors.salary}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MoneyIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& fieldset": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#424242",
                          "&.Mui-focused": {
                            color: "#1a237e",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#212121",
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Emergency Contact"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.emergencyContact}
                      name="emergencyContact"
                      error={touched.emergencyContact && Boolean(errors.emergencyContact)}
                      helperText={touched.emergencyContact && errors.emergencyContact}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmergencyIcon sx={{ color: "#757575" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "& fieldset": {
                            borderColor: "#bdbdbd",
                            borderWidth: "1.5px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#757575",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a237e",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#424242",
                          "&.Mui-focused": {
                            color: "#1a237e",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#212121",
                        },
                        "& .MuiFormHelperText-root": {
                          marginLeft: 0,
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box 
                      sx={{ 
                        p: 2, 
                        borderRadius: "12px", 
                        border: "1.5px solid #e0e0e0",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#bdbdbd",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.onDuty}
                            onChange={handleChange}
                            name="onDuty"
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#1a237e",
                                "&:hover": {
                                  backgroundColor: "rgba(26, 35, 126, 0.08)",
                                },
                                "&.Mui-disabled": {
                                  color: "rgba(26, 35, 126, 0.5)",
                                },
                                "& + .MuiSwitch-track": {
                                  backgroundColor: "#1a237e !important",
                                  opacity: 1,
                                },
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                backgroundColor: "#1a237e !important",
                                opacity: 1,
                              },
                              "& .MuiSwitch-track": {
                                backgroundColor: "#757575 !important",
                                opacity: 1,
                              },
                              "& .MuiSwitch-thumb": {
                                backgroundColor: values.onDuty ? "#1a237e" : "#f5f5f5",
                                border: "1px solid #bdbdbd",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              },
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ color: "#424242", fontWeight: 500 }}>
                              {values.onDuty ? "Currently On Duty" : "Currently Off Duty"}
                            </Typography>
                            <Chip 
                              label={values.onDuty ? "Active" : "Inactive"} 
                              size="small"
                              color={values.onDuty ? "primary" : "default"}
                              sx={{ 
                                backgroundColor: values.onDuty ? "rgba(26, 35, 126, 0.1)" : "rgba(189, 189, 189, 0.1)",
                                color: values.onDuty ? "#1a237e" : "#757575",
                                fontWeight: 500,
                                border: values.onDuty ? "1px solid rgba(26, 35, 126, 0.3)" : "1px solid rgba(189, 189, 189, 0.3)",
                              }}
                            />
                            <Tooltip title="Toggle staff's duty status">
                              <HelpIcon fontSize="small" sx={{ color: "#757575", cursor: "help" }} />
                            </Tooltip>
                          </Box>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  gap={2}
                  mt={4}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => window.location.reload()}
                    startIcon={<RefreshIcon />}
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      px: 3,
                      py: 1.2,
                      color: "#424242",
                      borderColor: "#bdbdbd",
                      backgroundColor: "rgba(245, 245, 245, 0.8)",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(224, 224, 224, 0.8)",
                        borderColor: "#9e9e9e",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      px: 3,
                      py: 1.2,
                      backgroundColor: "#1a237e",
                      color: "#ffffff",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      boxShadow: "0 4px 12px rgba(26, 35, 126, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#0d1757",
                        boxShadow: "0 6px 16px rgba(26, 35, 126, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                      "&:disabled": {
                        backgroundColor: "rgba(26, 35, 126, 0.5)",
                        color: "rgba(255, 255, 255, 0.7)",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {loading ? "Creating Staff..." : "Create New Staff"}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          
          {success && (
            <Zoom in={success}>
              <Box
                sx={{
                  position: "fixed",
                  bottom: 24,
                  right: 24,
                  backgroundColor: "#4caf50",
                  color: "white",
                  p: 2,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                }}
              >
                <CheckCircleIcon />
                <Typography>Staff created successfully!</Typography>
              </Box>
            </Zoom>
          )}
        </Paper>
      </Fade>
    </Box>
  );
};

export default Form;
