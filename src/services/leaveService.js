import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaves';

export const applyLeave = (leaveData) => {
  return axios.post(API_URL, leaveData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const getLeavesByEmployeeId = (employeeId) => {
  return axios
    .get(`${API_URL}/employee/${employeeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => response.data);
};

export const updateLeaveStatus = (leaveId, status) => {
  return axios.put(`${API_URL}/${leaveId}`, { status }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const deleteLeave = (leaveData) => {
  return axios.post(API_URL, leaveData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};
