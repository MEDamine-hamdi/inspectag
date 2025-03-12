import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AgentSidebar.module.css";
import { GoSidebarCollapse } from "react-icons/go";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import ins from "../../assets/inspectag.png";
import { MdReportProblem } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

const AgentSidebar = () => {
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
            <Link to="/" className={styles.link}>
            <IoStatsChartOutline /> Statistique
            </Link>
          </li>
          <li>
            <Link to="/agent-dashboard/analyse" className={styles.link}>
            <FaSearch /> Analyser
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.link}>
            <MdManageHistory /> Analyse en temps reels
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.link}>
            <FaHistory />  Historique
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

export default AgentSidebar;
