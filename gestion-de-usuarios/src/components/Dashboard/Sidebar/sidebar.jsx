import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/logs">Ver Logs</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/gestion-usuarios">
            Gestión de Usuarios
          </NavLink>
        </li>
      </ul>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Sidebar;
