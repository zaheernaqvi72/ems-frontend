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
import { HighlightOff, Create } from "@mui/icons-material";

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
        status: "Present",
      },
      {
        attendance_id: 2,
        first_name: "Alice",
        last_name: "Smith",
        employee_id: "2",
        date: "2024-10-15",
        status: "Absent",
      },
      {
        attendance_id: 3,
        first_name: "John",
        last_name: "Alice",
        employee_id: "3",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 4,
        first_name: "Bob",
        last_name: "Jane",
        employee_id: "4",
        date: "2024-10-15",
        status: "Absent",
      },
      {
        attendance_id: 5,
        first_name: "Charlie",
        last_name: "Sam",
        employee_id: "5",
        date: "2024-10-15",
        status: "Present",
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
            <MenuItem value="Present">Present</MenuItem>
            <MenuItem value="Absent">Absent</MenuItem>
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
            <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendance.map((record) => (
            <TableRow key={record.attendance_id}>
              <TableCell sx={{ fontWeight: "bold" }}>
                {record.employee_id}
              </TableCell>
              <TableCell>{record.first_name}</TableCell>
              <TableCell>{record.last_name}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleEdit(record)}>
                  <Create />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDelete(record.attendance_id)}
                >
                  <HighlightOff />
                </Button>
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
            width: "60%",
            height: "45%",
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              variant="outlined"
              value={editRecord ? editRecord.date : ""}
              onChange={(e) =>
                setEditRecord({ ...editRecord, date: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
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
              <MenuItem value="Present">Present</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
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
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Attendance;
