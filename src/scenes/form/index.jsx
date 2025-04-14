import React, { useContext, useState, useEffect } from "react";
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
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Badge,
} from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
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
  Info as InfoIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

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
  specialization: yup.string().when('position', {
    is: (val) => ["Doctor", "Nurse", "Technician"].includes(val),
    then: () => yup.string().required("Specialization is required for this position"),
    otherwise: () => yup.string().nullable()
  }),
});

const fieldHints = {
  name: "Enter full name as per official documents",
  email: "Enter a valid email address (e.g., john.doe@example.com)",
  phone: "Enter a valid phone number with country code",
  department: "Select the department where staff will work",
  position: "Select the staff member's role",
  shift: "Select the working shift",
  salary: "Enter annual salary in numbers only",
  joiningDate: "Select the date when staff will join",
  emergencyContact: "Enter emergency contact number",
  address: "Enter complete residential address",
  employmentType: "Select the type of employment",
  qualification: "Select highest qualification achieved",
  specialization: "Enter specialization if applicable",
};

const CustomTextField = ({ 
  name, 
  label, 
  type = "text", 
  select = false, 
  multiline = false, 
  rows = 1,
  options = [],
  startIcon,
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
  focusedField,
  setFocusedField,
  showHints,
  setShowHints,
  getFieldHint
}) => {
  return (
    <Box sx={{ position: 'relative', mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        type={type}
        label={label}
        onBlur={(e) => {
          handleBlur(e);
          setFocusedField(null);
          setTimeout(() => {
            setShowHints(prev => ({ ...prev, [name]: false }));
          }, 200);
        }}
        onFocus={() => {
          setFocusedField(name);
          setShowHints(prev => ({ ...prev, [name]: true }));
        }}
        onChange={handleChange}
        value={values[name]}
        name={name}
        select={select}
        multiline={multiline}
        rows={rows}
        error={!!touched[name] && !!errors[name]}
        helperText={touched[name] && errors[name]}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          )
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: "#bdbdbd",
              borderWidth: "1px"
            },
            "&:hover fieldset": {
              borderColor: "#757575",
              borderWidth: "1.5px"
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1a237e",
              borderWidth: "1.5px"
            }
          },
          "& .MuiInputLabel-root": {
            color: "#424242",
            fontSize: '0.9rem',
            "&.Mui-focused": {
              color: "#1a237e"
            }
          },
          "& .MuiInputBase-input": {
            color: "#212121",
            fontSize: '0.9rem',
            py: 1.2
          },
          "& .MuiFormHelperText-root": {
            fontSize: '0.75rem'
          },
          transition: "all 0.3s ease",
          transform: focusedField === name ? "translateY(-2px)" : "none",
          boxShadow: focusedField === name ? "0 4px 12px rgba(26, 35, 126, 0.15)" : "none"
        }}
      >
        {select && options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {showHints[name] && (
        <Fade in={true}>
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: -24,
              left: 0,
              color: "#666",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5
            }}
          >
            <InfoIcon sx={{ fontSize: "0.9rem" }} />
            {getFieldHint(name)}
          </Typography>
        </Fade>
      )}
    </Box>
  );
};

