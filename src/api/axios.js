import axios from 'axios';

const api = axios.create({
  // Descomentar para producción:
  // baseURL: 'https://webconsultorio-backend.onrender.com/api',
  // Local:
  baseURL: 'http://localhost:5000/api',
  withCredentials: true 
});

export default api;