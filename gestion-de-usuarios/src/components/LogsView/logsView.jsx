import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../services/userService";
import "./logsView.css";

function LogsView() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No se encontró el token de autenticación.");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/Logs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudieron obtener los logs");
        }

        const data = await response.json();
        setLogs(data);
        setFilteredLogs(data); // Inicializa con todos los logs
      } catch (error) {
        console.error("Error al obtener los logs:", error);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    // Filtro de logs basado en usuario y acción
    const result = logs.filter(
      (log) =>
        log.username.toLowerCase().includes(userFilter.toLowerCase()) &&
        log.action.toLowerCase().includes(actionFilter.toLowerCase())
    );
    setFilteredLogs(result);
    setCurrentPage(1); // Resetea a la primera página al filtrar
  }, [userFilter, actionFilter, logs]);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Cambia a la página anterior
  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  // Cambia a la página siguiente
  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  // Obtiene los datos de los logs para la página actual
  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  return (
    <div className="container">
      <h2>Logs del Sistema</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por usuario"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por acción"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Detalles</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.username}</td>
              <td>{log.action}</td>
              <td>{log.details}</td>
              <td>{new Date(log.dateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="page-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        {/* Botón Siguiente */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="page-link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default LogsView;
