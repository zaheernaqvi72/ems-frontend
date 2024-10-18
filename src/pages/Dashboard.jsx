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
} from "recharts";

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);

  useEffect(() => {
    // Mock fetching data from backend or API
    fetchEmployeeData();
    fetchAttendanceData();
    fetchLeaveData();
    fetchTrendsData();
  }, []);

  const fetchEmployeeData = () => {
    const data = [
      { name: "Engineering", value: 400 },
      { name: "Sales", value: 300 },
      { name: "HR", value: 300 },
      { name: "Finance", value: 200 },
      { name: "IT", value: 400 },
      { name: "Software", value: 300 },
      { name: "AI", value: 300 },
      { name: "ML", value: 200 },
    ];
    setEmployeeData(data);
  };

  const fetchAttendanceData = () => {
    const data = [
      { date: "2024-07-01", present: 100, absent: 10 },
      { date: "2024-07-02", present: 90, absent: 20 },
      { date: "2024-07-03", present: 110, absent: 5 },
      { date: "2024-07-04", present: 100, absent: 10 },
      { date: "2024-07-05", present: 90, absent: 20 },
      { date: "2024-07-06", present: 110, absent: 5 },
    ];
    setAttendanceData(data);
  };

  const fetchLeaveData = () => {
    const data = [
      { name: "Approved", value: 240 },
      { name: "Pending", value: 60 },
      { name: "Rejected", value: 40 },
    ];
    setLeaveData(data);
  };

  const fetchTrendsData = () => {
    const data = [
      { date: "2024-07-01", employees: 100, leaves: 10 },
      { date: "2024-07-02", employees: 120, leaves: 15 },
      { date: "2024-07-03", employees: 150, leaves: 20 },
      { date: "2024-07-04", employees: 170, leaves: 25 },
      { date: "2024-07-05", employees: 180, leaves: 10 },
    ];
    setTrendsData(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-8 bg-gray-100 bg-opacity-15 rounded-lg">
      <h1 className=" text-3xl font-bold mb-6 text-center text-amber-600">
        Employees Dashboard
      </h1>

      <div className="flex flex-wrap items-end space-x-5 space-y-5 mb-6 w-full">
        <Card className="shadow-md flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md h-full ">
          <CardContent className=" flex flex-col justify-between">
            <Typography
              variant="h6"
              component="div"
              className="text-center text-blue-700"
            >
              Total Employees
            </Typography>
            <Typography variant="h4" className="text-center font-bold">
              1,500
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md h-full">
          <CardContent className=" flex flex-col justify-between">
            <Typography
              variant="h6"
              component="div"
              className="text-center text-green-700"
            >
              Present Employees
            </Typography>
            <Typography variant="h4" className="text-center font-bold">
              240
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md h-full">
          <CardContent className=" flex flex-col justify-between">
            <Typography
              variant="h6"
              component="div"
              className="text-center text-yellow-700"
            >
              Approved Leaves
            </Typography>
            <Typography variant="h4" className="text-center font-bold">
              60
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md h-full">
          <CardContent className=" flex flex-col justify-between">
            <Typography
              variant="h6"
              component="div"
              className="text-center text-pink-600"
            >
              Pending Leaves
            </Typography>
            <Typography variant="h4" className="text-center font-bold">
              60
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
            <PieChart width={400} height={300}>
              <Pie
                data={employeeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {employeeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
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
            <BarChart width={500} height={300} data={attendanceData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#82ca9d" />
              <Bar dataKey="absent" fill="#ff4d4d" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Leave Applications */}
        <Card className="shadow-md">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              className="text-center mb-4"
            >
              Leave Applications
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={leaveData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {leaveData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#28a745", "#ffc107", "#dc3545"][index % 3]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
