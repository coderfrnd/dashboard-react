import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Avatar, 
  IconButton, 
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { 
  Person, 
  MoreVert, 
  Email, 
  Phone, 
  LocationOn, 
  Edit, 
  Delete, 
  Visibility,
  Close,
  Work,
  CalendarToday,
  AccessTime
} from '@mui/icons-material';

const StaffCard = ({ staff, colors = {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    setDetailsOpen(true);
    handleClose();
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit staff:', staff);
    handleClose();
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete staff:', staff);
    handleClose();
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <>
      <Card 
        sx={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }
        }}
      >
        <Box 
          sx={{ 
            height: '8px', 
            background: ` ${staff.onDuty ? `linear-gradient(90deg, ${colors.primary?.[400] || '#1976d2'}, ${colors.greenAccent?.[500] || '#4CAF50'})` : `linear-gradient(90deg, ${colors.primary?.[400] || '#1976d2'}, ${colors.redAccent?.[500] || '#f44336'})`}`,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px'
          }} 
        />
        
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box display="flex" alignItems="center">
              <Avatar 
                sx={{ 
                  bgcolor: "#1a237e",
                  mr: 2,
                  width: 60,
                  height: 60,
                  border: `3px solid  #1a237e`,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              >
                <Person fontSize="large" />
              </Avatar>
              <Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" fontWeight="bold" color="#111">
                    {staff.name}
                  </Typography>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%', 
                      ml: 1,
                      bgcolor: staff.onDuty ? colors.greenAccent?.[500] || '#4CAF50' : colors.redAccent?.[500] || '#f44336',
                      boxShadow: `0 0 8px ${staff.onDuty ? colors.greenAccent?.[500] || '#4CAF50' : colors.redAccent?.[500] || '#f44336'}`
                    }} 
                  />
                </Box>
                <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                  {staff.position}
                </Typography>
              </Box>
            </Box>
            
            <IconButton
              aria-label="more"
              aria-controls={open ? 'staff-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: colors.primary?.[400] || '#1976d2' }
              }}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="staff-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 3,
                sx: { borderRadius: '8px', minWidth: 180 }
              }}
            >
              <MenuItem onClick={handleViewDetails}>
                <ListItemIcon>
                  <Visibility fontSize="small" />
                </ListItemIcon>
                <ListItemText>View Details</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                  <Delete fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box display="flex" justifyContent="space-between"  flexWrap="wrap" gap={1} mb={2}>
            <Chip 
              label={staff.department} 
              size="small" 
              sx={{ 
                bgcolor: 'white',
                color: '#1a237e',
                fontWeight: 'medium',
                border: '2px solid #1a237e',
                textShadow: '0.5px 0.5px 0.5px rgba(0,0,0,0.2)',
                letterSpacing: '0.5px'
              }} 
            />
            <Chip 
              label={`ID: ${staff.id}`} 
              size="small" 
              variant="outlined"
              sx={{ 
                bgcolor: 'white',
                color: '#1a237e',
                fontWeight: 'medium',
                border: '2px solid #1a237e',
                textShadow: '0.5px 0.5px 0.5px rgba(0,0,0,0.2)',
                letterSpacing: '0.5px'
              }} 
            />
          </Box>
          
          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center">
              <Email fontSize="small" sx={{ color: 'gray', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {staff.email}
              </Typography>
            </Box>
            
            {staff.phone && (
              <Box display="flex" alignItems="center">
                <Phone fontSize="small" sx={{ color: 'gray', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {staff.phone}
                </Typography>
              </Box>
            )}
            
            {staff.location && (
              <Box display="flex" alignItems="center">
                <LocationOn fontSize="small" sx={{ color: colors.primary?.[400] || '#1976d2', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {staff.location}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Staff Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1,
          borderBottom: '1px solid #eee'
        }}>
          <Box display="flex" alignItems="center">
            <Avatar 
              sx={{ 
                bgcolor: colors.greenAccent?.[500] || '#4CAF50',
                mr: 2,
                width: 50,
                height: 50
              }}
            >
              <Person fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {staff.name}
              </Typography>
              <Typography color="text.secondary">
                {staff.position} • {staff.department}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleCloseDetails} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: '8px', bgcolor: '#f9f9f9' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Personal Information
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" alignItems="center">
                    <Email fontSize="small" sx={{ color: '#666666', mr: 1 }} />
                    <Typography variant="body2">
                      <strong>Email:</strong> {staff.email}
                    </Typography>
                  </Box>
                  
                  {staff.phone && (
                    <Box display="flex" alignItems="center">
                      <Phone fontSize="small" sx={{ color: '#666666', mr: 1 }} />
                      <Typography variant="body2">
                        <strong>Phone:</strong> {staff.phone}
                      </Typography>
                    </Box>
                  )}
                  
                  {staff.location && (
                    <Box display="flex" alignItems="center">
                      <LocationOn fontSize="small" sx={{ color: colors.primary?.[400] || '#1976d2', mr: 1 }} />
                      <Typography variant="body2">
                        <strong>Location:</strong> {staff.location}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: '8px', bgcolor: '#f9f9f9' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Work Information
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" alignItems="center">
                    <Work fontSize="small" sx={{ color: colors.primary?.[400] || '#1976d2', mr: 1 }} />
                    <Typography variant="body2">
                      <strong>Department:</strong> {staff.department}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        mr: 1,
                        bgcolor: staff.onDuty ? colors.greenAccent?.[500] || '#4CAF50' : colors.redAccent?.[500] || '#f44336',
                        boxShadow: `0 0 8px ${staff.onDuty ? colors.greenAccent?.[500] || '#4CAF50' : colors.redAccent?.[500] || '#f44336'}`
                      }} 
                    />
                    <Typography variant="body2">
                      <strong>Status:</strong> {staff.onDuty ? "On Duty" : "Off Duty"}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <CalendarToday fontSize="small" sx={{ color: colors.primary?.[400] || '#1976d2', mr: 1 }} />
                    <Typography variant="body2">
                      <strong>Join Date:</strong> {staff.joinDate || "Not specified"}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <AccessTime fontSize="small" sx={{ color: colors.primary?.[400] || '#1976d2', mr: 1 }} />
                    <Typography variant="body2">
                      <strong>Work Hours:</strong> {staff.workHours || "Standard (9 AM - 5 PM)"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, borderRadius: '8px', bgcolor: '#f9f9f9' }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Additional Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {staff.additionalInfo || "No additional information available."}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #eee' }}>
          <Button 
            variant="outlined" 
            onClick={handleCloseDetails}
            sx={{ 
              borderRadius: '8px',
              borderColor: colors.primary?.[400] || '#1976d2',
              color: colors.primary?.[400] || '#1976d2',
              '&:hover': {
                borderColor: colors.primary?.[500] || '#1565c0',
                bgcolor: 'rgba(0,0,0,0.02)'
              }
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: '8px',
              bgcolor: colors.primary?.[400] || '#1976d2',
              '&:hover': {
                bgcolor: colors.primary?.[500] || '#1565c0'
              }
            }}
          >
            Edit Profile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StaffCard; 