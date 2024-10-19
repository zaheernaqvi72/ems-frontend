import { useState } from "react";
import { createEmployee } from "../services/employeeService";
import { TextField, Button } from "@mui/material";
import PropTypes from "prop-types";

const EmployeeForm = ({ fetchEmployees }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    job_role: "",
    hire_date: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(formData);
      alert("Employee created successfully!");
      setFormData({
        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        job_role: "",
        hire_date: "",
        salary: "",
      });
      fetchEmployees(); // Refresh the employee list after adding new employee
    } catch (error) {
      alert("Error creating employee", error);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">Create an Employee</h2>
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
          name="hire_date"
          type="date"
          variant="outlined"
          value={formData.hire_date}
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
          Submit
        </Button>
      </form>
    </>
  );
};

// PropTypes validation
EmployeeForm.propTypes = {
  fetchEmployees: PropTypes.func.isRequired,
};

export default EmployeeForm;
