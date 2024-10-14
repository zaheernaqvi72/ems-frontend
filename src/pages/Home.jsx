import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  PersonAdd,
  ListAlt,
  Assignment,
  BarChart,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import Heading from "../components/Heading";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4 rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-fuchsia-700">
        <Heading />
      </h1>
      <p className="text-lg text-center mb-6 text-gray-600">
        Manage your employees efficiently with our comprehensive system. From
        tracking attendance to managing performance reviews, our system is
        designed to streamline your HR processes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Card */}
        <motion.div
          className="w-full"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 15px rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
            <CardContent className="flex flex-col items-center">
              <DashboardIcon fontSize="large" className="text-blue-500 mb-2" />
              <Typography
                variant="h6"
                component="div"
                className="mb-2 text-center font-semibold text-gray-800"
              >
                Dashboard
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-center mb-4"
              >
                View overall statistics and insights on employee performance,
                attendance, and more.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/dashboard"
                className="transition duration-300 hover:bg-blue-700"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Employee Management Card */}
        <motion.div
          className="w-full"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 15px rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
            <CardContent className="flex flex-col items-center">
              <PersonAdd fontSize="large" className="text-green-500 mb-2" />
              <Typography
                variant="h6"
                component="div"
                className="mb-2 text-center font-semibold text-gray-800"
              >
                Employee Management
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-center mb-4"
              >
                Add, view, and manage employee details and job roles.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/employees/list"
                className="transition duration-300 hover:bg-green-700"
              >
                Manage Employees
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leave Management Card */}
        <motion.div
          className="w-full"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 15px rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
            <CardContent className="flex flex-col items-center">
              <Assignment fontSize="large" className="text-yellow-500 mb-2" />
              <Typography
                variant="h6"
                component="div"
                className="mb-2 text-center font-semibold text-gray-800"
              >
                Leave Management
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-center mb-4"
              >
                Approve, track, and manage employee leave requests and
                schedules.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/leave-management"
                className="transition duration-300 hover:bg-yellow-700"
              >
                Manage Leaves
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Tracking Card */}
        <motion.div
          className="w-full"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 15px rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
            <CardContent className="flex flex-col items-center">
              <ListAlt fontSize="large" className="text-red-500 mb-2" />
              <Typography
                variant="h6"
                component="div"
                className="mb-2 text-center font-semibold text-gray-800"
              >
                Attendance Tracking
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-center mb-4"
              >
                Monitor employee attendance and generate reports.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/attendance"
                className="transition duration-300 hover:bg-red-700"
              >
                Track Attendance
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Reviews Card */}
        <motion.div
          className="w-full"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 15px rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
            <CardContent className="flex flex-col items-center">
              <BarChart fontSize="large" className="text-purple-500 mb-2" />
              <Typography
                variant="h6"
                component="div"
                className="mb-2 text-center font-semibold text-gray-800"
              >
                Performance Reviews
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-center mb-4"
              >
                Conduct and review employee performance evaluations.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/performance-review"
                className="transition duration-300 hover:bg-purple-700"
              >
                Review Performance
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
