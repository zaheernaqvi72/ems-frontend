import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";

// Create attendance record
export const recordAttendance = (attendanceData) => {
  return axios.post(API_URL, attendanceData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Get attendance by employee ID (Read)
export const getAttendanceByEmployeeId = (employeeId) => {
  return axios
    .get(`${API_URL}/employee/${employeeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => response.data);
};

// Get attendance by date (Read)
export const getAttendanceByDate = (date) => {
  return axios
    .get(`${API_URL}/date/${date}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => response.data);
};

// Update attendance record (Update)
export const editAttendance = (attendanceId, attendanceData) => {
  return axios.put(`${API_URL}/${attendanceId}`, attendanceData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// Delete attendance record (Delete)
export const deleteAttendance = (attendanceId) => {
  return axios.delete(`${API_URL}/${attendanceId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
