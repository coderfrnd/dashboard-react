import React from 'react';
import { Box, Typography } from "@mui/material";
import { BarChart, PieChart } from '../../components';
import Patientlist from '../team/Patientlist';

const PatientBoard = ({ colors, patientData }) => {
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

  const pieData = Object.entries(bloodGrp).map(([status, count]) => {
    return {
      id: status,
      label: status,
      value: count,
    };
  });

  const barData = [
    { status: "Active", count: statusCount["Active"] },
    { status: "Inactive", count: statusCount["Inactive"] },
  ];

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
            Patient Status Distribution
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
              xAxisLabel="Patient Status"
              yAxisLabel="Number of Patients"
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
            Blood Group Distribution
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

      {/* Patient List Section */}
      <Box mt="150px">
        <Patientlist colors={colors} patientData={patientData} />
      </Box>
    </Box>
  );
};

export default PatientBoard;
