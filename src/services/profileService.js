import axios from 'axios';

// Base URL configuration (if needed)
const API_URL = '/api/profile';

// Fetch user profile data
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data; // This assumes the backend returns the user profile data in the response's data field
  } catch (error) {
    console.error("Error fetching user profile", error);
    throw error;
  }
};

// Update user profile data
export const updateUserProfile = async (updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/update`, updatedData); // Assuming the API accepts PUT requests for updating
    return response.data;
  } catch (error) {
    console.error("Error updating user profile", error);
    throw error;
  }
};

// Change user password
export const changePassword = async (newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, { password: newPassword });
    return response.data;
  } catch (error) {
    console.error("Error changing password", error);
    throw error;
  }
};

// Change user avatar (optional if you're uploading files separately)
export const updateAvatar = async (avatarData) => {
  try {
    const response = await axios.post(`${API_URL}/update-avatar`, avatarData, {
      headers: { 'Content-Type': 'multipart/form-data' }, // Ensure correct headers for file upload
    });
    return response.data;
  } catch (error) {
    console.error("Error updating avatar", error);
    throw error;
  }
};

// Delete user profile
export const deleteUserProfile = async () => {
  try {
    const response = await axios.delete(`${API_URL}/delete`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user profile", error);
    throw error;
  }
};
