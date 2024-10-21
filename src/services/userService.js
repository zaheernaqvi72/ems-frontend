import axios from 'axios';
import  handleError  from '../utils/handleError.js';

// Base API URL for employee-related endpoints
const API_URL = 'http://localhost:3000/api/employees';


// profileService.js

// Mock API calls, replace these with actual API endpoints and request logic

export const updateUserProfile = async (userData) => {
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json(); // Assuming the API returns a JSON object
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, message: "Failed to update profile" };
    }
  };
  
  export const changePassword = async (newPassword) => {
    try {
      const response = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });
      return await response.json(); // Assuming the API returns a JSON object
    } catch (error) {
      console.error("Error changing password:", error);
      return { success: false, message: "Failed to change password" };
    }
  };
  
  export const deleteUserProfile = async () => {
    try {
      const response = await fetch("/api/profile/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json(); // Assuming the API returns a JSON object
    } catch (error) {
      console.error("Error deleting profile:", error);
      return { success: false, message: "Failed to delete profile" };
    }
  };
  