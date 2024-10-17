import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { recordAttendance } from "../services/attendanceService";

const AttendanceForm = ({ fetchAttendance }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    date: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordAttendance(formData);
      alert("Attendance recorded successfully!");
      fetchAttendance();
    } catch (error) {
      alert("Error recording attendance", error);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">Apply Attendance</h2>
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
          label="Date"
          name="date"
          type="date"
          variant="outlined"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          select
          label="Status"
          name="status"
          variant="outlined"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
          <MenuItem value="Late">Late (Half Day)</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default AttendanceForm;
