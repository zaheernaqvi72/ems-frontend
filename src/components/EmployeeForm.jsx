import { useState } from "react";
import { createEmployee } from "../services/employeeService";
import { TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const EmployeeForm = ({ fetchEmployees, closeModal }) => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    job_role: "",
    join_date: "",
    salary: "",
  });


  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before submitting
  const validateForm = () => {
    if (!formData.employee_id || !formData.first_name || !formData.last_name || !formData.email || !formData.job_role || !formData.join_date || !formData.salary) {
      setMessage({ type: "error", content: "All fields are required." });
      return false;
    }

    // Validate email format (simple regex check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", content: "Please enter a valid email address." });
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
      // API call to create the employee
      await createEmployee(formData);
      setMessage({ type: "success", content: "Employee created successfully!" });

      // Clear form and navigate after success
      setTimeout(() => {
        setMessage({ type: "", content: "" });
        setFormData({
          employee_id: "",
          first_name: "",
          last_name: "",
          email: "",
          job_role: "",
          join_date: "",
          salary: "",
        });
        fetchEmployees(); // Refresh employee list
        closeModal(); // Close the modal after employee is created
      }, 2000);
    } catch (error) {
      // Handle any errors from the API
      setMessage({ type: "error", content: error.response?.data?.message || "Failed to create employee. Please try again." });

      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000); 
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">Create an Employee</h2>

      {/* Display alerts for error or success */}
      {message.content && (
        <Stack sx={{ width: "100%", mt: 2, mb:2 }} spacing={2}>
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
        />
        <TextField
          fullWidth
          label="Salary"
          name="salary"
          variant="outlined"
          value={formData.salary}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          CREATE
        </Button>
      </form>
    </>
  );
};

// PropTypes validation
EmployeeForm.propTypes = {
  fetchEmployees: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired, // New prop for closing modal
};

export default EmployeeForm;
