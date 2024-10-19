
// Handle and log errors
const handleError = (error, message) => {
    if (error.response) {
      // Server response error (4xx, 5xx)
      console.error(`${message}: ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
      // No response received from server
      console.error(`${message}: No response from server. Please check your network.`);
    } else {
      // Other errors
      console.error(`${message}: ${error.message}`);
    }
    throw error; // Re-throw the error to handle in calling function
  };

export default handleError;