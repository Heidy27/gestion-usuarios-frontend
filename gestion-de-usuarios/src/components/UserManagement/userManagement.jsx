// userManagement.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import EditUserModal from "../Crud/editUserModal";
import CreateUserModal from "../Crud/createUserModal";
import "./userManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditModal = (userId) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUserId(null);
    setEditModalOpen(false);
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await fetch("https://localhost:7015/api/Users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    // Confirmación antes de eliminar
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (!isConfirmed) {
      return; // Detiene la ejecución si el usuario cancela
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await fetch(`https://localhost:7015/api/Users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      // Actualiza la lista de usuarios eliminando el usuario borrado
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await fetch("https://localhost:7015/api/Users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el usuario");
      }

      fetchUsers();
      closeCreateModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditUser = async (id, updatedUserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await fetch(`https://localhost:7015/api/Users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error("Error al editar el usuario");
      }

      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Usuarios</h1>
      <button onClick={openCreateModal}>Agregar</button>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Nombre de Usuario</th>
            <th>Acciones</th>
            <th>Pais</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.username}</td>
              <td>{user.pais}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => openEditModal(user.id)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateUserModal
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleAddUser}
      />
      <EditUserModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        userId={selectedUserId}
        onSubmit={handleEditUser}
      />
    </div>
  );
}

export default UserManagement;
