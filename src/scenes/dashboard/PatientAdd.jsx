import React, { useState, useContext } from 'react';
import {
  TextField,
  Dropdown,
  DatePicker,
  Toggle,
  PrimaryButton,
  Stack,
  initializeIcons,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { createPatient } from '../../api/services/patientService';
import { ToggledContext } from "../../App";

initializeIcons();

const genderOptions = [
  { key: 'Male', text: 'Male' },
  { key: 'Female', text: 'Female' },
  { key: 'Other', text: 'Other' },
];

const bloodGroupOptions = [
  { key: 'A+', text: 'A+' },
  { key: 'A-', text: 'A-' },
  { key: 'B+', text: 'B+' },
  { key: 'B-', text: 'B-' },
  { key: 'AB+', text: 'AB+' },
  { key: 'AB-', text: 'AB-' },
  { key: 'O+', text: 'O+' },
  { key: 'O-', text: 'O-' },
];

const formStyles = {
  field: {
    wrapper: {
      display: 'flex',
      marginBottom: '16px',
      alignItems: 'flex-start',
    },
    label: {
      width: '150px',
      fontSize: '14px',
      color: '#666',
      fontWeight: '500',
      marginRight: '16px',
      marginTop: '8px',
      textAlign: 'left',
    },
    input: {
      flex: 1,
      backgroundColor: '#f8f9fa',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      padding: '8px 12px',
      fontSize: '14px',
      color: '#333',
      minHeight: '36px',
      ':hover': {
        borderColor: '#0078D4',
      },
      ':focus': {
        borderColor: '#0078D4',
        outline: 'none',
      },
    },
  },
};

const containerStyles = {
  root: {
    maxWidth: '800px',
    marginLeft: '200px',
    padding: '30px',
    background: '#fff',
    borderRadius: '10px',
  },
};

const formSectionStyles = {
  root: {
    marginBottom: '32px',
  },
};

const textFieldStyles = {
  root: { width: '100%' },
  fieldGroup: {
    ...formStyles.field.input,
    height: '36px',
    selectors: {
      ':hover': {
        borderColor: '#0078D4',
      },
    },
  },
  field: {
    fontSize: '14px',
  },
};

const multilineTextFieldStyles = {
  ...textFieldStyles,
  fieldGroup: {
    ...formStyles.field.input,
    height: 'auto',
    minHeight: '80px',
    selectors: {
      ':hover': {
        borderColor: '#0078D4',
      },
    },
  },
};

const dropdownStyles = {
  root: { width: '100%' },
  title: {
    ...formStyles.field.input,
    height: '36px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
  },
  dropdown: {
    width: '100%',
  },
};

const datePickerStyles = {
  root: { 
    width: '36px',
    height: '36px',
  },
  textField: {
    root: { 
      width: '36px',
      height: '36px',
      overflow: 'hidden',
    },
    wrapper: { border: 'none' },
    fieldGroup: { 
      display: 'none',
      border: 'none'
    }
  },
  wrapper: {
    width: '36px',
    height: '36px',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: '0',
    top: '0',
    height: '36px',
    width: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    color: '#666',
    ':hover': {
      color: '#0078D4',
    }
  },
  callout: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '4px',
  }
};

const FormField = ({ label, required, children }) => (
  <div style={formStyles.field.wrapper}>
    <label style={formStyles.field.label}>
      {label}{required && <span style={{ color: '#d83b01' }}> *</span>}
    </label>
    <div style={{ flex: 1 }}>
      {children}
    </div>
  </div>
);

