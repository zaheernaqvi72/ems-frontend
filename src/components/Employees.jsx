import { useState, useEffect } from "react";
import { deleteEmployee, createEmployee } from "../services/employeeService"; // Assuming you have a delete service
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import { HighlightOff, Create } from "@mui/icons-material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from API
  const fetchEmployees = async () => {
    // Uncomment below when you have a working API
    // const data = await getEmployees();
    const dummyData = [
      {
        employee_id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        job_role: "Developer",
        salary: 70000,
        hire_date: "2022-01-15",
      },
      {
        employee_id: 2,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        job_role: "Manager",
        salary: 90000,
        hire_date: "2021-05-20",
      },
      {
        employee_id: 3,
        first_name: "Alice",
        last_name: "Johnson",
        email: "alice.johnson@example.com",
        job_role: "Designer",
        salary: 75000,
        hire_date: "2020-09-10",
      },
      {
        employee_id: 4,
        first_name: "Bob",
        last_name: "Brown",
        email: "bob.brown@example.com",
        job_role: "Tester",
        salary: 60000,
        hire_date: "2019-03-05",
      },
      {
        employee_id: 5,
        first_name: "Charlie",
        last_name: "Davis",
        email: "charlie.davis@example.com",
        job_role: "HR",
        salary: 65000,
        hire_date: "2018-12-01",
      },
    ];
    setEmployees(dummyData); // Set the dummy data
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId); // Assuming you have a service function to delete an employee
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (employeeId) => {
    // You can implement an edit modal or navigate to another page to edit the employee details
    console.log("Edit employee with ID:", employeeId);
  };

  const EmployeeForm = () => {
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      job_role: "",
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
          first_name: "",
          last_name: "",
          email: "",
          job_role: "",
          salary: "",
        });
        fetchEmployees(); // Refresh the employee list after adding new employee
      } catch (error) {
        alert("Error creating employee", error);
      }
    };

    return (
      <>
        <h2 className="text-4xl font-bold mb-4 text-center">
          Manage Employees
        </h2>
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-md mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>
      </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Employee Form */}
      <EmployeeForm />

      {/* Employee List Table */}
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">
        Employees List
      </h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Job Role</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Hire Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.employee_id}>
              <TableCell sx={{ fontWeight: "bold" }}>
                {employee.employee_id}
              </TableCell>
              <TableCell>{employee.first_name}</TableCell>
              <TableCell>{employee.last_name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.job_role}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>{employee.hire_date}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => handleEdit(employee.employee_id)}
                >
                  <Create />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDelete(employee.employee_id)}
                >
                  <HighlightOff />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeList;
