import { Route, Routes } from "react-router-dom";
// 1. Importamos el componente que arregla el scroll
import ScrollToTop from "./components/ScrollToTop.jsx"; 

import MainLayout from "./layouts/MainLayout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Turnos from "./pages/Turnos.jsx";
import AcercaDe from "./pages/AcercaDe.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

export default function App() {
  return (
    <>
      {/* 2. Lo colocamos aquí para que escuche los cambios de URL de toda la app */}
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="turnos" element={<Turnos />} />
          <Route path="acerca" element={<AcercaDe />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
        </Route>
        
        {/* La ruta de admin está por fuera del MainLayout, lo cual es perfecto 
            para que el panel de control tenga su propio diseño sin el Navbar público */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}
