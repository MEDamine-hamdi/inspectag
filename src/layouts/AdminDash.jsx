import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from '../components/Navbar';
import Side from '../components/admin/AdminSidebar';
import styles from './AdminDash.module.css';
import Adduser from '../pages/adduser/AddUser';
import Showusers from '../pages/showusers/ShowUsers';

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
            <Route path="/showusers" element={<Showusers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
