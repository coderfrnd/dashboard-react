import { Box, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, Typography, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Header } from "../../components";
import { useContext, useState, useEffect } from "react";
import { ToggledContext } from "../../App";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Edit, Delete, Person, LocalHospital, CalendarMonth, MedicalServices } from '@mui/icons-material';
import PatientEdit from "../dashboard/PatientEdit";

const StatCard = ({ title, value, subtitle, icon, color }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '12px',
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color={isDark ? "white" : "text.secondary"} fontSize="0.875rem" mb={1}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color={isDark ? "white" : "text.primary"}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: '8px',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography color={isDark ? "rgba(255,255,255,0.7)" : "text.secondary"} fontSize="0.875rem">
        {subtitle}
      </Typography>
    </Paper>
  );
};

const PatientCard = ({ patient, onEdit, onDelete }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDark = theme.palette.mode === "dark";

  const getStatusColor = (status) => {
    // Ensure colors object and its properties exist
    if (!colors || !colors.greenAccent || !colors.redAccent || !colors.blueAccent) {
      // Fallback colors if theme colors are not available
      const fallbackColors = {
        admitted: '#4caf50',  // green
        emergency: '#f44336', // red
        discharged: '#2196f3', // blue
        default: '#9e9e9e'    // grey
      };

      const statusStr = String(status || '').toLowerCase();
      return fallbackColors[statusStr] || fallbackColors.default;
    }

    // If theme colors are available, use them
    const statusStr = String(status || '').toLowerCase();
    switch (statusStr) {
      case "admitted": 
        return colors.greenAccent?.[500] || '#4caf50';
      case "emergency": 
        return colors.redAccent?.[500] || '#f44336';
      case "discharged": 
        return colors.blueAccent?.[500] || '#2196f3';
      default: 
        return colors.grey?.[500] || '#9e9e9e';
    }
  };

  // Update the status badge to use rgba for background
  const getStatusBgColor = (statusColor) => {
    return `${statusColor}15`; // 15 is the opacity in hex (approximately 8%)
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '16px',
        backgroundColor: isDark ? colors.primary[400] : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : colors.grey[200]}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Header with Name and Status */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2.5}>
        <Box>
          <Typography 
            variant="h6" 
            color={isDark ? colors.greenAccent[400] : colors.greenAccent[700]}
            fontWeight="600"
            mb={0.5}
            sx={{ fontSize: '1.1rem' }}
          >
            {patient.name}
          </Typography>
          <Typography 
            variant="body2" 
            color={isDark ? "rgba(255,255,255,0.7)" : "text.secondary"}
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <Person sx={{ fontSize: 16 }} /> {patient.age} years • {patient.gender}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: getStatusBgColor(getStatusColor(patient.status)),
            color: getStatusColor(patient.status),
            px: 2,
            py: 0.75,
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: getStatusColor(patient.status)
          }} />
          {patient.status || 'Unknown'}
        </Box>
      </Box>

      {/* Diagnosis Section */}
      <Box mb={2}>
        <Typography 
          variant="body2" 
          color={isDark ? "rgba(255,255,255,0.7)" : "text.secondary"}
          mb={0.5}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <MedicalServices sx={{ fontSize: 16 }} /> Diagnosis
        </Typography>
        <Typography 
          color={isDark ? "white" : "text.primary"}
          sx={{ 
            fontSize: '0.95rem',
            pl: 3.5
          }}
        >
          {patient.diagnosis || 'No diagnosis recorded'}
        </Typography>
      </Box>

      {/* Next Appointment Section */}
      <Box mb={3}>
        <Typography 
          variant="body2" 
          color={isDark ? "rgba(255,255,255,0.7)" : "text.secondary"}
          mb={0.5}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <CalendarMonth sx={{ fontSize: 16 }} /> Next Appointment
        </Typography>
        <Typography 
          color={isDark ? "white" : "text.primary"}
          sx={{ 
            fontSize: '0.95rem',
            pl: 3.5
          }}
        >
          {patient.nextAppointment || 'No appointment scheduled'}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5}>
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          onClick={() => onEdit(patient)}
          startIcon={<Edit />}
          sx={{
            borderColor: isDark ? colors.greenAccent[500] : colors.greenAccent[600],
            color: isDark ? colors.greenAccent[500] : colors.greenAccent[600],
            '&:hover': {
              backgroundColor: isDark ? colors.greenAccent[500] + '10' : colors.greenAccent[600] + '10',
              borderColor: isDark ? colors.greenAccent[400] : colors.greenAccent[500],
            },
          }}
        >
          Edit
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          onClick={() => onDelete(patient)}
          startIcon={<Delete />}
          sx={{
            borderColor: isDark ? colors.redAccent[500] : colors.redAccent[600],
            color: isDark ? colors.redAccent[500] : colors.redAccent[600],
            '&:hover': {
              backgroundColor: isDark ? colors.redAccent[500] + '10' : colors.redAccent[600] + '10',
              borderColor: isDark ? colors.redAccent[400] : colors.redAccent[500],
            },
          }}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

