// import { useState } from 'react';
// import { TextField, Button, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import { recordAttendance, getAttendanceByDate } from '../services/attendanceService';

// const Attendance = () => {
//   const [formData, setFormData] = useState({
//     first_name: 'John',
//     date: '',
//     status: ''
//   });

//   const [attendance, setAttendance] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await recordAttendance(formData);
//       alert('Attendance recorded successfully!');
//       fetchAttendance();
//     } catch (error) {
//       alert('Error recording attendance', error);
//     }
//   };

//   const fetchAttendance = async () => {
//     const data = await getAttendanceByDate(formData.date);
//     setAttendance(data);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Record Attendance</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <TextField
//           fullWidth
//           label="Employee ID"
//           name="employee_id"
//           variant="outlined"
//           value={formData.employee_id}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           label="Date"
//           name="date"
//           type="date"
//           variant="outlined"
//           value={formData.date}
//           onChange={handleChange}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           fullWidth
//           select
//           label="Status"
//           name="status"
//           variant="outlined"
//           value={formData.status}
//           onChange={handleChange}
//         >
//           <MenuItem value="present">Present</MenuItem>
//           <MenuItem value="absent">Absent</MenuItem>
//         </TextField>
//         <Button variant="contained" color="primary" type="submit">
//           Submit
//         </Button>
//       </form>
//       <h2 className="text-xl font-semibold mt-6 mb-4">Attendance Records</h2>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Employee ID</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {attendance.map((record) => (
//             <TableRow key={record.attendance_id}>
//               <TableCell>{record.employee_id}</TableCell>
//               <TableCell>{record.date}</TableCell>
//               <TableCell>{record.status}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default Attendance;

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Box,
} from "@mui/material";
import {
  recordAttendance,
  deleteAttendance,
  editAttendance,
} from "../services/attendanceService";

const Attendance = () => {
  const [formData, setFormData] = useState({
    first_name: "John",
    date: "",
    status: "",
  });

  const [attendance, setAttendance] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false); // Track if the edit modal is open
  const [editRecord, setEditRecord] = useState(null); // Track the record being edited

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordAttendance(formData);
      alert("Attendance recorded successfully!");
      fetchAttendance();
    } catch (error) {
      alert("Error recording attendance", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    // Dummy data added here for now, to simulate API response
    const dummyData = [
      {
        attendance_id: 1,
        first_name: "Jane",
        last_name: "Doe",
        employee_id: "1",
        date: "2024-10-15",
        status: "present",
      },
      {
        attendance_id: 2,
        first_name: "Alice",
        last_name: "Smith",
        employee_id: "2",
        date: "2024-10-15",
        status: "absent",
      },
      {
        attendance_id: 3,
        first_name: "John",
        last_name: "Alice",
        employee_id: "3",
        date: "2024-10-15",
        status: "present",
      },
      {
        attendance_id: 4,
        first_name: "Bob",
        last_name: "Jane",
        employee_id: "4",
        date: "2024-10-15",
        status: "absent",
      },
      {
        attendance_id: 5,
        first_name: "Charlie",
        last_name: "Sam",
        employee_id: "5",
        date: "2024-10-15",
        status: "present",
      },
    ];
    setAttendance(dummyData); // Set the dummy data
  };

  const handleDelete = async (attendanceId) => {
    try {
      await deleteAttendance(attendanceId); // Assuming you have a delete service function
      fetchAttendance(); // Refresh the attendance list
    } catch (error) {
      console.error("Error deleting attendance record:", error);
    }
  };

  const handleEdit = (record) => {
    setEditRecord(record); // Set the record being edited
    setEditModalOpen(true); // Open the edit modal
  };

  const handleEditSubmit = async () => {
    try {
      await editAttendance(editRecord.attendance_id, editRecord.status); // Edit the attendance status
      setEditModalOpen(false); // Close the modal after submitting
      fetchAttendance(); // Refresh the attendance list
    } catch (error) {
      console.error("Error editing attendance record:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-4xl font-bold mb-4 text-center">Manage Attendance</h2>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-md mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Employee ID"
            name="employee_id"
            variant="outlined"
            value={formData.employee_id}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            variant="outlined"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            variant="outlined"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">
        Attendance List
      </h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell style={{ marginLeft: '5px'}}>Actions</TableCell> {/* Added Actions column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {attendance.map((record) => (
            <TableRow key={record.attendance_id}>
              <TableCell>{record.employee_id}</TableCell>
              <TableCell>{record.first_name}</TableCell>
              <TableCell>{record.last_name}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                {/* Edit and Delete buttons */}
                <div className="ml-10 flex w-40 justify-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(record)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(record.attendance_id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box
          className="modal-box"
          sx={{
            width: "50rem",
            height: "13rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Edit Attendance Record
          </h2>
          <TextField
            fullWidth
            label="Status"
            name="status"
            select
            variant="outlined"
            value={editRecord ? editRecord.status : ""}
            onChange={(e) =>
              setEditRecord({ ...editRecord, status: e.target.value })
            }
          >
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </TextField>
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditSubmit}
              style={{ marginRight: "8px" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setEditModalOpen(false)}
              className="ml-2"
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Attendance;
