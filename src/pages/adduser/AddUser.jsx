import React, { useState } from "react";
import styles from "./AddUser.module.css";
import userService from "../../services/userService";

const AddUser = () => {
    const [formData, setFormData] = useState({
        nom: "",   // Matches backend
        email: "",
        role: "",
        mot: "",   // Matches backend field
    });

    const handleChange = (e) => {
        console.log(`Changing ${e.target.name}:`, e.target.value);  // Debugging
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting user:", formData);  // Debugging
        try {
            await userService.addUser(formData);
            alert("User added successfully!");
            setFormData({ nom: "", email: "", role: "", mot: "" });
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Error adding user. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Nouveau utilisateur</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom utilisateur"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    >
                        <option value="">Poste</option>
                        <option value="Admin">Admin</option>
                        <option value="User">Agent qualité</option>
                        <option value="User">Agent d'impression</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        name="mot"
                        placeholder="Mot de passe"
                        value={formData.mot}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <button type="submit" className={styles.button}>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
