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
  TablePagination,
  TableFooter,
  TableContainer,
  Paper,
} from "@mui/material";
import { HighlightOff, Create, Add, Search, Close } from "@mui/icons-material";
import AttendanceForm from "./AttendanceForm"; // Import the AttendanceForm component
import {
  deleteAttendance,
  editAttendance,
  getAllAttendance,
} from "../services/attendanceService";
import TablePaginationActions from "./Pagination";
import handleError from "../utils/handleError";
import { getEmployees } from "../services/employeeService";
import SnackbarComp from "./Snackbar";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState({
    attendance_id: "",
    employee_id: "",
    date: "",
    status: "",
  });
  const [message, setMessage] = useState({ type: "", content: "" });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [sortedAttendance, setSortedAttendance] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employeeIds, setEmployeeIds] = useState([]);

  const fetchAttendance = async () => {
    try {
      const response = await getAllAttendance();

      for (let i = 0; i < response.length; i++) {
        response[i].first_name = response[i].employee.first_name;
        response[i].last_name = response[i].employee.last_name;

        // drop the employee object
        delete response[i].employee;
      }

      setAttendance(response);
    } catch (error) {
      setMessage({
        type: "error",
        content: error.response?.data?.message || "Failed to fetch attendance",
      });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    }
  };

  // Fetch employee IDs when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getEmployees();
        const emp_ids = [];
        for (let i = 0; i < employeeData.length; i++) {
          emp_ids.push(employeeData[i].employee_id);
        }

        setEmployeeIds(emp_ids);
      } catch (error) {
        setMessage({
          type: "error",
          content: "Failed to fetch employee IDs. Please try again.",
        });

        setTimeout(() => {
          setMessage({ type: "", content: "" });
        }, 3000);
        handleError(error);
      }
    };

    fetchEmployees();
  }, []);

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
        record.employee_id.toLowerCase().includes(searchQuery) ||
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
        setDeleteModalOpen(false);
        setMessage({ type: "success", content: "Attendance record deleted!" });
        fetchAttendance();
        // Clear form and navigate after success
        setTimeout(() => {
          setMessage({ type: "", content: "" });
        }, 2000);
      } catch (error) {
        setDeleteModalOpen(false);
        setMessage({
          type: "error",
          content:
            error.response?.data?.message ||
            "Failed to delete attendance record.",
        });
        console.error("Error deleting attendance record:", error);
        setTimeout(() => {
          setMessage({ type: "", content: "" });
        }, 3000);
      }
    }
  };

  const handleEdit = (attendanceId) => {
    // Find the attendance record by ID
    const record = attendance.find((r) => r.attendance_id === attendanceId);

    if (record) {
      setEditRecord(record);
      setEditModalOpen(true);
    } else {
      setMessage({ type: "error", content: "Invalid attendance record." });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editRecord || !editRecord.attendance_id) {
      setMessage({ type: "error", content: "Invalid attendance record." });
      return;
    }

    try {
      await editAttendance(editRecord.attendance_id, editRecord);
      setMessage({
        type: "success",
        content: "Attendance Edited successfully!",
      });

      setEditModalOpen(false);
      fetchAttendance();
      // Clear form and navigate after success
      setTimeout(() => {
        setMessage({ type: "", content: "" });

        // Refresh the attendance data
      }, 3000);
    } catch (error) {
      setEditModalOpen(false);
      setMessage({
        type: "error",
        content: error.response?.data?.message || "Failed to edit attendance.",
      });
      console.error("Error editing attendance record:", error);
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    }
  };

  const handleFormModal = () => {
    setFormModalOpen(true);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredAttendance.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="max-w-6xl m-auto p-4 bg-gray-100 shadow-md rounded-md">
      {/* Display success/error message */}
      {message.content && <SnackbarComp message={message} />}
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
              sx={{
                padding: "5px 20px",
                fontSize: "16px",
                borderRadius: "30px",
                marginRight: "10px",
                "&:hover": {
                  borderColor: "error.main",
                  backgroundColor: "transparent",
                  color: "#f44336",
                  transform: "scale(1.05)",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
            >
              Yes, Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => setDeleteModalOpen(false)}
              sx={{
                padding: "5px 20px",
                fontSize: "16px",
                borderRadius: "30px",
                marginLeft: "10px",
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

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          backgroundColor: "rgb(243 244 246)",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Log Time</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          {filteredAttendance.length > 0 ? (
           <TableBody>
           {(
             rowsPerPage > 0
               ? filteredAttendance.slice(
                   page * rowsPerPage,
                   page * rowsPerPage + rowsPerPage
                 )
               : filteredAttendance
           ).map((record) => {
             // Get the current date and time
             const currentDate = new Date().toISOString().split('T')[0];
             const attendanceDate = record.date.split('T')[0];
             
             const createdAt = new Date(record.createdAt);
             const tenAM = new Date(createdAt);
             tenAM.setHours(10, 0, 0, 0);

         
             
             let status = record.status;
         
             if (attendanceDate !== currentDate) {
               // Mark as Absent if attendance is not marked for today
               status = "Absent";
             } else if (createdAt > tenAM && status != "Late" && status != "On Leave" && status != "Absent") {
               // Mark as Late if attendance is after 10 AM and was initially marked as Present
               status = "Late";
             }
         
             return (
               <TableRow key={record.attendance_id}>
                 <TableCell>{record.employee_id}</TableCell>
                 <TableCell>
                   {record.first_name} {record.last_name}
                 </TableCell>
                 <TableCell>{record.date}</TableCell>
                 <TableCell>
                   {createdAt.toLocaleTimeString("en-IN", {
                     timeZone: "Asia/Kolkata",
                     hour: "2-digit",
                     minute: "2-digit",
                     second: "2-digit",
                   })}
                 </TableCell>
         
                 <TableCell
                   sx={{
                     color:
                       status === "Present"
                         ? "success.main"
                         : status === "Absent"
                         ? "error.main"
                         : status === "Late"
                         ? "warning.main"
                         : "info.main",
                   }}
                 >
                   {status}
                 </TableCell>
                 <TableCell>
                   <Button
                     onClick={() => handleEdit(record.attendance_id)}
                     variant="outlined"
                     startIcon={<Create />}
                     sx={{
                       padding: "5px 20px",
                       fontSize: "12px",
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
                     sx={{
                       padding: "5px 20px",
                       fontSize: "12px",
                       borderRadius: "30px",
                       "&:hover": {
                         borderColor: "error.main",
                         backgroundColor: "transparent",
                         color: "#f44336",
                         transform: "scale(1.05)",
                         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                         transition: "all 0.3s ease",
                       },
                       "&:active": {
                         transform: "scale(0.98)",
                       },
                     }}
                   >
                     Delete
                   </Button>
                 </TableCell>
               </TableRow>
             );
           })}
           {emptyRows > 0 && (
             <TableRow style={{ height: 53 * emptyRows }}>
               <TableCell colSpan={6} />
             </TableRow>
           )}
         </TableBody>
         
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    No attendance records found.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={filteredAttendance.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

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
            height: "350px",
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
                select
                label="Employee ID"
                name="employee_id"
                variant="outlined"
                value={editRecord.employee_id}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  setEditRecord({ ...editRecord, employee_id: e.target.value })
                }
              >
                {/* Populate dropdown with employee IDs */}
                {employeeIds.length > 0 ? (
                  employeeIds.map((id) => (
                    <MenuItem key={id} value={id}>
                      {id}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No employees found</MenuItem>
                )}
              </TextField>
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
                  onClick={handleEditSubmit}
                  sx={{
                    padding: "5px 20px",
                    fontSize: "16px",
                    borderRadius: "30px",
                    marginRight: "10px",
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
                  Save edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setEditModalOpen(false)}
                  sx={{
                    padding: "5px 20px",
                    fontSize: "16px",
                    borderRadius: "30px",
                    marginLeft: "10px",
                    "&:hover": {
                      borderColor: "error.main",
                      backgroundColor: "transparent",
                      color: "#f44336",
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                  }}
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
