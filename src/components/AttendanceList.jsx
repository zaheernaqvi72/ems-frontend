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
  Typography,
} from "@mui/material";
import { HighlightOff, Create, Add, Search, Close } from "@mui/icons-material";
import AttendanceForm from "./AttendanceForm"; // Import the AttendanceForm component
import {
  deleteAttendance,
  editAttendance,
  getAllAttendance,
} from "../services/attendanceService";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [sortedAttendance, setSortedAttendance] = useState([]);
  const today = new Date().toISOString().split("T")[0]; // Current date in "YYYY-MM-DD" format

  const fetchAttendance = async () => {
    try {
      const response = await getAllAttendance();
      setAttendance(response);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    const sorted = [...attendance].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedAttendance(sorted);
  }, [attendance]);

  useEffect(() => {
    const filteredData = sortedAttendance.filter(
      (record) =>
        record.employee_id.includes(searchQuery) ||
        record.first_name.toLowerCase().includes(searchQuery) ||
        record.last_name.toLowerCase().includes(searchQuery) ||
        record.date.includes(searchQuery) ||
        record.status.toLowerCase().includes(searchQuery)
    );
    setFilteredAttendance(filteredData);
  }, [searchQuery, sortedAttendance]);

  const handleDelete = async () => {
    if (deleteRecord) {
      try {
        await deleteAttendance(deleteRecord.attendance_id);
        fetchAttendance();
        setDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting attendance record:", error);
      }
    }
  };

  const handleEdit = (attendanceId) => {
    const record = attendance.find((r) => r.attendance_id === attendanceId);
    setEditRecord(record);
    
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editAttendance(editRecord.attendance_id, editRecord);
      setEditModalOpen(false);
      fetchAttendance();
    } catch (error) {
      console.error("Error editing attendance record:", error);
    }
  };

  const handleFormModal = () => {
    setFormModalOpen(true);
  };

  
  return (
    <div className="max-w-6xl m-auto p-4 bg-gray-100 shadow-md rounded-md">
      {/* Attendance Form Modal */}
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
          <AttendanceForm
            fetchAttendance={fetchAttendance}
            closeModal={() => setFormModalOpen(false)}
          />
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
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
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this attendance record?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ marginRight: 2 }}
            >
              Yes, Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => setDeleteModalOpen(false)}
            >
              No, Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <h2 className="text-3xl font-bold m-3 text-center">Attendance List</h2>
      <hr />
      <div className="flex justify-between items-center m-3">
        {/* Search Bar */}
        <TextField
          variant="outlined"
          color="primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
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
        {/* Add Attendance Button */}
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

      {/* Attendance Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID No</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAttendance.length > 0 ? (
            filteredAttendance.map((record) => (
              <TableRow key={record.attendance_id}>
                <TableCell>{record.employee_id}</TableCell>
                <TableCell>
                  {record.first_name} {record.last_name}
                </TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(record.attendance_id)}
                    variant="outlined"
                    startIcon={<Create />}
                    disabled={new Date(record.date) < new Date(today)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setDeleteRecord(record);
                      setDeleteModalOpen(true);
                    }}
                    color="error"
                    startIcon={<HighlightOff />}
                    disabled={new Date(record.date) < new Date(today)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No attendance records found.
              </TableCell>
            </TableRow>
          )}
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
            width: "40%",
            height: "280px",
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
          {/* Edit Attendance Modal */}
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
                <MenuItem value="Late">Late</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
              </TextField>
              <div className="mt-4">
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  style={{ marginRight: "8px" }}
                  onAbort={handleEditSubmit}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
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
