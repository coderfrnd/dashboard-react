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
import { ToggledContext } from "../../App";
import Default from "./Default";
import PatientBoard from "./PatientBoard";
import FinancialBoard from "./FinancialBoard";
import StaffBoard from "./StaffBoard.jsx";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  const [calculateAppoinment, setcalculateAppoinment] = useState(0);
  const { patientData, setPatientData, financialData, staffData } = useContext(ToggledContext);
  const location = useLocation();
    
  useEffect(() => {
    if (patientData.length > 0) {
      const count = patientData.reduce((acc, ele) => {
        return ele.status ? acc + 1 : acc;
      }, 0);
      setcalculateAppoinment(count);
    }
  }, [patientData]);

  // Determine which board to show based on the current path
  const renderBoard = () => {
    const path = location.pathname;
    
    if (path === "/patient") {
      return <PatientBoard patientData={patientData} />;
    } else if (path === "/finance") {
      return <FinancialBoard colors={colors} financialData={financialData} />;
    } else if (path === "/staff") {
      return <StaffBoard staffData={staffData} colors={colors} />;
    } else {
      return (
        <Default
          patientData={patientData}
          calculateAppoinment={calculateAppoinment}
          setPatientData={setPatientData}
          financialData={financialData}
          colors={colors}
        />
      );
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Admin Dashboard" subtitle="Welcome to your dashboard Manage all the things from here" />
      </Box>

      {renderBoard()}
    </Box>
  );
}

export default Dashboard;
