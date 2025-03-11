import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:5000/api/printagents';

// Function to save a new print agent
export const saveAgent = async (nom) => {
  try {
    const response = await axios.post(API_URL, { nom });
    return response.status === 201 ? 'Nom enregistré avec succès!' : null;
  } catch (error) {
    console.error('Error saving print agent:', error);
    throw new Error('Erreur lors de l\'enregistrement du nom.');
  }
};
export const getAllPrinters = async () => {
  try {
    const response = await axios.get(`${API_URL}/printers`); // Adjust the endpoint if necessary
    return response.data; // Return the data containing the list of printers
  } catch (error) {
    console.error('Error fetching printers:', error);
    throw new Error('Erreur lors de la récupération des imprimantes.');
  }
};
export const deleteAgent = async (id) => {
  await axios.delete(`${API_URL}/agents/${id}`);
  return; // You can return a message if needed
};

