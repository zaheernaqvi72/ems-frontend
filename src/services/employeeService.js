import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

export const createEmployee = (employeeData) => {
  return axios.post(API_URL, employeeData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const getEmployees = () => {
  return axios
    .get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => response.data);
};

export const getEmployee = (employeeId) => {
  return axios
    .get(`${API_URL}/${employeeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => response.data);
};

export const updateEmployee = (employeeId, employeeData) => {
  return axios.put(`${API_URL}/${employeeId}`, employeeData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const deleteEmployee = (employeeId) => {
  return axios.delete(`${API_URL}/${employeeId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};
