import React from "react";
import { Box, Typography, Paper, Grid, IconButton } from "@mui/material";
import { Email, PersonAdd, DownloadOutlined } from "@mui/icons-material";
import { LineChart, StatBox } from "../../components";

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

const TransactionCard = ({ email, amount, status }) => (
  <Box 
    sx={{ 
      p: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 1,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}
  >
    <Box>
      <Typography color="#111" variant="subtitle1">
        {email}
      </Typography>
    </Box>
    <Box 
      sx={{ 
        backgroundColor: 
          status === "Overdue" ? "#ff4444" :
          status === "Paid" ? "#4CAF50" :
          "#ffeb3b",
        px: 2,
        py: 0.5,
        borderRadius: '4px',
        color: status === "Unpaid" ? "#000" : "#fff"
      }}
    >
      ${amount}
    </Box>
  </Box>
);

const Default = ({
  patientData,
  calculateAppoinment,
  setPatientData,
  financialData,
  colors,
}) => {
  // Prepare line chart data
  const getLineData = () => {
    const monthlyData = patientData.reduce((acc, patient) => {
      const month = patient.lastVisit?.slice(0, 7);
      if (!month) return acc;
      
      if (!acc[month]) {
        acc[month] = { total: 0, active: 0 };
      }
      
      acc[month].total += 1;
      if (patient.status) {
        acc[month].active += 1;
      }
      
      return acc;
    }, {});

    const sortedData = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, counts]) => ({
        x: month,
        y: counts.total
      }));

    return sortedData;
  };

  const totalAppointments = patientData.length;
  const activeAppointments = calculateAppoinment;
  const inactivePatients = totalAppointments - calculateAppoinment;
  const percentageActive = ((activeAppointments / totalAppointments) * 100).toFixed(1);
  const percentageInactive = ((inactivePatients / totalAppointments) * 100).toFixed(1);

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
            title="Total Appointments"
            value={totalAppointments}
            subtitle={`${percentageActive}% active appointments`}
            icon={<Email sx={{ color: colors.greenAccent[500], fontSize: "26px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Inactive Patients"
            value={inactivePatients}
            subtitle={`${percentageInactive}% of total patients`}
            icon={<PersonAdd sx={{ color: colors.redAccent[500], fontSize: "26px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Recent Activity"
            value={activeAppointments}
            subtitle="Active appointments today"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>📊</Box>}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '12px',
              backgroundColor: 'white',
              height: '500px'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h4" fontWeight="bold" color="#111">
                  Patient Visit Trends
                </Typography>
                <Typography color="#666">
                  Monthly Overview
                </Typography>
              </Box>
              <IconButton>
                <DownloadOutlined sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
              </IconButton>
            </Box>
            <Box height="380px">
              <LineChart 
                data={getLineData()} 
                isDashboard={true}
                xAxisLabel="Month"
                yAxisLabel="Patients"
                colors={[colors.greenAccent[500]]}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '12px',
              backgroundColor: colors.primary[400],
              height: '400px',
              overflow: 'hidden'
            }}
          >
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              color="#111" 
              mb={3}
              sx={{
                fontSize: '1.5rem',
                letterSpacing: '0.5px',
                borderBottom: '2px solid rgba(0,0,0,0.1)',
                paddingBottom: '10px'
              }}
            >
              Recent Transactions
            </Typography>
            <Box sx={{ overflowY: 'auto', height: 'calc(100% - 80px)' }}>
              {financialData.slice(0, 6).map((transaction, index) => (
                <TransactionCard
                  key={index}
                  email={transaction.email}
                  amount={transaction.amount}
                  status={transaction.paymentStatus}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Default;
// Name: Abhishek Jaiswal 
// Email: abhishek20ei02@gmail.com

// Deployed Link: https://dashboard-react-lyart.vercel.app/

// Video: https://drive.google.com/file/d/16IIZ5ltutjwwBDgxV7o5ph_MSHSsVfol/view

// Github : https://github.com/coderfrnd/dashboard-react

// Tech Stack - React and MUI and JSON server

// password -: admin123
//  email: admin@hospital.com 