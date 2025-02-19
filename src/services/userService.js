// userService.js
import axios from 'axios';

// Set up base URL for API requests
const API_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

// Fetch all users from the API
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`); // Assuming the API endpoint is /users
    return response.data; // Return the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Propagate the error to be handled by the caller
  }
};

// Add a new user
const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData); // Post request to add a new user
    return response.data; // Return the added user data
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`); // Delete user by ID
    return response.data; // Return the deletion confirmation
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Update a user
const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, updatedData); // Update user data
    return response.data; // Return updated user data
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Export functions
export default {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
};
