import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Select,
  MenuItem,
  Modal,
  Box,
  TextField,
  InputAdornment,
  Typography,
  TableContainer,
  Paper,
  TablePagination,
  TableFooter,
  TableHead,
} from "@mui/material";
import { HighlightOff, Create, Close, Search, Add } from "@mui/icons-material";
import {
  updateLeaveStatus,
  getLeaves,
  deleteLeave,
} from "../services/leaveService";
import LeaveForm from "./LeaveForm";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TablePaginationActions from "./Pagination";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedLeaves, setSortedLeaves] = useState([]);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [editData, setEditData] = useState({
    leave_id: "",
    employee_id: "",
    leave_type: "",
    day_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    status: "Pending",
  });
  const [reqType, setReqType] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchLeaves = async () => {
    try {
      const response = await getLeaves();
      setLeaves(response);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    const sorted = [...leaves].sort(
      (a, b) => new Date(b.start_date) - new Date(a.start_date)
    );
    setSortedLeaves(sorted);
  }, [leaves]);

  useEffect(() => {
    const filteredData = sortedLeaves.filter(
      (record) =>
        record.leave_type.includes(searchQuery) ||
        record.day_type.toLowerCase().includes(searchQuery) ||
        record.employee_id.includes(searchQuery) ||
        record.start_date.includes(searchQuery) ||
        record.end_date.includes(searchQuery) ||
        record.reason.toLowerCase().includes(searchQuery) ||
        record.status.toLowerCase().includes(searchQuery)
    );
    setFilteredLeaves(filteredData);
  }, [searchQuery, sortedLeaves]);

  const handleUpdateStatus = async (leaveId, status) => {
    try {
      // Call the function to update leave status
      await updateLeaveStatus(leaveId, status);

      // Update the local state with the new status
      setLeaves((prev) =>
        prev.map((leave) =>
          leave.leave_id === leaveId ? { ...leave, status } : leave
        )
      );

      // Conditionally display messages based on status
      if (status == "Approved") {
        setMessage({ type: "success", content: "Leave approved successfully" });
      } else if (status == "Rejected") {
        setMessage({ type: "error", content: "Leave rejected" });
      }
    } catch (error) {
      setMessage({ type: "error", content: "Error updating leave status" });
      throw error;
    } finally {
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLeave(deleteRecord);
      setLeaves((prev) =>
        prev.filter((leave) => leave.leave_id !== deleteRecord)
      );
      setDeleteModalOpen(false);
      setMessage({ type: "success", content: "Leave deleted successfully" });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    } catch (error) {
      setMessage({ type: "error", content: "Error deleting leave" });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
      throw error;
    }
  };

  const handleEdit = async (leaveId) => {
    const leave = leaves.find((leave) => leave.leave_id === leaveId);
    if (leave) {
      setEditData(leave);
      setReqType("edit");
      setFormModalOpen(true);
    } else {
      alert("Invalid leave record");
    }
  };

  const handleDeleteModalOpen = (employeeId) => {
    setDeleteRecord(employeeId);
    setDeleteModalOpen(true);
  };

  const handleFormModal = () => {
    setReqType("create");
    setFormModalOpen(true);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredLeaves.length)
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
      {message.content && (
        <Stack sx={{ width: "100%", mt: 2, mb: 2 }} spacing={2}>
          <Alert variant="filled" severity={message.type}>
            {message.content}
          </Alert>
        </Stack>
      )}
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
            {reqType === "create" ? (
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
            ) : null}
            <LeaveForm
              fetchLeaves={fetchLeaves}
              closeModal={() => setFormModalOpen(false)}
              editData={editData}
              reqType={reqType}
            />
          </div>
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
            Are you sure you want to delete this leave?
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
              onClick={() => setDeleteModalOpen(false)}
            >
              No, Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <h2 className="text-3xl font-bold m-3 text-center">Leave Applications</h2>
      <hr />
      <div className="flex justify-between items-center m-3">
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
          Apply for Leave
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
              <TableCell sx={{ fontWeight: "bold" }}>
                Leave - Day Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          {filteredLeaves.length > 0 ? (
            <TableBody>
              {(rowsPerPage > 0
                ? filteredLeaves.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredLeaves
              ).map((leave) => (
                <TableRow key={leave.leave_id}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {leave.employee_id}
                  </TableCell>
                  <TableCell>
                    {leave.leave_type} - {leave.day_type}
                  </TableCell>
                  <TableCell>{leave.start_date}</TableCell>
                  <TableCell>{leave.end_date}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        leave.status === "Pending"
                          ? "orange"
                          : leave.status === "Approved"
                          ? "green"
                          : "red",
                    }}
                  >
                    {leave.status}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={leave.status}
                      onChange={(e) =>
                        handleUpdateStatus(leave.leave_id, e.target.value)
                      }
                      displayEmpty
                      style={{ height: "40px" }}
                      disabled={leave.status.toLowerCase() !== "pending"}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approve</MenuItem>
                      <MenuItem value="Rejected">Reject</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Create />}
                      sx={{
                        padding: "5px 20px",
                        fontSize: "12px",
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
                      onClick={() => handleEdit(leave.leave_id)}
                    >
                      edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<HighlightOff />}
                      sx={{
                        padding: "5px 20px",
                        fontSize: "12px",
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
                      onClick={() => {
                        handleDeleteModalOpen(leave.leave_id);
                      }}
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={9} />
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
            <TableRow>
              <TableCell colSpan={9} align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  No leaves records found.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          )}
          <TableFooter>
            <TableRow>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={9}
                count={filteredLeaves.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              ePaginationActions={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaveList;
