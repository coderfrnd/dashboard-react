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
import EmailIcon from '@mui/icons-material/Email';

const InvoiceCard = ({
  item,
  getStatusColor,
  handleEdit,
  handleDelete,
  handleClaimStatusChange,
}) => {
  const getClaimStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return {
          color: "#2e7d32",
          borderColor: "#2e7d32",
          '&:hover': {
            backgroundColor: 'rgba(46, 125, 50, 0.04)',
            borderColor: "#2e7d32",
          }
        };
      case "Rejected":
        return {
          color: "#d32f2f",
          borderColor: "#d32f2f",
          '&:hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.04)',
            borderColor: "#d32f2f",
          }
        };
      case "Pending":
        return {
          color: "#ed6c02",
          borderColor: "#ed6c02",
          '&:hover': {
            backgroundColor: 'rgba(237, 108, 2, 0.04)',
            borderColor: "#ed6c02",
          }
        };
      default:
        return {
          color: "#757575",
          borderColor: "#757575",
          '&:hover': {
            backgroundColor: 'rgba(117, 117, 117, 0.04)',
            borderColor: "#757575",
          }
        };
    }
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 2, mb: 2 }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" color="text.secondary">
            Invoice • #{item.id}
          </Typography>
          <Chip
            label={item.paymentStatus}
            size="small"
            sx={{
              backgroundColor: getStatusColor(item.paymentStatus),
              color: '#fff',
              textTransform: 'uppercase',
            }}
          />
        </Box>

        {/* Email */}
        <Box display="flex" alignItems="center" gap={1} my={1}>
          <EmailIcon fontSize="small" color="action" />
          <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
            {item.email}
          </Typography>
        </Box>

        {/* Amount */}
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 600, my: 1 }}
        >
          ${item.amount}
        </Typography>

        <Divider sx={{ mb: 1 }} />

        {/* Details */}
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          <Typography variant="body2" color="text.secondary">
            Bill Date
          </Typography>
          <Typography variant="body2">
            {item.billDate}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Phone
          </Typography>
          <Typography variant="body2">
            {item.phone}
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        {/* Edit & Delete */}
        <Box>
          <IconButton size="small" onClick={() => handleEdit(item)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(item.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Claim Status */}
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleClaimStatusChange(item.id, item.claimStatus)}
          sx={{
            ...getClaimStatusStyle(item.claimStatus),
            textTransform: 'none',
            fontWeight: 500,
            px: 2,
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
            }
          }}
        >
          {item.claimStatus}
        </Button>
      </CardActions>
    </Card>
  );
};

export default InvoiceCard;
