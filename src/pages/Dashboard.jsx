import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getEmployees } from "../services/employeeService.js";
import { getAllAttendance } from "../services/attendanceService.js";
import { getLeaves } from "../services/leaveService.js";

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    fetchEmployeeData();
    fetchAttendanceData();
    fetchLeaveData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await getEmployees();
      setEmployeeData(response);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await getAllAttendance();
      setAttendanceData(response);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const fetchLeaveData = async () => {
    try {
      const response = await getLeaves();
      setLeaveData(response);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  // Assuming attendanceData has present/absent status
  const presentEmployees = attendanceData.filter(
    (attendance) => attendance.status === "Present"
  ).length;

  const approvedLeaves = leaveData.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const pendingLeaves = leaveData.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const totalEmployees = employeeData.length;

  // Prepare data for employee distribution chart
  const employeeDistributionData = employeeData.map(emp => ({
    name: emp.department, // Assuming department or role
    value: 1 
  }));

  console.log(employeeData);

  // Prepare data for leave applications chart
  const leaveDistributionData = [
    { name: "Approved", value: approvedLeaves },
    { name: "Pending", value: pendingLeaves },
    { name: "Rejected", value: leaveData.filter(leave => leave.status === "Rejected").length },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full p-8 bg-gray-100 bg-opacity-15 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-600">
        Employees Dashboard
      </h1>

      <div className="flex flex-wrap items-end space-x-5 space-y-5 mb-6 w-full">
        <Card className="shadow-md flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md h-full">
          <CardContent className="flex flex-col justify-between">
            <Typography
              variant="h6"
              component="div"
              className="text-center text-blue-700"
            >
              Total Employees
            </Typography>
            <Typography variant="h4" className="text-center font-bold">
              {totalEmployees}
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md h-full">
          <CardContent className="flex flex-col justify-between">
            <Typography
              variant="h6"
              component="div"
              className="text-center text-green-700"
            >
              Present Employees
            </Typography>
            <Typography variant="h4" className="text-center font-bold">
              {presentEmployees}
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md h-full">
          <CardContent className="flex flex-col justify-between">
            <Typography
              variant="h6"
              component="div"
              className="text-center text-yellow-700"
            >
              Approved Leaves
            </Typography>
            <Typography variant="h4" className="text-center font-bold">
              {approvedLeaves}
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md h-full">
          <CardContent className="flex flex-col justify-between">
            <Typography
              variant="h6"
              component="div"
              className="text-center text-pink-600"
            >
              Pending Leaves
            </Typography>
            <Typography variant="h4" className="text-center font-bold">
              {pendingLeaves}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employee Distribution */}
        <Card className="shadow-md">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              className="text-center mb-4"
            >
              Employee Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart
                padding={{ top: 5, right: "20px", left: 50, bottom: 5 }}
              >
                <Pie
                  data={employeeDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {employeeDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Chart */}
        <Card className="shadow-md">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              className="text-center mb-4"
            >
              Attendance Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#82ca9d" />
                <Bar dataKey="absent" fill="#ff4d4d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leave Applications */}
        <Card className="shadow-md w-auto">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              className="text-center mb-4"
            >
              Leave Applications
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {leaveDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#28a745", "#ffc107", "#dc3545"][index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
