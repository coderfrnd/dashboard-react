import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Paper,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../../theme";
import { useState, useContext, useMemo } from "react";
import { Header } from "../../components";
import { ToggledContext } from "../../App";

// Staff List Component
const StaffList = ({ staffData, selectedStaff, onStaffClick }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        flex: '1 1 25%',
        minWidth: '260px',
        maxWidth: '400px',
        bgcolor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e0e0e0'
      }}
    >
      <Box
        p={3}
        sx={{
          background: '#f5f7fa',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#2c3e50',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}
        >
          Staff List
        </Typography>
      </Box>

      <List 
        sx={{ 
          maxHeight: '65vh', 
          overflowY: 'auto', 
          p: 0,
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: '#f5f7fa'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#bdbdbd'
            }
          }
        }}
      >
        {staffData.map((staff) => (
          <ListItem 
            key={staff.id}
            onClick={() => onStaffClick(staff.id)}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#f5f7fa'
              },
              backgroundColor: selectedStaff === staff.id ? '#f5f7fa' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              position: 'relative',
              pl: 4,
              py: 2,
              borderBottom: '1px solid #f0f0f0'
            }}
          >
            <Box
              sx={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: staff.onDuty ? '#4CAF50' : '#f44336',
                position: 'absolute',
                left: '20px',
                boxShadow: staff.onDuty 
                  ? '0 0 8px rgba(76, 175, 80, 0.5)' 
                  : '0 0 8px rgba(244, 67, 54, 0.5)',
                border: '2px solid #fff'
              }}
            />
            <ListItemText
              primary={staff.name}
              secondary={staff.department}
              primaryTypographyProps={{
                sx: { 
                  color: '#2c3e50',
                  fontWeight: '500',
                  fontSize: '0.95rem'
                }
              }}
              secondaryTypographyProps={{
                sx: { 
                  color: '#7f8c8d',
                  fontSize: '0.85rem',
                  mt: 0.5
                }
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box p={2} sx={{ borderTop: '1px solid #e0e0e0', backgroundColor: '#f5f7fa' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onStaffClick("all")}
          sx={{
            backgroundColor: '#1976d2',
            color: '#ffffff',
            py: 1.5,
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '0.5px',
            transition: 'all 0.2s ease',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#1976d2',
              boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
            }
          }}
        >
          View All Staff
        </Button>
      </Box>
    </Paper>
  );
};

// Calendar Component
const CalendarView = ({ attendanceEvents, isSmDevices, isXsDevices }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        flex: '1 1 70%',
        minWidth: '300px',
        borderRadius: '12px',
        overflow: 'hidden',
        bgcolor: '#ffffff',
        border: '1px solid #e0e0e0',
        '& .fc': {
          height: '100%'
        },
        '& .fc-theme-standard .fc-list-day-cushion': {
          backgroundColor: '#f5f7fa'
        },
        '& .fc .fc-button': {
          backgroundColor: '#1976d2',
          borderColor: '#2196f3',
          color: '#ffffff',
          textTransform: 'none',
          fontSize: '0.9rem',
          fontWeight: '500',
          padding: '8px 16px',
          transition: 'all 0.2s ease',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#1976d2',
            borderColor: '#1976d2',
            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
          }
        },
        '& .fc .fc-button-active': {
          backgroundColor: '#1976d2',
          borderColor: '#1976d2',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        },
        '& .fc-theme-standard td, & .fc-theme-standard th': {
          borderColor: '#e0e0e0'
        },
        '& .fc-day-today': {
          backgroundColor: '#f5f7fa !important'
        },
        '& .fc-cell-shaded, & .fc-day-disabled': {
          backgroundColor: '#f5f7fa'
        },
        '& .fc-day-number': {
          color: '#2c3e50'
        },
        '& .fc-daygrid-day-number': {
          color: '#2c3e50',
          padding: '8px'
        },
        '& .fc-col-header-cell': {
          padding: '12px 0',
          backgroundColor: '#f5f7fa',
          color: '#2c3e50'
        },
        '& .fc-day-sat, & .fc-day-sun': {
          backgroundColor: '#fafafa'
        }
      }}
    >
      <FullCalendar
        height="75vh"
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
        ]}
        headerToolbar={{
          left: `${isSmDevices ? "prev,next" : "prev,next today"}`,
          center: "title",
          right: `${
            isXsDevices
              ? ""
              : isSmDevices
              ? "dayGridMonth,listMonth"
              : "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
          }`,
        }}
        initialView="dayGridMonth"
        events={attendanceEvents}
        dayMaxEvents={true}
      />
    </Paper>
  );
};

// Main Calendar Component
const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(max-width:920px)");
  const isSmDevices = useMediaQuery("(max-width:600px)");
  const isXsDevices = useMediaQuery("(max-width:380px)");
  const [selectedStaff, setSelectedStaff] = useState("all");

  const { staffData } = useContext(ToggledContext);

  const handleStaffClick = (staffId) => {
    setSelectedStaff(staffId);
  };

  // Memoize the attendance events
  const attendanceEvents = useMemo(() => {
    if (!staffData) return [];
    
    const events = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const filteredStaff = selectedStaff === "all" 
      ? staffData 
      : staffData.filter(staff => staff.id === selectedStaff);
    
    filteredStaff.forEach(staff => {
      staff.attendance.forEach((isPresent, index) => {
        const eventDate = new Date(currentYear, currentMonth, index + 1);
        events.push({
          id: `${staff.id}-${eventDate.toISOString()}`,
          title: "",
          date: eventDate.toISOString().split('T')[0],
          backgroundColor: isPresent ? '#4CAF50' : '#f44336',
          borderColor: isPresent ? '#4CAF50' : '#f44336',
          textColor: '#ffffff',
          display: 'background',
          extendedProps: {
            staffId: staff.id,
            staffName: staff.name,
            department: staff.department,
            status: isPresent ? 'Present' : 'Absent'
          }
        });
      });
    });
    
    return events;
  }, [staffData, selectedStaff]);

  return (
    <Box m="20px">
      <Header title="Staff Attendance Calendar" subtitle="Track staff attendance patterns" />
      
      <Box
        display="flex"
        justifyContent="space-between"
        gap={3}
        flexWrap="wrap"
      >
        <StaffList 
          staffData={staffData} 
          selectedStaff={selectedStaff} 
          onStaffClick={handleStaffClick} 
        />
        <CalendarView 
          attendanceEvents={attendanceEvents}
          isSmDevices={isSmDevices}
          isXsDevices={isXsDevices}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
