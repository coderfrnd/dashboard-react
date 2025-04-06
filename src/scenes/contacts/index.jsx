import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { createContext, useContext, useEffect, useState } from "react";
import { ToggledContext } from "../../App";
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { patientData } = useContext(ToggledContext);

  const [filterStatus, setFilterStatus] = useState("all");
  const filteredRows = patientData.filter((row) => {
    if (filterStatus === "active") return row.status === true;
    if (filterStatus === "inactive") return row.status === false;
    return true; // "all"
  });
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "bloodGroup", headerName: "Blood Group", flex: 0.7 },
    { field: "allergies", headerName: "Allergies", flex: 1 },
    { field: "chronicConditions", headerName: "Chronic Conditions", flex: 1.2 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.6,
      renderCell: ({ row }) => (
        <span style={{ color: row.status ? "lightgreen" : "tomato" }}>
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="History"
        subtitle="List of Patients - Active & Inactive Filter"
      />

      <ButtonGroup variant="contained" sx={{ mb: 2 }}>
        <Button
          onClick={() => setFilterStatus("all")}
          sx={{
            backgroundColor: "#607d8b",
            "&:hover": { backgroundColor: "#546e7a" },
          }}
        >
          All
        </Button>
        <Button
          onClick={() => setFilterStatus("active")}
          sx={{
            backgroundColor: "#4caf50",
            "&:hover": { backgroundColor: "#43a047" },
          }}
        >
          Active
        </Button>
        <Button
          onClick={() => setFilterStatus("inactive")}
          sx={{
            backgroundColor: "#f44336",
            "&:hover": { backgroundColor: "#e53935" },
          }}
        >
          Inactive
        </Button>
      </ButtonGroup>

      <Box
        mt="20px"
        height="75vh"
        maxWidth="100%"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
