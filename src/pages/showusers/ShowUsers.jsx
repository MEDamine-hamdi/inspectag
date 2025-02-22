import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import styles from './ShowUsers.module.css';
import { useNavigate } from 'react-router-dom';

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await userService.deleteUser(userId);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      setError("Échec de la suppression de l'utilisateur.");
    }
  };

  const handleEdit = (userId) => {
    navigate(`modify/${userId}`);
  };

  if (loading) return <div>Chargement des utilisateurs...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!users.length) return <div>Aucun utilisateur trouvé.</div>;

  return (
    <div className={styles.container}>
      <h2>Tous les utilisateurs</h2>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user._id} className={styles.userItem}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.nom}</span>
              <span className={styles.userId}>{user._id}</span>
              <span className={styles.userEmail}>{user.email}</span>
              <span className={styles.userRole}>{user.role}</span>
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={() => handleEdit(user._id)}>modifier</button>
              <button className={styles.deleteButton} onClick={() => handleDelete(user._id)}>supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUsers;
