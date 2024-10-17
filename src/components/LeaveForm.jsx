import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { applyLeave } from "../services/leaveService";

const LeaveForm = ({ fetchLeaves }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    leave_type: "",
    day_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [error, setError] = useState(""); // State to handle error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Date validation logic
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (endDate <= startDate) {
      setError("End date must be after the start date.");
      return;
    }

    // Reset error if validation passes
    setError("");

    try {
      await applyLeave(formData);
      alert("Leave applied successfully!");
      fetchLeaves(); // Refresh leave list
    } catch (error) {
      alert("Error applying leave", error);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">Apply Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          select
          label="Leave Type"
          name="leave_type"
          variant="outlined"
          value={formData.leave_type}
          onChange={handleChange}
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
        >
          <MenuItem value="Full">Full</MenuItem>
          <MenuItem value="Half">Half</MenuItem>
        
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
        />
        <TextField
          fullWidth
          label="Reason"
          name="reason"
          variant="outlined"
          value={formData.reason}
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message */}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default LeaveForm;
