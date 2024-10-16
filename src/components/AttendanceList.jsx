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
  InputAdornment,
} from "@mui/material";
import { HighlightOff, Create, Add, Search, Close } from "@mui/icons-material";
import AttendanceForm from "./AttendanceForm"; // Import the AttendanceForm component
import {
  deleteAttendance,
  editAttendance,
} from "../services/attendanceService";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    // Dummy data for now, to simulate API response
    const dummyData = [
      {
        attendance_id: 1,
        first_name: "Jane",
        last_name: "Doe",
        employee_id: "1012",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 2,
        first_name: "John",
        last_name: "Smith",
        employee_id: "2012",
        date: "2024-10-15",
        status: "Absent",
      },
      {
        attendance_id: 3,
        first_name: "Alice",
        last_name: "Johnson",
        employee_id: "3014",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 4,
        first_name: "Bob",
        last_name: "Brown",
        employee_id: "4016",
        date: "2024-10-15",
        status: "Late",
      },
      {
        attendance_id: 5,
        first_name: "Charlie",
        last_name: "Wilson",
        employee_id: "5020",
        date: "2024-10-15",
        status: "Absent",
      },
      {
        attendance_id: 6,
        first_name: "David",
        last_name: "Davis",
        employee_id: "6025",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 7,
        first_name: "Eva",
        last_name: "Moore",
        employee_id: "7018",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 8,
        first_name: "Frank",
        last_name: "Taylor",
        employee_id: "8022",
        date: "2024-10-15",
        status: "Late",
      },
      {
        attendance_id: 9,
        first_name: "Grace",
        last_name: "Anderson",
        employee_id: "9030",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 10,
        first_name: "Henry",
        last_name: "Thomas",
        employee_id: "10028",
        date: "2024-10-15",
        status: "Absent",
      },
      {
        attendance_id: 11,
        first_name: "Isabella",
        last_name: "Martinez",
        employee_id: "11034",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 12,
        first_name: "Jack",
        last_name: "Garcia",
        employee_id: "12036",
        date: "2024-10-15",
        status: "Late",
      },
      {
        attendance_id: 13,
        first_name: "Karen",
        last_name: "Harris",
        employee_id: "13040",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 14,
        first_name: "Liam",
        last_name: "Clark",
        employee_id: "14050",
        date: "2024-10-15",
        status: "Absent",
      },
      {
        attendance_id: 15,
        first_name: "Mia",
        last_name: "Lewis",
        employee_id: "15055",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 16,
        first_name: "Noah",
        last_name: "Walker",
        employee_id: "16060",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 17,
        first_name: "Olivia",
        last_name: "Hall",
        employee_id: "17070",
        date: "2024-10-15",
        status: "Late",
      },
      {
        attendance_id: 18,
        first_name: "Paul",
        last_name: "Young",
        employee_id: "18075",
        date: "2024-10-15",
        status: "Absent",
      },
      {
        attendance_id: 19,
        first_name: "Quinn",
        last_name: "King",
        employee_id: "19080",
        date: "2024-10-15",
        status: "Present",
      },
      {
        attendance_id: 20,
        first_name: "Rachel",
        last_name: "Scott",
        employee_id: "20085",
        date: "2024-10-15",
        status: "Absent",
      },
      // Add more records as needed...
    ];
    setAttendance(dummyData);
    setFilteredAttendance(dummyData);
  };

  const handleDelete = async (attendanceId) => {
    try {
      await deleteAttendance(attendanceId);
      fetchAttendance();
    } catch (error) {
      console.error("Error deleting attendance record:", error);
    }
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setEditModalOpen(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredData = attendance.filter(
      (record) =>
        record.employee_id.includes(query) ||
        record.first_name.toLowerCase().includes(query) ||
        record.last_name.toLowerCase().includes(query) ||
        record.date.includes(query) ||
        record.status.toLowerCase().includes(query)
    );
    setFilteredAttendance(filteredData);
  };

  const handleFormModal = () => {
    setFormModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editAttendance(editRecord.attendance_id, editRecord.status);
      setEditModalOpen(false);
      fetchAttendance();
    } catch (error) {
      console.error("Error editing attendance record:", error);
    }
  };

  return (
    <div className="max-w-6xl m-auto p-4 bg-gray-100 shadow-md rounded-md">
      <Modal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        aria-labelledby="form-modal-title"
        aria-describedby="form-modal-description"
      >
        <Box
          className="modal-box"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgb(243 244 246)",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <div>
            <div className="absolute right-5 top-3">
              <Button
                variant="outlined"
                color="error"
                onClick={() => setFormModalOpen(false)}
                className="rounded-full"
                sx={{
                  minWidth: 0,
                  padding: "4px",
                  borderRadius: "50%",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <Close />
              </Button>
            </div>
            <AttendanceForm fetchAttendance={fetchAttendance} />
          </div>
        </Box>
      </Modal>

      <h2 className="text-3xl font-bold m-3 text-center">Attendance List</h2>
      <hr />
      <div className="flex justify-between items-center m-3">
        <TextField
          variant="outlined"
          color="primary"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by employee-id, name, date, or status"
          sx={{
            width: "70%",
            padding: "12px 0px",
            fontSize: "16px",
            borderRadius: "20px",
            "& input": {
              transition: "all 0.3s ease",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "50px",
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-500" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="outlined"
          color="primary"
          onClick={handleFormModal}
          startIcon={<Add />}
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "30px",
            "&:hover": {
              borderColor: "success.main",
              backgroundColor: "transparent",
              color: "#3f51b5",
              transform: "scale(1.05)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          Attendance
        </Button>
      </div>
      <hr />
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
          {filteredAttendance.map((record) => (
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
          {editRecord && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                variant="outlined"
                value={editRecord.date}
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
                value={editRecord.status}
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
                  type="submit"
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
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AttendanceList;
