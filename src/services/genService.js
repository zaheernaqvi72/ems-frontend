import axios from 'axios';

const API_URL = 'http://localhost:3000/api/generate';

const getToken = () => {
    return localStorage.getItem("token");
  };

const generateContent = async (prompt) => {
    try {
        const response = await axios.post(API_URL, { prompt }
        , {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
    }

export default generateContent;

