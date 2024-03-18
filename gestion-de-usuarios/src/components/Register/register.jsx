import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";
import "./register.css";

function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Validar contraseña
    if (!/[\W_]/.test(formData.password)) {
      setError(
        "La contraseña debe contener al menos un carácter no alfanumérico."
      );
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log("Registro exitoso:", response);
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div
                className={`toggle-password-icon ${
                  showPassword ? "visible" : ""
                }`}
                onClick={togglePasswordVisibility}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-eye"
                >
                  <path d="M12 2C6.486 2 2 12 2 12s4.486 10 10 10c5.514 0 10-9.5 10-10S17.514 2 12 2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="fullName">Nombre Completo</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Número de Teléfono</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="login-btn">
              Registrarse
            </button>
            <button
              type="button"
              className="register-btn"
              onClick={handleSwitchToLogin}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
