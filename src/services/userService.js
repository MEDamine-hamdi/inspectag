import axios from "axios";

const API_URL = "http://localhost:5000/api/users";  // Adjust if needed

const userService = {
  addUser: async (userData) => {
    return await axios.post(API_URL, userData);
  },
};

export default userService;
