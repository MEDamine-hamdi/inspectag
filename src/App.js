import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";  // Import the Login component
import AdminDash from "./layouts/AdminDash";
import styles from './app.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} /> 
        <Route 
          path="/admin-dashboard/*" 
          element={isLoggedIn ? <AdminDash /> : <Navigate to="/" />} // Protect route
        />
      </Routes>
    </Router>
  );
};

export default App;
