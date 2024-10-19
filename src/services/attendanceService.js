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
// Edit attendance by ID
export const editAttendance = async (attendanceId, attendanceData) => {
  try {
    const response = await axios.put(`${API_URL}/attendance/${attendanceId}`, attendanceData);
    return response.data;
  } catch (error) {
    handleError(error, `Error editing attendance with ID ${attendanceId}`);
  }
};
