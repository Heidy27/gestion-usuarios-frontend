export const BASE_URL = "https://localhost:7015";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      // Se devuelve el nombre de usuario si está presente en la respuesta
      return { token: data.token, username: data.username };
    } else if (response.status === 401) {
      throw new Error(
        "Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña."
      );
    } else {
      throw new Error(
        "Error al realizar la solicitud. Por favor, intenta nuevamente más tarde."
      );
    }
  } catch (error) {
    console.error("Error durante el proceso de login:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/Registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return await response.json(); // Si la respuesta es exitosa, devuelve el JSON
    } else {
      const errorBody = await response.json(); // Intenta obtener el cuerpo del error
      if (response.status === 400 && errorBody.errors) {
        const errorsMessages = Object.entries(errorBody.errors).map(
          ([key, value]) => `${key}: ${value.join(", ")}`
        );
        throw new Error(errorsMessages.join("\n"));
      } else {
        throw new Error("Error al registrar usuario.");
      }
    }
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};

export const loadUserFromBackend = async (setUser, navigate) => {
  try {
    const token = localStorage.getItem("token"); // Obteniendo el token desde localStorage
    if (!token) {
      console.error("No se encontró el token de autenticación.");
      navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
      return;
    }

    const response = await fetch(`${BASE_URL}/api/UserProfile`, {
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
      if (response.status === 401) {
        console.error("El token ha caducado.");
        localStorage.removeItem("token"); // Eliminar el token caducado
        navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
      } else {
        console.error("Error al obtener el usuario:", response.statusText);
        setUser(null);
      }
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    setUser(null);
  }
};

const deleteUser = async (userId) => {
  try {
    // Ajusta la URL según tu API
    const response = await fetch(`${BASE_URL}/api/Users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Falló la eliminación del usuario");

    // Filtrar el usuario eliminado fuera del estado local
    setUsers(users.filter((user) => user.id !== userId));
  } catch (error) {
    setError(error.message);
  }
};
