// import { useState } from 'react';
// import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import { applyLeave, getLeavesByEmployeeId, updateLeaveStatus } from '../services/leaveService';

// const LeaveManagement = () => {
//   const [formData, setFormData] = useState({
//     employee_id: '',
//     start_date: '',
//     end_date: '',
//     reason: ''
//   });

//   const [leaves, setLeaves] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await applyLeave(formData);
//       alert('Leave applied successfully!');
//       fetchLeaves();
//     } catch (error) {
//       alert('Error applying leave', error);
//     }
//   };

//   const fetchLeaves = async () => {
//     const data = await getLeavesByEmployeeId(formData.employee_id);
//     setLeaves(data);
//   };

//   const handleUpdateStatus = async (leaveId, status) => {
//     try {
//       await updateLeaveStatus(leaveId, status);
//       alert('Leave status updated successfully!');
//       fetchLeaves();
//     } catch (error) {
//       alert('Error updating leave status', error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Leave Management</h2>
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
//           label="Start Date"
//           name="start_date"
//           type="date"
//           variant="outlined"
//           value={formData.start_date}
//           onChange={handleChange}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           fullWidth
//           label="End Date"
//           name="end_date"
//           type="date"
//           variant="outlined"
//           value={formData.end_date}
//           onChange={handleChange}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           fullWidth
//           label="Reason"
//           name="reason"
//           variant="outlined"
//           value={formData.reason}
//           onChange={handleChange}
//         />
//         <Button variant="contained" color="primary" type="submit">
//           Submit
//         </Button>
//       </form>
//       <h2 className="text-xl font-semibold mt-6 mb-4">Leave Applications</h2>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Employee ID</TableCell>
//             <TableCell>Start Date</TableCell>
//             <TableCell>End Date</TableCell>
//             <TableCell>Reason</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {leaves.map((leave) => (
//             <TableRow key={leave.leave_id}>
//               <TableCell>{leave.employee_id}</TableCell>
//               <TableCell>{leave.start_date}</TableCell>
//               <TableCell>{leave.end_date}</TableCell>
//               <TableCell>{leave.reason}</TableCell>
//               <TableCell>{leave.status}</TableCell>
//               <TableCell>
//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={() => handleUpdateStatus(leave.leave_id, 'approved')}
//                   className="mr-2"
//                 >
//                   Approve
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => handleUpdateStatus(leave.leave_id, 'rejected')}
//                 >
//                   Reject
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default LeaveManagement;

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  applyLeave,
  updateLeaveStatus,
  deleteLeave,
} from "../services/leaveService";

const LeaveManagement = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([]);

  // Dummy data
  const dummyLeaves = [
    {
      leave_id: 1,
      employee_id: "101",
      start_date: "2024-10-10",
      end_date: "2024-10-12",
      reason: "Medical",
      status: "Pending",
    },
    {
      leave_id: 2,
      employee_id: "102",
      start_date: "2024-10-15",
      end_date: "2024-10-17",
      reason: "Vacation",
      status: "Pending",
    },
    {
      leave_id: 3,
      employee_id: "103",
      start_date: "2024-10-20",
      end_date: "2024-10-22",
      reason: "Emergency",
      status: "Pending",
    },
    {
      leave_id: 4,
      employee_id: "104",
      start_date: "2024-11-01",
      end_date: "2024-11-05",
      reason: "Personal",
      status: "Pending",
    },
    {
      leave_id: 5,
      employee_id: "105",
      start_date: "2024-10-25",
      end_date: "2024-10-30",
      reason: "Maternity",
      status: "Pending",
    },
  ];

  useEffect(() => {
    fetchLeaves();
  }, []);
  // Setting dummy data to state initially
  const fetchLeaves = () => {
    setLeaves(dummyLeaves);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLeave(formData);
      alert("Leave applied successfully!");
      fetchLeaves();
    } catch (error) {
      alert("Error applying leave", error);
    }
  };

  const handleUpdateStatus = async (leaveId, status) => {
    try {
      await updateLeaveStatus(leaveId, status);
      alert("Leave status updated successfully!");
      fetchLeaves();
    } catch (error) {
      alert("Error updating leave status", error);
    }
  };

  const handleDelete = async (leaveId) => {
    try {
      await deleteLeave(leaveId); // Assuming you have a delete service function
      fetchLeaves();
    } catch (error) {
      alert("Error deleting leave", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-4xl font-bold mb-4 text-center">Leave Management</h2>
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
            label="Start Date"
            name="start_date"
            type="date"
            variant="outlined"
            value={formData.start_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="End Date"
            name="end_date"
            type="date"
            variant="outlined"
            value={formData.end_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Reason"
            name="reason"
            variant="outlined"
            value={formData.reason}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">
        Leave Applications
      </h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.leave_id}>
              <TableCell>{leave.employee_id}</TableCell>
              <TableCell>{leave.start_date}</TableCell>
              <TableCell>{leave.end_date}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                <Select
                  value={leave.status}
                  onChange={(e) =>
                    handleUpdateStatus(leave.leave_id, e.target.value)
                  }
                  displayEmpty
                  style={{ height: "45px" }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approve</MenuItem>
                  <MenuItem value="Rejected">Reject</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(leave.leave_id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveManagement;
