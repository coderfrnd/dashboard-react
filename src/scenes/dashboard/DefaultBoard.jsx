import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { BarChart, PieChart, LineChart } from '../../components';
import Invoices from '../invoices';
import EmailIcon from '@mui/icons-material/Email';
import PersonOffIcon from '@mui/icons-material/PersonOff';

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

const MetricCard = ({ title, value, percentage, icon }) => (
  <Paper
    sx={{
      p: 2,
      borderRadius: '8px',
      backgroundColor: '#87CEEB',
      height: '140px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}
  >
    <Box display="flex" alignItems="center" mb={1}>
      {icon}
    </Box>
    <Typography fontSize="16px" color="#111">
      {title}
    </Typography>
    <Typography variant="h4" fontWeight="bold" color="#111" mt={1}>
      {value}
    </Typography>
    <Box 
      sx={{ 
        position: 'absolute',
        right: '16px',
        bottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <Box component="span" sx={{ fontSize: '20px' }}>⭕</Box>
      <Typography color="#111">{percentage}%</Typography>
    </Box>
  </Paper>
);

const TransactionCard = ({ email, amount, status }) => (
  <Box 
    sx={{ 
      p: 2,
      backgroundColor: '#87CEEB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 1,
      borderRadius: '4px'
    }}
  >
    <Typography>{email}</Typography>
    <Box 
      sx={{ 
        backgroundColor: 
          status === 'Overdue' ? '#ff4444' : 
          status === 'Paid' ? '#4CAF50' :
          status === 'Unpaid' ? '#ffeb3b' : '#87CEEB',
        px: 2,
        py: 0.5,
        borderRadius: '4px',
        color: status === 'Unpaid' ? '#000' : '#fff'
      }}
    >
      ${amount}
    </Box>
  </Box>
);

const DefaultBoard = ({ colors, patientData, staffData, financialData }) => {
  // Calculate key metrics
  const totalPatients = patientData?.length || 0;
  const activePatients = patientData?.filter(p => p.status).length || 0;
  const totalStaff = staffData?.length || 0;
  const onDutyStaff = staffData?.filter(s => s.onDuty).length || 0;

  // Calculate financial metrics
  const totalRevenue = financialData?.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0) || 0;
  const pendingPayments = financialData?.filter(f => f.paymentStatus === 'Pending').length || 0;
  const completedPayments = financialData?.filter(f => f.paymentStatus === 'Completed').length || 0;

  // Prepare chart data
  const barData = [
    { status: 'Total Patients', count: totalPatients },
    { status: 'Active Patients', count: activePatients },
    { status: 'Total Staff', count: totalStaff },
    { status: 'On Duty Staff', count: onDutyStaff },
  ];

  const pieData = [
    { id: 'Completed', label: 'Completed', value: completedPayments },
    { id: 'Pending', label: 'Pending', value: pendingPayments },
  ];

  // Sample data for the line chart
  const visitData = [
    { x: '1998-02', y: 1 },
    { x: '2001-02', y: 1 },
    { x: '2002-02', y: 1 },
    { x: '2024-04', y: 2 },
    { x: '2024-05', y: 3 },
    { x: '2024-09', y: 2 },
    { x: '2024-10', y: 2 },
    { x: '2024-12', y: 1 },
    { x: '2025-01', y: 3 },
    { x: '2025-02', y: 6 },
    { x: '2025-02', y: 2 },
    { x: '2222-02', y: 1 },
    { x: '5292-02', y: 1 },
  ];

  // Sample transactions data
  const transactions = [
    { email: 'chelsea07@hotmail.com', amount: '5582', status: 'Overdue' },
    { email: 'heatheracosta@wiggins.com', amount: '3480', status: 'Unpaid' },
    { email: 'wkidd@campbell-jackson.com', amount: '8967', status: 'Paid' },
    { email: 'kevin95@yahoo.com', amount: '2245', status: 'Unpaid' },
    { email: 'edwardhaynes@hotmail.com', amount: '3039', status: 'Paid' },
    { email: 'shawnwade@shah.com', amount: '1769', status: 'Overdue' },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h3" fontWeight="bold" color="#111" mb={1}>
          Hospital Overview
        </Typography>
        <Typography color="#666">
          Monitor key metrics across all departments
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Patients"
            value={totalPatients}
            subtitle={`${activePatients} active patients`}
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>🏥</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Staff Members"
            value={totalStaff}
            subtitle={`${onDutyStaff} currently on duty`}
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>👥</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            subtitle={`${pendingPayments} pending payments`}
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>💰</Box>}
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
              Hospital Statistics
            </Typography>
            <Box height="320px">
              <BarChart
                data={barData}
                indexBy="status"
                keys={['count']}
                xAxisLabel="Category"
                yAxisLabel="Count"
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
              Payment Status Overview
            </Typography>
            <Box height="320px">
              <PieChart data={pieData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Paper
        sx={{
          borderRadius: '12px',
          backgroundColor: 'white',
          overflow: 'hidden'
        }}
      >
        <Box p={3} borderBottom="1px solid #eee">
          <Typography variant="h6" fontWeight="bold" color="#111">
            Recent Transactions
          </Typography>
        </Box>
        <Invoices 
          financialData={financialData?.slice(0, 5)} 
          header="" 
        />
      </Paper>

      {/* Top Metrics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Total Appointments"
            value="16"
            percentage="70"
            icon={<EmailIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Inactive Patients"
            value="9"
            percentage="35.0"
            icon={<PersonOffIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Recent Transactions */}
          <Box sx={{ height: '140px', overflow: 'auto' }}>
            {transactions.map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Patient Visit Trends */}
      <Paper
        sx={{
          p: 2,
          borderRadius: '8px',
          backgroundColor: '#87CEEB',
          mb: 3
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6" color="#111" fontWeight="bold">
              Patient Visit Trends
            </Typography>
            <Typography variant="body2" color="#555">
              Monthly Overview
            </Typography>
          </Box>
          <Box component="span" sx={{ fontSize: '24px' }}>⬇</Box>
        </Box>
        <Box height="300px">
          <LineChart
            data={visitData}
            xAxisLabel="Month"
            yAxisLabel="Visits"
            colors={['#ff6b6b']}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DefaultBoard; 