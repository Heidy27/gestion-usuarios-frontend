import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/sidebar";
import WelcomeScreen from "../Home/welcome";
import UserManagement from "../UserManagement/userManagement";
import LogsView from "../LogsView/logsView";
import "./dashboard.css";

function Dashboard({ onLogout }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div className="dashboard">
      {authenticated && <Sidebar onLogout={onLogout} />}
      <div className="main-content">
        <Routes>
          {authenticated && <Route path="/" element={<WelcomeScreen />} />}
          <Route path="/gestion-usuarios" element={<UserManagement />} />
          <Route path="/logs" element={<LogsView />} />{" "}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
