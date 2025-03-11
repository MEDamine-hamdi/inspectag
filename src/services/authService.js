import axios from 'axios';

export const loginUser = async (nom, mot) => {
    try {
        console.log("Sending login request:", { nom, mot });  // Debugging
        const response = await axios.post('http://localhost:5000/api/login', { 
            nom, 
            mot
        });
        console.log("Login response:", response.data); // Log response
        return response.data; // This will include nom and role
    } catch (error) {
        console.error("Error during login:", error.response?.data || error.message);
        throw error;
    }
};
