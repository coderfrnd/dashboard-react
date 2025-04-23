import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const PatientCard = ({
  patient,
  handleEdit,
  handleDelete,
}) => {
  const getStatusColor = (status) => {
    return status ? "#4CAF50" : "#F44336";
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 2, mb: 2 }}>
      <CardContent sx={{ p: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Patient • #{patient.id}
          </Typography>
          <Chip
            label={patient.status ? "Active" : "Inactive"}
            size="small"
            sx={{
              backgroundColor: getStatusColor(patient.status),
              color: '#fff',
              textTransform: 'uppercase',
            }}
          />
        </Box>

        {/* Name and Blood Group in one row */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
              {patient.name}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocalHospitalIcon fontSize="small" color="action" />
            <Typography variant="body2" component="div">
              {patient.bloodGroup}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Details in a grid layout */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
          <Typography variant="body2" color="text.secondary">
            Email: {patient.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: {patient.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary" gridColumn="span 2">
            Address: {patient.address}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
        <IconButton 
          onClick={() => handleEdit(patient)}
          sx={{ 
            color: '#2196F3',
            '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.04)' }
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton 
          onClick={() => handleDelete(patient)}
          sx={{ 
            color: '#F44336',
            '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.04)' }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PatientCard; 