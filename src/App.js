import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import AdminDash from "./layouts/AdminDash";
import AgentDash from "./layouts/agent/AgentDash";
import "./app.css"; // Import global CSS correctly

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route 
          path="/admin-dashboard/*" 
          element={isLoggedIn ? <AdminDash /> : <Navigate to="/" />} 
        />
        <Route 
          path="/agent-dashboard/*" 
          element={isLoggedIn ? <AgentDash /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
