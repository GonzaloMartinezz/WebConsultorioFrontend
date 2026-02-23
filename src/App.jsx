import { Route, Routes } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout.jsx";
import Inicio from "../src/pages/Inicio.jsx";
import Turnos from "../src/pages/Turnos.jsx";
import AcercaDe from "../src/pages/AcercaDe.jsx";
import Contacto from "../src/pages/Contacto.jsx";
import AdminDashboard from "../src/pages/admin/AdminDashboard.jsx";

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas con Navbar y Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Inicio />} />
        <Route path="turnos" element={<Turnos />} />
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>

      {/* Rutas del panel de administración */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Podrías agregar una ruta para Not Found (404) aquí */}
    </Routes>
  );
}
