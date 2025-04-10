import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, PieChart } from '../../components';
import { FAQ } from '..';
import Staff from '../staffDetails';

const StaffBoard = ({ colors, staffData }) => {
  // Count staff per department for bar chart
  const departmentCount = staffData.reduce((acc, staff) => {
    acc[staff.department] = (acc[staff.department] || 0) + 1;
    return acc;
  }, {});

  // Count onDuty status for pie chart
  const dutyStatusCount = staffData.reduce(
    (acc, staff) => {
      const status = staff.onDuty ? 'Present' : 'Absent';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { Present: 0, Absent: 0 }
  );

  const barData = Object.entries(departmentCount).map(([dept, count]) => ({
    department: dept,
    count,
  }));

  const pieData = Object.entries(dutyStatusCount).map(([status, count]) => ({
    id: status,
    label: status,
    value: count,
  }));

  return (
    <Box width="100%">
      {/* Charts */}
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
            Staff Per Department
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
              indexBy="department"
              keys={['count']}
              xAxisLabel="Department"
              yAxisLabel="Staff Count"
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
            Staff Duty Status
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

      {/* Staff List Section */}
      <Box mt="150px">
        <Staff />
      </Box>
    </Box>
  );
};

export default StaffBoard;
