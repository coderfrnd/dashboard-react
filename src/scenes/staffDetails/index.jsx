import { Box, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../../components";
import { useContext, useState, useEffect } from "react";
import { ToggledContext } from "../../App";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Edit, Delete, Person, Groups, Business, CheckCircle } from '@mui/icons-material';
import StaffEdit from "../dashboard/StaffEdit";

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

const Staff = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, staff: null });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDark = theme.palette.mode === "dark";
  const subtitleColor = isDark ? colors.gray[100] : colors.gray[700];
  const { staffData, setStaffData } = useContext(ToggledContext);

  const filterData = (data, filterType) => {
    switch (filterType) {
      case "Present":
        return data.filter((staff) => staff.onDuty);
      case "Absent":
        return data.filter((staff) => !staff.onDuty);
      default:
        return data;
    }
  };

  useEffect(() => {
    setFilteredData(filterData(staffData || [], filter));
  }, [staffData, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleEditClick = (staff) => {
    setSelectedStaff(staff);
    setEditModalOpen(true);
  };

  const handleEditSuccess = async (updatedStaff) => {
    if (setStaffData) {
      setStaffData(prevData => 
        prevData.map(staff => 
          staff.id === updatedStaff.id ? updatedStaff : staff
        )
      );
      setEditModalOpen(false);
      setSelectedStaff(null);
    }
  };

  const handleDelete = (staff) => {
    setDeleteDialog({ open: true, staff });
  };

  const confirmDelete = async () => {
    if (deleteDialog.staff) {
      try {
        const response = await fetch(
          `https://dashboard-gb84.onrender.com/staffDashboard/${deleteDialog.staff.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete staff");
        }

        setStaffData(prevData => prevData.filter(s => s.id !== deleteDialog.staff.id));
      } catch (err) {
        console.error("Error deleting staff:", err);
        alert("Failed to delete staff. Please try again.");
      }
    }
    setDeleteDialog({ open: false, staff: null });
  };

  // Calculate statistics
  const totalStaff = staffData?.length || 0;
  const onDutyStaff = staffData?.filter(staff => staff.onDuty)?.length || 0;
  const departments = [...new Set(staffData?.map(staff => staff.department) || [])];
  const departmentCount = departments.length;
  const shifts = [...new Set(staffData?.map(staff => staff.shift) || [])];
  const shiftCount = shifts.length;

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      cellClassName: "name-column--cell",
    },
    { field: "department", headerName: "Department", width: 150 },
    { field: "shift", headerName: "Shift", width: 120 },
    {
      field: "onDuty",
      headerName: "On Duty",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <Box
          sx={{
            backgroundColor: row.onDuty ? colors.greenAccent[600] : colors.redAccent[500],
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '13px',
            minWidth: '45px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: row.onDuty ? colors.greenAccent[500] : colors.redAccent[400],
            }
          }}
        >
          {row.onDuty ? "Yes" : "No"}
        </Box>
      ),
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleEditClick(row)}
              startIcon={<Edit />}
              sx={{
                minWidth: '32px',
                height: '32px',
                backgroundColor: colors.greenAccent[600],
                fontSize: '13px',
                fontWeight: "500",
                color: '#ffffff',
                padding: '6px 12px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: colors.greenAccent[500],
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                },
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleDelete(row)}
              startIcon={<Delete />}
              sx={{
                minWidth: '32px',
                height: '32px',
                backgroundColor: colors.redAccent[500],
                fontSize: '13px',
                fontWeight: "500",
                color: '#ffffff',
                padding: '6px 12px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: colors.redAccent[600],
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                },
              }}
            >
              Delete
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h3" fontWeight="bold" color="#111" mb={1}>
          Staff Dashboard
        </Typography>
        <Typography color="#666">
          Monitor and manage staff records
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Staff"
            value={totalStaff}
            subtitle="Total number of employees"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>👥</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="On Duty"
            value={onDutyStaff}
            subtitle="Staff currently working"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>✅</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Departments"
            value={departmentCount}
            subtitle="Active departments"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>🏢</Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Shifts"
            value={shiftCount}
            subtitle="Different shift types"
            icon={<Box component="span" sx={{ color: colors.greenAccent[500], fontSize: '24px' }}>⏰</Box>}
          />
        </Grid>
      </Grid>

      {/* Filter Buttons */}
      <Paper
        sx={{
          p: 2,
          mb: 4,
          borderRadius: '12px',
          backgroundColor: 'white',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Button
          variant={filter === "All" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("All")}
          sx={{
            backgroundColor: filter === "All" ? colors.blueAccent[500] : 'transparent',
            color: filter === "All" ? '#ffffff' : colors.blueAccent[500],
            borderColor: colors.blueAccent[500],
            '&:hover': {
              backgroundColor: filter === "All" ? colors.blueAccent[600] : 'rgba(0, 0, 0, 0.05)',
              borderColor: colors.blueAccent[500],
            },
          }}
        >
          All Staff
        </Button>
        <Button
          variant={filter === "Present" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("Present")}
          sx={{
            backgroundColor: filter === "Present" ? colors.greenAccent[500] : 'transparent',
            color: filter === "Present" ? '#ffffff' : colors.greenAccent[500],
            borderColor: colors.greenAccent[500],
            '&:hover': {
              backgroundColor: filter === "Present" ? colors.greenAccent[600] : 'rgba(0, 0, 0, 0.05)',
              borderColor: colors.greenAccent[500],
            },
          }}
        >
          On Duty
        </Button>
        <Button
          variant={filter === "Absent" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("Absent")}
          sx={{
            backgroundColor: filter === "Absent" ? colors.redAccent[500] : 'transparent',
            color: filter === "Absent" ? '#ffffff' : colors.redAccent[500],
            borderColor: colors.redAccent[500],
            '&:hover': {
              backgroundColor: filter === "Absent" ? colors.redAccent[600] : 'rgba(0, 0, 0, 0.05)',
              borderColor: colors.redAccent[500],
            },
          }}
        >
          Off Duty
        </Button>
      </Paper>

      {/* Data Table */}
      <Paper
        sx={{
          borderRadius: '12px',
          backgroundColor: 'white',
          overflow: 'hidden',
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
        }}
      >
        <Box p={3}>
          <Typography variant="h5" fontWeight="bold" color="#111" mb={3}>
            Staff Records
          </Typography>
          <Box
            sx={{
              height: '65vh',
              width: '100%',
              '& .MuiDataGrid-root': {
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderColor: '#f0f0f0'
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8f8f8',
                  borderBottom: '2px solid #eee',
                },
                '& .MuiDataGrid-virtualScroller': {
                  backgroundColor: '#ffffff',
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid #eee',
                  backgroundColor: '#f8f8f8',
                },
                '& .name-column--cell': {
                  color: colors.greenAccent[600],
                  fontWeight: 600
                },
                '& .MuiDataGrid-row': {
                  '&:nth-of-type(2n)': {
                    backgroundColor: '#fafafa',
                  },
                },
              },
            }}
          >
            <DataGrid
              rows={filteredData}
              columns={columns}
              loading={!staffData}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 20]}
              checkboxSelection
              disableRowSelectionOnClick
              getRowHeight={() => 52}
              sx={{
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Edit Modal */}
      <StaffEdit
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedStaff(null);
        }}
        onSuccess={handleEditSuccess}
        staff={selectedStaff}
      />

      {/* Delete Dialog */}
      <Dialog 
        open={deleteDialog.open} 
        onClose={() => setDeleteDialog({ open: false, staff: null })}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
          }
        }}
      >
        <DialogTitle>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {deleteDialog.staff?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, staff: null })}
            sx={{ color: colors.blueAccent[500] }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete}
            variant="contained"
            sx={{
              backgroundColor: colors.redAccent[500],
              color: 'white',
              '&:hover': {
                backgroundColor: colors.redAccent[600],
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Staff;