const SectionHeader = ({ icon, title, subtitle }) => (
  <Box sx={{ 
    display: "flex", 
    alignItems: "center", 
    gap: 1, 
    mb: 3,
    backgroundColor: 'rgba(26, 35, 126, 0.04)',
    p: 2,
    borderRadius: '8px',
    borderLeft: '4px solid #1a237e'
  }}>
    <Avatar 
      sx={{ 
        bgcolor: "#1a237e",
        width: 40,
        height: 40,
        boxShadow: "0 4px 8px rgba(26, 35, 126, 0.3)"
      }}
    >
      {icon}
    </Avatar>
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: "#1a237e",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

const BasicInfoSection = ({ 
  values, 
  handleBlur, 
  handleChange, 
  touched, 
  errors,
  focusedField,
  setFocusedField,
  showHints,
  setShowHints,
  getFieldHint
}) => {
  return (
    <Box>
      <SectionHeader 
        icon={<PersonIcon />} 
        title="Basic Information" 
        subtitle="Enter staff's basic details"
      />
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="name"
            label="Full Name"
            startIcon={<PersonIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="department"
            label="Department"
            select={true}
            options={departments}
            startIcon={<WorkIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="position"
            label="Position"
            select={true}
            options={positions}
            startIcon={<WorkIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="shift"
            label="Shift"
            select={true}
            options={shifts}
            startIcon={<CalendarIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch 
                checked={values.onDuty} 
                onChange={handleChange} 
                name="onDuty"
                color="primary"
              />
            }
            label="Currently on duty"
            sx={{ 
              mt: 1,
              '& .MuiFormControlLabel-label': {
                fontSize: '0.9rem',
                color: '#424242'
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ContactInfoSection = ({ 
  values, 
  handleBlur, 
  handleChange, 
  touched, 
  errors,
  focusedField,
  setFocusedField,
  showHints,
  setShowHints,
  getFieldHint
}) => {
  return (
    <Box>
      <SectionHeader 
        icon={<EmailIcon />} 
        title="Contact Information" 
        subtitle="Enter staff's contact details"
      />
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="email"
            label="Email Address"
            type="email"
            startIcon={<EmailIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="phone"
            label="Phone Number"
            type="tel"
            startIcon={<PhoneIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="emergencyContact"
            label="Emergency Contact"
            type="tel"
            startIcon={<EmergencyIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12}>
          <CustomTextField
            name="address"
            label="Address"
            multiline={true}
            rows={2}
            startIcon={<LocationIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const EmploymentInfoSection = ({ 
  values, 
  handleBlur, 
  handleChange, 
  touched, 
  errors,
  focusedField,
  setFocusedField,
  showHints,
  setShowHints,
  getFieldHint
}) => {
  return (
    <Box>
      <SectionHeader 
        icon={<WorkIcon />} 
        title="Employment Information" 
        subtitle="Enter staff's employment details"
      />
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="employmentType"
            label="Employment Type"
            select={true}
            options={employmentTypes}
            startIcon={<WorkIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="qualification"
            label="Qualification"
            select={true}
            options={qualificationLevels}
            startIcon={<WorkIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="joiningDate"
            label="Joining Date"
            type="date"
            startIcon={<CalendarIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="salary"
            label="Salary"
            type="number"
            startIcon={<MoneyIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            showHints={showHints}
            setShowHints={setShowHints}
            getFieldHint={getFieldHint}
          />
        </Grid>
        
        {["Doctor", "Nurse", "Technician"].includes(values.position) && (
          <Grid item xs={12}>
            <CustomTextField
              name="specialization"
              label="Specialization"
              select={true}
              options={specializations[values.position] || []}
              startIcon={<WorkIcon sx={{ color: "#757575", fontSize: '1.2rem' }} />}
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              touched={touched}
              errors={errors}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              showHints={showHints}
              setShowHints={setShowHints}
              getFieldHint={getFieldHint}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const isBasicInfoComplete = (values, errors) => {
  const requiredFields = ['name', 'department', 'shift', 'position'];
  return requiredFields.every(field => values[field]) && !requiredFields.some(field => errors[field]);
};

const isContactInfoComplete = (values, errors) => {
  const requiredFields = ['email', 'phone', 'address', 'emergencyContact'];
  return requiredFields.every(field => values[field]) && !requiredFields.some(field => errors[field]);
};

const isEmploymentInfoComplete = (values, errors) => {
  const requiredFields = ['employmentType', 'qualification', 'joiningDate', 'salary'];
  if (["Doctor", "Nurse", "Technician"].includes(values.position)) {
    requiredFields.push('specialization');
  }
  return requiredFields.every(field => values[field]) && !requiredFields.some(field => errors[field]);
};

const FormNavigation = ({ activeStep, setActiveStep, totalSteps, isValid, isSubmitting, values, errors }) => {
  const canProceedToNext = () => {
    switch (activeStep) {
      case 0:
        return isBasicInfoComplete(values, errors);
      case 1:
        return isContactInfoComplete(values, errors);
      case 2:
        return isEmploymentInfoComplete(values, errors);
      default:
        return false;
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      mt: 4,
      pt: 2,
      borderTop: '1px solid rgba(0,0,0,0.1)'
    }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
        disabled={activeStep === 0}
        startIcon={<ArrowBackIcon />}
        sx={{
          borderRadius: "8px",
          textTransform: "none",
          px: 3,
          py: 1,
          "&:hover": {
            backgroundColor: "rgba(26, 35, 126, 0.04)"
          }
        }}
      >
        Previous
      </Button>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<CloseIcon />}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            py: 1,
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.04)"
            }
          }}
        >
          Cancel
        </Button>
        
        {activeStep === totalSteps - 1 ? (
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <CheckIcon />}
            sx={{
              backgroundColor: "#1a237e",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#3949ab"
              },
              "&:disabled": {
                backgroundColor: "rgba(0, 0, 0, 0.12)"
              }
            }}
          >
            {isSubmitting ? "Creating..." : "Create Staff"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => setActiveStep(prev => Math.min(totalSteps - 1, prev + 1))}
            disabled={!canProceedToNext()}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#1a237e",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#3949ab"
              },
              "&:disabled": {
                backgroundColor: "rgba(0, 0, 0, 0.12)"
              }
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

const Form = () => {
  const { setstaffData } = useContext(ToggledContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const [showHints, setShowHints] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const steps = ['Basic Info', 'Contact', 'Employment'];
  const totalSteps = steps.length;

  const calculateProgress = (values) => {
    const totalFields = Object.keys(values).length;
    const filledFields = Object.keys(values).filter(key => values[key] !== "" && values[key] !== null).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  const handleFormSubmit = async (values, actions) => {
    try {
      setLoading(true);
      setError(null);
      
      const formattedData = {
        ...values,
        status: values.onDuty,
        salary: Number(values.salary),
      };

      const response = await fetch(
        "https://dashboard-gb84.onrender.com/staffDashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create new staff");
      }

      setstaffData((prev) => [...prev, responseData]);
      
      actions.resetForm();
      setActiveStep(0);
      setFormProgress(0);
      setSuccess(true);
      setShowConfetti(true);
      setTimeout(() => {
        setSuccess(false);
        setShowConfetti(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Something went wrong while creating staff.");
    } finally {
      setLoading(false);
    }
  };

  const getFieldHint = (fieldName) => {
    return fieldHints[fieldName] || "";
  };

  return (
    <Box>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#1a237e', '#3949ab', '#5c6bc0', '#7986cb', '#9fa8da']}
        />
      )}
      
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <Box sx={{ width: '100%', mb: 3 }}>
          <Typography variant="h5" sx={{ 
            color: '#1a237e', 
            fontWeight: 600,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <PersonIcon /> Create New Staff Profile
          </Typography>
          <Box sx={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: 'rgba(0,0,0,0.08)',
            borderRadius: '2px',
            mt: 2,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${formProgress}%`,
              backgroundColor: '#1a237e',
              borderRadius: '2px',
              transition: 'width 0.3s ease'
            }} />
          </Box>
          <Typography variant="body2" sx={{ 
            color: '#757575',
            mt: 0.5,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
            <InfoIcon fontSize="small" />
            {formProgress < 100 ? `${formProgress}% complete - Fill in the remaining fields` : 'All required fields completed!'}
          </Typography>
        </Box>

        <Fade in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              position: "relative",
              overflow: "hidden",
              width: "100%",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #1a237e, #3949ab, #5c6bc0)",
              },
            }}
          >
            <Stepper 
              activeStep={activeStep} 
              alternativeLabel
              sx={{ 
                mb: 4,
                '& .MuiStepLabel-root .Mui-active': {
                  color: '#1a237e',
                },
                '& .MuiStepLabel-root .Mui-completed': {
                  color: '#4caf50',
                },
                '& .MuiStepConnector-line': {
                  borderColor: 'rgba(0,0,0,0.1)',
                },
                '& .MuiStepConnector-active': {
                  '& .MuiStepConnector-line': {
                    borderColor: '#1a237e',
                  },
                },
                '& .MuiStepConnector-completed': {
                  '& .MuiStepConnector-line': {
                    borderColor: '#4caf50',
                  },
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

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
                isValid,
                isSubmitting,
                actions
              }) => {
                useEffect(() => {
                  setFormProgress(calculateProgress(values));
                }, [values]);

                return (
                  <form onSubmit={handleSubmit}>
                    {activeStep === 0 && (
                      <BasicInfoSection 
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        showHints={showHints}
                        setShowHints={setShowHints}
                        getFieldHint={getFieldHint}
                      />
                    )}
                    
                    {activeStep === 1 && (
                      <ContactInfoSection 
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        showHints={showHints}
                        setShowHints={setShowHints}
                        getFieldHint={getFieldHint}
                      />
                    )}
                    
                    {activeStep === 2 && (
                      <EmploymentInfoSection 
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                        showHints={showHints}
                        setShowHints={setShowHints}
                        getFieldHint={getFieldHint}
                      />
                    )}

                    <FormNavigation 
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                      totalSteps={totalSteps}
                      isValid={isValid}
                      isSubmitting={isSubmitting}
                      values={values}
                      errors={errors}
                    />

                    {error && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: "#ffebee",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: 1
                        }}
                      >
                        <CancelIcon color="error" />
                        <Typography variant="body2" color="error">
                          {error}
                        </Typography>
                      </Box>
                    )}
                  </form>
                );
              }}
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
                    p: 1.5,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    fontSize: '0.9rem'
                  }}
                >
                  <CheckCircleIcon fontSize="small" />
                  <Typography variant="body2">Staff created successfully!</Typography>
                </Box>
              </Zoom>
            )}
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default Form;
