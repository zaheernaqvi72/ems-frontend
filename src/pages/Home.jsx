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
    <div className="flex flex-col items-center justify-center w-full p-6 bg-gray-100 bg-opacity-15 rounded-lg">
      <h1 className=" text-4xl font-bold mb-6 text-center text-sky-200">
        <Heading />
      </h1>
      <p className="text-lg text-center mb-6 text-slate-100">
        Manage your employees efficiently with our comprehensive system. From
        tracking attendance to managing performance reviews, our system is
        designed to streamline your HR processes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Dashboard Card */}
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white min-w-[250px] shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
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
                sx={{ marginTop: "1rem" }}
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Employee Management Card */}
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white min-w-[250px] shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
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
                to="/employees"
                className="transition duration-300 hover:bg-green-700"
                sx={{ marginTop: "1rem" }}
              >
                Manage Employees
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leave Management Card */}
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white min-w-[250px] shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
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
                to="/leaves"
                className="transition duration-300 hover:bg-yellow-700"
                sx={{ marginTop: "1rem" }}
              >
                Manage Leaves
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Tracking Card */}
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white min-w-[250px] shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
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
                sx={{ marginTop: "1rem" }}
              >
                Track Attendance
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Reviews Card */}
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white min-w-[250px] shadow-md hover:shadow-2xl transition duration-300 ease-in-out transform">
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
                Employee performance evaluations.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/reviews"
                className="transition duration-300 hover:bg-purple-700"
                sx={{ marginTop: "1rem" }}
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
