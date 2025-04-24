import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const PatientTable = ({ patientData, onEdit, onDelete }) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '12px',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="#111" mb={3}>
        Patient Records
      </Typography>
      <TableContainer 
        sx={{ 
          maxHeight: 440,
          overflow: 'auto',
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'divider',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            '&:hover': {
              background: '#555',
            },
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', position: 'sticky', left: 0, zIndex: 2 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Blood Group</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', position: 'sticky', right: 0, zIndex: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientData.map((patient) => (
              <TableRow 
                key={patient.id}
                // sx={{ 
                //   '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                //   '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' }
                // }}
              >
                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'inherit' }}>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.bloodGroup}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: patient.status ? '#4CAF50' : '#F44336',
                      color: '#fff',
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px',
                      display: 'inline-block',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                    }}
                  >
                    {patient.status ? 'Ongoing' : 'Complete'}
                  </Box>
                </TableCell>
                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'inherit' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      sx={{ 
                        color: 'green', 
                        borderColor: 'green',
                        '&:hover': {
                          borderColor: 'darkgreen',
                          backgroundColor: 'rgba(0, 128, 0, 0.04)'
                        }
                      }}
                      onClick={() => onEdit(patient)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="error"
                      onClick={() => onDelete(patient)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PatientTable; 