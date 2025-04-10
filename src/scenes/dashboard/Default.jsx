import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Email, PersonAdd, DownloadOutlined } from "@mui/icons-material";
import { LineChart, StatBox } from "../../components";

const Default = ({
  patientData,
  calculateAppoinment,
  setPatientData,
  financialData,
  colors,
}) => {
  return (
    <Box width="100%">
      <Box display="flex" ml="15px" height="250px" gap={4}>
        {/* Total Appointments Stat */}
        <Box width="30%">
          <Typography
            variant="h6"
            color={colors.greenAccent[400]}
            mb="5px"
            fontWeight="bold"
            textAlign="center"
          >
            Total Appointments
          </Typography>
          <Box
            bgcolor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="200px"
          >
            <StatBox
              total={patientData.length}
              subtitle="Total Appointment"
              progress="0.75"
              increase={`${calculateAppoinment * 10}%`}
              icon={<Email sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
        </Box>

        {/* Inactive Patients Stat */}
        <Box width="30%">
          <Typography
            variant="h6"
            color={colors.greenAccent[400]}
            mb="5px"
            fontWeight="bold"
            textAlign="center"
          >
            Inactive Patients
          </Typography>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            height="200px"
          >
            <StatBox
              total={patientData.length - calculateAppoinment}
              subtitle="Inactive Patients"
              progress={(
                (patientData.length - calculateAppoinment) / patientData.length
              ).toFixed(2)}
              increase={`${(calculateAppoinment * 5).toFixed(1)}%`}
              icon={<PersonAdd sx={{ color: colors.redAccent[600], fontSize: "26px" }} />}
            />
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                position: "absolute",
                bottom: "8px",
                right: "120px",
              }}
              onClick={() => {
                const updatedData = [...patientData];
                const indexToToggle = updatedData.findIndex((p) => p.status === true);
                if (indexToToggle !== -1) {
                  updatedData[indexToToggle].status = false;
                } else {
                  updatedData[0].status = true;
                }
                setPatientData(updatedData);
              }}
            >
              Add Appointment
            </Button>
          </Box>
        </Box>

        {/* Recent Transactions */}
        <Box width="30%" height="500px" bgcolor={colors.primary[400]} overflow="auto">
          <Typography
            variant="h6"
            color={colors.greenAccent[400]}
            p="15px"
            fontWeight="bold"
          >
            Recent Transactions
          </Typography>
          {Array.isArray(financialData) &&
            financialData.map((transaction, index) => (
              <Box
                key={`${transaction.id}-${index}`}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.paymentStatus}
                  </Typography>
                  <Typography color={colors.gray[100]}>{transaction.email}</Typography>
                </Box>
                <Box
                  bgcolor={
                    transaction.paymentStatus === "Paid"
                      ? colors.greenAccent[600]
                      : transaction.paymentStatus === "Overdue"
                      ? colors.redAccent[600]
                      : "#ffeb3b"
                  }
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.amount}
                </Box>
              </Box>
            ))}
        </Box>
      </Box>

      {/* Line Chart Section */}
      <Box height="380px" width="62%" ml="15px" mt="30px" bgcolor={colors.primary[400]}>
        <Box
          mt="4px"
          px="30px"
          py="25px"
          display="flex"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.gray[100]}
            >
              Total Patient Visited
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              {/* Add actual value if needed */}
            </Typography>
          </Box>
          <IconButton>
            <DownloadOutlined sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
          </IconButton>
        </Box>
        <Box height="250px" mt="-20px">
          <LineChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Default;
