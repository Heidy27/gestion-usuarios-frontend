// LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";
import "./login.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    }
  };

  const handleSwitchToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="login-btn">
              Iniciar Sesión
            </button>
            <button
              type="button"
              className="register-btn"
              onClick={handleSwitchToRegister}
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
