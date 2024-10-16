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
  const dummyLeaves = [
    {
      leave_id: 1,
      employee_id: "1011",
      start_date: "2024-10-10",
      end_date: "2024-10-12",
      reason: "Medical",
      status: "Pending",
    },
    {
      leave_id: 2,
      employee_id: "1020",
      start_date: "2024-10-15",
      end_date: "2024-10-17",
      reason: "Vacation",
      status: "Pending",
    },
    {
      leave_id: 3,
      employee_id: "1031",
      start_date: "2024-11-01",
      end_date: "2024-11-05",
      reason: "Family Emergency",
      status: "Approved",
    },
    {
      leave_id: 4,
      employee_id: "1042",
      start_date: "2024-11-10",
      end_date: "2024-11-14",
      reason: "Personal",
      status: "Rejected",
    },
    {
      leave_id: 5,
      employee_id: "1053",
      start_date: "2024-10-20",
      end_date: "2024-10-23",
      reason: "Sick",
      status: "Pending",
    },
    {
      leave_id: 6,
      employee_id: "1064",
      start_date: "2024-10-22",
      end_date: "2024-10-25",
      reason: "Vacation",
      status: "Approved",
    },
    {
      leave_id: 7,
      employee_id: "1075",
      start_date: "2024-09-30",
      end_date: "2024-10-03",
      reason: "Medical",
      status: "Approved",
    },
    {
      leave_id: 8,
      employee_id: "1086",
      start_date: "2024-11-07",
      end_date: "2024-11-10",
      reason: "Personal",
      status: "Pending",
    },
    {
      leave_id: 9,
      employee_id: "1097",
      start_date: "2024-10-25",
      end_date: "2024-10-27",
      reason: "Medical",
      status: "Pending",
    },
    {
      leave_id: 10,
      employee_id: "1108",
      start_date: "2024-11-05",
      end_date: "2024-11-08",
      reason: "Vacation",
      status: "Approved",
    },
    {
      leave_id: 11,
      employee_id: "1119",
      start_date: "2024-10-01",
      end_date: "2024-10-05",
      reason: "Personal",
      status: "Rejected",
    },
    {
      leave_id: 12,
      employee_id: "1120",
      start_date: "2024-10-19",
      end_date: "2024-10-22",
      reason: "Family Emergency",
      status: "Pending",
    },
    {
      leave_id: 13,
      employee_id: "1131",
      start_date: "2024-10-12",
      end_date: "2024-10-14",
      reason: "Sick",
      status: "Approved",
    },
    {
      leave_id: 14,
      employee_id: "1142",
      start_date: "2024-11-05",
      end_date: "2024-11-10",
      reason: "Medical",
      status: "Pending",
    },
    {
      leave_id: 15,
      employee_id: "1153",
      start_date: "2024-11-01",
      end_date: "2024-11-04",
      reason: "Vacation",
      status: "Approved",
    },
    {
      leave_id: 16,
      employee_id: "1164",
      start_date: "2024-10-12",
      end_date: "2024-10-15",
      reason: "Sick",
      status: "Pending",
    },
    {
      leave_id: 17,
      employee_id: "1175",
      start_date: "2024-10-27",
      end_date: "2024-10-30",
      reason: "Personal",
      status: "Approved",
    },
    {
      leave_id: 18,
      employee_id: "1186",
      start_date: "2024-11-03",
      end_date: "2024-11-05",
      reason: "Medical",
      status: "Pending",
    },
    {
      leave_id: 19,
      employee_id: "1197",
      start_date: "2024-10-13",
      end_date: "2024-10-15",
      reason: "Family Emergency",
      status: "Rejected",
    },
    {
      leave_id: 20,
      employee_id: "1208",
      start_date: "2024-10-22",
      end_date: "2024-10-25",
      reason: "Vacation",
      status: "Approved",
    },
  ];

  useEffect(() => {
    setLeaves(dummyLeaves);
    setFilteredLeaves(dummyLeaves);
  }, []);

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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filteredData = leaves.filter(
      (record) =>
        record.employee_id.includes(query) ||
        record.start_date.includes(query) ||
        record.end_date.includes(query) ||
        record.reason.toLowerCase().includes(query) ||
        record.status.toLowerCase().includes(query)
    );
    setFilteredLeaves(filteredData);
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

      <h2 className="text-3xl font-bold m-3 text-center">
        Leave Applications
      </h2>
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
          Apply for Leave
        </Button>
      </div>
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
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
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => handleEdit(leave.leave_id)}
                >
                  <Create />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDelete(leave.leave_id)}
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
