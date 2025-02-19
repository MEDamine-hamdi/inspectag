import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import styles from "./AdminSidebar.module.css"; // Import CSS Module
import ins from "../../assets/inspectag.png";
import { GoSidebarCollapse } from "react-icons/go";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

const AdminSidebar = () => {
  const [isActive, setIsActive] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsActive((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <div>
      {/* First button to show the sidebar */}
      {!isActive && (
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
           <GoSidebarCollapse />{/* Show this icon to open sidebar */}
        </button>
      )}
      
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isActive ? styles.active : ""}`}>
        <div className={styles.logo}>
          <img src={ins} alt="inspectag logo" className={styles.ins} />
          <h2>INSPECTAG</h2>
        </div>
        
        {/* Second button to hide the sidebar */}
        <button className={styles.closeBtn} onClick={toggleSidebar}>
        <TbLayoutSidebarRightExpand />{/* Show this icon to close sidebar */}
        </button>

        <ul className={styles.menu}>
          <li>
            <Link to="/admin-dashboard/adduser" className={styles.link}>
              <FaUserAlt className={styles.icon} /> Ajouter utilisateur
            </Link>
          </li>
          <li>
            <Link to="/users" className={styles.link}>
              <PiUsersThreeFill className={styles.iconUsers} /> Gérer utilisateurs
            </Link>
          </li>
          <li>
            <Link to="/printers" className={styles.link}>
              <GrUserWorker /> Agents impressions
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
