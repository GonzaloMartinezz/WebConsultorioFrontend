import axios from 'axios';

const api = axios.create({
  // Vite usa import.meta.env para leer las variables de Vercel. 
  // Le ponemos "||" por si estás probando en tu PC y Vercel no está.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
  
  withCredentials: true 
});

export default api;