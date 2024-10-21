import axios from "axios";
import handleError from "../utils/handleError.js";

const API_URL = "http://localhost:3000/api/attendance";


// Record new attendance
export const recordAttendance = async (attendanceData) => {
  try {
    const response = await axios.post(API_URL, attendanceData);
    return response.data;
  } catch (error) {
    handleError(error, "Error recording attendance");
  }
};



// Get all attendance
export const getAllAttendance = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error, "Error fetching attendance");
  }
};

// Delete attendance by ID
export const deleteAttendance = async (attendanceId) => {
  try {
    const response = await axios.delete(`${API_URL}/${attendanceId}`);
    return response.data;
  } catch (error) {
    handleError(error, `Error deleting attendance with ID ${attendanceId}`);
  }
};

export const editAttendance = async (attendanceId, attendanceData) => {
  try {
    const response = await axios.put(`${API_URL}/${attendanceId}`, attendanceData);
    return response.data;
  } catch (error) {
    handleError(error, `Error editing attendance with ID: ${attendanceId}`);
    throw new Error(error.response?.data?.message || 'Failed to edit attendance');
  }
};

// Check if attendance already exists for the given employee and date
export const checkAttendanceExists = async (employee_id, date) => {
  try {
    const response = await axios.get(`${API_URL}?employee_id=${employee_id}&date=${date}`);
    return response.data.exists; // Return true if attendance exists, false otherwise
  } catch (error) {
    handleError(error, "Error checking attendance");
  }
};
