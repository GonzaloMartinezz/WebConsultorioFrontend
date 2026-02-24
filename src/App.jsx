import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Turnos from "./pages/Turnos.jsx";
import AcercaDe from "./pages/AcercaDe.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Inicio />} />
        <Route path="turnos" element={<Turnos />} />
        <Route path="acerca" element={<AcercaDe />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
