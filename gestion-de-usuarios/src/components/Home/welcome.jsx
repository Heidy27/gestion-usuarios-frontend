import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./welcome.css";

const BASE_URL = "https://localhost:7015";

function WelcomeScreen() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Usar el hook useNavigate

  useEffect(() => {
    const loadUserFromBackend = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró el token de autenticación.");
        navigate("/login"); // Redireccionar al login si no hay token
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/Users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Error al obtener el usuario:", response.statusText);
          navigate("/login"); // Opcionalmente, redireccionar al login en caso de error
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        navigate("/login"); // Opcionalmente, redireccionar al login en caso de error
      }
    };

    loadUserFromBackend();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token de autenticación
    setUser(null);
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };

  return (
    <div className="welcome-container">
      {user ? (
        <div>
          <h1>¡Bienvenido, {user.fullName}!</h1>
          <p>¡Gracias por usar nuestro sistema de gestión de usuarios!</p>
          <p>Aquí encontrarás herramientas útiles para administrar usuarios.</p>
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
}

export default WelcomeScreen;
