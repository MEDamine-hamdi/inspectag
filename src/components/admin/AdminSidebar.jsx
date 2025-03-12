import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { GoSidebarCollapse } from "react-icons/go";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import styles from "./AdminSidebar.module.css"; // Import CSS Module
import ins from "../../assets/inspectag.png";
import { MdReportProblem } from "react-icons/md";

const AdminSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => {
    setIsActive((prev) => !prev);
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/"); // Redirect to home page
  };

  return (
    <div>
      {/* First button to show the sidebar */}
      {!isActive && (
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          <GoSidebarCollapse />
        </button>
      )}
      {/* serach */}
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isActive ? styles.active : ""}`}>
        <div className={styles.logo}>
          <img src={ins} alt="inspectag logo" className={styles.ins} />
          <h2 className={styles.h}>INSPECTAG</h2>
        </div>

        {/* Second button to hide the sidebar */}
        <button className={styles.closeBtn} onClick={toggleSidebar}>
          <TbLayoutSidebarRightExpand />
        </button>

        <ul className={styles.menu}>
          <li>
            <Link to="/admin-dashboard/adduser" className={styles.link}>
              <FaUserAlt className={styles.icon} /> Ajouter utilisateur
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/showusers" className={styles.link}>
              <PiUsersThreeFill className={styles.iconUsers} /> Gérer utilisateurs
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className={styles.action}>
          <button className={styles.logout} onClick={handleLogout}>
            <IoLogOut className={styles.icon} /> Déconnexion
          </button>
          <Link to="https://aminehm.vercel.app/#contact" className={styles.logout}>
              <MdReportProblem  className={styles.prob} /> Probléme ??
            </Link>
        </div>
        
      </div>
    </div>
  );
};

export default AdminSidebar;
