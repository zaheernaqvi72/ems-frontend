import axios from 'axios';

const API_URL = 'http://localhost:3000/api/employees';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found. Please login.');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create Employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError(error, 'Error creating employee');
  }
};

// Get All Employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching employees');
  }
};

// Get Employee by ID
export const getEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`${API_URL}/${employeeId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError(error, `Error fetching employee with ID ${employeeId}`);
  }
};

// Update Employee
export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/${employeeId}`, employeeData, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError(error, `Error updating employee with ID ${employeeId}`);
  }
};

// Delete Employee
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${employeeId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleError(error, `Error deleting employee with ID ${employeeId}`);
  }
};

// Error Handling Utility
const handleError = (error, message) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error(`${message}: ${error.response.data.message || error.response.data}`);
  } else if (error.request) {
    // Request was made but no response was received
    console.error(`${message}: No response from server. Please check your network.`);
  } else {
    // Something happened in setting up the request
    console.error(`${message}: ${error.message}`);
  }
  throw error; // Re-throw the error after logging it
};
