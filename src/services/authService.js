import axios from 'axios';

const API_URL = 'http://localhost:3000/user';

// Login function
export const  login = async (credentials) => {
  return axios
    .post(`${API_URL}/login`, credentials)
    .then( (response) => {
      // Assuming the response contains a token, save it to localStorage
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Store the token in localStorage
      }
      return token; // Return the token or any other relevant data
    })
    .catch((error) => {
      console.error('Login error:', error); // Log the error
      throw error; // Propagate the error for further handling if necessary
    });
};

// Register function
export const register = async (userData) => {
  return axios
    .post(`${API_URL}/register`, userData)
    .then((response) => response.data) // Process registration response if needed
    .catch((error) => {
      console.error('Registration error:', error); // Log the error
      throw error; // Propagate the error for further handling
    });
};
