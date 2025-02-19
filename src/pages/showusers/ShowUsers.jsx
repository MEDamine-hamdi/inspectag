// ShowUsers.js
import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';  // Ensure correct path for your service file
import styles from './ShowUsers.module.css';  // Ensure the CSS module is properly imported

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold any error messages

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();  // API call to get all users
        setUsers(response);  // Set the users directly if response is an array
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of the outcome
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  if (error) return <div>{error}</div>; // Display error message if there is an error

  if (!Array.isArray(users) || users.length === 0) {
    return <div>No users found.</div>; // Handle no users case
  }

  return (
    <div className={styles.container}>
      <h2>Tous les utilisateurs</h2>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.nom}</span>
              <span className={styles.userId}>{user.id}</span>
              <span className={styles.userEmail}>{user.email}</span>
              <span className={styles.userRole}>{user.role}</span>
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton}>modifier</button>
              <button className={styles.deleteButton}>supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUsers;
