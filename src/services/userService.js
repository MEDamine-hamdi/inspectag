// userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fetch all users
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Add a new user
const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
    return response.data; // Return the user data
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Re-throw error for further handling
  }
};


// Update a user
const updateUser = async (id, updatedUser) => {
  try {
    await axios.put(`${API_URL}/users/${id}`, updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user (moved from ShowUsers.js)
const deleteUser = async (userId) => {
  try {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (!confirmDelete) return;

    await axios.delete(`${API_URL}/users/${userId}`);
    console.log(`Utilisateur avec l'ID ${userId} supprimé avec succès`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Export functions
const userService = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser, // Updated delete function
};

export default userService;
