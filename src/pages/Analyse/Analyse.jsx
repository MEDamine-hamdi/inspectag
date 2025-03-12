import React, { useState, useEffect } from "react";
import styles from "./Analyse.module.css";
import axios from "axios";

const Analyse = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [idCommande, setIdCommande] = useState("");
  const [agents, setAgents] = useState([]); // List of agents from DB
  const [selectedAgent, setSelectedAgent] = useState(""); // Selected agent

  // Fetch list of "Agent d'impression" from MongoDB
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/agents");
        setAgents(response.data); // Expecting an array of { nom: "Agent Name" }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };
    fetchAgents();
  }, []);

  // Handle file selection
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    try {
      // 1️⃣ Send the image to FastAPI for analysis
      const formDataToSend = new FormData();
      formDataToSend.append("file", selectedFile);

      await axios.post("http://localhost:8000/predict/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2️⃣ Send order data to MongoDB
      await axios.post("http://localhost:5000/api/commande", {
        nomEntreprise,
        idCommande,
        nomAgent: selectedAgent,
      });

      alert("Données envoyées avec succès !");
      setSelectedFile(null);
      setNomEntreprise("");
      setIdCommande("");
      setSelectedAgent("");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Erreur lors de l'envoi des données.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Tester une commande</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Image Upload */}
        <div className={styles.inputGroup}>
          <input
            type="file"
            onChange={handleImageChange}
            className={styles.input}
            accept="image/*"
            required
          />
        </div>

        {/* Nom Entreprise */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nom Entreprise"
            value={nomEntreprise}
            onChange={(e) => setNomEntreprise(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* ID Commande */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="ID Commande"
            value={idCommande}
            onChange={(e) => setIdCommande(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Dropdown for Agents */}
        <div className={styles.inputGroup}>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className={styles.input}
            required
          >
            <option value="">Sélectionnez un agent</option>
            {agents.map((agent, index) => (
              <option key={index} value={agent.nom}>
                {agent.nom}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className={styles.inputGroup}>
          <button type="submit" className={styles.button}>
            Analyser
          </button>
        </div>
      </form>
    </div>
  );
};

export default Analyse;
