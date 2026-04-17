import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

// 1. Importamos el componente que arregla el scroll e IA de seguridad
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
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
import MiPerfil from "./pages/MiPerfil.jsx";
import Estructura from "./pages/Estructura.jsx";

// =========================================
// IMPORTACIONES PRIVADAS (Panel Admin)
// =========================================
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import OdontogramaPage from "./pages/admin/Odontograma.jsx";
import DirectorioPacientes from './pages/admin/DirectorioPacientes.jsx';
import AdminFichaPaciente from "./pages/admin/AdminFichaPaciente.jsx";
import AdminEstadisticas from "./pages/admin/AdminEstadisticas.jsx";

// Extensiones del Panel
import AdminAgenda from "./pages/admin/AdminAgenda.jsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.jsx";
import AdminConfiguracion from "./pages/admin/AdminConfiguracion.jsx";
import AdminEncuestas from "./pages/admin/AdminEncuestas.jsx";
import AdminFinanzas from "./pages/admin/AdminFinanzas.jsx";
import AdminHistoriaClinica from "./pages/admin/AdminHistoriaClinica.jsx";
import AdminPacientes from "./pages/admin/AdminPacientes.jsx";
import AdminOdontograma from "./pages/admin/AdminOdontograma.jsx";
import AdminTurnosPendientes from "./pages/admin/AdminTurnosPendientes.jsx";

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
      <ScrollToTop />

      <Routes>
        {/* ========================================= */}
        {/* EL MUNDO PÚBLICO (Para los pacientes)       */}
        {/* ========================================= */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="turnos" element={<ProtectedRoute><Turnos /></ProtectedRoute>} />
          <Route path="acerca" element={<AcercaDe />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>

        {/* Portal de Acceso */}
        <Route path="/login" element={<Login />} />

        <Route path="/estructura" element={<Estructura />} />

        {/* ========================================= */}
        {/* EL MUNDO PRIVADO DEL PACIENTE               */}
        {/* ========================================= */}
        <Route 
          path="/mi-perfil" 
          element={
            <ProtectedRoute>
              <MiPerfil />
            </ProtectedRoute>
          } 
        />

        {/* ========================================= */}
        {/* EL MUNDO PRIVADO DEL ADMINISTRADOR          */}
        {/* ========================================= */}
        
        {/* Panel Principal */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} 
        />
        
        {/* Gestion de Turnos */}
        <Route 
          path="/admin/pendientes" 
          element={<ProtectedRoute requireAdmin={true}><AdminTurnosPendientes /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/agenda" 
          element={<ProtectedRoute requireAdmin={true}><AdminAgenda /></ProtectedRoute>} 
        />

        {/* Gestion de Pacientes */}
        <Route 
          path="/admin/pacientes" 
          element={<ProtectedRoute requireAdmin={true}><DirectorioPacientes /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/paciente/:id" 
          element={<ProtectedRoute requireAdmin={true}><AdminFichaPaciente /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/ficha-paciente/:id" 
          element={<ProtectedRoute requireAdmin={true}><AdminFichaPaciente /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/lista-pacientes" 
          element={<ProtectedRoute requireAdmin={true}><AdminPacientes /></ProtectedRoute>} 
        />

        {/* Clinica Avanzada */}
        <Route 
          path="/admin/odontograma" 
          element={<ProtectedRoute requireAdmin={true}><OdontogramaPage /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/odontograma-avanzado" 
          element={<ProtectedRoute requireAdmin={true}><AdminOdontograma /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/odontograma-avanzado/:id" 
          element={<ProtectedRoute requireAdmin={true}><AdminOdontograma /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/historia-clinica" 
          element={<ProtectedRoute requireAdmin={true}><AdminHistoriaClinica /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/historia-clinica/:id" 
          element={<ProtectedRoute requireAdmin={true}><AdminHistoriaClinica /></ProtectedRoute>} 
        />

        {/* Herramientas de Gestion */}
        <Route 
          path="/admin/estadisticas" 
          element={<ProtectedRoute requireAdmin={true}><AdminEstadisticas /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/analytics" 
          element={<ProtectedRoute requireAdmin={true}><AdminEstadisticas /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/configuracion" 
          element={<ProtectedRoute requireAdmin={true}><AdminConfiguracion /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/encuestas" 
          element={<ProtectedRoute requireAdmin={true}><AdminEncuestas /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/finanzas" 
          element={<ProtectedRoute requireAdmin={true}><AdminFinanzas /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/estadisticas" 
          element={<ProtectedRoute requireAdmin={true}><AdminEstadisticas /></ProtectedRoute>} 
        />

      </Routes>
    </>
  );
}
