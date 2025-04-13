import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Header,
} from "../../components";
import { tokens } from "../../theme";
import { useContext, useEffect, useState } from "react";
import AddPatientModal from "./PatientAdd";
import { ToggledContext } from "../../App";
import Default from "./Default";
import PatientBoard from "./PatientBoard";
import FinancialBoard from "./FinancialBoard";
import StaffBoard from "./StaffBoard";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  const [calculateAppoinment, setcalculateAppoinment] = useState(0);
  const [activeBoard, setactiveBoard] = useState('default');
  const [openModal, setOpenModal] = useState(false);
  const { patientData, setPatientData, financialData, staffData } = useContext(ToggledContext);

  const boardButtons = [
    {
      id: 'default',
      label: "Default Board",
      hoverColor: colors.blueAccent[800],
      onClick: () => {
        console.log('Switching to default board');
        setactiveBoard('default');
      },
    },
    {
      id: 'patient',
      label: "Patient Board",
      hoverColor: colors.blueAccent[800],
      onClick: () => {
        console.log('Switching to patient board');
        setactiveBoard('patient');
      },
    },
    {
      id: 'finance',
      label: "Financial Board",
      hoverColor: colors.blueAccent[800],
      onClick: () => {
        console.log('Switching to finance board');
        setactiveBoard('finance');
      },
    },
    {
      id: 'staff',
      label: "Staff Board",
      hoverColor: colors.blueAccent[800],
      onClick: () => {
        console.log('Switching to staff board');
        setactiveBoard('staff');
      },
    },
  ];
    
  useEffect(() => {
    if (patientData.length > 0) {
      const count = patientData.reduce((acc, ele) => {
        return ele.status ? acc + 1 : acc;
      }, 0);
      setcalculateAppoinment(count);
    }
  }, [patientData]);

  // Debug logs
  useEffect(() => {
    console.log('Active Board:', activeBoard);
    console.log('Patient Data:', patientData);
    console.log('Financial Data:', financialData);
    console.log('Staff Data:', staffData);
  }, [activeBoard, patientData, financialData, staffData]);

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
              onClick={() => setOpenModal(true)}
            >
              Add New Patient
            </Button>
          </Box>
        )}
      </Box>

      {/* Board Selection Buttons */}
      <Box display="flex" gap={2} mb={3}>
        {boardButtons.map((btn, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              bgcolor: (activeBoard === btn.id) ? colors.blueAccent[800] : colors.greenAccent[700],
              color: "#fff",
              fontSize: isMdDevices ? "14px" : "10px",
              fontWeight: "bold",
              p: "10px 20px",
              mt: "18px",
              width: "200px",
              transition: ".3s ease",
              ":hover": {
                bgcolor: btn.hoverColor,
              },
            }}
            onClick={btn.onClick}
          >
            {btn.label}
          </Button>
        ))}
      </Box>

      {/* Board Content */}
      {activeBoard === "default" && (
        <Default
          patientData={patientData}
          calculateAppoinment={calculateAppoinment}
          setPatientData={setPatientData}
          financialData={financialData}
          colors={colors}
        />
      )}
      {activeBoard === "finance" && (
        <FinancialBoard colors={colors} financialData={financialData} />
      )}
      {activeBoard === "staff" && (
        <StaffBoard staffData={staffData} colors={colors} />
      )}
      {activeBoard === "patient" && (
        <PatientBoard patientData={patientData} />
      )}

      <AddPatientModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={(newPatient) => setPatientData((prev) => [...prev, newPatient])}
      />
    </Box>
  );
}

export default Dashboard;
