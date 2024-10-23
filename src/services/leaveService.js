import axios from 'axios';
import handleError from '../utils/handleError.js';

const API_URL = ' https://3127-2405-204-1380-91bf-d176-2261-f27f-6c05.ngrok-free.app/api/leaves';

// Helper function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Apply for leave (POST)
export const applyLeave = async (leaveData) => {
  try {
    const response = await axios.post(API_URL, leaveData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    handleError(error, 'Error applying for leave');
  }
};

// Fetch all leaves (GET)
export const getLeaves = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching leaves');
  }
};

// Update leave details (PUT)
export const updateLeave = async (leaveId, leaveData) => {
  try {
    const response = await axios.put(`${API_URL}/${leaveId}`, leaveData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    handleError(error, `Error updating leave with ID: ${leaveId}`);
  }
};

// Delete leave by leave ID (DELETE)
export const deleteLeave = async (leaveId) => {
  try {
    const response = await axios.delete(`${API_URL}/${leaveId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    handleError(error, `Error deleting leave with ID: ${leaveId}`);
  }
};

// Update leave status (PUT)
export const updateLeaveStatus = async (leaveId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${leaveId}`, { status }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    handleError(error, `Error updating leave status with ID: ${leaveId}`);
  }
};

// Check if leave already exists for the given employee with pending status (GET)
export const checkPendingLeaveExists = async (employee_id, status) => {
  try {
    const response = await axios.get(`${API_URL}?employee_id=${employee_id}&status=${status}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data.exists;
  } catch (error) {
    handleError(error, "Error checking pending leave");
  }
};
