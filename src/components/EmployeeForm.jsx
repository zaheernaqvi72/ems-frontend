import { useState, useEffect } from "react";
import {
  createEmployee,
  updateEmployee,
  checkEmployeeIdExists,
} from "../services/employeeService";
import { TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const EmployeeForm = ({ fetchEmployees, closeModal, reqType, editData }) => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [todayDate, setTodayDate] = useState("");
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    job_role: "",
    join_date: "",
    salary: "",
  });

  useEffect(() => {
    // Get the year, month, and day from the date object
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with leading zero

    // Format as YYYY-MM-DD
    const today = `${year}-${month}-${day}`;
    setTodayDate(today);
  }, []);

  // Prefill form data if in edit mode
  useEffect(() => {
    if (reqType === "edit" && editData) {
      setFormData({
        employee_id: editData.employee_id || "",
        first_name: editData.first_name || "",
        last_name: editData.last_name || "",
        email: editData.email || "",
        job_role: editData.job_role || "",
        join_date: editData.join_date || "",
        salary: editData.salary || "",
      });
    }
  }, [reqType, editData]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before submitting
  const validateForm = () => {
    if (
      !formData.employee_id ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.job_role ||
      !formData.join_date ||
      !formData.salary
    ) {
      setMessage({ type: "error", content: "All fields are required." });
      return false;
    }

    // Validate email format (simple regex check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: "error",
        content: "Please enter a valid email address.",
      });
      return false;
    }

    return true; // If all validations pass
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) {
      setTimeout(() => setMessage({ type: "", content: "" }), 3000); // Clear the alert after 3 seconds
      return;
    }

    try {
      if (reqType === "create") {
        // Check if employee ID already exists
        const idExists = await checkEmployeeIdExists(formData.employee_id);
        if (idExists) {
          setMessage({
            type: "error",
            content: "Employee ID already exists. Please use a different one.",
          });
        }
        // API call to create the employee
        await createEmployee(formData);

        setMessage({
          type: "success",
          content: "Employee created successfully!",
        });
      } else if (reqType === "edit") {
        if (!editData || !editData.employee_id) {
          setMessage({ type: "error", content: "Invalid employee record." });
          return;
        }
        // API call to edit the employee
        await updateEmployee(formData.employee_id, formData);

        setMessage({
          type: "success",
          content: "Employee updated successfully!",
        });
      }

      setFormData({
        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        job_role: "",
        join_date: "",
        salary: "",
      });

      // Clear form and navigate after success
      setTimeout(() => {
        setMessage({ type: "", content: "" });
        fetchEmployees(); // Refresh employee list
        closeModal(); // Close the modal after the employee is created or edited
      }, 2000);
    } catch (error) {
      // Handle any errors from the API
      setMessage({
        type: "error",
        content:
          error.response?.data?.message ||
          "Failed to process request. Please try again.",
      });

      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">
        {reqType === "create" ? "Create an Employee" : "Edit Employee"}
      </h2>

      {/* Display alerts for error or success */}
      {message.content && (
        <Stack sx={{ width: "100%", mt: 2, mb: 2 }} spacing={2}>
          <Alert variant="filled" severity={message.type}>
            {message.content}
          </Alert>
        </Stack>
      )}

      {/* Employee Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
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
          label="First Name"
          name="first_name"
          variant="outlined"
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          variant="outlined"
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Job Role"
          name="job_role"
          variant="outlined"
          value={formData.job_role}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Joining Date"
          name="join_date"
          type="date"
          variant="outlined"
          value={formData.join_date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
           inputProps={{ max: todayDate }}
        />
        <TextField
          fullWidth
          label="Salary"
          name="salary"
          variant="outlined"
          value={formData.salary}
          onChange={handleChange}
        />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          sx={{
            padding: "5px 20px",
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
          {reqType === "create" ? "Add Employee" : "Edit Employee"}
        </Button>
        {reqType == "edit" ? (
          <Button
            variant="outlined"
            color="error"
            onClick={closeModal}
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
        ) : null}
      </form>
    </>
  );
};

// PropTypes validation
EmployeeForm.propTypes = {
  fetchEmployees: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  reqType: PropTypes.string.isRequired,
  editData: PropTypes.object,
};

export default EmployeeForm;
