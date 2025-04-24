import React, { useContext } from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import { BarChart, PieChart } from '../../components';
import { FAQ } from '..';
import Invoices from '../invoices';
import { motion } from 'framer-motion';
import { ToggledContext } from "../../App";

const StatCard = ({ title, value, subtitle, icon }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: '16px',
          backgroundColor: 'white',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[8],
          },
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography 
              color="#666" 
              fontSize="0.875rem" 
              mb={1}
              sx={{ 
                fontWeight: 500,
                letterSpacing: '0.5px'
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              color="#111"
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: '12px',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography 
          color="#888" 
          fontSize="0.875rem"
          sx={{ 
            fontWeight: 400,
            letterSpacing: '0.3px'
          }}
        >
          {subtitle}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const FinancialBoard = ({ colors }) => {
  const theme = useTheme();
  const { financialData = [] } = useContext(ToggledContext);
  
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
    <Box 
      sx={{ 
        p: 3, 
        backgroundColor: '#f8f9fa', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box mb={4}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            color="#111" 
            mb={1}
            sx={{
              background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Financial Dashboard
          </Typography>
          <Typography 
            color="#666"
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 400,
              letterSpacing: '0.5px'
            }}
          >
            Track and manage your financial metrics
          </Typography>
        </Box>
      </motion.div>

      {/* Stats Overview */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Claims"
            value={totalClaims}
            subtitle="All claims this period"
            icon={<Box component="span" sx={{ color: theme.palette.primary.main, fontSize: '28px' }}>📊</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Pending Payments"
            value={pendingPayments}
            subtitle="Awaiting processing"
            icon={<Box component="span" sx={{ color: theme.palette.warning.main, fontSize: '28px' }}>⏳</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Amount"
            value={`$${totalAmount.toLocaleString()}`}
            subtitle="Total value of claims"
            icon={<Box component="span" sx={{ color: theme.palette.success.main, fontSize: '28px' }}>💰</Box>}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: '16px',
                backgroundColor: 'white',
                height: '400px',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                color="#111" 
                mb={3}
                sx={{
                  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
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
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: '16px',
                backgroundColor: '#1a1a1a',
                height: '400px',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8],
                },
                background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
              }}
            >
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                color="white" 
                mb={3}
                sx={{
                  background: 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Payment Status Distribution
              </Typography>
              <Box height="320px">
                <PieChart data={pieData} />
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Financial List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: '16px',
            backgroundColor: 'white',
            overflow: 'hidden',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <Box 
            p={3} 
            sx={{
              background: 'linear-gradient(145deg, #1a237e 0%, #0d47a1 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box>
              <Typography 
                variant="h6" 
                fontWeight="bold"
                sx={{
                  fontSize: '1.25rem',
                  letterSpacing: '0.5px',
                  marginBottom: '4px',
                }}
              >
                Patient Financial Data
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8,
                  fontSize: '0.875rem',
                }}
              >
                Detailed overview of all financial transactions
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography sx={{ fontSize: '24px' }}>📊</Typography>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Invoices financialData={financialData} header="" />
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default FinancialBoard;
