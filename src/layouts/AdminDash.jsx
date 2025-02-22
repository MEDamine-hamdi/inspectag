import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from '../components/Navbar';
import Side from '../components/admin/AdminSidebar';
import styles from './AdminDash.module.css';
import Adduser from '../pages/adduser/AddUser';
import Showusers from '../pages/showusers/ShowUsers';
import ModifyUser from '../pages/ModifyUser/ModifyUser';
import Printers from '../pages/printers/PrintAgents';
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
            <Route path="/showusers/modify/:userId" element={<ModifyUser />} />
            <Route path="/printers" element={<Printers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
