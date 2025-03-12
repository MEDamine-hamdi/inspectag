import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authService";
import styles from './Login.module.css'; 
import ins from "../../assets/inspectag.png";
import datadoit from "../../assets/datadoit.png";

const Login = ({ onLogin }) => {
  const [nom, setNom] = useState("");   
  const [mot, setMot] = useState("");   
  const navigate = useNavigate();       

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(nom, mot);
      
      // Check that userData contains the role
      if (!userData || !userData.nom || !userData.role) {
        throw new Error("Rôle utilisateur introuvable !");
      }

      // Store user data in session storage
      sessionStorage.setItem("user", JSON.stringify({ 
          nom: userData.nom, 
          role: userData.role 
      }));

      console.log("Nom:", userData.nom);
      console.log("Role:", userData.role);
      toast.success("Connexion réussie !");
      onLogin();

      // Navigate based on role
      if (userData.role === "Admin") {
        navigate("/admin-dashboard/showusers");
      } else {
        navigate("/agent-dashboard/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          <img src={ins} alt="inspectag logo" className={styles.ins} />
          <h2>INSPECTAG</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={mot}
              onChange={(e) => setMot(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Se connecter</button>
        </form>
      </div>
      <img src={datadoit} alt="DataDoIt logo" className={styles.datadoit} />
    </div>
  );
};

export default Login;
