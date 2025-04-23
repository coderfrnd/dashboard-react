import React, { createContext, useEffect, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import { Navbar, SideBar } from "./scenes";
import { Outlet } from "react-router-dom";
import Invoices from './scenes/invoices';

export const ToggledContext = createContext(null);

function App() {
  const [theme] = useMode();
  const [toggled, setToggled] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [financialData, setFinancialData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        `https://dashboard-gb84.onrender.com/patientDashboard`
        // `http://localhost:3000/patientDashboard`
      );
      let data = await res.json();
      setPatientData(data);
      let finaRes = await fetch(
        `https://dashboard-gb84.onrender.com/financialDashboard`
        // `http://localhost:3000/financialDashboard`
      );
      let finData = await finaRes.json();
      setFinancialData(finData);
      let staffRes = await fetch(
        `https://dashboard-gb84.onrender.com/staffDashboard`
        // `http://localhost:3000/staffDashboard`
      );
      let staffD = await staffRes.json();
      setStaffData(staffD);
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToggledContext.Provider
        value={{
          toggled,
          setToggled,
          patientData,
          setPatientData,
          financialData,
          staffData,
          setStaffData,
        }}
      >
        <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
          <SideBar />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              maxWidth: "100%",
            }}
          >
            <Navbar />
            <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </ToggledContext.Provider>
    </ThemeProvider>
  );
}

export default App;
