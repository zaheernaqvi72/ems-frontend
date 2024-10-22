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
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { updateUserProfile, changePassword, deleteUserProfile } from "../services/profileService";

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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  // Fetch user data (Simulating API call)
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/profile"); // Replace with actual API endpoint
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
        setOpenEditModal(false); // Close modal after updating
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
        setOpenPasswordModal(false); // Close modal after updating
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async () => {
    try {
      const response = await deleteUserProfile(); // Assuming this function deletes user profile
      if (response.success) {
        alert("Profile deleted successfully");
        setOpenDeleteModal(false); // Close modal after deleting
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
        

        {/* Avatar with option to change */}
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
                hidden
                accept="image/*"
                type="file"
                onChange={handleAvatarChange}
              />
              <PhotoCamera />
            </IconButton>
          </Avatar>
        </Box>

        {/* User Details Display */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">First Name: {userData.first_name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Last Name: {userData.last_name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Username: {userData.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Email: {userData.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">User Type: {userData.user_type}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => setOpenEditModal(true)}>
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
              onClick={() => setOpenDeleteModal(true)}
            >
              Delete Profile
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => setOpenPasswordModal(true)}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>

        {/* Edit Profile Modal */}
        <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDetailsUpdate} color="primary">
              Save
            </Button>
            <Button onClick={() => setOpenEditModal(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Profile Modal */}
        <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <DialogTitle>Confirm Delete Profile</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete your profile? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteProfile} color="error">
              Delete
            </Button>
            <Button onClick={() => setOpenDeleteModal(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Change Password Modal */}
        <Dialog open={openPasswordModal} onClose={() => setOpenPasswordModal(false)}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePasswordChange} color="primary">
              Change Password
            </Button>
            <Button onClick={() => setOpenPasswordModal(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ProfilePage;
