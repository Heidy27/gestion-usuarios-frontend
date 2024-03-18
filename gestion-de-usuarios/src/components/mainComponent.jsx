import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "./Login/login";
import RegisterForm from "./Register/register";
import Dashboard from "./Dashboard/dasboard";

function MainComponent() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setLoggedIn(true);
    navigate("/dashboard"); // Navega al dashboard después de iniciar sesión
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  // Si el usuario no está logueado, muestra el LoginForm o RegisterForm según corresponda.
  if (!loggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* Redirige a login por defecto si no hay más rutas */}
        <Route path="*" element={<LoginForm onLogin={handleLogin} />} />
      </Routes>
    );
  }

  // Si el usuario está logueado, muestra el Dashboard.
  return <Dashboard onLogout={handleLogout} />;
}

export default MainComponent;
