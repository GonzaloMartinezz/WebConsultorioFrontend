import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx"; 
import { FaUsers, FaMoneyBillWave, FaPercentage, FaSmile, FaChartBar, FaChartPie } from 'react-icons/fa';

const AdminAnalytics = () => {
  return (
    <LayoutAdmin>
      {/* HEADER */}
      <header className="mb-10 pb-5 border-b-2 border-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-4" data-aos="fade-down">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange">Reportes de Rendimiento</p>
          <h1 className="text-3xl font-black text-primary tracking-tight">
            Analytics & Estadísticas
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-white border border-secondary px-4 py-2 rounded-xl shadow-sm">
          <span className="text-sm font-bold text-text-light">Periodo:</span>
          <select className="bg-transparent text-text font-bold outline-none cursor-pointer">
            <option>Últimos 30 días</option>
            <option>Este Mes</option>
            <option>Mes Anterior</option>
            <option>Este Año</option>
          </select>
        </div>
      </header>

      <main className="space-y-8 pb-10">
        
        {/* ========================================== */}
        {/* 1. KPIs SUPERIORES (Inspirado en LeadSquared) */}
        {/* ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary/50 flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <p className="text-text-light text-xs font-bold uppercase tracking-wider mb-1">Pacientes Atendidos</p>
              <p className="text-3xl font-black text-text">790</p>
              <p className="text-xs text-green-500 font-bold mt-2">↑ +12% vs mes anterior</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-full text-primary"><FaUsers className="text-2xl" /></div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary/50 flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <p className="text-text-light text-xs font-bold uppercase tracking-wider mb-1">Recaudación Est.</p>
              <p className="text-3xl font-black text-text">$1.2M</p>
              <p className="text-xs text-green-500 font-bold mt-2">↑ +5% vs mes anterior</p>
            </div>
            <div className="bg-green-100 p-4 rounded-full text-green-600"><FaMoneyBillWave className="text-2xl" /></div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary/50 flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <p className="text-text-light text-xs font-bold uppercase tracking-wider mb-1">Tasa de Ocupación</p>
              <p className="text-3xl font-black text-text">87%</p>
              <p className="text-xs text-accent-orange font-bold mt-2">Óptimo</p>
            </div>
            <div className="bg-accent-orange/10 p-4 rounded-full text-accent-orange"><FaPercentage className="text-2xl" /></div>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary/50 flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <p className="text-text-light text-xs font-bold uppercase tracking-wider mb-1">Satisfacción (NPS)</p>
              <p className="text-3xl font-black text-primary">4.8<span className="text-lg text-text-light">/5</span></p>
              <p className="text-xs text-text-light font-bold mt-2">Basado en encuestas</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-full text-yellow-600"><FaSmile className="text-2xl" /></div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 2. ZONA DE GRÁFICOS (Maquetado con CSS) */}
        {/* ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8" data-aos="fade-up" data-aos-delay="100">
          
          {/* Gráfico de Barras */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-secondary flex flex-col gap-6">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight flex items-center gap-2">
              <FaChartBar className="text-accent-orange" /> Evolución de Turnos (6 Meses)
            </h3>
            
            <div className="flex-1 flex items-end justify-between gap-2 min-h-[250px] pt-4 border-b border-secondary/50 pb-2">
              {/* Barras (Alturas simuladas con porcentajes) */}
              {[40, 55, 30, 85, 60, 90].map((h, i) => (
                <div key={i} className="w-1/6 flex flex-col items-center gap-2 group">
                  <div className="w-12 md:w-16 bg-accent-orange rounded-t-lg shadow-sm transition-all duration-300 group-hover:brightness-110 relative" style={{ height: `${h}%` }}>
                    {/* Tooltip Hover */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-text text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h * 10}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-light">Mes {i+1}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-6 justify-center text-xs font-bold">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accent-orange"></div> <span className="text-text-light">Turnos Atendidos</span></div>
            </div>
          </div>

          {/* Gráfico Circular (Donut) */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-secondary flex flex-col gap-6">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight flex items-center gap-2">
              <FaChartPie className="text-accent-orange" /> Tratamientos
            </h3>
            
            <div className="flex-1 flex items-center justify-center min-h-[200px] relative pt-4">
              <div className="w-48 h-48 rounded-full border-[1.5rem] border-secondary/20 flex items-center justify-center relative bg-[conic-gradient(var(--color-primary)_0deg_140deg,var(--color-accent-orange)_140deg_260deg,var(--color-secondary)_260deg_360deg)] shadow-md hover:scale-105 transition-transform duration-500">
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <span className="text-3xl font-black text-text">100%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 text-xs pt-4 border-t border-secondary/50">
              <div className="flex items-center justify-between font-bold"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div> General</div> <span>38%</span></div>
              <div className="flex items-center justify-between font-bold"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent-orange"></div> Ortodoncia</div> <span>33%</span></div>
              <div className="flex items-center justify-between font-bold"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div> Implantes / Otros</div> <span>29%</span></div>
            </div>
          </div>

        </section>
      </main>
    </LayoutAdmin>
  );
};

export default AdminAnalytics;
