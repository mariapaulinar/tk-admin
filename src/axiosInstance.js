import axios from 'axios';

// Crear una instancia de axios con la configuración base
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Cambia esto por la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
    // Puedes agregar más encabezados si es necesario
  },
  withCredentials: true, // Esto es importante si usas Laravel Sanctum para autenticación
});

// Interceptor para manejar errores globalmente (opcional)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Manejo de errores
    return Promise.reject(error);
  }
);

export default axiosInstance;
