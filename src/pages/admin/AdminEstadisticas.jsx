import { useState, useEffect } from "react";
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaUsers, FaChartPie, FaStethoscope } from 'react-icons/fa';
import api from "../../api/axios.js";

const AdminEstadisticas = () => {
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/estadisticas');
        setStats(data);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchStats();
  }, []);

  if (cargando) {
    return (
      <LayoutAdmin>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </LayoutAdmin>
    );
  }

  // Cálculos locales para porcentajes
  const totalCarga = stats?.cargaProfesionales.total || 1;
  const percAdolfo = ((stats?.cargaProfesionales.Adolfo || 0) / totalCarga * 100).toFixed(0);
  const percErina = ((stats?.cargaProfesionales.Erina || 0) / totalCarga * 100).toFixed(0);

  const totalMotivos = (stats?.motivosConsulta.ortodoncia + stats?.motivosConsulta.limpieza + stats?.motivosConsulta.general + stats?.motivosConsulta.urgencia) || 1;
  const percOrtodoncia = ((stats?.motivosConsulta.ortodoncia || 0) / totalMotivos * 100).toFixed(0);
  const percLimpieza = ((stats?.motivosConsulta.limpieza || 0) / totalMotivos * 100).toFixed(0);
  const percUrgencia = ((stats?.motivosConsulta.urgencia || 0) / totalMotivos * 100).toFixed(0);

  return (
    <LayoutAdmin>
      <header className="mb-8">
        <h1 className="text-3xl font-black text-primary tracking-tight">Rendimiento Clínico 2026</h1>
        <p className="text-text-light font-medium">Métricas de atención y crecimiento del consultorio.</p>
      </header>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary/30 flex items-center gap-6">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl text-3xl"><FaUsers /></div>
          <div>
            <p className="text-sm font-bold text-text-light uppercase">Pacientes Registrados</p>
            <p className="text-4xl font-black text-primary">{stats?.pacientesTotales || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary/30 flex items-center gap-6">
          <div className="p-4 bg-green-100 text-green-600 rounded-2xl text-3xl"><FaUsers /></div>
          <div>
            <p className="text-sm font-bold text-text-light uppercase">Turnos Conciliados</p>
            <p className="text-4xl font-black text-primary">{stats?.cargaProfesionales.total || 0}</p>
          </div>
        </div>
      </div>

      {/* Gráficos Visuales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Distribución por Profesional */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/30">
          <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2"><FaStethoscope /> Carga de Trabajo</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-text">Dr. Adolfo Martínez</span>
                <span className="font-black text-primary">{percAdolfo}%</span>
              </div>
              <div className="w-full bg-secondary/20 rounded-full h-4 overflow-hidden">
                <div className="bg-blue-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${percAdolfo}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-text">Dra. Erina Carcara</span>
                <span className="font-black text-primary">{percErina}%</span>
              </div>
              <div className="w-full bg-secondary/20 rounded-full h-4 overflow-hidden">
                <div className="bg-pink-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${percErina}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivos de Consulta */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/30">
          <h2 className="text-xl font-black text-primary mb-6 flex items-center gap-2"><FaChartPie /> Motivos de Consulta</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-bold text-text-light">Ortodoncia</div>
              <div className="flex-1 bg-secondary/20 h-6 rounded overflow-hidden">
                <div className="bg-accent-orange h-6 transition-all duration-1000" style={{ width: `${percOrtodoncia}%` }}></div>
              </div>
              <div className="w-10 text-right font-black">{percOrtodoncia}%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-bold text-text-light">Limpieza</div>
              <div className="flex-1 bg-secondary/20 h-6 rounded overflow-hidden">
                <div className="bg-teal-500 h-6 transition-all duration-1000" style={{ width: `${percLimpieza}%` }}></div>
              </div>
              <div className="w-10 text-right font-black">{percLimpieza}%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-bold text-text-light">Urgencias</div>
              <div className="flex-1 bg-secondary/20 h-6 rounded overflow-hidden">
                <div className="bg-red-500 h-6 transition-all duration-1000" style={{ width: `${percUrgencia}%` }}></div>
              </div>
              <div className="w-10 text-right font-black">{percUrgencia}%</div>
            </div>
          </div>
        </div>

      </div>
    </LayoutAdmin>
  );
};

export default AdminEstadisticas;
