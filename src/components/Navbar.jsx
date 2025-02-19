import React from "react";
import styles from "./NavBar.module.css";
import { FaUserGear } from "react-icons/fa6";
const NavBar = () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
const username = userData ? userData.nom : "";

  console.log(username); // Extract the username (assuming `nom` is the username key)

  return (
    <nav className={styles.navbar}>
      
      <div className={styles.userInfo}>
      <FaUserGear className={styles.profile}/>
      {username ? <span> {username}</span> : <span>invité</span>}

      </div>
    </nav>
  );
};

export default NavBar;
