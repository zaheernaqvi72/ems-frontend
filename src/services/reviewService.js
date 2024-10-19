import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reviews';

const getAuthHeaders = () => {
  return { Authorization: `Bearer ${localStorage.getItem('token')}` };
};

// Create a new review (POST)
export const createReview = (reviewData) => {
  return axios.post(API_URL, reviewData, {
    headers: getAuthHeaders(),
  });
};

// Get reviews by Employee ID (GET)
export const getReviewsByEmployeeId = (employeeId) => {
  return axios
    .get(`${API_URL}/employee/${employeeId}`, {
      headers: getAuthHeaders(),
    })
    .then((response) => response.data);
};

// Update a review by Review ID (PUT)
export const updateReview = (reviewId, updatedData) => {
  return axios.put(`${API_URL}/${reviewId}`, updatedData, {
    headers: getAuthHeaders(),
  });
};

// Delete a review by Review ID (DELETE)
export const deleteReview = (reviewId) => {
  return axios.delete(`${API_URL}/${reviewId}`, {
    headers: getAuthHeaders(),
  });
};
