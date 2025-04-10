import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box ,Typography } from "@mui/material";
const Patientlist = ({colors,patientData}) => {
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
        {
          field: "bloodGroup",
          headerName: "Blood Group",
          flex: 1,
        },
        {
          field: "allergies",
          headerName: "Allergies",
          flex: 1,
        },
        {
          field: "chronicConditions",
          headerName: "Chronic Conditions",
          flex: 1.5,
        },
        {
          field: "lastVisit",
          headerName: "Last Visit",
          flex: 1,
        },
        {
          field: "status",
          headerName: "Status",
          flex: 1,
          renderCell: ({ row: { status } }) => {
            return (
              <Box
                width="120px"
                p={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
                bgcolor={status ? colors.greenAccent[600] : colors.redAccent[500]}
                borderRadius={1}
              >
                <Typography textTransform="capitalize" color="white">
                  {status ? "Active" : "Inactive"}
                </Typography>
              </Box>
            );
          },
        },
      ];
  return (
    <>
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
          rows={patientData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
        />
      </Box>
    
    </>
  )
}

export default Patientlist