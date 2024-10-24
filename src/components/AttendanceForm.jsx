import { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { recordAttendance } from "../services/attendanceService";
import { getEmployees } from "../services/employeeService";
import PropTypes from "prop-types";
import { checkAttendanceExists } from "../services/attendanceService";
import handleError from "../utils/handleError";
import SnackbarComp from "./Snackbar";

const AttendanceForm = ({ fetchAttendance, closeModal }) => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [todayDate, setTodayDate] = useState("");
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
  const [employeeIds, setEmployeeIds] = useState([]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user modifies the input
    setErrors({ ...errors, [e.target.name]: false });
  };

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

  const validateForm = () => {
    const newErrors = {
      employee_id: formData.employee_id === "",
      date:
        formData.date === "" || new Date(formData.date) > new Date(todayDate),
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
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 2000);
      return;
    }

    try {
      // Check if attendance already exists
      const attendanceExists = await checkAttendanceExists(
        formData.employee_id,
        formData.date
      );

      if (attendanceExists) {
        setMessage({
          type: "error",
          content:
            "Attendance has already been marked for this employee on this date.",
        });
        return;
      }
      await recordAttendance(formData);
      setFormData({ employee_id: "", date: "", status: "" });
      fetchAttendance();
      setMessage({ type: "success", content: "Attendance marked!" });

      // Clear form and navigate after success
      setTimeout(() => {
        setMessage({ type: "", content: "" });

        closeModal(); // Close the modal after employee is created
      }, 3000);
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
      {/* Display success/error message */}
      {message.content && (
        <SnackbarComp
        position={{ vertical: "top", horizontal: "center" }}
        message={message}
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee ID */}
        <TextField
          fullWidth
          select
          label="Employee ID"
          name="employee_id"
          variant="outlined"
          value={formData.employee_id}
          onChange={handleChange}
          error={errors.employee_id} // Show error if field is invalid
          helperText={errors.employee_id ? "Employee ID is required!" : ""}
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
          <MenuItem value="On Leave">On Leave</MenuItem>
        </TextField>
        {/* Submit Button */}
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
          Mark Attendance
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
