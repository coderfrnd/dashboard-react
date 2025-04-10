import { Box, Typography, useTheme } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useContext} from "react";
import { ToggledContext } from "../../App";
import Patientlist from "./Patientlist";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { patientData, setPatientData } = useContext(ToggledContext);
 
  return (
    <Box m="20px">
      <Header title="Patient" subtitle="Manage Patient" />
      <Patientlist colors={colors} patientData={patientData} />
    </Box>
  );
};

export default Team;
