import React, { useState, useEffect } from 'react'
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StaffEdit from "../dashboard/StaffEdit";

const StaffList = () => {
    const [staffData, setStaffData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("https://dashboard-gb84.onrender.com/staffDashboard");
            const data = await response.json();
            setStaffData(data);
            setFilteredData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFilter = (filter) => {
        setActiveFilter(filter);
        if (filter === "All") {
            setFilteredData(staffData);
        } else if (filter === "Present") {
            setFilteredData(staffData.filter(staff => staff.status === true));
        } else {
            setFilteredData(staffData.filter(staff => staff.status === false));
        }
    };

    const handleEdit = (staff) => {
        setSelectedStaff(staff);
        setEditDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this staff record?")) {
            try {
                const response = await fetch(
                    `https://dashboard-gb84.onrender.com/staffDashboard/${id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to delete record");
                }

                setFilteredData((prev) => prev.filter((item) => item.id !== id));
                setStaffData((prev) => prev.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting record:", error);
                alert("Failed to delete record");
            }
        }
    };

    const handleEditSuccess = (updatedStaff) => {
        const updateData = (prev) =>
            prev.map((item) =>
                item.id === updatedStaff.id ? updatedStaff : item
            );
        setFilteredData(updateData);
        setStaffData(updateData);
        setEditDialogOpen(false);
    };

    const columns = [
        { 
            field: "id", 
            headerName: "ID", 
            width: 70,
        },
        {
            field: "name",
            headerName: "Name",
            width: 180,
        },
        {
            field: "department",
            headerName: "Department",
            width: 180,
        },
        {
            field: "shift",
            headerName: "Shift",
            width: 130,
        },
        {
            field: "status",
            headerName: "On Duty",
            width: 100,
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: params.row.status ? '#4caf50' : '#f44336',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        width: '40px',
                        textAlign: 'center'
                    }}
                >
                    {params.row.status ? "Yes" : "No"}
                </div>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            width: 220,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 150,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Box display="flex" gap={1}>
                    <button
                        onClick={() => handleEdit(params.row)}
                        style={{
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '13px'
                        }}
                    >
                        <EditIcon style={{ fontSize: '16px' }} />
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(params.row.id)}
                        style={{
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '13px'
                        }}
                    >
                        <DeleteIcon style={{ fontSize: '16px' }} />
                        Delete
                    </button>
                </Box>
            ),
        },
    ];

    return (
        <Box p={3}>
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 3,
                    color: '#1a237e',
                    fontWeight: 'bold',
                    borderBottom: '2px solid #e3f2fd',
                    pb: 1,
                    fontSize: '2.5rem'
                }}
            >
                Staff Records
            </Typography>
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => handleFilter("All")}
                        style={{
                            backgroundColor: activeFilter === "All" ? '#2196f3' : 'transparent',
                            color: activeFilter === "All" ? 'white' : '#2196f3',
                            border: '1px solid #2196f3',
                            padding: '6px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilter("Present")}
                        style={{
                            backgroundColor: activeFilter === "Present" ? '#4caf50' : 'transparent',
                            color: activeFilter === "Present" ? 'white' : '#4caf50',
                            border: '1px solid #4caf50',
                            padding: '6px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Present
                    </button>
                    <button
                        onClick={() => handleFilter("Absent")}
                        style={{
                            backgroundColor: activeFilter === "Absent" ? '#f44336' : 'transparent',
                            color: activeFilter === "Absent" ? 'white' : '#f44336',
                            border: '1px solid #f44336',
                            padding: '6px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Absent
                    </button>
                </div>
            </div>

            <div style={{ 
                height: 'calc(100vh - 200px)', 
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                padding: '30px'
            }}>
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
                            padding: '16px 8px',
                            minHeight: '60px !important',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f8faff',
                            borderBottom: '2px solid #e3f2fd',
                            color: '#1a237e',
                            fontWeight: 600,
                            fontSize: '1.2rem',
                            padding: '16px 8px',
                            minHeight: '60px !important',
                        },
                        '& .MuiDataGrid-row': {
                            color: '#424242',
                            fontSize: '1.1rem',
                            minHeight: '60px !important',
                            '&:hover': {
                                backgroundColor: '#f8faff',
                            },
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: 'none',
                            backgroundColor: '#fff',
                            padding: '16px 8px',
                        },
                        '& .MuiCheckbox-root': {
                            color: '#1a237e',
                        },
                        '& .MuiDataGrid-cellContent': {
                            color: '#424242',
                            padding: '8px 0',
                        },
                    }}
                />
            </div>
            
            <StaffEdit
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                onSuccess={handleEditSuccess}
                staff={selectedStaff}
            />
        </Box>
    );
}

export default StaffList; 