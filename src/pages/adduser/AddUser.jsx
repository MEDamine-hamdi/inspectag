import React, { useState } from "react";
import styles from "./AddUser.module.css";
import userService from "../../services/userService";

const AddUser = () => {
  const [formData, setFormData] = useState({
    nom: "",  // Correct field name
    id: "",   // Matches backend
    email: "",
    role: "",
    mot: "",  // Matches backend field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.addUser(formData);
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Nouveau utilisateur</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input type="text" name="nom" placeholder="Nom utilisateur" onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <input type="text" name="id" placeholder="ID" onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <select name="role" onChange={handleChange} required className={styles.input}>
            <option value="">Poste</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <input type="password" name="mot" placeholder="Mot de passe" onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <button type="submit" className={styles.button}>Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
