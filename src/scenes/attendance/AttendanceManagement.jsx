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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { markAttendance, getAttendanceRecords, getAttendanceStats } from '../../dataSend/attendanceService';

// Local storage fallback
const ATTENDANCE_STORAGE_KEY = 'attendance_records_fallback';

// Function to get all attendance records from local storage
const getAllAttendanceRecordsFromStorage = () => {
  try {
    const records = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    return records ? JSON.parse(records) : [];
  } catch (error) {
    console.error("Error getting attendance records from local storage:", error);
    return [];
  }
};

// Function to save attendance records to local storage
const saveAttendanceRecordsToStorage = (records) => {
  try {
    localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error("Error saving attendance records to local storage:", error);
    return false;
  }
};

const AttendanceManagement = () => {
  const [date, setDate] = useState(dayjs());
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [status, setStatus] = useState('Present');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [stats, setStats] = useState({ present: 0, absent: 0 });
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState(dayjs());
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch attendance records on component mount
  useEffect(() => {
    fetchAttendanceRecords();
    fetchAttendanceStats();
  }, []);

  // Fetch attendance records when filters change
  useEffect(() => {
    fetchAttendanceRecords();
  }, [filterStatus, filterDate]);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      const filters = {};
      
      if (filterStatus !== 'all') {
        filters.status = filterStatus;
      }
      
      if (filterDate) {
        filters.date = filterDate.format('YYYY-MM-DD');
      }
      
      const data = await getAttendanceRecords(filters);
      
      // If API returns empty array, try to get from local storage
      if (data.length === 0 && !usingFallback) {
        const localData = getAllAttendanceRecordsFromStorage();
        if (localData.length > 0) {
          setUsingFallback(true);
          setSnackbar({
            open: true,
            message: 'Using local storage data as API is not available',
            severity: 'warning'
          });
          
          // Apply filters to local data
          let filteredData = localData;
          if (filters.status && filters.status !== 'all') {
            filteredData = filteredData.filter(record => record.status === filters.status);
          }
          
          if (filters.date) {
            filteredData = filteredData.filter(record => record.date === filters.date);
          }
          
          if (filters.employeeId) {
            filteredData = filteredData.filter(record => record.employeeId === filters.employeeId);
          }
          
          // Sort by date (newest first)
          filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
          
          setAttendanceData(filteredData);
        } else {
          setAttendanceData([]);
        }
      } else {
        setAttendanceData(data);
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      
      // Try to get from local storage as fallback
      if (!usingFallback) {
        const localData = getAllAttendanceRecordsFromStorage();
        if (localData.length > 0) {
          setUsingFallback(true);
          setSnackbar({
            open: true,
            message: 'Using local storage data as API is not available',
            severity: 'warning'
          });
          setAttendanceData(localData);
        } else {
          setSnackbar({
            open: true,
            message: 'Failed to fetch attendance records',
            severity: 'error'
          });
          setAttendanceData([]);
        }
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to fetch attendance records',
          severity: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceStats = async () => {
    try {
      const today = dayjs().format('YYYY-MM-DD');
      const data = await getAttendanceStats(today, today);
      
      // If API returns default stats, try to get from local storage
      if (data.present === 0 && data.absent === 0 && data.total === 0 && !usingFallback) {
        const localData = getAllAttendanceRecordsFromStorage();
        if (localData.length > 0) {
          const todayRecords = localData.filter(record => record.date === today);
          const present = todayRecords.filter(record => record.status === 'Present').length;
          const absent = todayRecords.filter(record => record.status === 'Absent').length;
          
          setStats({
            present,
            absent,
            total: todayRecords.length
          });
        } else {
          setStats(data);
        }
      } else {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
      
      // Try to get from local storage as fallback
      if (!usingFallback) {
        const localData = getAllAttendanceRecordsFromStorage();
        if (localData.length > 0) {
          const today = dayjs().format('YYYY-MM-DD');
          const todayRecords = localData.filter(record => record.date === today);
          const present = todayRecords.filter(record => record.status === 'Present').length;
          const absent = todayRecords.filter(record => record.status === 'Absent').length;
          
          setStats({
            present,
            absent,
            total: todayRecords.length
          });
        } else {
          setStats({ present: 0, absent: 0, total: 0 });
        }
      }
    }
  };

  const handleMarkAttendance = async () => {
    try {
      setLoading(true);
      const attendancePayload = {
        employeeId,
        employeeName,
        date: date.format('YYYY-MM-DD'),
        status,
        checkIn: new Date().toLocaleTimeString(),
      };

      try {
        // Try to send to API
        await markAttendance(attendancePayload);
        
        // Also save to local storage as backup
        const localData = getAllAttendanceRecordsFromStorage();
        const newAttendance = {
          id: Date.now(),
          ...attendancePayload,
          createdAt: new Date().toISOString()
        };
        saveAttendanceRecordsToStorage([...localData, newAttendance]);
        
        // Show success message
        setSnackbar({
          open: true,
          message: 'Attendance marked successfully',
          severity: 'success'
        });
      } catch (apiError) {
        console.error('API error, saving to local storage only:', apiError);
        
        // Save to local storage only
        const localData = getAllAttendanceRecordsFromStorage();
        const newAttendance = {
          id: Date.now(),
          ...attendancePayload,
          createdAt: new Date().toISOString()
        };
        saveAttendanceRecordsToStorage([...localData, newAttendance]);
        
        setUsingFallback(true);
        setSnackbar({
          open: true,
          message: 'API unavailable. Attendance saved to local storage only.',
          severity: 'warning'
        });
      }
      
      // Refresh data after marking attendance
      fetchAttendanceRecords();
      fetchAttendanceStats();
      
      // Reset form
      setEmployeeId('');
      setEmployeeName('');
    } catch (error) {
      console.error('Error marking attendance:', error);
      setSnackbar({
        open: true,
        message: 'Failed to mark attendance',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold" sx={{ mb: "5px" }}>
          ATTENDANCE MANAGEMENT
        </Typography>
        {usingFallback && (
          <Chip 
            label="Using Local Storage" 
            color="warning" 
            variant="outlined" 
            sx={{ ml: 2 }}
          />
        )}
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mark Attendance
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                fullWidth
                disabled={loading}
              />
              <TextField
                label="Employee Name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                fullWidth
                disabled={loading}
              />
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                  <MenuItem value="Late">Late</MenuItem>
                  <MenuItem value="Half Day">Half Day</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{ textField: { fullWidth: true, disabled: loading } }}
                />
              </LocalizationProvider>
              <Button
                variant="contained"
                color="primary"
                onClick={handleMarkAttendance}
                disabled={!employeeId || !employeeName || loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? 'Processing...' : 'Mark Attendance'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Today's Statistics
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>
                Total Present: {stats.present || 0}
              </Typography>
              <Typography>
                Total Absent: {stats.absent || 0}
              </Typography>
              <Typography>
                Total Records: {stats.total || 0}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Attendance Records
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="Present">Present</MenuItem>
                    <MenuItem value="Absent">Absent</MenuItem>
                    <MenuItem value="Late">Late</MenuItem>
                    <MenuItem value="Half Day">Half Day</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Filter by Date"
                    value={filterDate}
                    onChange={(newDate) => setFilterDate(newDate)}
                    slotProps={{ textField: { size: 'small' } }}
                  />
                </LocalizationProvider>
                <Button 
                  variant="outlined" 
                  onClick={fetchAttendanceRecords}
                  disabled={loading}
                >
                  Refresh
                </Button>
              </Box>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Check In</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.length > 0 ? (
                      attendanceData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.employeeId}</TableCell>
                          <TableCell>{row.employeeName}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.checkIn}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No attendance records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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