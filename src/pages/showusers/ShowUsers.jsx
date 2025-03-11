import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import styles from './ShowUsers.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal); 
const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Erreur lors de la récupération des utilisateurs.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId, users, setUsers, setError) => {
    if (!userId) {
      console.error("Erreur : ID utilisateur est indéfini");
      return;
    }
  
    const result = await MySwal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler"
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      setError("Échec de la suppression de l'utilisateur.");
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin-dashboard/showusers/modify/${userId}`);
  };

  if (loading) return <div>Chargement des utilisateurs...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!users.length) return <div className={styles.noUsers}>Aucun utilisateur trouvé.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Liste des Utilisateurs</h2>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user._id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <p><strong>Nom :</strong> {user.nom}</p>
              <p><strong>Email :</strong> {user.email}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => handleEdit(user._id)}>Modifier</button>
              <button onClick={() => handleDelete(user._id, users, setUsers, setError)} className={styles.deleteBtn}>
  Supprimer
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUsers;
