// API service for attendance management

// Base URL for the API
const API_BASE_URL = "https://dashboard-gb84.onrender.com";

// Function to mark attendance
export async function markAttendance(attendanceData) {
  try {
    // Generate a unique ID for the attendance record
    const newAttendance = {
      id: Date.now(),
      ...attendanceData,
      createdAt: new Date().toISOString()
    };
    
    // Send to the API
    const response = await fetch(
      `${API_BASE_URL}/attendanceDashboard`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAttendance),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw error;
  }
}

// Function to get attendance records with filters
export async function getAttendanceRecords(filters = {}) {
  try {
    // Get all records from the API
    const response = await fetch(
      `${API_BASE_URL}/attendanceDashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let records = await response.json();
    
    // Apply filters client-side
    if (filters.status && filters.status !== 'all') {
      records = records.filter(record => record.status === filters.status);
    }
    
    if (filters.date) {
      records = records.filter(record => record.date === filters.date);
    }
    
    if (filters.employeeId) {
      records = records.filter(record => record.employeeId === filters.employeeId);
    }
    
    // Sort by date (newest first)
    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return records;
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    // If API fails, return empty array
    return [];
  }
}

// Function to get attendance statistics
export async function getAttendanceStats(startDate, endDate) {
  try {
    // Get all records from the API
    const response = await fetch(
      `${API_BASE_URL}/attendanceDashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const records = await response.json();
    
    // Filter records by date range
    const filteredRecords = records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
    });
    
    // Calculate statistics
    const present = filteredRecords.filter(record => record.status === 'Present').length;
    const absent = filteredRecords.filter(record => record.status === 'Absent').length;
    
    return {
      present,
      absent,
      total: filteredRecords.length
    };
  } catch (error) {
    console.error("Error fetching attendance statistics:", error);
    // Return default stats if API fails
    return {
      present: 0,
      absent: 0,
      total: 0
    };
  }
} 