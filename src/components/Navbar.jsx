import { useState, useEffect } from "react";
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
  Box,
  Tooltip,
  Modal,
  Avatar,
  Typography as MuiTypography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { logout } from "../services/authService";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonAdd from "@mui/icons-material/PersonAdd";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Navbar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        
        setIsLoggedIn(false);

      }
    };

    checkLoginStatus(); // Check on component mount
    // Add event listener to detect changes in localStorage
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

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

  const loggedInSettings = [
    { title: "Profile", path: "/profile", icon: <ProfileIcon /> },
    { title: "Logout", path: null, icon: <LogoutIcon /> },
  ];

  const loggedOutSettings = [
    { title: "Register", path: "/register", icon: <PersonAdd /> },
    { title: "Login", path: "/login", icon: <AccountCircle /> },
  ];

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false); 
    setLogoutModalOpen(false);
    
    // Redirect to the login page
    window.location.href = "/login";
  };

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

      {/* Mobile Avatar and User Menu */}
      <ListItem>
        <Box sx={{ display: "flex", justifyContent: "start", width: "100%" }}>
          <Tooltip title={isLoggedIn ? "Open settings" : "Login / Register"}>     
          
            <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
              {isLoggedIn ? (
                <Avatar alt="User" src="image.jpg" />
              ) : (
                <AccountCircleOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ margin: "45px", width: "100%" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {(isLoggedIn ? loggedInSettings : loggedOutSettings).map((item) => (
              <MenuItem
                key={item.title}
                component={item.title === "Logout" ? "button" : Link}
                to={item.title === "Logout" ? undefined : item.path}
                onClick={() => {
                  if (item.title === "Logout") {
                    setLogoutModalOpen(true);
                    setAnchorEl(null);
                    toggleDrawer(false)();
                  } else {
                    handleMenuClose();
                    toggleDrawer(false)();
                  }
                }}
              >
                <MuiTypography sx={{ textAlign: "center" }}>
                  {item.icon} {item.title}
                </MuiTypography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </ListItem>
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
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isLoggedIn ? "Open settings" : "Login / Register"}>
              <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                {isLoggedIn ? (
                  <Avatar alt="User" src="image.jpg" />
                ) : (
                  <AccountCircleOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {(isLoggedIn ? loggedInSettings : loggedOutSettings).map(
                (item) => (
                  <MenuItem
                    key={item.title}
                    component={item.title === "Logout" ? "button" : Link}
                    to={item.title === "Logout" ? undefined : item.path}
                    onClick={() => {
                      if (item.title === "Logout") {
                        setLogoutModalOpen(true);
                        setAnchorEl(null); // Close the menu after opening the modal
                      } else {
                        handleMenuClose();
                      }
                    }}
                  >
                    <MuiTypography sx={{ textAlign: "center" }}>
                      {item.icon} {item.title}
                    </MuiTypography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        )}

        {/* Logout Modal */}
        <Modal
          open={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
        >
          <Box
            className="modal-box"
            sx={{
              position: "absolute",
              minWidth: "400px",
              height: "180px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgb(243 244 246)",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              id="logout-modal-title"
              variant="h5"
              component="h2"
              sx={{ textAlign: "center", marginBottom: "40px" }}
            >
              Are you sure you want to logout?
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                sx={{
                  padding: "5px 20px",
                  fontSize: "14px",
                  borderRadius: "30px",
                  marginLeft: "10px",
                  "&:hover": {
                    borderColor: "error.main",
                    backgroundColor: "rgba(255,0,0,0.1)",
                  },
                }}
              >
                😔 Yes, Logout
              </Button>
              <Button
                variant="outlined"
                onClick={() => setLogoutModalOpen(false)}
                sx={{
                  padding: "5px 20px",
                  fontSize: "14px",
                  borderRadius: "30px",
                  marginLeft: "10px",
                }}
              >
                😊 No, Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
