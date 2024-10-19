import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaves';

// Create a new leave application (POST)
export const applyLeave = (leaveData) => {
  return axios.post(API_URL, leaveData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Read leaves for a specific employee by employeeId (GET)
export const getLeavesByEmployeeId = (employeeId) => {
  return axios
    .get(`${API_URL}/employee/${employeeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => response.data);
};

// Update leave status (PUT)
export const updateLeaveStatus = (leaveId, status) => {
  return axios.put(`${API_URL}/${leaveId}`, { status }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Delete a leave by leaveId (DELETE)
export const deleteLeave = (leaveId) => {
  return axios.delete(`${API_URL}/${leaveId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Edit an existing leave application (PUT)
export const editLeave = (leaveId, leaveData) => {
  return axios.put(`${API_URL}/${leaveId}`, leaveData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};
