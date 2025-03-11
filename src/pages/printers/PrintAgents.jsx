import React, { useState, useEffect } from 'react';
import { saveAgent, getAllPrinters, deleteAgent } from '../../services/printAgentService'; // Import the service
import styles from './PrintAgents.module.css'; // Import the CSS module

const PrintAgents = () => {
  const [nom, setNom] = useState('');
  const [printers, setPrinters] = useState([]); // State to hold printer data
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch printers
  const fetchPrinters = async () => {
    try {
      const response = await getAllPrinters();
      setPrinters(response);
    } catch (error) {
      setErrorMessage('Erreur lors de la récupération des imprimantes.');
    }
  };

  // Fetch printers when the component mounts
  useEffect(() => {
    fetchPrinters();
  }, []); // Empty dependency array means this runs once on mount

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
        await fetchPrinters(); // Fetch printers again after saving a new agent
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')) {
      try {
        await deleteAgent(id); // Call the delete function
        setSuccessMessage('Agent supprimé avec succès!');
        await fetchPrinters(); // Refresh the list after deletion
      } catch (error) {
        setErrorMessage('Erreur lors de la suppression de l\'agent.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>Enregistrer un agent</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez le nom"
              className={styles.input} // Apply CSS module for styling
            />
          </div>
          <button type="submit" className={styles.submitButton}>Enregistrer</button>
        </form>
      </div>

      <div className={styles.right}>
        <h2 className={styles.printerListTitle}>Agent d'impression</h2>
        <div className={styles.printerListContainer}>
          {printers.length > 0 ? (
            printers.map((printer) => (
              <div key={printer._id} className={styles.printerItemContainer}>
                <div className={styles.printerItem}>
                  {printer.nom}
                </div>
                <button 
                  onClick={() => handleDelete(printer._id)} 
                  className={styles.deleteButton}
                >
                  Supprimer
                </button>
              </div>
            ))
          ) : (
            <div>Aucune agent d'impression trouvée.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintAgents;
