import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from '../components/Navbar';
import Side from '../components/admin/AdminSidebar';
import styles from './AdminDash.module.css';
import Adduser from '../pages/adduser/AddUser';

const AdminDash = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Side />
      <div className={styles.mainContent}>
        <Nav />
        <div className={styles.content}>
          <Routes>
            <Route path="/adduser" element={<Adduser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
