import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Person } from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Employees", path: "/employees" },
    { title: "Attendance", path: "/attendance" },
    { title: "Leave", path: "/leaves" },
    { title: "Review", path: "/reviews" },
  ];

  const userLinks = [
    { title: "Register", path: "/register" },
    { title: "Login", path: "/login" },
  ];

  const drawerList = (
    <List>
      {navLinks.map((item) => (
        <ListItem
          button
          key={item.title}
          component={Link}
          to={item.path}
          selected={location.pathname === item.path}
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
      
      <div className="flex justify-start">
            <Button
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <Person />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {userLinks.map((item) => (
                <MenuItem
                  key={item.title}
                  onClick={handleMenuClose}
                  component={Link}
                  to={item.path}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Menu>
          </div>
    </List>
  );

  return (
    <AppBar position="sticky">
      <Toolbar className="flex justify-between">
        {/* Left Logo */}
        <Typography
          className="flex items-center font-bold"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <img className="h-10 rounded-lg" src="/logo.png" alt="Logo" />
          <span className="text-2xl p-2">Employee Management</span>
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList}
            </Drawer>
          </>
        ) : (
          <div className="flex justify-center">
            {/* Centered Navigation Links */}
            {navLinks.map((item) => (
              <Button
                key={item.title}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  mx: 1,
                  textDecoration: "none",
                  borderBottom:
                    location.pathname === item.path
                      ? "1px solid white"
                      : "none",
                }}
              >
                {item.title}
              </Button>
            ))}
          </div>
        )}
        {/* Right User Icon (Only for Desktop) */}
        {!isMobile && (
          <div className="flex justify-end">
            <Button
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <Person />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {userLinks.map((item) => (
                <MenuItem
                  key={item.title}
                  onClick={handleMenuClose}
                  component={Link}
                  to={item.path}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
