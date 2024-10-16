import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { applyLeave } from "../services/leaveService";

const LeaveForm = ({ fetchLeaves }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLeave(formData);
      alert("Leave applied successfully!");
      fetchLeaves();  // Refresh leave list
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
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default LeaveForm;
