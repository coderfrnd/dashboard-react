import React, { createContext, useEffect, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import { Navbar, SideBar } from "./scenes";
import { Outlet } from "react-router-dom";
import { getAllPatients } from './api/services/patientService';
import { getAllStaff } from './api/services/staffService';
import { getAllFinancialRecords } from './api/services/financialService';

export const ToggledContext = createContext(null);

function App() {
  const [theme] = useMode();
  const [toggled, setToggled] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [financialData, setFinancialData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patients, financial, staff] = await Promise.all([
          getAllPatients(),
          getAllFinancialRecords(),
          getAllStaff()
        ]);
        
        setPatientData(patients);
        setFinancialData(financial);
        setStaffData(staff);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ToggledContext.Provider value={{ toggled, setToggled, patientData, setPatientData, financialData, setFinancialData, staffData, setStaffData }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" position="relative">
          <SideBar />
          <Box flexGrow={1}>
            <Navbar />
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </ToggledContext.Provider>
  );
}

export default App;
