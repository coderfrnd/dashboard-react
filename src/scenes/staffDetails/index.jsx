import { Box, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../../components";
import { useContext, useState, useEffect } from "react";
import { ToggledContext } from "../../App";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Edit, Delete } from '@mui/icons-material';
import StaffEdit from "../dashboard/StaffEdit";

const Staff = ({ staffData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, staff: null });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setStaffData } = useContext(ToggledContext);

  const fetchStaffData = async () => {
    try {
      const response = await fetch('https://dashboard-gb84.onrender.com/staffDashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch staff data');
      }
      const data = await response.json();
      setStaffData(data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  useEffect(() => {
    if (filter === "All") {
      setFilteredData(staffData);
    } else if (filter === "Present") {
      setFilteredData(staffData.filter((staff) => staff.onDuty));
    } else if (filter === "Absent") {
      setFilteredData(staffData.filter((staff) => !staff.onDuty));
    }
  }, [staffData, filter]);

  const handleEditClick = (staff) => {
    setSelectedStaff(staff);
    setEditModalOpen(true);
  };

  const handleEditSuccess = async (updatedStaff) => {
    if (setStaffData) {
      // Update local state immediately for UI responsiveness
      setStaffData(prevData => 
        prevData.map(staff => 
          staff.id === updatedStaff.id ? updatedStaff : staff
        )
      );
      // Fetch fresh data from server to ensure consistency
      await fetchStaffData();
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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "shift", headerName: "Shift", flex: 1 },
    {
      field: "onDuty",
      headerName: "On Duty",
      flex: 1,
      renderCell: ({ row }) => (
        <Box
          width="100px"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            row.onDuty ? colors.greenAccent[600] : colors.redAccent[500]
          }
          borderRadius="4px"
          sx={{
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
              backgroundColor: row.onDuty ? colors.greenAccent[500] : colors.redAccent[600],
            }
          }}
        >
          <span style={{ color: "#ffffff", fontWeight: 600 }}>
            {row.onDuty ? "Yes" : "No"}
          </span>
        </Box>
      ),
    },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
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
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: colors.greenAccent[500],
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  backgroundColor: colors.greenAccent[700],
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
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: colors.redAccent[600],
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  backgroundColor: colors.redAccent[700],
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
    <Box m="20px">
      <Header title="Staff List" subtitle="All the Staff Details" />

      {/* Filter Buttons */}
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant={filter === "All" ? "contained" : "outlined"}
          onClick={() => setFilter("All")}
        >
          All
        </Button>
        <Button
          variant={filter === "Present" ? "contained" : "outlined"}
          color="success"
          onClick={() => setFilter("Present")}
        >
          Present
        </Button>
        <Button
          variant={filter === "Absent" ? "contained" : "outlined"}
          color="error"
          onClick={() => setFilter("Absent")}
        >
          Absent
        </Button>
      </Stack>

      {/* Data Table */}
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px 0 rgba(0,0,0,0.05)",
            transition: "all 0.2s ease-in-out",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${theme.palette.mode === "dark" ? colors.primary[500] : colors.gray[200]}`,
            color: theme.palette.mode === "dark" ? colors.gray[100] : colors.gray[900],
            fontSize: "13px",
            padding: "12px",
          },
          "& .name-column--cell": {
            color: theme.palette.mode === "dark" ? colors.greenAccent[300] : colors.greenAccent[700],
            fontWeight: "600",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.gray[50],
            borderBottom: `2px solid ${theme.palette.mode === "dark" ? colors.primary[500] : colors.gray[200]}`,
            color: theme.palette.mode === "dark" ? colors.gray[100] : colors.gray[900],
            fontWeight: "600",
            fontSize: "14px",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "white",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: `1px solid ${theme.palette.mode === "dark" ? colors.primary[500] : colors.gray[200]}`,
            backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "white",
            "& .MuiTablePagination-root": {
              color: theme.palette.mode === "dark" ? colors.gray[100] : colors.gray[900],
            },
          },
          "& .MuiCheckbox-root": {
            color: theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.greenAccent[600],
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.gray[50],
            },
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
        />
      </Box>

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

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialog.open} 
        onClose={() => setDeleteDialog({ open: false, staff: null })}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {deleteDialog.staff?.name}?
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, staff: null })}
            sx={{ color: colors.blueAccent[300] }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete}
            variant="contained"
            color="error"
            sx={{
              backgroundColor: colors.redAccent[500],
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
