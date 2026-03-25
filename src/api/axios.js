import axios from 'axios';

const api = axios.create({
  // ¡Cambiamos localhost por tu URL real de Render!
  baseURL: 'https://webconsultorio-backend.onrender.com/api',
  withCredentials: true // Esto es vital para que viajen las cookies
});

export default api;