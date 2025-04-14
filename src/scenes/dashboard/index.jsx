import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Typography,
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  const [calculateAppoinment, setcalculateAppoinment] = useState(0);
  const [activeBoard, setactiveBoard] = useState('default');
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { patientData, setPatientData, financialData, staffData } = useContext(ToggledContext);

  const boardOptions = [
    {
      id: 'default',
      label: "Default Board",
    },
    {
      id: 'patient',
      label: "Patient Board",
    },
    {
      id: 'finance',
      label: "Financial Board",
    },
    {
      id: 'staff',
      label: "Staff Board",
    },
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBoardSelect = (boardId) => {
    console.log(`Switching to ${boardId} board`);
    setactiveBoard(boardId);
    handleMenuClose();
  };
    
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

  // Get the label of the active board
  const activeBoardLabel = boardOptions.find(option => option.id === activeBoard)?.label || "Select Board";

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

      {/* Board Selection Dropdown */}
      <Box 
        mb={3} 

        sx={{
          ml: "18px",
          display: "flex",
          alignItems: "center",
          position: "relative"
        }}
      >
        <Button
          variant="contained"
          onClick={handleMenuClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            bgcolor: colors.blueAccent[800],
            color: "#fff",
            fontSize: isMdDevices ? "14px" : "10px",
            fontWeight: "bold",
            p: "10px 20px",
            // mt: "10px",
            minWidth: "200px",
            justifyContent: "space-between",
            transition: ".3s ease",
            ":hover": {
              bgcolor: colors.blueAccent[900],
            },
          }}
        >
          {activeBoardLabel}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: "200px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {boardOptions.map((option) => (
            <MenuItem 
              key={option.id}
              onClick={() => handleBoardSelect(option.id)}
              selected={activeBoard === option.id}
              sx={{
                fontWeight: activeBoard === option.id ? "bold" : "normal",
                color: activeBoard === option.id ? colors.blueAccent[800] : "#000000",
                "&:hover": {
                  backgroundColor: colors.blueAccent[100],
                },
                py: 1.5,
                px: 2,
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
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
