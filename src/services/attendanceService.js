import axios from "axios";
import handleError from "../utils/handleError.js";

const API_URL = " https://3127-2405-204-1380-91bf-d176-2261-f27f-6c05.ngrok-free.app/api/attendance";

// Helper function to get the token (assuming you store it in localStorage)
const getToken = () => {
  return localStorage.getItem("token");
};

// Record new attendance
export const recordAttendance = async (attendanceData) => {
  try {
    const response = await axios.post(API_URL, attendanceData, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include token in the request headers
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, "Error recording attendance");
  }
};

// Get all attendance
export const getAllAttendance = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, "Error fetching attendance");
  }
};

// Delete attendance by ID
export const deleteAttendance = async (attendanceId) => {
  try {
    const response = await axios.delete(`${API_URL}/${attendanceId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, `Error deleting attendance with ID ${attendanceId}`);
  }
};

// Edit attendance
export const editAttendance = async (attendanceId, attendanceData) => {
  try {
    const response = await axios.put(`${API_URL}/${attendanceId}`, attendanceData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, `Error editing attendance with ID: ${attendanceId}`);
    throw new Error(error.response?.data?.message || 'Failed to edit attendance');
  }
};

// Check if attendance already exists for the given employee and date
export const checkAttendanceExists = async (employee_id, date) => {
  try {
    const response = await axios.get(`${API_URL}?employee_id=${employee_id}&date=${date}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.exists; // Return true if attendance exists, false otherwise
  } catch (error) {
    handleError(error, "Error checking attendance");
  }
};
