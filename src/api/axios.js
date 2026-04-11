import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});

// ESTA ES LA MAGIA: El "Interceptor"
// Antes de que cualquier petición salga, esto le pega la credencial (Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Enviamos el pasaporte
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;