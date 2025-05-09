import React, { useState, useContext } from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import PatientEdit from './PatientEdit';
import PatientTable from '../../components/PatientTable';
import { ToggledContext } from "../../App";
import { tokens } from "../../theme";
import { deletePatient } from '../../api/services/patientService';

const StatCard = ({ title, value, subtitle, icon }) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: '12px',
      backgroundColor: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography color="#666" fontSize="0.875rem" mb={1}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="#111">
          {value}
        </Typography>
      </Box>
      {icon}
    </Box>
    <Typography color="#888" fontSize="0.875rem">
      {subtitle}
    </Typography>
  </Paper>
);

const PatientBoard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { patientData, setPatientData } = useContext(ToggledContext);

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setEditModalOpen(true);
  };

  const handleDeleteClick = async (patient) => {
    try {
      await deletePatient(patient.id);
      setPatientData(prevData => prevData.filter(p => p.id !== patient.id));
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient. Please try again.');
    }
  };

  const handleEditSuccess = (updatedPatient) => {
    setPatientData(prevData => 
      prevData.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    );
  };

  const statusCount = patientData.reduce(
    (acc, patient) => {
      const key = patient.status ? "Active" : "Inactive";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    { Active: 0, Inactive: 0 }
  );

  const bloodGrp = patientData.reduce((acc, ele) => {
    const grp = ele.bloodGroup;
    if (acc[grp]) {
      acc[grp]++;
    } else acc[grp] = 1;
    return acc;
  }, {});

  const pieData = Object.entries(bloodGrp).map(([status, count]) => ({
    id: status,
    label: status,
    value: count,
  }));

  const barData = [
    { status: "Active", count: statusCount["Active"] },
    { status: "Inactive", count: statusCount["Inactive"] },
  ];

  const totalPatients = Object.values(statusCount).reduce((a, b) => a + b, 0);
  const activePatients = statusCount["Active"] || 0;
  const bloodGroupCount = Object.keys(bloodGrp).length;

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h3" fontWeight="bold" color="#111" mb={1}>
          Patient Dashboard
        </Typography>
        <Typography color="#666">
          Monitor and manage patient statistics
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Patients"
            value={totalPatients}
            subtitle="Registered patients"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>👥</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Patients"
            value={activePatients}
            subtitle="Currently active"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>✅</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Blood Groups"
            value={bloodGroupCount}
            subtitle="Different blood types"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>🩸</Box>}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '12px',
              backgroundColor: 'white',
              height: '400px'
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="#111" mb={3}>
              Patient Status Distribution
            </Typography>
            <Box height="320px">
              <BarChart
                data={barData}
                indexBy="status"
                keys={['count']}
                xAxisLabel="Status"
                yAxisLabel="Number of Patients"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '12px',
              backgroundColor: '#1a1a1a',
              height: '400px'
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="white" mb={3}>
              Blood Group Distribution
            </Typography>
            <Box height="320px">
              <PieChart data={pieData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <PatientTable 
        patientData={patientData}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <PatientEdit
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPatient(null);
        }}
        onSuccess={handleEditSuccess}
        patient={selectedPatient}
      />
    </Box>
  );
};

export default PatientBoard;
