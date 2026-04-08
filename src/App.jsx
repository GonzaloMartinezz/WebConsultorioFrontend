import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

// 1. Importamos el componente que arregla el scroll
import ScrollToTop from "./components/ScrollToTop.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

// =========================================
// IMPORTACIONES PÚBLICAS
// =========================================
import MainLayout from "./layouts/MainLayout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Turnos from "./pages/Turnos.jsx";
import AcercaDe from "./pages/AcercaDe.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import MisTurnos from "./pages/MisTurnos.jsx";

// =========================================
// IMPORTACIONES PRIVADAS (Panel Admin)
// =========================================
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import OdontogramaPage from "./pages/admin/Odontograma.jsx";
import DirectorioPacientes from './pages/admin/DirectorioPacientes.jsx';
import FichaClinica from './pages/admin/FichaClinica.jsx';

// ¡Nuevas pantallas integradas!
import AdminAgenda from "./pages/admin/AdminAgenda.jsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.jsx";
import AdminConfiguracion from "./pages/admin/AdminConfiguracion.jsx";
import AdminEncuestas from "./pages/admin/AdminEncuestas.jsx";
import AdminFinanzas from "./pages/admin/AdminFinanzas.jsx";
import AdminHistoriaClinica from "./pages/admin/AdminHistoriaClinica.jsx";
import AdminPacientes from "./pages/admin/AdminPacientes.jsx";
import AdminOdontograma from "./pages/admin/AdminOdontograma.jsx";
import AdminTurnosPendientes from "./pages/admin/AdminTurnosPendientes.jsx";

// Súper Ficha del Paciente y Estadísticas
import AdminFichaPaciente from "./pages/admin/AdminFichaPaciente.jsx";
import AdminEstadisticas from "./pages/admin/AdminEstadisticas.jsx";

export default function App() {
  // Encendemos el motor de animaciones
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 100,
    });
  }, []);

  return (
    <>
      {/* 2. Lo colocamos aquí para que escuche los cambios de URL de toda la app */}
      <ScrollToTop />

      <Routes>
        {/* ========================================= */}
        {/* EL MUNDO PÚBLICO (Para los pacientes)       */}
        {/* ========================================= */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="turnos" element={<Turnos />} />
          <Route path="mis-turnos" element={<MisTurnos />} />
          <Route path="acerca" element={<AcercaDe />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>

        {/* ========================================= */}
        {/* EL MUNDO PRIVADO (Para el administrador)    */}
        {/* ========================================= */}

        {/* 1. La puerta de entrada a la plataforma */}
        <Route path="/login" element={<Login />} />

        {/* PANEL DE CONTROL UNIFICADO */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/pendientes" element={<AdminTurnosPendientes />} />

        {/* Rutas conectadas con la Base de Datos Real */}
        <Route path="/admin/pacientes" element={<DirectorioPacientes />} />
        <Route path="/admin/paciente/:id" element={<FichaClinica />} />
        <Route path="/admin/odontograma" element={<OdontogramaPage />} />

        {/* ¡Nuevas rutas del diseño maquetado agregadas! */}
        <Route path="/admin/agenda" element={<AdminAgenda />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/configuracion" element={<AdminConfiguracion />} />
        <Route path="/admin/encuestas" element={<AdminEncuestas />} />
        <Route path="/admin/finanzas" element={<AdminFinanzas />} />
        <Route path="/admin/historia-clinica" element={<AdminHistoriaClinica />} />
        <Route path="/admin/historia-clinica/:id" element={<AdminHistoriaClinica />} />
        <Route path="/admin/lista-pacientes" element={<AdminPacientes />} />
        <Route path="/admin/odontograma-avanzado" element={<AdminOdontograma />} />
        <Route path="/admin/odontograma-avanzado/:id" element={<AdminOdontograma />} />

        {/* Súper Ficha Unificada del Paciente */}
        <Route path="/admin/ficha-paciente/:id" element={<AdminFichaPaciente />} />

        {/* Panel de Estadísticas (Rendimiento Clínico) */}
        <Route path="/admin/estadisticas" element={<AdminEstadisticas />} />

      </Routes>
    </>
  );
}
