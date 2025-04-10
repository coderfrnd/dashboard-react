import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Header,
  StatBox,
  LineChart,
  ProgressCircle,
  BarChart,
  GeographyChart,
} from "../../components";
import { DownloadOutlined, Email, PersonAdd } from "@mui/icons-material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { useContext, useEffect, useState } from "react";
import AddPatientModal from "./PatientAdd";
import { ToggledContext } from "../../App";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  const [calculateAppoinment, setcalculateAppoinment] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const { patientData, setPatientData, financialData } =
    useContext(ToggledContext);

  useEffect(() => {
    if (patientData.length > 0) {
      const count = patientData.reduce((acc, ele) => {
        return ele.status ? acc + 1 : acc;
      }, 0);
      setcalculateAppoinment(count);
    }
  }, [patientData]);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Admin Dashboard" subtitle="Welcome to your dashboard Manage all the things from here" />
        {!isXsDevices && (
          <Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: colors.blueAccent[700],
                color: "#fcfcfc",
                fontSize: isMdDevices ? "14px" : "10px",
                fontWeight: "bold",
                p: "10px 20px",
                mt: "18px",
                transition: ".3s ease",
                ":hover": {
                  bgcolor: colors.blueAccent[800],
                },
              }}
              startIcon={<DownloadOutlined />}
            >
              DOWNLOAD REPORTS
            </Button>
          </Box>
        )}
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: colors.greenAccent[600],
          color: "#fff",
          fontSize: isMdDevices ? "14px" : "10px",
          fontWeight: "bold",
          p: "10px 20px",
          mt: "18px",
          ml: "10px",
          mb: "40px",
          width: "350px",
          transition: ".3s ease",
          ":hover": {
            bgcolor: colors.greenAccent[700],
          },
        }}
        onClick={() => setOpenModal(true)}
      >
        Add New Patient
      </Button>

      <Box
       width="100%"
      >
        <Box display="flex" ml="15px"  height="250px" gap={4} >
          <Box
            bgcolor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="200px"
            width="30%"
          >
            <StatBox
              total={patientData.length}
              subtitle="Total Appoinment"
              progress="0.75"
              increase={`${calculateAppoinment * 10}%`}
              icon={
                <Email
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            height="200px"
            width="30%"
          >
            <StatBox
              total={patientData.length - calculateAppoinment}
              subtitle="Inactive Patients"
              progress={(
                (patientData.length - calculateAppoinment) /
                patientData.length
              ).toFixed(2)}
              increase={`-${(calculateAppoinment * 5).toFixed(1)}%`}
              icon={
                <PersonAdd
                  sx={{ color: colors.redAccent[600], fontSize: "26px" }}
                />
              }
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
                const indexToToggle = updatedData.findIndex(
                  (p) => p.status === true
                );

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
          <Box width="30%" height="500px"  bgcolor={colors.primary[400]} overflow="auto">
            <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
              <Typography
                color={colors.gray[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactionss
              </Typography>
            </Box>

            {Array.isArray(financialData) &&
              financialData.map(
                (transaction, index) => (
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
                      <Typography color={colors.gray[100]}>
                        {transaction.email}
                      </Typography>
                    </Box>
                    <Box
                      bgcolor={
                        transaction.paymentStatus === "Paid"
                          ? colors.greenAccent?.[600] || "#4caf50"
                          : transaction.paymentStatus === "Overdue"
                          ? colors.redAccent?.[600] || "#f44336"
                          : colors.yellowAccent?.[700] || "#ffeb3b"
                      }
                      p="5px 10px"
                      borderRadius="4px"
                    >
                      ${transaction.amount}
                    </Box>
                  </Box>
                )
                // console.log(transaction)
              )}
          </Box>
        </Box>
          <Box
            height="380px"
            width="62%"
            ml="15px"

            bgcolor={colors.primary[400]}
          >
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
                ></Typography>
              </Box>
              <IconButton>
                <DownloadOutlined
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            <Box height="250px" mt="-20px">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
      </Box>
      <AddPatientModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newPatient) => setPatientData((prev) => [...prev, newPatient])}
      />
    </Box>
  );
}

export default Dashboard;
