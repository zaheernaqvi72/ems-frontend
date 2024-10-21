import axios from 'axios';

const API_URL = 'http://localhost:3000/api/reviews';

// const getAuthHeaders = () => {
//   return { Authorization: `Bearer ${localStorage.getItem('token')}` };
// };

// // Create a new review (POST)
// export const createReview = (reviewData) => {
//   return axios.post(API_URL, reviewData, {
//     headers: getAuthHeaders(),
//   });
// };

// // Get reviews by Employee ID (GET)
// export const getReviewsByEmployeeId = (employeeId) => {
//   return axios
//     .get(`${API_URL}/employee/${employeeId}`, {
//       headers: getAuthHeaders(),
//     })
//     .then((response) => response.data);
// };

// // Update a review by Review ID (PUT)
// export const updateReview = (reviewId, updatedData) => {
//   return axios.put(`${API_URL}/${reviewId}`, updatedData, {
//     headers: getAuthHeaders(),
//   });
// };

// // Delete a review by Review ID (DELETE)
// export const deleteReview = (reviewId) => {
//   return axios.delete(`${API_URL}/${reviewId}`, {
//     headers: getAuthHeaders(),
//   });
// };


// Create a new review
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(API_URL, reviewData);
    return response.data;
  } catch (error) {
    console.error("Error creating review", error);
    throw error;
  }
};

// Get all reviews
export const getAllReviews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all reviews", error);
    throw error;
  }
};

// update a review
export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await axios.put(`${API_URL}/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    console.error("Error updating review", error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_URL}/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting review", error);
    throw error;
  }
};