const DataGridCustomToolbar = () => {
  return (
    <GridToolbar 
      sx={{
        p: 2,
        '& .MuiButton-root': {
          color: 'inherit'
        }
      }}
    />
  );
};

const Patient = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, patient: null });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDark = theme.palette.mode === "dark";
  const contextData = useContext(ToggledContext);
  const patientData = contextData?.patientData || [];
  const setPatientData = contextData?.setPatientData;

  const filterData = (data, filterType) => {
    switch (filterType) {
      case "Admitted":
        return data.filter((patient) => patient.status === "Admitted");
      case "Discharged":
        return data.filter((patient) => patient.status === "Discharged");
      case "Emergency":
        return data.filter((patient) => patient.status === "Emergency");
      default:
        return data;
    }
  };

  useEffect(() => {
    setFilteredData(filterData(patientData, filter));
  }, [patientData, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setEditModalOpen(true);
  };

  const handleEditSuccess = async (updatedPatient) => {
    if (setPatientData) {
      setPatientData(prevData => 
        prevData.map(patient => 
          patient.id === updatedPatient.id ? updatedPatient : patient
        )
      );
      setEditModalOpen(false);
      setSelectedPatient(null);
    }
  };

  const handleDelete = (patient) => {
    setDeleteDialog({ open: true, patient });
  };

  const confirmDelete = async () => {
    if (deleteDialog.patient) {
      try {
        const response = await fetch(
          `https://dashboard-gb84.onrender.com/patientDashboard/${deleteDialog.patient.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete patient");
        }

        setPatientData(prevData => prevData.filter(p => p.id !== deleteDialog.patient.id));
      } catch (err) {
        console.error("Error deleting patient:", err);
        alert("Failed to delete patient. Please try again.");
      }
    }
    setDeleteDialog({ open: false, patient: null });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          ID
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.2,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          Name
        </Typography>
      ),
      renderCell: (params) => (
        <Typography 
          sx={{ 
            fontWeight: 500,
            color: '#2c387e',
            fontSize: '13.5px'
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          Age
        </Typography>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          Gender
        </Typography>
      ),
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value === 'Male' ? '#e3f2fd' : '#fce4ec',
            px: 2,
            py: 0.5,
            borderRadius: '4px',
            border: params.value === 'Male' ? '1px solid #bbdefb' : '1px solid #f8bbd0'
          }}
        >
          <Typography 
            sx={{ 
              fontWeight: 600,
              color: params.value === 'Male' ? '#1565c0' : '#c2185b',
              fontSize: '13px'
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "bloodGroup",
      headerName: "Blood Group",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          Blood Group
        </Typography>
      ),
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: '#ffebee',
            px: 2,
            py: 0.5,
            borderRadius: '4px',
            border: '1px solid #ffcdd2'
          }}
        >
          <Typography 
            sx={{ 
              fontWeight: 600,
              color: '#c62828',
              fontSize: '13px'
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1.2,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          Contact
        </Typography>
      ),
      renderCell: (params) => (
        <Typography 
          sx={{ 
            fontWeight: 500,
            color: '#424242',
            fontSize: '13px'
          }}
        >
          {params.value || 'N/A'}
        </Typography>
      ),
    },
    {
      field: "diagnosis",
      headerName: "Diagnosis",
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          Diagnosis
        </Typography>
      ),
      renderCell: (params) => (
        <Typography 
          sx={{ 
            fontWeight: 500,
            color: '#424242',
            fontSize: '13px',
            whiteSpace: 'normal',
            wordBreak: 'break-word'
          }}
        >
          {params.value || 'No diagnosis'}
        </Typography>
      ),
    },
    {
      field: "nextAppointment",
      headerName: "Next Appointment",
      flex: 1.2,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          Next Appointment
        </Typography>
      ),
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: '#e8f5e9',
            px: 2,
            py: 0.5,
            borderRadius: '4px',
            border: '1px solid #c8e6c9'
          }}
        >
          <Typography 
            sx={{ 
              fontWeight: 600,
              color: '#2e7d32',
              fontSize: '13px'
            }}
          >
            {params.value || 'Not scheduled'}
          </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            letterSpacing: '0.5px',
            fontSize: '13px'
          }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => {
        let statusColor = '#c62828';
        let statusBgColor = '#ffebee';
        let statusBorderColor = '#ffcdd2';
        let statusText = 'Inactive';

        if (params.value === 'Admitted') {
          statusColor = '#2e7d32';
          statusBgColor = '#e8f5e9';
          statusBorderColor = '#c8e6c9';
          statusText = 'Admitted';
        } else if (params.value === 'Emergency') {
          statusColor = '#d32f2f';
          statusBgColor = '#ffebee';
          statusBorderColor = '#ffcdd2';
          statusText = 'Emergency';
        } else if (params.value === 'Discharged') {
          statusColor = '#1565c0';
          statusBgColor = '#e3f2fd';
          statusBorderColor = '#bbdefb';
          statusText = 'Discharged';
        } else if (params.value === true) {
          statusColor = '#2e7d32';
          statusBgColor = '#e8f5e9';
          statusBorderColor = '#c8e6c9';
          statusText = 'Active';
        }

        return (
          <Box
            sx={{
              backgroundColor: statusBgColor,
              px: 2,
              py: 0.5,
              borderRadius: '4px',
              border: `1px solid ${statusBorderColor}`
            }}
          >
            <Typography 
              sx={{ 
                fontWeight: 600,
                color: statusColor,
                fontSize: '13px'
              }}
            >
              {statusText}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box display="flex" gap={1} justifyContent="center" width="100%">
          <IconButton
            onClick={() => handleEditClick(params.row)}
            sx={{ 
              backgroundColor: '#2196F3',
              '&:hover': {
                backgroundColor: '#1976D2',
              },
              width: '32px',
              height: '32px',
            }}
          >
            <Edit sx={{ color: '#fff', fontSize: '18px' }} />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row)}
            sx={{ 
              backgroundColor: '#f44336',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
              width: '32px',
              height: '32px',
            }}
          >
            <Delete sx={{ color: '#fff', fontSize: '18px' }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Patient Records" subtitle="Managing Patient Information" lightBackground={true} />

      {/* Filter Buttons */}
      <Stack direction="row" spacing={2} mb={3}>
        <Button
          variant={filter === "All" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("All")}
          sx={{
            backgroundColor: filter === "All" ? colors.blueAccent[500] : 'transparent',
            color: filter === "All" ? '#ffffff' : isDark ? 'white' : colors.blueAccent[500],
            borderColor: colors.blueAccent[500],
            '&:hover': {
              backgroundColor: filter === "All" ? colors.blueAccent[600] : 'rgba(255, 255, 255, 0.05)',
              borderColor: colors.blueAccent[500],
            },
          }}
        >
          All Patients
        </Button>
        <Button
          variant={filter === "Admitted" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("Admitted")}
          sx={{
            backgroundColor: filter === "Admitted" ? colors.greenAccent[500] : 'transparent',
            color: filter === "Admitted" ? '#ffffff' : isDark ? 'white' : colors.greenAccent[500],
            borderColor: colors.greenAccent[500],
            '&:hover': {
              backgroundColor: filter === "Admitted" ? colors.greenAccent[600] : 'rgba(255, 255, 255, 0.05)',
              borderColor: colors.greenAccent[500],
            },
          }}
        >
          Admitted
        </Button>
        <Button
          variant={filter === "Discharged" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("Discharged")}
          sx={{
            backgroundColor: filter === "Discharged" ? colors.redAccent[500] : 'transparent',
            color: filter === "Discharged" ? '#ffffff' : isDark ? 'white' : colors.redAccent[500],
            borderColor: colors.redAccent[500],
            '&:hover': {
              backgroundColor: filter === "Discharged" ? colors.redAccent[600] : 'rgba(255, 255, 255, 0.05)',
              borderColor: colors.redAccent[500],
            },
          }}
        >
          Discharged
        </Button>
        <Button
          variant={filter === "Emergency" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("Emergency")}
          sx={{
            backgroundColor: filter === "Emergency" ? colors.redAccent[500] : 'transparent',
            color: filter === "Emergency" ? '#ffffff' : isDark ? 'white' : colors.redAccent[500],
            borderColor: colors.redAccent[500],
            '&:hover': {
              backgroundColor: filter === "Emergency" ? colors.redAccent[600] : 'rgba(255, 255, 255, 0.05)',
              borderColor: colors.redAccent[500],
            },
          }}
        >
          Emergency
        </Button>
      </Stack>

      {/* DataGrid */}
      <Paper
        elevation={0}
        sx={{ 
          height: "75vh",
          backgroundColor: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          '& .MuiDataGrid-root': {
            border: 'none',
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]} 
          checkboxSelection
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f5f5f5',
              py: 1.5
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8faff',
              borderBottom: '2px solid #e3f2fd',
              color: '#1a237e',
              fontWeight: 600,
              fontSize: '14px',
            },
            '& .MuiDataGrid-row': {
              color: '#424242',
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#f8faff',
              },
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: '#fff',
            },
            '& .MuiCheckbox-root': {
              color: '#1a237e',
            },
            '& .MuiDataGrid-cellContent': {
              color: '#424242',
            },
          }}
        />
      </Paper>

      {/* Edit Modal */}
      <PatientEdit
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPatient(null);
        }}
        onSuccess={handleEditSuccess}
        patient={selectedPatient}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, patient: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this patient record?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, patient: null })}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Patient; 