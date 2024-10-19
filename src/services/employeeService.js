import axios from 'axios';
import  handleError  from '../utils/handleError.js';

// Base API URL for employee-related endpoints
const API_URL = 'http://localhost:3000/api/employees';

// Create Employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
  } catch (error) {
    handleError(error, 'Error creating employee');
  }
};

// Fetch All Employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching employees');
  }
};

// Fetch Employee by ID
export const getEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`${API_URL}/${employeeId}`);
    return response.data;
  } catch (error) {
    handleError(error, `Error fetching employee with ID ${employeeId}`);
  }
};

// Update Employee
export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    handleError(error, `Error updating employee with ID ${employeeId}`);
  }
};

// Delete Employee
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${employeeId}`);
    return response.data;
  } catch (error) {
    handleError(error, `Error deleting employee with ID ${employeeId}`);
  }
};

