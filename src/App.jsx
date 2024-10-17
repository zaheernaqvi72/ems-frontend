import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeList from './components/EmployeesList';
import AttendanceList from './components/AttendanceList';
import LeaveList from './components/LeaveList';
import ReviewList from './components/ReviewList';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
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
  );
}

export default App;



