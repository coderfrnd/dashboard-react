import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { BarChart, PieChart } from '../../components';
import { FAQ } from '..';
import Invoices from '../invoices';

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

const FinancialBoard = ({ colors, financialData }) => {
  // Count claims per status for bar chart
  const statusCount = financialData.reduce((acc, claim) => {
    acc[claim.claimStatus] = (acc[claim.claimStatus] || 0) + 1;
    return acc;
  }, {});

  // Count payment status for pie chart
  const paymentStatusCount = financialData.reduce(
    (acc, claim) => {
      acc[claim.paymentStatus] = (acc[claim.paymentStatus] || 0) + 1;
      return acc;
    },
    { Paid: 0, Pending: 0, Rejected: 0 }
  );

  const barData = Object.entries(statusCount).map(([status, count]) => ({
    status,
    count,
  }));

  const pieData = Object.entries(paymentStatusCount).map(([status, count]) => ({
    id: status,
    label: status,
    value: count,
  }));

  // Calculate total claims and pending payments
  const totalClaims = Object.values(statusCount).reduce((a, b) => a + b, 0);
  const pendingPayments = paymentStatusCount['Pending'] || 0;
  const totalAmount = financialData.reduce((sum, claim) => sum + (parseFloat(claim.amount) || 0), 0);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h3" fontWeight="bold" color="#111" mb={1}>
          Financial Dashboard
        </Typography>
        <Typography color="#666">
          Track and manage your financial metrics
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Claims"
            value={totalClaims}
            subtitle="All claims this period"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>📊</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Pending Payments"
            value={pendingPayments}
            subtitle="Awaiting processing"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>⏳</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Amount"
            value={`$${totalAmount.toLocaleString()}`}
            subtitle="Total value of claims"
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
              Claims Per Status
            </Typography>
            <Box height="320px">
              <BarChart
                data={barData}
                indexBy="status"
                keys={['count']}
                xAxisLabel="Status"
                yAxisLabel="Number of Claims"
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
              Payment Status Distribution
            </Typography>
            <Box height="320px">
              <PieChart data={pieData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Financial List */}
      <Paper
        sx={{
          borderRadius: '12px',
          backgroundColor: 'white',
          overflow: 'hidden'
        }}
      >
        <Box p={3} borderBottom="1px solid #eee">
          <Typography variant="h6" fontWeight="bold" color="#111">
            Patient Financial Data
          </Typography>
        </Box>
        <Invoices financialData={financialData} header="" />
      </Paper>
    </Box>
  );
};

export default FinancialBoard;
