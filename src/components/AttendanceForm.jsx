import { useState, useEffect } from "react";
import { TextField, Button, Autocomplete } from "@mui/material";
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

      // Get current date and record date
      const currentDate = new Date().toISOString().split("T")[0];
      const attendanceDate = formData.date.split("T")[0];

      // Create timestamp for attendance creation and check time (10 AM)
      const createdAt = new Date(); // Assuming attendance is marked now
      const tenAM = new Date();
      tenAM.setHours(10, 0, 0, 0);

      // Set initial status
      let status = formData.status;

      // Update status based on time and attendance date
      if (attendanceDate !== currentDate) {
        // Mark as Absent if attendance is not marked for today
        status = "Absent";
      } else if (
        createdAt > tenAM &&
        status !== "Late" &&
        status !== "On Leave" &&
        status !== "Absent"
      ) {
        // Mark as Late if attendance is after 10 AM and was initially marked as Present
        status = "Late";
      }

      // Update formData with new status
      formData.status = status;

      // Record the attendance
      await recordAttendance(formData);
      setFormData({ employee_id: "", date: "", status: "" });
      fetchAttendance();
      setMessage({ type: "success", content: "Attendance marked!" });

      // Clear form and navigate after success
      setTimeout(() => {
        setMessage({ type: "", content: "" });
        closeModal(); // Close the modal after attendance is marked
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
      <h2 className="text-3xl font-bold mb-4 text-center">Mark Attendance</h2>
      {/* Display success/error message */}
      {message.content && (
        <SnackbarComp
          position={{ vertical: "top", horizontal: "center" }}
          message={message}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <Autocomplete
          options={employeeIds}
          getOptionLabel={(option) => option.toString()}
          value={formData.employee_id}
          onChange={(event, newValue) =>
            handleChange({ target: { name: "employee_id", value: newValue } })
          
          }
          isOptionEqualToValue={(option, value) => option === value || value === null}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Employee ID"
              variant="outlined"
              error={errors.employee_id} // Show error if field is invalid
              helperText={errors.employee_id ? "Employee ID is required!" : ""}
            />
          )}
          sx={{ width: "100%" }}
          placeholder="Combo box"
        />

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
        

          <Autocomplete
          options = {["Present", "Absent", "Late", "On Leave"]}
          getOptionLabel={(option) => option.toString()}
          value={formData.status}
          onChange={(event, newValue) =>
            handleChange({ target: { name: "status", value: newValue } })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Status"
              variant="outlined"
              error={errors.status} // Show error if field is invalid
              helperText={errors.status ? "Status is required!" : ""}
            />
          )}
          sx={{ width: "100%" }}
          placeholder="Combo box"
        />

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
