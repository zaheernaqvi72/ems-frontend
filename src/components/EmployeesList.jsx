import { useState, useEffect } from "react";
import { deleteEmployee, getEmployees } from "../services/employeeService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { HighlightOff, Create, Add, Search, Close } from "@mui/icons-material";
import EmployeeForm from "./EmployeeForm";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // For delete confirmation modal
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Store the employee to be deleted
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [editData, setEditData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    job_role: "",
    join_date: "",
    salary: "",
  });
  const [reqType, setReqType] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      const sorted = [...employees].sort(
        (a, b) => new Date(b.join_date) - new Date(a.join_date)
      );
      setSortedEmployees(sorted);
    }
  }, [employees]);

  useEffect(() => {
    const filteredData = sortedEmployees.filter(
      (record) =>
        record.employee_id.toString().includes(searchQuery) ||
        record.first_name.toLowerCase().includes(searchQuery) ||
        record.last_name.toLowerCase().includes(searchQuery) ||
        record.email.toLowerCase().includes(searchQuery) ||
        record.job_role.toLowerCase().includes(searchQuery) ||
        record.salary.toString().includes(searchQuery) ||
        record.join_date.includes(searchQuery)
    );
    setFilteredEmployee(filteredData);
  }, [searchQuery, sortedEmployees]);

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeToDelete);
      setDeleteModalOpen(false);
      setEmployeeToDelete(null);
      fetchEmployees();
      setMessage({ type: "success", content: "Employee deleted successfully" });

      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    } catch (error) {
      console.error("Error deleting employee:", error);
      setMessage({
        type: "error",
        content: ` Failed to delete employee. Please try again`,
      });
      
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    }
  };

  const handleDeleteModalOpen = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setDeleteModalOpen(true);
  };

  const handleFormModal = () => {
    setFormModalOpen(true);
    setReqType("create");
  };

  const handleEdit = (employeeId) => {
    setFormModalOpen(true);
    setReqType("edit");
    // Find the attendance record by ID
    const record = employees.find((r) => r.employee_id === employeeId);

    if (record) {
      setEditData(record);
      setFormModalOpen(true);
    } else {
      setMessage({ type: "error", content: "Invalid employee record." });
    }
  };

  return (
    <div className="max-w-6xl m-auto p-4 bg-gray-100 shadow-md rounded-md">
      {/* Display alerts for error or success */}
      {message.content && (
        <Stack sx={{ width: "100%", mt: 2, mb: 2 }} spacing={2}>
          <Alert variant="filled" severity={message.type}>
            {message.content}
          </Alert>
        </Stack>
      )}

      {/* Employee List Table */}
      <h2 className="text-3xl font-bold m-3 text-center">Employees List</h2>

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
            Are you sure you want to delete this employee?
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

      {/* Employee Update Modal */}
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
          {reqType == "create" ? 
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
                marginBottom: "10px",
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
          </div> : null }
          <EmployeeForm
            fetchEmployees={fetchEmployees}
            closeModal={() => setFormModalOpen(false)}
            editData={editData}
            reqType={reqType}
          />
        </Box>
      </Modal>

      <hr />

      {/* Search and Create Employee Button */}
      <div className="flex justify-between items-center m-3">
        <TextField
          variant="outlined"
          color="primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          placeholder="Search by employee-id, name, email, job role, salary, or hire date"
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
          Create Employee
        </Button> 
        
      </div>

      <hr />

      {/* Employee Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID No</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Job Role</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Join Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmployee.length > 0 ? (
            filteredEmployee.map((employee) => (
              <TableRow key={employee.employee_id}>
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell>
                  {employee.first_name} {employee.last_name}
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.job_role}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.join_date}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<Create />}
                    onClick={() => handleEdit(employee.employee_id)}
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
                    color="error"
                    startIcon={<HighlightOff />}
                    onClick={() => handleDeleteModalOpen(employee.employee_id)}
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ fontWeight: "bold" }}>
                No employee records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeList;
