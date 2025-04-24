import { API_BASE_URL, DEFAULT_HEADERS, ENDPOINTS } from '../config';

// Get all staff members
export const getAllStaff = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF}`);
    if (!response.ok) throw new Error('Failed to fetch staff');
    return await response.json();
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

// Get staff member by ID
export const getStaffById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch staff member');
    return await response.json();
  } catch (error) {
    console.error('Error fetching staff member:', error);
    throw error;
  }
};

// Create new staff member
export const createStaff = async (staffData) => {
  try {
    const formattedData = {
      ...staffData,
      status: staffData.onDuty,
      salary: Number(staffData.salary),
    };

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF}`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(formattedData),
    });
    if (!response.ok) throw new Error('Failed to create staff member');
    return await response.json();
  } catch (error) {
    console.error('Error creating staff member:', error);
    throw error;
  }
};

// Update staff member
export const updateStaff = async (id, staffData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF}/${id}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(staffData),
    });
    if (!response.ok) throw new Error('Failed to update staff member');
    return await response.json();
  } catch (error) {
    console.error('Error updating staff member:', error);
    throw error;
  }
};

// Delete staff member
export const deleteStaff = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.STAFF}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete staff member');
    return true;
  } catch (error) {
    console.error('Error deleting staff member:', error);
    throw error;
  }
}; 