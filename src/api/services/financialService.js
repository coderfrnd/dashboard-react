import { API_BASE_URL, DEFAULT_HEADERS, ENDPOINTS } from '../config';

// Get all financial records
export const getAllFinancialRecords = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.FINANCIAL}`);
    if (!response.ok) throw new Error('Failed to fetch financial records');
    return await response.json();
  } catch (error) {
    console.error('Error fetching financial records:', error);
    throw error;
  }
};

// Get financial record by ID
export const getFinancialRecordById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.FINANCIAL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch financial record');
    return await response.json();
  } catch (error) {
    console.error('Error fetching financial record:', error);
    throw error;
  }
};

// Create new financial record
export const createFinancialRecord = async (financialData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.FINANCIAL}`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(financialData),
    });
    if (!response.ok) throw new Error('Failed to create financial record');
    return await response.json();
  } catch (error) {
    console.error('Error creating financial record:', error);
    throw error;
  }
};

// Update financial record
export const updateFinancialRecord = async (id, financialData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.FINANCIAL}/${id}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(financialData),
    });
    if (!response.ok) throw new Error('Failed to update financial record');
    return await response.json();
  } catch (error) {
    console.error('Error updating financial record:', error);
    throw error;
  }
};

// Delete financial record
export const deleteFinancialRecord = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.FINANCIAL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete financial record');
    return true;
  } catch (error) {
    console.error('Error deleting financial record:', error);
    throw error;
  }
};

// Update claim status
export const updateClaimStatus = async (id, currentStatus) => {
  try {
    const newStatus = currentStatus === "Approved" ? "Rejected" : "Approved";
    const record = await getFinancialRecordById(id);
    
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.FINANCIAL}/${id}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ ...record, claimStatus: newStatus }),
    });
    
    if (!response.ok) throw new Error('Failed to update claim status');
    return await response.json();
  } catch (error) {
    console.error('Error updating claim status:', error);
    throw error;
  }
}; 