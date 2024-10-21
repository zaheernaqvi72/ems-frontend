import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import {
  applyLeave,
  updateLeave,
  checkPendingLeaveExists,
} from "../services/leaveService";
import PropTypes from "prop-types";
import { getEmployees } from "../services/employeeService";
import { useEffect } from "react";
import handleError from "../utils/handleError";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const LeaveForm = ({ fetchLeaves, closeModal, reqType, editData }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    leave_type: "",
    day_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    status: "Pending",
  });

  const [error, setError] = useState("");
  const [employeeIds, setEmployeeIds] = useState([]);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [todayDate, setTodayDate] = useState("");
  const [errors, setErrors] = useState({
    employee_id: false,
    start_date: false,
    end_date: false,
    reason: false,
    leave_type: false,
    day_type: false,
  });

  // Prefill form data if in edit mode
  useEffect(() => {
    if (reqType === "edit" && editData) {
      setFormData({
        leave_id: editData.leave_id || "",
        employee_id: editData.employee_id || "",
        leave_type: editData.leave_type || "",
        day_type: editData.day_type || "",
        start_date: editData.start_date || "",
        end_date: editData.end_date || "",
        reason: editData.reason || "",
        status: editData.status || "",
      });
    }
  }, [reqType, editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        handleError(error);
      }
    };

    fetchEmployees();
  }, []);

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
        formData.start_date === "" ||
        new Date(formData.start_date) < new Date(todayDate),
      leave_type: formData.leave_type === "",
      day_type: formData.day_type === "",
      start_date: formData.start_date === "",
      end_date: formData.end_date === "",
      reason: formData.reason === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // Return false if any error exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Date validation logic
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (endDate < startDate) {
      setError("End date must be equal or after the start date.");
      return;
    }

    // Reset error if validation passes
    setError("");

    if (!validateForm()) {
      setMessage({
        type: "error",
        content: "Please fill in all fields correctly!",
      });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
      return;
    }

    try {
      if (reqType === "create") {
        // Check if leave already exists for the employee
        const leaveExists = await checkPendingLeaveExists(
          formData.employee_id,
          formData.status
        );

        if (leaveExists) {
          setMessage({
            type: "error",
            content: "Leave already exists for this employee.",
          });
          return;
        }

        await applyLeave(formData);
        setMessage({
          type: "success",
          content: "Leave applied successfully!",
        });
      } else if (reqType === "edit") {
        if (!editData || !editData.leave_id) {
          setMessage({ type: "error", content: "Invalid leave record." });
          return;
        }
        // API call to edit the employee
        await updateLeave(formData.leave_id, formData);
        setMessage({
          type: "success",
          content: "Employee updated successfully!",
        });
      }

      fetchLeaves();

      // Clear form and navigate after success
      setTimeout(() => {
        setMessage({ type: "", content: "" });
        setFormData({
          employee_id: "",
          leave_type: "",
          day_type: "",
          start_date: "",
          end_date: "",
          reason: "",
          status: "Pending",
        });
        closeModal();
      }, 3000);
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
        {reqType === "create" ? "Apply Leave" : "Edit Leave"}
      </h2>
      {/* Display alerts for error or success */}
      {message.content && (
        <Stack sx={{ width: "100%", mt: 2, mb: 2 }} spacing={2}>
          <Alert variant="filled" severity={message.type}>
            {message.content}
          </Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          select
          label="Employee ID"
          name="employee_id"
          variant="outlined"
          value={formData.employee_id}
          onChange={handleChange}
          error={error.employee_id} // Show error if field is invalid
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
            <MenuItem disabled>No employee id found</MenuItem>
          )}
        </TextField>
        <TextField
          fullWidth
          select
          label="Leave Type"
          name="leave_type"
          variant="outlined"
          value={formData.leave_type}
          onChange={handleChange}
          error={errors.leave_type} // Show error if field is invalid
          helperText={errors.leave_type ? "Leave type is required!" : ""}
        >
          <MenuItem value="Earned leave">Earned leave</MenuItem>
          <MenuItem value="Casual leave">Casual leave</MenuItem>
          <MenuItem value="Sick leave">Sick leave</MenuItem>
          <MenuItem value="Leave without pay">Leave without pay</MenuItem>
        </TextField>
        <TextField
          fullWidth
          select
          label="Day Type"
          name="day_type"
          variant="outlined"
          value={formData.day_type}
          onChange={handleChange}
          error={errors.day_type} // Show error if field is invalid
          helperText={errors.day_type ? "Day type is required!" : ""}
        >
          <MenuItem value="Full Day">Full Day</MenuItem>
          <MenuItem value="Half Day">Half Day</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Start Date"
          name="start_date"
          type="date"
          variant="outlined"
          value={formData.start_date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.date} // Show error if field is invalid
          helperText={errors.date ? "Please select today or a past date!" : ""}
          inputProps={{ min: todayDate }}
        />
        <TextField
          fullWidth
          label="End Date"
          name="end_date"
          type="date"
          variant="outlined"
          value={formData.end_date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.date}
          helperText={errors.date ? "Please select today or a past date!" : ""}
          inputProps={{ min: todayDate }}
        />
        <TextField
          fullWidth
          label="Reason"
          name="reason"
          variant="outlined"
          value={formData.reason}
          onChange={handleChange}
          error={errors.reason} // Show error if field is invalid
          helperText={errors.reason ? "Reason is required!" : ""}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message */}
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          sx={{
            padding: "5px 20px",
            fontSize: "16px",
            borderRadius: "30px",
            marginRight: "10px",
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
          {reqType === "create" ? "Apply Leave" : "Update Leave"}
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

LeaveForm.propTypes = {
  fetchLeaves: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  reqType: PropTypes.oneOf(["create", "edit"]).isRequired,
  editData: PropTypes.object,
};

export default LeaveForm;
