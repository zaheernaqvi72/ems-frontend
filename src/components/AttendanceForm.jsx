import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { recordAttendance } from "../services/attendanceService";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AttendanceForm = ({ fetchAttendance, closeModal }) => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [formData, setFormData] = useState({
    employee_id: "",
    date: "",
    status: "",
  });
  const [errors, setErrors] = useState({
    employee_id: false,
    date: false,
    status: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user modifies the input
    setErrors({ ...errors, [e.target.name]: false });
  };

  
  const date = new Date();
  date.setDate(date.getDate() + 1); // Set to tomorrow
  const todayDate = date.toISOString().split("T")[0];


  const validateForm = () => {
    const newErrors = {
      employee_id: formData.employee_id === "",
      date: formData.date === "" || new Date(formData.date) > todayDate,
      status: formData.status === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // Return false if any error exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({
        type: "error",
        content: "Please fill in all fields correctly!",
      });
      return;
    }

    try {
      await recordAttendance(formData);
      setMessage({ type: "success", content: "Attendance marked!" });

      // Clear form and navigate after success
      setTimeout(() => {
        setMessage({ type: "", content: "" });
        setFormData({
          employee_id: "",
          date: "",
          status: "",
        });
        fetchAttendance(formData); // Refresh employee list
        closeModal(); // Close the modal after employee is created
      }, 2000);
    } catch (error) {
      // Handle any errors from the API
      setMessage({
        type: "error",
        content:
          error.response?.data?.message ||
          "Failed to mark attendance. Please try again.",
      });

      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    }
  };
  

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">Apply Attendance</h2>
      {/* Display alerts for error or success */}
      {message.content && (
        <Stack sx={{ width: "100%", mt: 2, mb: 2 }} spacing={2}>
          <Alert variant="filled" severity={message.type}>
            {message.content}
          </Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee ID */}
        <TextField
          fullWidth
          label="Employee ID"
          name="employee_id"
          variant="outlined"
          value={formData.employee_id}
          onChange={handleChange}
          error={errors.employee_id} // Show error if field is invalid
          helperText={errors.employee_id ? "Employee ID is required!" : ""}
        />
        {/* Date */}
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          variant="outlined"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={errors.date} // Show error if field is invalid
          helperText={errors.date ? "Please select today or a past date!" : ""}
          inputProps={{ max: todayDate }} // Restrict date to today or before
        />
        {/* Status */}
        <TextField
          fullWidth
          select
          label="Status"
          name="status"
          variant="outlined"
          value={formData.status}
          onChange={handleChange}
          error={errors.status} // Show error if field is invalid
          helperText={errors.status ? "Status is required!" : ""}
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
          <MenuItem value="Late">Late (Half Day)</MenuItem>
        </TextField>
        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

AttendanceForm.propTypes = {
  fetchAttendance: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AttendanceForm;
