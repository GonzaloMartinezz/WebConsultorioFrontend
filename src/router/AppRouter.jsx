import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import "../index.css";
import Inicio from "../pages/Inicio";
import Turnos from "../pages/Turnos";
import Contacto from "../pages/Contacto";
import AcercaDe from "../pages/AcercaDe";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminOdontograma from "../pages/admin/AdminOdontograma";
import AdminPacientes from "../pages/admin/AdminPacientes";
import AdminConfiguracion from "../pages/admin/AdminConfiguracion";
import AdminTurnosPendientes from "../pages/admin/AdminTurnosPendientes";
import AdminAgenda from "../pages/admin/AdminAgenda";
import AdminFinanzas from "../pages/admin/AdminFinanzas";
import AdminHistoriaClinica from "../pages/admin/AdminHistoriaClinica";
import AdminEncuestas from "../pages/admin/AdminEncuestas";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/acerca" element={<AcercaDe />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/admin/odontograma" element={<AdminOdontograma />} />
      <Route path="/admin/pacientes" element={<AdminPacientes />} />
      <Route path="/admin/configuracion" element={<AdminConfiguracion />} />
      <Route path="/admin/pendientes" element={<AdminTurnosPendientes />} />
      <Route path="/admin/agenda" element={<AdminAgenda />} />
      <Route path="/admin/historia-clinica" element={<AdminHistoriaClinica />} />
      <Route path="/admin/finanzas" element={<AdminFinanzas />} />
      <Route path="/admin/encuestas" element={<AdminEncuestas />} />
    </Routes>
  );
};

export default AppRouter;