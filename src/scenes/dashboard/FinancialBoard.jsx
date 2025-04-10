import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, PieChart } from '../../components';
import Invoices from '../invoices';

const FinancialBoard = ({ colors, financialData }) => {
  const paymentCount = financialData.reduce((acc, item) => {
    acc[item.paymentStatus] = (acc[item.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  const claimCount = financialData.reduce((acc, item) => {
    acc[item.claimStatus] = (acc[item.claimStatus] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(paymentCount).map(([status, count]) => ({
    status,
    count
  }));

  const pieData = Object.entries(claimCount).map(([status, count]) => ({
    id: status,
    label: status,
    value: count
  }));

  return (
    <Box width="100%">
      <Box display="flex" ml="15px" height="250px" gap={4}>
        {/* Bar Chart Section */}
        <Box width="45%">
          <Typography
            variant="h6"
            color={colors.greenAccent[400]}
            mb="10px"
            fontWeight="bold"
            textAlign="center"
          >
            Payment Status Summary
          </Typography>
          <Box
            bgcolor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="350px"
          >
            <BarChart
              data={barData}
              indexBy="status"
              keys={["count"]}
              xAxisLabel="Payment Status"
              yAxisLabel="Number of Payments"
            />
          </Box>
        </Box>

        {/* Pie Chart Section */}
        <Box width="45%">
          <Typography
            variant="h6"
            color={colors.greenAccent[400]}
            mb="10px"
            fontWeight="bold"
            textAlign="center"
          >
            Claim Status Distribution
          </Typography>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="350px"
          >
            <PieChart pieData={pieData} />
          </Box>
        </Box>
      </Box>

      {/* Financial Data Table */}
      <Box mt="150px">
        <Invoices financialData={financialData} header={"Patient Financial Data"} />
      </Box>
    </Box>
  );
};

export default FinancialBoard;
