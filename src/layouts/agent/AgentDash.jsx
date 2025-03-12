import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Nav from '../../components/Navbar';
import Side from '../../components/agent/AgentSidebar';
import Analyse from '../../pages/Analyse/Analyse'
import styles from './AgentDash.module.css';
const AgentDash = () => {
    const navigate = useNavigate();
  
    return (
      <div className={styles.container}>
        <Side />
        <div className={styles.mainContent}>
          <Nav />
          <div className={styles.content}>
            <Routes>
              <Route path="/analyse" element={<Analyse />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  };
  
  export default AgentDash;