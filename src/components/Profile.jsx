import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Grow,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { getUserProfile, updateUserProfile, changePassword, deleteUserProfile } from "../services/authService";


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
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await getUserProfile();
        
        setUserData(data);
        console.log(data);
        
      } catch (error) {
        console.error(error);
        setSnackbar({ open: true, message: "Failed to fetch user data.", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Handle Avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData({ ...userData, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Handle user details update
  const handleDetailsUpdate = async () => {
    // Validate inputs
    if (!userData.first_name || !userData.last_name || !userData.username || !userData.email) {
      setSnackbar({ open: true, message: "All fields are required.", severity: "warning" });
      return;
    }

    try {
      const response = await updateUserProfile(userData);
      if (response.success) {
        setSnackbar({ open: true, message: "Profile updated successfully.", severity: "success" });
        setOpenEditModal(false);
      }
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to update profile.", severity: "error" });
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match.", severity: "warning" });
      return;
    }

    try {
      const response = await changePassword(password);
      if (response.success) {
        setSnackbar({ open: true, message: "Password updated successfully.", severity: "success" });
        setPassword("");
        setConfirmPassword("");
        setOpenPasswordModal(false);
      }
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to change password.", severity: "error" });
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async () => {
    try {
      const response = await deleteUserProfile();
      if (response.success) {
        setSnackbar({ open: true, message: "Profile deleted successfully.", severity: "success" });
        setOpenDeleteModal(false);
      }
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to delete profile.", severity: "error" });
    }
  };

  return (
    <div className="w-3/6 h-4/5 m-auto p-4 bg-gray-100 shadow-md rounded-md">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Profile
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Avatar with option to change */}
            <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
              <Avatar
                alt={userData.username}
                src={userData.avatar || ""}
                sx={{ width: 100, height: 100, transition: "transform 0.3s ease-in-out", "&:hover": { transform: "scale(1.1)" } }}
              >
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                  <PhotoCamera />
                </IconButton>
              </Avatar>
            </Box>

            {/* User Details Display */}
            <Box display="flex" flexDirection="column" gap={2} mb={3}>
              <Grow in={true} timeout={1000}>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                  First Name: <span style={{ color: "#555" }}>{userData.first_name}</span>
                </Typography>
              </Grow>
              <Grow in={true} timeout={1200}>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                  Last Name: <span style={{ color: "#555" }}>{userData.last_name}</span>
                </Typography>
              </Grow>
              <Grow in={true} timeout={1400}>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                  Username: <span style={{ color: "#555" }}>{userData.username}</span>
                </Typography>
              </Grow>
              <Grow in={true} timeout={1600}>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                  Email: <span style={{ color: "#555" }}>{userData.email}</span>
                </Typography>
              </Grow>
              <Grow in={true} timeout={1800}>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                  User Type: <span style={{ color: "#555" }}>{userData.user_type}</span>
                </Typography>
              </Grow>
            </Box>

            {/* Buttons with Fade animation */}
            <Fade in={true} timeout={2000}>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button variant="contained" color="primary" onClick={() => setOpenEditModal(true)}>
                  Edit Profile
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setOpenDeleteModal(true)}>
                  Delete Profile
                </Button>
                <Button variant="outlined" color="primary" onClick={() => setOpenPasswordModal(true)}>
                  Change Password
                </Button>
              </Box>
            </Fade>

            {/* Edit Profile Modal */}
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogContent>
                <TextField
                  label="First Name"
                  value={userData.first_name}
                  onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last Name"
                  value={userData.last_name}
                  onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Username"
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="user-type-label">User Type</InputLabel>
                  <Select
                    labelId="user-type-label"
                    value={userData.user_type}
                    onChange={(e) => setUserData({ ...userData, user_type: e.target.value })}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="guest">Guest</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
                <Button onClick={handleDetailsUpdate} color="primary">
                  Save
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
                  sx={{ mb: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenPasswordModal(false)}>Cancel</Button>
                <Button onClick={handlePasswordChange} color="primary">
                  Change Password
                </Button>
              </DialogActions>
            </Dialog>

            {/* Delete Profile Modal */}
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
              <DialogTitle>Delete Profile</DialogTitle>
              <DialogContent>
                <Typography>Are you sure you want to delete your profile?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
                <Button onClick={handleDeleteProfile} color="secondary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            {/* Snackbar for feedback messages */}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              severity={snackbar.severity}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default ProfilePage;
