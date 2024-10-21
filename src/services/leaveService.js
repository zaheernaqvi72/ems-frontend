import axios from 'axios';
import handleError from '../utils/handleError.js';

const API_URL = 'http://localhost:3000/api/leaves';

// // Create a new leave application (POST)
// export const applyLeave = (leaveData) => {
//   return axios.post(API_URL, leaveData, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//   });
// };

// Apply for leave
export const applyLeave = async (leaveData) => {
  try {
    const response = await axios.post(API_URL, leaveData);
    return response.data;
  } catch (error) {
    handleError(error, 'Error applying for leave');
  }
};



// // Update leave status (PUT)
// export const updateLeaveStatus = (leaveId, status) => {
//   return axios.put(`${API_URL}/${leaveId}`, { status }, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//   });
// };

// // Delete a leave by leaveId (DELETE)
// export const deleteLeave = (leaveId) => {
//   return axios.delete(`${API_URL}/${leaveId}`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//   });
// };

// // Edit an existing leave application (PUT)
// export const editLeave = (leaveId, leaveData) => {
//   return axios.put(`${API_URL}/${leaveId}`, leaveData, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//   });
// };


// Fetch all leaves (GET)
export const getLeaves = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching leaves');
  }
};


// Update leave details (PUT)
export const updateLeave = async (leaveId, leaveData) => {
  try {
    const response = await axios.put(`${API_URL}/${leaveId}`, leaveData);
    return response.data;
  } catch (error) {
    handleError(error, `Error updating leave with ID: ${leaveId}`);
  }
};

// Delete leave by leave ID (DELETE)
export const deleteLeave = async (leaveId) => {
  try {
    const response = await axios.delete(`${API_URL}/${leaveId}`);
    return response.data;
  } catch (error) {
    handleError(error, `Error deleting leave with ID: ${leaveId}`);
  }
};

// Update leave status (PUT)
export const updateLeaveStatus = async (leaveId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${leaveId}`, { status });
    return response.data;
  } catch (error) {
    handleError(error, `Error updating leave status with ID: ${leaveId}`);
  }
};

// Check if leave already exists for the given employee with pending status
export const checkPendingLeaveExists = async (employee_id, status) => {
  try {
    const response = await axios.get(`${API_URL}?employee_id=${employee_id}&status=${status}`);
    return response.data.exists;
  } catch (error) {
    handleError(error, "Error checking pending leave");
  }
};
