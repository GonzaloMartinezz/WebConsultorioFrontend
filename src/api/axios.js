import axios from 'axios';

const api = axios.create({
  // URL de tu servidor backend en desarrollo
  baseURL: 'http://localhost:5000/api', 
  // ¡CRÍTICO! Esto permite que React envíe y reciba las Cookies de seguridad (JWT)
  withCredentials: true 
});

export default api;
