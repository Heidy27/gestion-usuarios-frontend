import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./editUserModal.css";

function EditUserModal({ isOpen, onClose, userId, onSubmit }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Aquí puedes cargar los datos del usuario utilizando el ID proporcionado
    fetchUserData(userId);
  }, [userId]);

  const fetchUserData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await fetch(`https://localhost:7015/api/Users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para enviar los datos editados del usuario al servidor
    onSubmit(userId, userData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="edit-user-modal"
      overlayClassName="edit-user-modal-overlay"
    >
      <div className="edit-user-modal-header">
        <h2>Editar Usuario</h2>
        <button className="edit-user-modal-close-button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="edit-user-modal-body">
        <input
          type="text"
          name="username"
          value={userData.username || ""}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          className="edit-user-modal-input"
        />
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="edit-user-modal-input"
        />
        <input
          type="password"
          name="password"
          value={userData.password || ""}
          onChange={handleChange}
          placeholder="Contraseña"
          className="edit-user-modal-input"
        />
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={userData.fullName || ""}
          onChange={handleChange}
          className="edit-user-modal-input"
        />
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={userData.phoneNumber || ""}
          onChange={handleChange}
          className="edit-user-modal-input"
        />
      </div>
      <div className="edit-user-modal-footer">
        <button className="edit-user-modal-button" onClick={handleSubmit}>
          Guardar Cambios
        </button>
        <button className="edit-user-modal-button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}

export default EditUserModal;
