import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import EmployeeList from './components/Employees';
import Attendance from './components/Attendance';
import LeaveManagement from './components/LeaveManagement';
import PerformanceReview from './components/PerformanceReview';
import Dashboard from './pages/Dashboard'; // Import the Dashboard component

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employees/list" element={<EmployeeList />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave-management" element={<LeaveManagement />} />
          <Route path="/performance-review" element={<PerformanceReview />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



