import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";  // Import the Login component
import AdminDash from "./layouts/AdminDash";
import styles from './app.css'; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/admin-dashboard/*" element={<AdminDash />} />
        
      </Routes>
    </Router>
  );
};

export default App;
