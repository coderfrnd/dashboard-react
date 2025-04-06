import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../../components";
import { useContext } from "react";
import { ToggledContext } from "../../App";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const Staff = () => {
  const { staffData } = useContext(ToggledContext);
  console.log(staffData);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        <span
          style={{
            color: row.onDuty ? "limegreen" : "tomato",
            fontWeight: 600,
          }}
        >
          {row.onDuty ? "Yes" : "No"}
        </span>
      ),
    },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Staff" subtitle="Manage Staff" />
      <Box
        mt="40px"
        height="75vh"
        flex={1}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
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
        }}
      >
        <DataGrid
          rows={staffData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Staff;
