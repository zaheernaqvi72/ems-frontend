import { useState, useEffect } from "react";
import { deleteEmployee } from "../services/employeeService"; // Assuming you have a delete service
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import { HighlightOff, Create, Add, Search, Close } from "@mui/icons-material";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [sortedEmployees, setSortedEmployees] = useState([]);

  const dummyData = [
    {
      employee_id: 1012,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      job_role: "Developer",
      salary: 70000,
      join_date: "2022-01-15",
    },
    {
      employee_id: 2012,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      job_role: "Manager",
      salary: 90000,
      join_date: "2021-05-20",
    },
    {
      employee_id: 1023,
      first_name: "Robert",
      last_name: "Brown",
      email: "robert.brown@example.com",
      job_role: "Designer",
      salary: 75000,
      join_date: "2020-07-11",
    },
    {
      employee_id: 2023,
      first_name: "Emily",
      last_name: "Davis",
      email: "emily.davis@example.com",
      job_role: "QA Engineer",
      salary: 68000,
      join_date: "2019-09-02",
    },
    {
      employee_id: 1034,
      first_name: "Michael",
      last_name: "Johnson",
      email: "michael.johnson@example.com",
      job_role: "DevOps Engineer",
      salary: 85000,
      join_date: "2018-04-14",
    },
    {
      employee_id: 2034,
      first_name: "Sarah",
      last_name: "Williams",
      email: "sarah.williams@example.com",
      job_role: "HR Manager",
      salary: 95000,
      join_date: "2017-10-01",
    },
    {
      employee_id: 1045,
      first_name: "David",
      last_name: "Martinez",
      email: "david.martinez@example.com",
      job_role: "Data Scientist",
      salary: 120000,
      join_date: "2021-01-30",
    },
    {
      employee_id: 2045,
      first_name: "Sophia",
      last_name: "Garcia",
      email: "sophia.garcia@example.com",
      job_role: "Project Manager",
      salary: 80000,
      join_date: "2019-11-07",
    },
    {
      employee_id: 1056,
      first_name: "James",
      last_name: "Hernandez",
      email: "james.hernandez@example.com",
      job_role: "Full Stack Developer",
      salary: 95000,
      join_date: "2022-03-19",
    },
    {
      employee_id: 2056,
      first_name: "Olivia",
      last_name: "Taylor",
      email: "olivia.taylor@example.com",
      job_role: "Product Manager",
      salary: 110000,
      join_date: "2019-06-15",
    },
    {
      employee_id: 1067,
      first_name: "Daniel",
      last_name: "Moore",
      email: "daniel.moore@example.com",
      job_role: "Backend Developer",
      salary: 72000,
      join_date: "2021-05-05",
    },
    {
      employee_id: 2067,
      first_name: "Mia",
      last_name: "Wilson",
      email: "mia.wilson@example.com",
      job_role: "Front-end Developer",
      salary: 85000,
      join_date: "2018-11-28",
    },
    {
      employee_id: 1078,
      first_name: "Joshua",
      last_name: "Anderson",
      email: "joshua.anderson@example.com",
      job_role: "UI/UX Designer",
      salary: 68000,
      join_date: "2022-02-20",
    },
    {
      employee_id: 2078,
      first_name: "Isabella",
      last_name: "Thomas",
      email: "isabella.thomas@example.com",
      job_role: "Marketing Specialist",
      salary: 78000,
      join_date: "2017-08-09",
    },
    {
      employee_id: 1089,
      first_name: "Ethan",
      last_name: "Jackson",
      email: "ethan.jackson@example.com",
      job_role: "Backend Developer",
      salary: 82000,
      join_date: "2018-12-25",
    },
    {
      employee_id: 2089,
      first_name: "Ava",
      last_name: "White",
      email: "ava.white@example.com",
      job_role: "SEO Specialist",
      salary: 71000,
      join_date: "2019-02-05",
    },
    {
      employee_id: 1100,
      first_name: "Benjamin",
      last_name: "Martinez",
      email: "benjamin.martinez@example.com",
      job_role: "Lead Developer",
      salary: 100000,
      join_date: "2016-03-17",
    },
    {
      employee_id: 2100,
      first_name: "Charlotte",
      last_name: "King",
      email: "charlotte.king@example.com",
      job_role: "HR Specialist",
      salary: 72000,
      join_date: "2021-08-03",
    },
    {
      employee_id: 1111,
      first_name: "William",
      last_name: "Lee",
      email: "william.lee@example.com",
      job_role: "Cloud Engineer",
      salary: 95000,
      join_date: "2017-07-25",
    },
    {
      employee_id: 2111,
      first_name: "Amelia",
      last_name: "Martinez",
      email: "amelia.martinez@example.com",
      job_role: "Business Analyst",
      salary: 84000,
      join_date: "2018-11-11",
    },
    {
      employee_id: 1122,
      first_name: "Alexander",
      last_name: "Roberts",
      email: "alexander.roberts@example.com",
      job_role: "Software Engineer",
      salary: 98000,
      join_date: "2022-01-18",
    },
    {
      employee_id: 2122,
      first_name: "Lily",
      last_name: "Scott",
      email: "lily.scott@example.com",
      job_role: "Accountant",
      salary: 65000,
      join_date: "2019-04-29",
    },
    {
      employee_id: 1133,
      first_name: "Lucas",
      last_name: "Perez",
      email: "lucas.perez@example.com",
      job_role: "Data Engineer",
      salary: 92000,
      join_date: "2015-09-23",
    },
    {
      employee_id: 2133,
      first_name: "Chloe",
      last_name: "Ramirez",
      email: "chloe.ramirez@example.com",
      job_role: "IT Support",
      salary: 62000,
      join_date: "2017-05-14",
    },
    {
      employee_id: 1144,
      first_name: "Andrew",
      last_name: "Gonzalez",
      email: "andrew.gonzalez@example.com",
      job_role: "Network Engineer",
      salary: 86000,
      join_date: "2016-11-30",
    },
    {
      employee_id: 2144,
      first_name: "Zoe",
      last_name: "Green",
      email: "zoe.green@example.com",
      job_role: "Consultant",
      salary: 79000,
      join_date: "2018-06-19",
    },
    {
      employee_id: 1155,
      first_name: "Ryan",
      last_name: "Lopez",
      email: "ryan.lopez@example.com",
      job_role: "Security Analyst",
      salary: 88000,
      join_date: "2015-02-17",
    },
    {
      employee_id: 2155,
      first_name: "Ella",
      last_name: "Martinez",
      email: "ella.martinez@example.com",
      job_role: "Sales Manager",
      salary: 73000,
      join_date: "2020-12-21",
    },
    {
      employee_id: 1166,
      first_name: "Sebastian",
      last_name: "Nelson",
      email: "sebastian.nelson@example.com",
      job_role: "Architect",
      salary: 90000,
      join_date: "2019-08-03",
    },
    {
      employee_id: 2166,
      first_name: "Mason",
      last_name: "Rodriguez",
      email: "mason.rodriguez@example.com",
      job_role: "Database Admin",
      salary: 77000,
      join_date: "2023-03-27",
    }
  ];
  
  // Fetch employees from API
  const fetchEmployees = async () => {
    setEmployees(dummyData);
  };
  useEffect(() => {
    fetchEmployees();
    const sorted = [...employees].sort(
      (a, b) => new Date(b.join_date) - new Date(a.join_date)
    );
    setSortedEmployees(sorted);
  }, [employees]);

  useEffect(() => {
    const filteredData = sortedEmployees.filter(
      (record) =>
        record.employee_id.toString().includes(searchQuery) ||
        record.first_name.toLowerCase().includes(searchQuery) ||
        record.last_name.toLowerCase().includes(searchQuery) ||
        record.email.toLowerCase().includes(searchQuery) ||
        record.job_role.toLowerCase().includes(searchQuery) ||
        record.salary.toString().includes(searchQuery) ||
        record.join_date.includes(searchQuery)
    );
    setFilteredEmployee(filteredData);
  }, [searchQuery, sortedEmployees]);

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId); // Assuming you have a service function to delete an employee
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (employeeId) => {
    console.log("Edit employee with ID:", employeeId);
    handleFormModal(true);
  };
 
  const handleFormModal = () => {
    setFormModalOpen(true);
  };

  return (
    <div className="max-w-6xl m-auto p-4 bg-gray-100 shadow-md rounded-md">
      {/* Employee List Table */}
      <h2 className="text-3xl font-bold m-3 text-center">Employees List</h2>
      <Modal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        aria-labelledby="form-modal-title"
        aria-describedby="form-modal-description"
      >
        <Box
          className="modal-box"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgb(243 244 246)",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <div>
            <div className="absolute right-5 top-3">
              <Button
                variant="outlined"
                color="error"
                onClick={() => setFormModalOpen(false)}
                className="rounded-full"
                sx={{
                  minWidth: 0,
                  padding: "4px",
                  borderRadius: "50%",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <Close />
              </Button>
            </div>
            <EmployeeForm fetchEmployees={fetchEmployees} />
          </div>
        </Box>
      </Modal>
      <hr />
      <div className="flex justify-between items-center m-3">
        <TextField
          variant="outlined"
          color="primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          placeholder="Search by employee-id, name, email, job role, salary, or hire date"
          sx={{
            width: "70%",
            padding: "12px 0px",
            fontSize: "16px",
            borderRadius: "20px",
            "& input": {
              transition: "all 0.3s ease",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "50px",
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-500" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleFormModal}
          startIcon={<Add />}
          sx={{
            padding: "10px 20px",
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
          Create Employee
        </Button>
      </div>
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID No</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Job Role</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Join Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Use filteredEmployee for rendering the table */}
          {filteredEmployee.map((record) => (
            <TableRow key={record.employee_id}>
              <TableCell sx={{ fontWeight: "bold" }}>
                {record.employee_id}
              </TableCell>
              <TableCell>
                {record.first_name} {record.last_name}
              </TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>{record.job_role}</TableCell>
              <TableCell>{record.salary}</TableCell>
              <TableCell>{record.join_date}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => handleEdit(record.employee_id)}
                >
                  <Create />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDelete(record.employee_id)}
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
