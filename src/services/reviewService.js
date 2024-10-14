import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reviews';

export const createReview = (reviewData) => {
  return axios.post(API_URL, reviewData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const getReviewsByEmployeeId = (employeeId) => {
  return axios
    .get(`${API_URL}/employee/${employeeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => response.data);
};
