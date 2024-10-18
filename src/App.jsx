import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeList from "./components/EmployeesList";
import AttendanceList from "./components/AttendanceList";
import LeaveList from "./components/LeaveList";
import ReviewList from "./components/ReviewList";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto";  // MUI font
import theme from "./theme";   // Custom MUI theme
import Spline from "@splinetool/react-spline";  // Spline component import

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container relative">
        {/* Background Spline */}
        <div className="spline-one spline-background absolute inset-0 z-[-1]">
          {/* First Spline */}
          <Spline scene="https://prod.spline.design/IDlnF-9QZ1k1sM3u/scene.splinecode" />
          {/* Second Spline (optional, for larger content) */}
          <div className="sp-div">
            <Spline scene="https://prod.spline.design/IDlnF-9QZ1k1sM3u/scene.splinecode" />
          </div>
        </div>

        {/* Foreground Content */}
        <Router>
          <Navbar />
          <div className="main-content container mx-auto p-4 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/attendance" element={<AttendanceList />} />
              <Route path="/leaves" element={<LeaveList />} />
              <Route path="/reviews" element={<ReviewList />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
