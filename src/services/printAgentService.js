import axios from 'axios';

const API_URL = 'http://localhost:5000/api/printagents';

export const saveAgent = async (nom) => {
  try {
    const response = await axios.post(API_URL, { nom });
    return response.status === 201 ? 'Nom enregistré avec succès!' : null;
  } catch (error) {
    console.error('Error saving print agent:', error);
    throw new Error('Erreur lors de l\'enregistrement du nom.');
  }
};
