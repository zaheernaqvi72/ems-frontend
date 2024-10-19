import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Avatar,
  Box,
  Typography,
  IconButton,
  Container,
  Grid,
  Divider,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { updateUserProfile, changePassword } from "../services/profileService";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    user_type: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    avatar: "",
    createdAt: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch user data (Simulating API call)
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/profile"); // replace with actual API endpoint
      const data = await response.json();
      setUserData(data);
    };
    fetchUserData();
  }, []);

  // Handle form submission for user details update
  const handleDetailsUpdate = async () => {
    try {
      const response = await updateUserProfile(userData); // Assuming this function is connected to the backend
      if (response.success) {
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await changePassword(password); // Assuming this function is connected to the backend
      if (response.success) {
        alert("Password updated successfully");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData({ ...userData, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-6xl m-auto p-4 bg-gray-100 shadow-md rounded-md">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Profile Page
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Avatar
            alt={userData.username}
            src={userData.avatar || ""}
            sx={{ width: 100, height: 100 }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              
            >
              <input
                className="align-middle"
                hidden
                accept="image/*"
                type="file"
                onChange={handleAvatarChange}
              />
              <PhotoCamera />
            </IconButton>
          </Avatar>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={userData.first_name}
              onChange={(e) =>
                setUserData({ ...userData, first_name: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={userData.last_name}
              onChange={(e) =>
                setUserData({ ...userData, last_name: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="user-type-label">User Type</InputLabel>
              <Select
                labelId="user-type-label"
                value={userData.user_type}
                onChange={(e) =>
                  setUserData({ ...userData, user_type: e.target.value })
                }
              >
                <MenuItem value="Manager/Principal/Head">
                  Manager/Principal/Head
                </MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDetailsUpdate}
            >
              Update Details
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfilePage;
