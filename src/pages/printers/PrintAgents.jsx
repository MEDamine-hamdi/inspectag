import React, { useState } from 'react';
import { saveAgent } from '../../services/printAgentService'; // Import the service
import styles from './PrintAgents.module.css'; // Import the CSS module

const PrintAgents = () => {
  const [nom, setNom] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom) {
      setErrorMessage('Le champ "nom" est requis.');
      return;
    }

    try {
      const message = await saveAgent(nom);
      if (message) {
        setSuccessMessage(message);
        setNom('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>Enregistrer un agent</h1>

        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez le nom"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Enregistrer</button>
        </form>
      </div>

      <div className={styles.right}></div>
    </div>
  );
};

export default PrintAgents;