const PatientAddFluent = () => {
  const { setPatientData } = useContext(ToggledContext);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    allergies: '',
    chronicConditions: '',
    diagnosis: '',
    lastVisit: null,
    nextAppointment: null,
    status: true,
    email: '',
    phone: '',
  });

  const handleChange = (field, value) => {
    setNewPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!newPatient.name.trim()) {
        setSubmitStatus({ type: MessageBarType.error, message: 'Name is required' });
        return;
      }
      if (!newPatient.age) {
        setSubmitStatus({ type: MessageBarType.error, message: 'Age is required' });
        return;
      }

      // Format dates to ISO string if they exist
      const formattedPatient = {
        ...newPatient,
        lastVisit: newPatient.lastVisit ? newPatient.lastVisit.toISOString().split('T')[0] : null,
        nextAppointment: newPatient.nextAppointment ? newPatient.nextAppointment.toISOString().split('T')[0] : null,
        age: Number(newPatient.age),
      };

      const createdPatient = await createPatient(formattedPatient);
      
      // Update the patient list in the context
      setPatientData(prevData => [...prevData, createdPatient]);
      
      // Show success message
      setSubmitStatus({ type: MessageBarType.success, message: 'Patient added successfully!' });
      
      // Reset form
      setNewPatient({
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        allergies: '',
        chronicConditions: '',
        diagnosis: '',
        lastVisit: null,
        nextAppointment: null,
        status: true,
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error creating patient:', error);
      setSubmitStatus({ type: MessageBarType.error, message: 'Failed to add patient. Please try again.' });
    }
  };

  return (
    <Stack styles={containerStyles}>
      <h1 style={{ 
        fontSize: '34px', 
        fontWeight: '600', 
        color: '#333',
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Add New Patient
      </h1>

      {submitStatus && (
        <MessageBar
          messageBarType={submitStatus.type}
          onDismiss={() => setSubmitStatus(null)}
          style={{ marginBottom: '20px' }}
        >
          {submitStatus.message}
        </MessageBar>
      )}

      <Stack styles={formSectionStyles}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '12px',
          color: '#333'
        }}>
          Personal Information
        </h2>

        <FormField label="Full Name" required>
          <TextField
            value={newPatient.name}
            onChange={(_, v) => handleChange('name', v)}
            styles={textFieldStyles}
          />
        </FormField>

        <FormField label="Age" required>
          <TextField
            type="number"
            value={newPatient.age}
            onChange={(_, v) => handleChange('age', v)}
            styles={textFieldStyles}
          />
        </FormField>

        <FormField label="Email">
          <TextField
            type="email"
            value={newPatient.email}
            onChange={(_, v) => handleChange('email', v)}
            styles={textFieldStyles}
          />
        </FormField>

        <FormField label="Phone">
          <TextField
            value={newPatient.phone}
            onChange={(_, v) => handleChange('phone', v)}
            styles={textFieldStyles}
          />
        </FormField>

        <FormField label="Gender">
          <Dropdown
            options={genderOptions}
            selectedKey={newPatient.gender}
            onChange={(_, option) => handleChange('gender', option && option.key)}
            styles={dropdownStyles}
          />
        </FormField>

        <FormField label="Blood Group">
          <Dropdown
            options={bloodGroupOptions}
            selectedKey={newPatient.bloodGroup}
            onChange={(_, option) => handleChange('bloodGroup', option && option.key)}
            styles={dropdownStyles}
          />
        </FormField>
      </Stack>

      <Stack styles={formSectionStyles}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Medical Information
        </h2>

        <FormField label="Allergies">
          <TextField
            multiline
            rows={3}
            value={newPatient.allergies}
            onChange={(_, v) => handleChange('allergies', v)}
            styles={multilineTextFieldStyles}
          />
        </FormField>

        <FormField label="Chronic Conditions">
          <TextField
            multiline
            rows={3}
            value={newPatient.chronicConditions}
            onChange={(_, v) => handleChange('chronicConditions', v)}
            styles={multilineTextFieldStyles}
          />
        </FormField>

        <FormField label="Diagnosis">
          <TextField
            multiline
            rows={3}
            value={newPatient.diagnosis}
            onChange={(_, v) => handleChange('diagnosis', v)}
            styles={multilineTextFieldStyles}
          />  
        </FormField>

        <FormField label="Last Visit">
          {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <DatePicker
              value={newPatient.lastVisit}
              onSelectDate={date => handleChange('lastVisit', date)}
              styles={datePickerStyles}
              placeholder=""
            />
            {newPatient.lastVisit && (
              <span style={{ marginLeft: '8px', fontSize: '14px', color: '#333' }}>
                {newPatient.lastVisit.toLocaleDateString()}
              </span>
            )}
          {/* </div> */}
        </FormField>

        <FormField label="Next Appointment">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DatePicker
              value={newPatient.nextAppointment}
              onSelectDate={date => handleChange('nextAppointment', date)}
              styles={datePickerStyles}
              placeholder=""
            />
            {newPatient.nextAppointment && (
              <span style={{ marginLeft: '8px', fontSize: '14px', color: '#333' }}>
                {newPatient.nextAppointment.toLocaleDateString()}
              </span>
            )}
          </div>
        </FormField>

        <FormField label="Status">
          <Toggle
            checked={newPatient.status}
            onChange={(_, checked) => handleChange('status', checked)}
            onText="Active"
            offText="Inactive"
          />
        </FormField>
      </Stack>

      <Stack horizontal horizontalAlign="end" style={{ marginTop: '32px' }}>
        <PrimaryButton 
          text="Add Patient" 
          onClick={handleSubmit}
          styles={{
            root: {
              padding: '0 24px',
              height: '36px',
              borderRadius: '4px',
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default PatientAddFluent;
