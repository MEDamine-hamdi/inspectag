import React, { useState, useEffect } from 'react';
import userService from '../../services/userService'; // Ensure correct import
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ModifyUser.module.css'; 

const ModifyUser = () => {
  const { userId } = useParams(); // Retrieve the userId from the URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nom: '',
    email: '',
    role: 'agent', // Set a default value
    mot: '',
  });

  // Fetch user data when the component mounts (if userId exists)
  useEffect(() => {
    if (!userId) return;
    const fetchUserData = async () => {
      try {
        const user = await userService.getUserById(userId);
        setUserData(user);
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur :', error);
      }
    };
    fetchUserData();
  }, [userId]);

  // Handle form submission to update the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUser(userId, userData);
      console.log(`Utilisateur avec l'ID ${userId} mis à jour avec succès`);
      navigate('/admin'); // Redirect back to the admin dashboard
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur :', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.hx}>Modifier l'utilisateur</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nom"
          value={userData.nom}
          onChange={(e) => setUserData({ ...userData, nom: e.target.value })}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className={styles.input}
        />
        <select
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          className={styles.input}
        >
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
        </select>
        <input
          type="password"
          placeholder="Mot de passe"
          value={userData.mot}
          onChange={(e) => setUserData({ ...userData, mot: e.target.value })}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Mettre à jour</button>
      </form>
    </div>
  );
};

export default ModifyUser;
