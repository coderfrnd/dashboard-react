import { API_BASE_URL, DEFAULT_HEADERS, ENDPOINTS } from '../config';

// Get all patients
export const getAllPatients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PATIENT}`);
    if (!response.ok) throw new Error('Failed to fetch patients');
    return await response.json();
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Get patient by ID
export const getPatientById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PATIENT}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch patient');
    return await response.json();
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
};

// Create new patient
export const createPatient = async (patientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PATIENT}`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        ...patientData,
        age: Number(patientData.age),
      }),
    });
    if (!response.ok) throw new Error('Failed to create patient');
    return await response.json();
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

// Update patient
export const updatePatient = async (id, patientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PATIENT}/${id}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        ...patientData,
        age: Number(patientData.age),
      }),
    });
    if (!response.ok) throw new Error('Failed to update patient');
    return await response.json();
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

// Delete patient
export const deletePatient = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PATIENT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete patient');
    return true;
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
}; 