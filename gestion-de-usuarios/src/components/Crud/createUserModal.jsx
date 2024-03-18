import React, { useState } from "react";
import Modal from "react-modal";
import "./createUserModal.css";

function CreateUserModal({ isOpen, onClose, onSubmit }) {
  const initialUserData = {
    username: "",
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    pais: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpiar el error del campo al cambiar su valor
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validar campos
      const validationErrors = {};
      if (!userData.username.trim()) {
        validationErrors.username = "El nombre de usuario es obligatorio";
      }
      if (!userData.email.trim()) {
        validationErrors.email = "El email es obligatorio";
      } else if (!isValidEmail(userData.email)) {
        validationErrors.email = "El email no es válido";
      }
      if (!userData.password.trim()) {
        validationErrors.password = "La contraseña es obligatoria";
      } else if (!isValidPassword(userData.password)) {
        validationErrors.password =
          "La contraseña debe contener al menos una letra mayúscula y un carácter especial";
      }
      if (!userData.fullName.trim()) {
        validationErrors.fullName = "El nombre completo es obligatorio";
      }
      if (!userData.phoneNumber.trim()) {
        validationErrors.phoneNumber = "El teléfono es obligatorio";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await onSubmit(userData);
      onClose();
      // Restablecer el estado del formulario
      setUserData(initialUserData);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Aquí puedes manejar el error de manera adecuada
    }
  };

  const isValidEmail = (email) => {
    // Validar el formato del email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    // Validar que la contraseña contenga al menos una letra mayúscula y un carácter especial
    return (
      /[A-Z]/.test(password) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
        setUserData(initialUserData); // Restablecer el estado del formulario al cerrar el modal
        setErrors({}); // Limpiar los errores al cerrar el modal
      }}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Crear Nuevo Usuario</h2>
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="modal-body">
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          className="modal-input"
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="modal-input"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="modal-input"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <input
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="modal-input"
        />
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        <input
          type="text"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          placeholder="Teléfono"
          className="modal-input"
        />
        {errors.phoneNumber && (
          <p className="error-message">{errors.phoneNumber}</p>
        )}
        <input
          type="text"
          name="pais"
          value={userData.pais}
          onChange={handleChange}
          placeholder="Pais"
          className="modal-input"
        />
        {errors.pais && <p className="error-message">{errors.pais}</p>}
      </div>
      <div className="modal-footer">
        <button className="modal-button" onClick={handleSubmit}>
          Crear Usuario
        </button>
        <button className="modal-button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}

export default CreateUserModal;
