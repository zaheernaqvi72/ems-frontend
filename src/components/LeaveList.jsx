import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  Modal,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import { HighlightOff, Create, Close, Search, Add } from "@mui/icons-material";
import {
  updateLeaveStatus,
  deleteLeave,
  editLeave,
} from "../services/leaveService";
import LeaveForm from "./LeaveForm";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedLeaves, setSortedLeaves] = useState([]);

    (async () => {
    fetch('/dummyLeaves.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLeaves(data);
      })
      .catch((error) => {
        console.error('There was a problem fetching the data:', error);
      });
  })();

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
      await updateLeaveStatus(leaveId, status);
      alert("Leave status updated successfully!");
      setLeaves((prev) =>
        prev.map((leave) =>
          leave.leave_id === leaveId ? { ...leave, status } : leave
        )
      );
    } catch (error) {
      alert("Error updating leave status", error);
    }
  };

  const handleDelete = async (leaveId) => {
    try {
      await deleteLeave(leaveId);
      setLeaves((prev) => prev.filter((leave) => leave.leave_id !== leaveId));
    } catch (error) {
      alert("Error deleting leave", error);
    }
  };

  const handleEdit = async (leaveId) => {
    try {
      await editLeave(leaveId);
      alert("Leave edited successfully!");
      // You can add any editing logic here, such as opening a modal to edit
    } catch (error) {
      alert("Error editing leave", error);
    }
  };

  const handleFormModal = () => {
    setFormModalOpen(true);
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
            <LeaveForm fetchLeaves={LeaveList} />
          </div>
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID No</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Leave - Day Type</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Reason</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLeaves.map((leave) => (
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
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                <Select
                  value={leave.status}
                  onChange={(e) =>
                    handleUpdateStatus(leave.leave_id, e.target.value)
                  }
                  displayEmpty
                  style={{ height: "40px" }}
                  disabled={leave.status.toLowerCase() != "pending"}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approve</MenuItem>
                  <MenuItem value="Rejected">Reject</MenuItem>
                </Select>
              </TableCell>

              <TableCell>
                <Button
                  color="primary"
                  onClick={() => handleEdit(leave.leave_id)}
                  disabled={leave.status.toLowerCase() != "pending"}
                >
                  <Create />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDelete(leave.leave_id)}
                  disabled={leave.status.toLowerCase() != "pending"}
                >
                  <HighlightOff />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveList;
