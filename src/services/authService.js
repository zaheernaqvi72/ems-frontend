import axios from 'axios';

const API_URL = ' https://3127-2405-204-1380-91bf-d176-2261-f27f-6c05.ngrok-free.app/user';

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

// Logout function
export const logout = async () => {
  return axios
    .post(`${API_URL}/logout`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => {
      localStorage.removeItem('token'); // Remove the token from localStorage
      return response.data; // Process the response data if needed
    })
    .catch((error) => {
      console.error('Logout error:', error); // Log the error
      throw error; // Propagate the error for further handling
    });
};

// Refresh Token function 
export const refreshToken = async () => {
  return axios
    .post(`${API_URL}/refresh`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => {
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Store the new token in localStorage
      }
      return token; // Return the new token or any other relevant data
    })
    .catch((error) => {
      console.error('Refresh token error:', error); // Log the error
      throw error; // Propagate the error for further handling
    });
};

// Update User function
export const updateUser = async (id, userData) => {
  return axios
    .put(`${API_URL}/update/${id}`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => response.data) // Process the response data if needed
    .catch((error) => {
      console.error('Update user error:', error); // Log the error
      throw error; // Propagate the error for further handling
    });
};

// Delete User function
export const deleteUser = async (id) => {
  return axios
    .delete(`${API_URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => response.data) // Process the response data if needed
    .catch((error) => {
      console.error('Delete user error:', error); // Log the error
      throw error; // Propagate the error for further handling
    });
};

// check logged in user
export const checkLoggedInUser = async () => {
  return axios
    .get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => response.data) // Process the response data if needed
    .catch((error) => {
      console.error('Check logged in user error:', error); // Log the error
      throw error; // Propagate the error for further handling
    });
};
