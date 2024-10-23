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
  // Object to store job roles and their counts
  const jobRoleCount = {};

  // Loop through employees and count job roles
  employeeData.forEach((employee) => {
    const jobRole = employee.job_role;

    // If the job role exists, increment the count, otherwise set it to 1
    jobRoleCount[jobRole] = (jobRoleCount[jobRole] || 0) + 1;
  });

  // Convert the object to an array of objects
  const jobRoleCountArray = Object.keys(jobRoleCount).map((key) => ({
    name: key,
    value: jobRoleCount[key],
  }));

  // Prepare data for leave applications chart
  const leaveDistributionData = [
    { name: "Approved", value: approvedLeaves },
    { name: "Pending", value: pendingLeaves },
    {
      name: "Rejected",
      value: leaveData.filter((leave) => leave.status === "Rejected").length,
    },
  ];

  // Prepare data for attendance chart
  const attendanceMap = {};

  // Loop through attendance data and count present/absent
  attendanceData.forEach((attendance) => {
    const date = attendance.date;
    const status = attendance.status;

    // If the date exists, increment the count, otherwise set it to 1
    attendanceMap[date] = attendanceMap[date] || {
      date,
      Present: 0,
      Absent: 0,
    };
    attendanceMap[date][status] += 1;
  });

  // Convert the object to an array of objects
  const attendanceMapArray = Object.values(attendanceMap);

  return (
    <div className="flex flex-col items-center justify-center w-full p-8 bg-gray-100 bg-opacity-15 rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-sky-200">
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

      <div className="flex flex-row w-full flex-wrap gap-6">
        {/* Employee Distribution */}
        <Card className="shadow-md w-full">
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              className="text-center mb-4"
            >
              Employee Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={jobRoleCountArray}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {jobRoleCountArray.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Chart */}
        <Card className="shadow-md w-full">
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              className="text-center mb-4"
            >
              Attendance Chart
            </Typography>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={attendanceMapArray}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Present"
                  fill="#82ca9d"
                  animationDuration={1500}
                />
                <Bar dataKey="Absent" fill="#ff4d4d" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leave Applications */}
        <Card className="shadow-md w-full">
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              className="text-center mb-4"
            >
              Leave Applications
            </Typography>
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={leaveDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {leaveDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#28a745", "#ffc107", "#dc3545"][index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#f5f5f5", border: "none" }}
                />
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
