import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button, Stack, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Edit, Delete, Warning } from '@mui/icons-material';
import { tokens } from "../../theme";

const Patientlist = ({ patientData, onEditClick, onDeleteClick }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [deleteDialog, setDeleteDialog] = React.useState({ open: false, patient: null });

    const handleDelete = (row) => {
        setDeleteDialog({ open: true, patient: row });
    };

    const confirmDelete = () => {
        if (deleteDialog.patient && onDeleteClick) {
            onDeleteClick(deleteDialog.patient);
        }
        setDeleteDialog({ open: false, patient: null });
    };

    const cancelDelete = () => {
        setDeleteDialog({ open: false, patient: null });
    };

    const columns = [
        { 
          field: "id", 
          headerName: "ID", 
          flex: 0.5,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
          renderCell: ({ value }) => (
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "14px",
                color: theme.palette.mode === "dark" 
                  ? colors.blueAccent[100]
                  : colors.blueAccent[900],
                letterSpacing: "0.02em",
                textShadow: theme.palette.mode === "dark" 
                  ? "0 0 1px rgba(255,255,255,0.2)"
                  : "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: theme.palette.mode === "dark" 
                    ? colors.blueAccent[50] 
                    : colors.blueAccent[800],
                  transform: "scale(1.02)",
                }
              }}
            >
              {value}
            </Typography>
          ),
        },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          headerAlign: "center",
          align: "center",
          width: 80,
        },
        {
          field: "bloodGroup",
          headerName: "Blood Group",
          flex: 0.8,
          headerAlign: "center",
          align: "center",
          cellClassName: "blood-group-cell",
        },
        {
          field: "allergies",
          headerName: "Allergies",
          flex: 1,
          renderCell: ({ value }) => (
            <Typography
              sx={{
                color: value === "None" ? 
                  theme.palette.mode === "dark" ? colors.greenAccent[800] : colors.greenAccent[700] 
                  : theme.palette.mode === "dark" ? colors.redAccent[800] : colors.redAccent[700]
              }}
            >
              {value}
            </Typography>
          ),
        },
        {
          field: "chronicConditions",
          headerName: "Chronic Conditions",
          flex: 1.2,
          renderCell: ({ value }) => (
            <Typography
              sx={{
                color: value === "None" ? 
                  theme.palette.mode === "dark" ? colors.greenAccent[500] : colors.greenAccent[700] 
                  : theme.palette.mode === "dark" ? colors.redAccent[500] : colors.redAccent[700]
              }}
            >
              {value}
            </Typography>
          ),
        },
        {
          field: "lastVisit",
          headerName: "Last Visit",
          flex: 1,
          headerAlign: "center",
          align: "center",
          renderCell: ({ value }) => (
            <Box
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? colors.primary[600] : colors.gray[100],
                p: "5px 10px",
                borderRadius: "4px",
                display: "inline-block"
              }}
            >
              {value}
            </Box>
          ),
        },
        {
          field: "status",
          headerName: "Status",
          flex: 0.8,
          headerAlign: "center",
          align: "center",
          renderCell: ({ row: { status } }) => {
            return (
              <Box
                width="100px"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  status ? colors.greenAccent[600] : colors.redAccent[500]
                }
                borderRadius="4px"
                sx={{
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                    backgroundColor: status ? colors.greenAccent[500] : colors.redAccent[600],
                  }
                }}
              >
                <Typography color="#ffffff" sx={{ ml: "5px", fontSize: "13px", fontWeight: "600" }}>
                  {status ? "ACTIVE" : "INACTIVE"}
                </Typography>
              </Box>
            );
          },
        },
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
                  onClick={() => onEditClick(row)}
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
      <>
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
              // Remove or comment out this style since we're using renderCell
              color: theme.palette.mode === "dark" ? colors.greenAccent[300] : colors.greenAccent[700],
              fontWeight: "600",
            },
            "& .blood-group-cell": {
              color: theme.palette.mode === "dark" ? colors.blueAccent[300] : colors.blueAccent[700],
              fontWeight: "500",
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
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                color: theme.palette.mode === "dark" ? colors.gray[100] : colors.gray[900],
              }
            },
            "& .MuiCheckbox-root": {
              color: theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.greenAccent[600],
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.gray[50],
              },
              "&.Mui-selected": {
                backgroundColor: theme.palette.mode === "dark" ? `${colors.primary[500]}80` : `${colors.gray[100]}80`,
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? `${colors.primary[500]}a0` : `${colors.gray[100]}a0`,
                },
              },
            },
            "& .MuiDataGrid-toolbarContainer": {
              padding: "8px",
              backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "white",
              "& .MuiButton-root": {
                color: theme.palette.mode === "dark" ? colors.gray[100] : colors.gray[900],
              },
            },
          }}
        >
          <DataGrid
            rows={patientData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            getRowHeight={() => 'auto'}
            sx={{
              '& .MuiDataGrid-cell': {
                py: 1,
              },
            }}
          />
        </Box>

        {/* Delete Confirmation Dialog */}
        <Dialog 
          open={deleteDialog.open} 
          onClose={cancelDelete}
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: colors.redAccent[500], 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 2
          }}>
            <Warning /> Confirm Delete
          </DialogTitle>
          <DialogContent sx={{ mt: 2, minWidth: '400px' }}>
            <Typography variant="body1" color={theme.palette.mode === "dark" ? "white" : "text.primary"}>
              Are you sure you want to delete patient{' '}
              <Box component="span" sx={{ fontWeight: 600, color: colors.redAccent[500] }}>
                {deleteDialog.patient?.name}
              </Box>
              ? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button 
              onClick={cancelDelete}
              sx={{
                color: theme.palette.mode === "dark" ? "white" : "text.primary",
                '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              variant="contained"
              sx={{
                bgcolor: colors.redAccent[500],
                color: 'white',
                '&:hover': {
                  bgcolor: colors.redAccent[600],
                },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}

export default Patientlist