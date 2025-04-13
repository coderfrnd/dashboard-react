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
 
  const handleDeleteClick = async (patient) => {
    try {
      const response = await fetch(
        `https://dashboard-gb84.onrender.com/patientDashboard/${patient.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }

      // Update local state by removing the deleted patient
      setPatientData(prevData => prevData.filter(p => p.id !== patient.id));
    } catch (err) {
      console.error("Error deleting patient:", err);
      alert("Failed to delete patient. Please try again.");
    }
  };

  return (
    <Box m="20px">
      <Header title="Patient" subtitle="Manage Patient" />
      <Patientlist colors={colors} patientData={patientData} onDeleteClick={handleDeleteClick} />
    </Box>
  );
};

export default Team;
