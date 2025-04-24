import React, { useContext, useEffect } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { BarChart, PieChart } from '../../components';
import StaffCard from '../../components/StaffCard.jsx';
import { ToggledContext } from "../../App";

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

const StaffBoard = ({ colors = {} }) => {
  const { staffData = [], setStaffData } = useContext(ToggledContext);

  const fetchStaffData = async () => {
    try {
      const response = await fetch('https://dashboard-gb84.onrender.com/staffDashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch staff data');
      }
      const data = await response.json();
      setStaffData(data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      // Initialize with empty array on error
      setStaffData([]);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []); // Fetch data on component mount

  // If staffData is undefined or null, show loading
  if (!staffData) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Count staff per department for bar chart
  const deptCount = staffData.reduce((acc, staff) => {
    acc[staff.department] = (acc[staff.department] || 0) + 1;
    return acc;
  }, {});

  // Count on-duty status for pie chart
  const dutyStatusCount = staffData.reduce(
    (acc, staff) => {
      const key = staff.onDuty ? "On Duty" : "Off Duty";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    { "On Duty": 0, "Off Duty": 0 }
  );

  const barData = Object.entries(deptCount).map(([dept, count]) => ({
    department: dept,
    count,
  }));

  const pieData = Object.entries(dutyStatusCount).map(([status, count]) => ({
    id: status,
    label: status,
    value: count,
  }));

  // Calculate total stats
  const totalStaff = staffData.length;
  const onDutyStaff = dutyStatusCount["On Duty"] || 0;
  const departmentCount = Object.keys(deptCount).length;
  const medicalStaff = staffData.filter(staff => staff.role === 'doctor' || staff.role === 'nurse').length;

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h3" fontWeight="bold" color="#111" mb={1}>
          Staff Dashboard
        </Typography>
        <Typography color="#666">
          Monitor staff distribution and status
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Staff"
            value={totalStaff}
            subtitle="Total employees"
            icon={<Box component="span" sx={{ color: colors.greenAccent?.[500] || '#4CAF50', fontSize: '24px' }}>👥</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="On Duty"
            value={onDutyStaff}
            subtitle="Currently working"
            icon={<Box component="span" sx={{ color: colors.greenAccent?.[500] || '#4CAF50', fontSize: '24px' }}>💼</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Departments"
            value={departmentCount}
            subtitle="Active departments"
            icon={<Box component="span" sx={{ color: colors.greenAccent?.[500] || '#4CAF50', fontSize: '24px' }}>🏥</Box>}
          />
        </Grid>
      </Grid>

      {/* Charts */}
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
              Staff per Department
            </Typography>
            <Box height="320px">
              <BarChart
                data={barData}
                indexBy="department"
                keys={['count']}
                xAxisLabel="Department"
                yAxisLabel="Number of Staff"
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
              Duty Status Distribution
            </Typography>
            <Box height="320px">
              <PieChart data={pieData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Staff Cards */}
      <Paper
        sx={{
          p: 3,
          borderRadius: '12px',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="#111" mb={3}>
          Staff Records
        </Typography>
        <Grid container spacing={2}>
          {staffData.map((staff) => (
            <Grid item xs={12} sm={6} md={4} key={staff.id}>
              <StaffCard staff={staff} colors={colors} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default StaffBoard;
