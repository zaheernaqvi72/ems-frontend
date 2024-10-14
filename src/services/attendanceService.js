import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";

export const recordAttendance = (attendanceData) => {
  return axios.post(API_URL, attendanceData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getAttendanceByEmployeeId = (employeeId) => {
  return axios
    .get(`${API_URL}/employee/${employeeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => response.data);
};

export const getAttendanceByDate = (date) => {
  return axios
    .get(`${API_URL}/date/${date}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => response.data);
};

export const editAttendance = (attendanceData) => {
  return axios.post(API_URL, attendanceData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteAttendance = (attendanceData) => {
  return axios.post(API_URL, attendanceData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
