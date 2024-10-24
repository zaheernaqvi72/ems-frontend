import axios from "axios";

const API_URL = "http://localhost:3000/api/reviews";

// Helper function to get token from localStorage
const getAuthHeaders = () => {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
};

// Create a new review (POST)
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(API_URL, reviewData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating review", error);
    throw error;
  }
};

// Get all reviews (GET)
export const getAllReviews = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews", error);
    throw error;
  }
};

// Update a review by Review ID (PUT)
export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await axios.put(`${API_URL}/${reviewId}`, reviewData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating review", error);
    throw error;
  }
};

// Delete a review by Review ID (DELETE)
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_URL}/${reviewId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting review", error);
    throw error;
  }
};

// Check if a review exists for the given employee and date (GET)
export const checkReviewExists = async (employee_id, review_date) => {
  try {
    const response = await axios.get(
      `${API_URL}?employee_id=${employee_id}&review_date=${review_date}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data.exists; // Return true if review exists, false otherwise
  } catch (error) {
    console.error("Error checking review", error);
    throw error;
  }
};
