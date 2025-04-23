import { Box, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, Typography, Fade, Zoom, Chip, Tooltip, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Header } from "../../components";
import { useContext, useState, useEffect } from "react";
import { ToggledContext } from "../../App";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Edit, Delete, Person, Groups, Business, CheckCircle, Notifications, Search, FilterList, Refresh } from '@mui/icons-material';
import StaffEdit from "../dashboard/StaffEdit";

const StatCard = ({ title, value, subtitle, icon, color, trend, colors }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  
  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: '20px',
          background: isDark 
            ? `linear-gradient(145deg, ${color}15, ${color}05)`
            : `linear-gradient(145deg, #ffffff, ${color}08)`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: isDark 
            ? `1px solid ${color}20`
            : `1px solid ${color}15`,
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
          },
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: isDark 
              ? `0 12px 24px ${color}15`
              : `0 12px 24px ${color}10`,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography 
              color={isDark ? "rgba(255, 255, 255, 0.7)" : "text.secondary"} 
              fontSize="0.875rem" 
              mb={1}
              sx={{ 
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {title}
              {trend && (
                <Chip
                  label={trend > 0 ? `+${trend}%` : `${trend}%`}
                  size="small"
                  sx={{
                    backgroundColor: trend > 0 ? `${colors.greenAccent[500]}20` : `${colors.redAccent[500]}20`,
                    color: trend > 0 ? colors.greenAccent[500] : colors.redAccent[500],
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: '20px'
                  }}
                />
              )}
            </Typography>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{
                background: `linear-gradient(45deg, ${color}, ${color}99)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px',
                lineHeight: 1.2
              }}
            >
              {value}
            </Typography>
          </Box>
          <Zoom in={true} timeout={1000}>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                borderRadius: '16px',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                border: `1px solid ${color}20`,
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                  background: `linear-gradient(135deg, ${color}30, ${color}20)`,
                }
              }}
            >
              {icon}
            </Box>
          </Zoom>
        </Box>
        <Typography 
          color={isDark ? "rgba(255,255,255,0.6)" : "text.secondary"} 
          fontSize="0.875rem"
          sx={{
            fontWeight: 400,
            letterSpacing: '0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {subtitle}
        </Typography>
      </Paper>
    </Fade>
  );
};

const Staff = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, staff: null });

  const theme = useTheme();
  const colors = tokens();
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
    { field: "id", headerName: "ID", flex: 0.3, minWidth: 50 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      cellClassName: "name-column--cell",
    },
    { 
      field: "department", 
      headerName: "Department", 
      flex: 1,
      minWidth: 120 
    },
    { 
      field: "shift", 
      headerName: "Shift", 
      flex: 0.7,
      minWidth: 100 
    },
    {
      field: "onDuty",
      headerName: "On Duty",
      flex: 0.5,
      minWidth: 80,
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
    { 
      field: "email", 
      headerName: "Email", 
      flex: 1.2,
      minWidth: 180 
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      minWidth: 120,
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
                backgroundColor: colors.blueAccent[600],
                fontSize: '13px',
                padding: '4px 8px',
                '&:hover': {
                  backgroundColor: colors.blueAccent[500],
                }
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
                backgroundColor: colors.redAccent[600],
                fontSize: '13px',
                padding: '4px 8px',
                '&:hover': {
                  backgroundColor: colors.redAccent[500],
                }
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
    <Box 
      sx={{ 
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 3,
        overflow: 'auto',
        background: isDark 
          ? 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)'
          : 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
        '& > *': {
          maxWidth: '100%'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Header 
          title="STAFF MANAGEMENT" 
          subtitle="Managing Hospital Staff Members" 
        />
        <Stack direction="row" spacing={2}>
          <Tooltip title="Search Staff">
            <IconButton
              sx={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                }
              }}
            >
              <Search />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter Staff">
            <IconButton
              sx={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                }
              }}
            >
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh Data">
            <IconButton
              sx={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                }
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton
              sx={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                position: 'relative',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '8px',
                  height: '8px',
                  backgroundColor: colors.redAccent[500],
                  borderRadius: '50%',
                  border: `2px solid ${isDark ? '#000' : '#fff'}`
                }
              }}
            >
              <Notifications />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Grid 
        container 
        spacing={3} 
        sx={{ 
          width: '100%',
          m: 0,
          flexShrink: 0
        }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Staff"
            value={totalStaff}
            subtitle="Total number of staff members"
            icon={<Person sx={{ color: colors.greenAccent[500], fontSize: '2rem' }} />}
            color={colors.greenAccent[500]}
            trend={5.2}
            colors={colors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="On Duty"
            value={onDutyStaff}
            subtitle="Staff members currently on duty"
            icon={<CheckCircle sx={{ color: colors.blueAccent[500], fontSize: '2rem' }} />}
            color={colors.blueAccent[500]}
            trend={-2.1}
            colors={colors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Departments"
            value={departmentCount}
            subtitle="Total number of departments"
            icon={<Business sx={{ color: colors.redAccent[500], fontSize: '2rem' }} />}
            color={colors.redAccent[500]}
            trend={0}
            colors={colors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Shifts"
            value={shiftCount}
            subtitle="Different shift types"
            icon={<Groups sx={{ color: colors.blueAccent[500], fontSize: '2rem' }} />}
            color={colors.blueAccent[500]}
            trend={1.5}
            colors={colors}
          />
        </Grid>
      </Grid>

      {/* Filter Buttons */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2,
          flexShrink: 0,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            borderRadius: '3px',
            '&:hover': {
              background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            },
          },
        }}
      >
        <Button
          variant={filter === "All" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("All")}
          sx={{
            backgroundColor: filter === "All" ? colors.blueAccent[600] : 'transparent',
            color: filter === "All" ? '#fff' : colors.blueAccent[600],
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            transition: 'all 0.3s ease',
            border: filter === "All" ? 'none' : `2px solid ${colors.blueAccent[600]}`,
            '&:hover': {
              backgroundColor: filter === "All" ? colors.blueAccent[500] : `${colors.blueAccent[600]}15`,
              transform: 'translateY(-2px)',
            }
          }}
        >
          All Staff
        </Button>
        <Button
          variant={filter === "Present" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("Present")}
          sx={{
            backgroundColor: filter === "Present" ? colors.greenAccent[600] : 'transparent',
            color: filter === "Present" ? '#fff' : colors.greenAccent[600],
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            transition: 'all 0.3s ease',
            border: filter === "Present" ? 'none' : `2px solid ${colors.greenAccent[600]}`,
            '&:hover': {
              backgroundColor: filter === "Present" ? colors.greenAccent[500] : `${colors.greenAccent[600]}15`,
              transform: 'translateY(-2px)',
            }
          }}
        >
          On Duty
        </Button>
        <Button
          variant={filter === "Absent" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("Absent")}
          sx={{
            backgroundColor: filter === "Absent" ? colors.redAccent[600] : 'transparent',
            color: filter === "Absent" ? '#fff' : colors.redAccent[600],
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            transition: 'all 0.3s ease',
            border: filter === "Absent" ? 'none' : `2px solid ${colors.redAccent[600]}`,
            '&:hover': {
              backgroundColor: filter === "Absent" ? colors.redAccent[500] : `${colors.redAccent[600]}15`,
              transform: 'translateY(-2px)',
            }
          }}
        >
          Off Duty
        </Button>
      </Box>

      {/* DataGrid */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          '& .MuiDataGrid-root': {
            border: 'none',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.2)'
              : '0 8px 32px rgba(0, 0, 0, 0.08)',
            width: '100%',
            maxWidth: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: isDark 
                ? '0 12px 48px rgba(0, 0, 0, 0.3)'
                : '0 12px 48px rgba(0, 0, 0, 0.12)',
            }
          },
          '& .MuiDataGrid-main': {
            width: '100%',
            maxWidth: '100%'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: isDark ? 'transparent' : '#ffffff',
            width: '100%',
            maxWidth: '100%'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'}`,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          },
          '& .name-column--cell': {
            color: colors.greenAccent[500],
            fontWeight: '500'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : colors.blueAccent[700],
            color: isDark ? 'white' : '#ffffff',
            borderBottom: 'none',
            width: '100%',
            maxWidth: '100%',
            '& .MuiDataGrid-columnHeader': {
              padding: '16px',
              '&:focus': {
                outline: 'none'
              }
            }
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : colors.blueAccent[700],
            color: isDark ? 'white' : '#ffffff',
            width: '100%',
            maxWidth: '100%'
          },
          '& .MuiDataGrid-toolbarContainer': {
            width: '100%',
            maxWidth: '100%',
            padding: '16px',
            '& .MuiButton-text': {
              color: isDark ? '#fff' : '#141414'
            }
          },
          '& .MuiDataGrid-row': {
            width: '100%',
            maxWidth: '100%',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.02)',
              transform: 'scale(1.01)',
            }
          }
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight={false}
          sx={{ 
            height: '100%',
            width: '100%',
            maxWidth: '100%'
          }}
        />
      </Box>

      {/* Edit Modal */}
      <StaffEdit
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        staff={selectedStaff}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialog.open} 
        onClose={() => setDeleteDialog({ open: false, staff: null })}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: isDark 
              ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
              : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            backdropFilter: 'blur(10px)',
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.2)'
              : '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: isDark 
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.05)',
          }
        }}
      >
        <DialogTitle sx={{ 
          color: isDark ? 'white' : 'text.primary',
          fontWeight: 600,
          fontSize: '1.25rem',
          pb: 1
        }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ 
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
            fontSize: '1rem'
          }}>
            Are you sure you want to delete {deleteDialog.staff?.name}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={() => setDeleteDialog({ open: false, staff: null })}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              color: isDark ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error"
            variant="contained"
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
              '&:hover': {
                transform: 'translateY(-2px)',
              }
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
