import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
// 1. Importamos el componente que arregla el scroll
import ScrollToTop from "./components/ScrollToTop.jsx"; 
import AOS from 'aos';
import 'aos/dist/aos.css';

import MainLayout from "./layouts/MainLayout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Turnos from "./pages/Turnos.jsx";
import AcercaDe from "./pages/AcercaDe.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import OdontogramaPage from "./pages/admin/Odontograma.jsx";
import PortalAcceso from "./pages/PortalAcceso.jsx";

export default function App() {
  // Encendemos el motor de animaciones
  useEffect(() => {
    AOS.init({
      duration: 800, // Duración de la animación en milisegundos
      once: true,    // Si pones 'false', se anima cada vez que subes y bajas. 'true' es más sutil.
      easing: 'ease-out-cubic',
      offset: 100,   // Cuánto scroll hay que hacer para que se active
    });
  }, []);

  return (
    <>
      {/* 2. Lo colocamos aquí para que escuche los cambios de URL de toda la app */}
      <ScrollToTop />
      
      <Routes>
        {/* Portal de Acceso Aislado a pantalla completa */}
        <Route path="/" element={<PortalAcceso />} />

        {/* Grupo principal dentro del MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/acerca" element={<AcercaDe />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
        </Route>
        
        {/* La ruta de admin está por fuera del MainLayout, lo cual es perfecto 
            para que el panel de control tenga su propio diseño sin el Navbar público */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/odontograma" element={<OdontogramaPage />} />
      </Routes>
    </>
  );
}
