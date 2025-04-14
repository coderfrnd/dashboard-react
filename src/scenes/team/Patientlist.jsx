import React, { useState, useEffect } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button, Stack, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip, Paper } from "@mui/material";
import { Edit, Delete, Warning } from '@mui/icons-material';
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Header } from "../../components";
import PatientEdit from "../dashboard/PatientEdit";

const Patientlist = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [patientData, setPatientData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [deleteDialog, setDeleteDialog] = React.useState({ open: false, patient: null });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("https://dashboard-gb84.onrender.com/patientDashboard");
            const data = await response.json();
            setPatientData(data);
            setFilteredData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFilter = (status) => {
        setActiveFilter(status);
        if (status === "All") {
            setFilteredData(patientData);
        } else {
            const filtered = patientData.filter((item) => {
                if (status === "ACTIVE") {
                    return item.status === true;
                } else {
                    return item.status === false;
                }
            });
            setFilteredData(filtered);
        }
    };

    const handleEdit = (patient) => {
        setSelectedPatient(patient);
        setEditDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this patient record?")) {
            try {
                const response = await fetch(
                    `https://dashboard-gb84.onrender.com/patientDashboard/${id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to delete record");
                }

                setFilteredData((prev) => prev.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting record:", error);
                alert("Failed to delete record");
            }
        }
    };

    const handleEditSuccess = (updatedPatient) => {
        setFilteredData((prev) =>
            prev.map((item) =>
                item.id === updatedPatient.id ? updatedPatient : item
            )
        );
        setEditDialogOpen(false);
    };

    const getStatusColor = (active) => {
        const status = active ? 'ACTIVE' : 'INACTIVE';
        switch (status) {
            case 'ACTIVE':
                return {
                    bg: '#4CAF50',
                    hover: '#45a849',
                    light: '#e8f5e9'
                };
            case 'INACTIVE':
                return {
                    bg: '#f44336',
                    hover: '#e53935',
                    light: '#ffebee'
                };
            default:
                return {
                    bg: '#757575',
                    hover: '#616161',
                    light: '#eeeeee'
                };
        }
    };

    const getStatusIcon = (active) => {
        const status = active ? 'ACTIVE' : 'INACTIVE';
        switch (status) {
            case 'ACTIVE':
                return <CheckCircleIcon sx={{ color: active ? "#4CAF50" : "#ffffff", mr: 1 }} />;
            case 'INACTIVE':
                return <CancelIcon sx={{ color: active ? "#ffffff" : "#f44336", mr: 1 }} />;
            default:
                return null;
        }
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
            field: "allergies",
            headerName: "Allergies",
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
                    Allergies
                </Typography>
            ),
            renderCell: (params) => (
                <Typography 
                    sx={{ 
                        color: params.value === 'None' ? '#757575' : '#d32f2f',
                        fontWeight: params.value === 'None' ? 400 : 500,
                        fontSize: '13px'
                    }}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "chronicConditions",
            headerName: "Chronic Conditions",
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
                    Chronic Conditions
                </Typography>
            ),
            renderCell: (params) => (
                <Typography 
                    sx={{ 
                        color: params.value === 'None' ? '#757575' : '#d32f2f',
                        fontWeight: params.value === 'None' ? 400 : 500,
                        fontSize: '13px'
                    }}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "lastVisit",
            headerName: "Last Visit",
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
                    Last Visit
                </Typography>
            ),
            renderCell: (params) => (
                <Box
                    sx={{
                        backgroundColor: '#e3f2fd',
                        px: 2,
                        py: 0.5,
                        borderRadius: '4px',
                        border: '1px solid #90caf9'
                    }}
                >
                    <Typography 
                        sx={{ 
                            color: '#1565c0',
                            fontSize: '13px',
                            fontWeight: 500
                        }}
                    >
                        {params.value}
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
            renderCell: (params) => {
                const isActive = params.row.status === true;
                return (
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: isActive ? '#4CAF50' : '#f44336',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: isActive ? '#45a849' : '#d32f2f',
                            },
                            minWidth: '100px',
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontSize: '13px',
                            fontWeight: 500
                        }}
                        startIcon={isActive ? 
                            <CheckCircleIcon sx={{ fontSize: '16px' }} /> : 
                            <CancelIcon sx={{ fontSize: '16px' }} />
                        }
                    >
                        {isActive ? "Active" : "Inactive"}
                    </Button>
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Box display="flex" gap={1} justifyContent="center" width="100%">
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => handleEdit(params.row)}
                            sx={{ 
                                backgroundColor: '#2196F3',
                                '&:hover': {
                                    backgroundColor: '#1976D2',
                                },
                                width: '32px',
                                height: '32px',
                            }}
                        >
                            <EditIcon sx={{ color: '#fff', fontSize: '18px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => handleDelete(params.row.id)}
                            sx={{ 
                                backgroundColor: '#f44336',
                                '&:hover': {
                                    backgroundColor: '#d32f2f',
                                },
                                width: '32px',
                                height: '32px',
                            }}
                        >
                            <DeleteIcon sx={{ color: '#fff', fontSize: '18px' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 3,
                    color: '#1a237e',
                    fontWeight: 'bold',
                    borderBottom: '2px solid #e3f2fd',
                    pb: 1
                }}
            >
                Patient Records
            </Typography>

            {/* Filter Buttons */}
            <Box 
                sx={{ 
                    mt: 2, 
                    mb: 3, 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                    backgroundColor: '#fff',
                    p: 2,
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
            >
                <Box display="flex" alignItems="center">
                    <FilterListIcon sx={{ color: '#757575', mr: 1 }} />
                    <Typography color="#424242" fontWeight="500">
                        Filter:
                    </Typography>
                </Box>
                <Box display="flex" gap="10px" flexWrap="wrap">
                    <Button 
                        variant={activeFilter === "All" ? "contained" : "outlined"}
                        onClick={() => handleFilter("All")}
                        sx={{ 
                            backgroundColor: activeFilter === "All" ? '#2196F3' : 'transparent',
                            color: activeFilter === "All" ? '#fff' : '#2196F3',
                            border: '1px solid #2196F3',
                            '&:hover': {
                                backgroundColor: activeFilter === "All" ? '#1976D2' : 'rgba(33, 150, 243, 0.08)',
                            },
                            textTransform: 'none',
                            borderRadius: '8px',
                            px: 3,
                        }}
                    >
                        All
                    </Button>
                    <Button 
                        variant={activeFilter === "ACTIVE" ? "contained" : "outlined"}
                        onClick={() => handleFilter("ACTIVE")}
                        sx={{ 
                            backgroundColor: activeFilter === "ACTIVE" ? '#4CAF50' : 'transparent',
                            color: activeFilter === "ACTIVE" ? '#fff' : '#4CAF50',
                            border: '1px solid #4CAF50',
                            '&:hover': {
                                backgroundColor: activeFilter === "ACTIVE" ? '#388E3C' : 'rgba(76, 175, 80, 0.08)',
                            },
                            textTransform: 'none',
                            borderRadius: '8px',
                            px: 3,
                        }}
                    >
                        Active
                    </Button>
                    <Button 
                        variant={activeFilter === "INACTIVE" ? "contained" : "outlined"}
                        onClick={() => handleFilter("INACTIVE")}
                        sx={{ 
                            backgroundColor: activeFilter === "INACTIVE" ? '#f44336' : 'transparent',
                            color: activeFilter === "INACTIVE" ? '#fff' : '#f44336',
                            border: '1px solid #f44336',
                            '&:hover': {
                                backgroundColor: activeFilter === "INACTIVE" ? '#d32f2f' : 'rgba(244, 67, 54, 0.08)',
                            },
                            textTransform: 'none',
                            borderRadius: '8px',
                            px: 3,
                        }}
                    >
                        Inactive
                    </Button>
                </Box>
            </Box>

            {/* DataGrid */}
            <Paper
                elevation={0}
                sx={{ 
                    height: "75vh",
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    p: 3,
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
                    pageSizeOptions={[10]}
                    checkboxSelection
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #f5f5f5',
                            py: 2
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f8faff',
                            borderBottom: '2px solid #e3f2fd',
                            color: '#1a237e',
                            fontWeight: 600,
                            fontSize: '14px',
                            py: 1
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
                            py: 1
                        },
                        '& .MuiCheckbox-root': {
                            color: '#1a237e',
                        },
                        '& .MuiDataGrid-cellContent': {
                            color: '#424242',
                            py: 1
                        },
                    }}
                />
            </Paper>
            
            <PatientEdit
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                onSuccess={handleEditSuccess}
                patient={selectedPatient}
            />
        </Box>
    );
}

export default Patientlist