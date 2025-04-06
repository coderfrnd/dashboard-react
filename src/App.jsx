import React, { createContext, useEffect, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar } from "./scenes";
import { Outlet } from "react-router-dom";

export const ToggledContext = createContext(null);
function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [financialData, setfinancialData] = useState([]);
  const [staffData, setstaffData] = useState([]);
  const values = { toggled, setToggled };
  useEffect(() => {
    (async () => {
      let res = await fetch(
        `https://dashboad-production.up.railway.app/patientDashboard`
      );
      let data = await res.json();
      setPatientData(data);
      let finaRes = await fetch(
        `https://dashboad-production.up.railway.app/financialDashboard`
      );
      let finData = await finaRes.json();
      setfinancialData(finData);
      let staffRes = await fetch(
        `https://dashboad-production.up.railway.app/staffDashboard`
      );
      let staffD = await staffRes.json();
      setstaffData(staffD);
    })();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToggledContext.Provider
          value={{
            values,
            patientData,
            setPatientData,
            financialData,
            staffData,
            setstaffData,
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
    </ColorModeContext.Provider>
  );
}

export default App;
