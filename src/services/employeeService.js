import axios from 'axios';
import handleError from '../utils/handleError.js';

// Base API URL for employee-related endpoints
const API_URL = 'http://localhost:3000/api/employees';

// Helper to get authorization headers with the Bearer token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("No token found in localStorage. Please log in.");
  }
  return { Authorization: `Bearer ${token}` };
};

// Function to create a new employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData, {
      headers: getAuthHeaders(),
    });
    return response.data; // Return the response data (newly created employee)
  } catch (error) {
    handleError(error, 'Error creating employee'); // Handle the error
    throw error; // Optional: rethrow the error if you want further handling
  }
};

// Fetch All Employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    });
    return response.data; // Return the employee data
  } catch (error) {
    handleError(error, 'Error fetching employees'); // Handle the error
    throw error; // Optional: rethrow error if further handling is required
  }
};

// Fetch Employee by ID
export const getEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`${API_URL}/${employeeId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error, `Error fetching employee with ID ${employeeId}`);
    throw error;
  }
};

// Update Employee
export const updateEmployee = async (employeeId, employeeData) => {
  try {
    // Check if loggedin user is the owner of the employee
    const response = await axios.put(`${API_URL}/${employeeId}`, employeeData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error, `Error updating employee with ID ${employeeId}`);
    throw error;
  }
};

// Delete Employee
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${employeeId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleError(error, `Error deleting employee with ID ${employeeId}`);
    throw error;
  }
};

// Check if Employee Email exists
export const checkEmployeeEmailExists = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/exist?email=${email}`, {
      headers: getAuthHeaders(),
    });
    return response.data.exists;
  } catch (error) {
    handleError(error, 'Error checking employee email');
    throw error;
  }
};
