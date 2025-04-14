import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';

const ATTENDANCE_STORAGE_KEY = 'attendance_records';

const AttendanceManagement = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [status, setStatus] = useState('Present');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  // Load attendance data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    if (storedData) {
      setAttendanceData(JSON.parse(storedData));
    }
  }, []);

  // Update stats whenever attendance data changes
  useEffect(() => {
    updateStats();
  }, [attendanceData]);

  // Update filtered records whenever filters change
  useEffect(() => {
    applyFilters();
  }, [filterStatus, filterDate]);

  const updateStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = attendanceData.filter(record => record.date === today);
    const present = todayRecords.filter(record => record.status === 'Present').length;
    const absent = todayRecords.filter(record => record.status === 'Absent').length;
    
    setStats({
      present,
      absent,
      total: todayRecords.length
    });
  };

  const applyFilters = () => {
    let filteredData = [...attendanceData];
    
    if (filterStatus !== 'all') {
      filteredData = filteredData.filter(record => record.status === filterStatus);
    }
    
    if (filterDate) {
      filteredData = filteredData.filter(record => record.date === filterDate);
    }
    
    setAttendanceData(filteredData);
  };

  const handleMarkAttendance = () => {
    if (!employeeId || !employeeName) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    const newAttendance = {
      id: Date.now(),
      employeeId,
      employeeName,
      date,
      status,
      createdAt: new Date().toISOString()
    };

    const updatedData = [...attendanceData, newAttendance];
    setAttendanceData(updatedData);
    localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(updatedData));

    // Reset form
    setEmployeeId('');
    setEmployeeName('');
    setStatus('Present');
    setDate(new Date().toISOString().split('T')[0]);

    setSnackbar({
      open: true,
      message: 'Attendance marked successfully',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
            <Typography variant="h6">Present Today</Typography>
            <Typography variant="h4" color="primary">{stats.present}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
            <Typography variant="h6">Absent Today</Typography>
            <Typography variant="h4" color="error">{stats.absent}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6">Total Records Today</Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Mark Attendance Form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Mark Attendance</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Employee Name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleMarkAttendance}
                sx={{ 
                  backgroundColor: '#1a237e',
                  color: '#ffffff',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#0d1757'
                  }
                }}
              >
                Mark Attendance
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setEmployeeId('');
                  setEmployeeName('');
                  setStatus('Present');
                  setDate(new Date().toISOString().split('T')[0]);
                }}
                sx={{ 
                  color: '#000000',
                  borderColor: '#000000',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderColor: '#000000'
                  }
                }}
              >
                Clear Form
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Filter Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Filter Records</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Filter by Date"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filterStatus}
                label="Filter by Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Attendance Records Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Marked At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.employeeId}</TableCell>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      color={record.status === 'Present' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(record.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AttendanceManagement; 