import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar className="flex justify-between ">
        <Typography
          className="flex justify-between align-bottom font-bold"
          component={Link}
          to="/"
        >

          <img className="h-10 rounded-lg" src="/logo.png" alt="Logo" />

          <img
            className="h-10 rounded-lg"
            src="src/assets/logo.png"
            alt=""
          />
          <span className="text-2xl p-2">Employee Management</span>
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>

          <Button color="inherit" component={Link} to="/employees">
            Employees
          </Button>
          <Button color="inherit" component={Link} to="/attendance">
            Attendance
          </Button>
          <Button color="inherit" component={Link} to="/leaves">
            Leave
          </Button>
          <Button color="inherit" component={Link} to="/reviews">
            Review
          </Button>
          
        </div>
        <div>
        <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
