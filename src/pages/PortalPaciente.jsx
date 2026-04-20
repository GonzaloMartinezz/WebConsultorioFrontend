import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaShieldAlt, FaLightbulb, FaWallet } from 'react-icons/fa';

const PortalPaciente = () => {
  return (
    <div className="min-h-screen bg-[#FFFBF7] pt-28 pb-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">

        {/* Panel Principal */}
        <div className="flex-1 space-y-8">

          {/* Hero del Portal */}
          <div className="bg-[#4A3B32] rounded-4xl p-10 md:p-14 relative overflow-hidden text-white shadow-xl">
            <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-center bg-cover" style={{ backgroundImage: 'url("/sala de espera 1.jpeg")' }}></div>
            <div className="relative z-10">
              <span className="bg-white/10 border border-white/20 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
                Portal Digital
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                Bienvenido a nuestro Centro Odontológico!
              </h1>
              <p className="text-white/80 max-w-lg mb-8 font-medium">
                Su viaje hacia una salud dental de excelencia comienza aquí. Gestione su bienestar con precisión clínica y calidez humana.
              </p>
              <div className="flex gap-4">
                <Link to="/turnos" className="bg-accent-orange px-6 py-3 rounded-lg font-bold shadow-lg hover:brightness-110 flex items-center gap-2">
                  <FaCalendarAlt /> Nuevo Turno
                </Link>
                <button className="bg-white/10 border border-white/20 px-6 py-3 rounded-lg font-bold hover:bg-white/20">
                  Ver Historial
                </button>
              </div>
            </div>
          </div>

          {/* Tarjetas de Acción Rápida */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-4xl shadow-sm border border-secondary/10">
              <div className="w-12 h-12 bg-orange-50 text-accent-orange rounded-xl flex items-center justify-center text-xl mb-6">
                <FaCalendarAlt />
              </div>
              <h3 className="font-black text-primary text-xl mb-3">Gestión de Turnos</h3>
              <p className="text-text-light text-sm mb-6 leading-relaxed">Programe, reprograme o cancele sus citas con un solo toque.</p>
              <Link to="/turnos" className="text-primary font-bold hover:text-accent-orange flex items-center gap-2">Acceder &rarr;</Link>
            </div>

            <div className="bg-white p-8 rounded-4xl shadow-sm border border-secondary/10">
              <div className="w-12 h-12 bg-orange-50 text-accent-orange rounded-xl flex items-center justify-center text-xl mb-6">
                <FaShieldAlt />
              </div>
              <h3 className="font-black text-primary text-xl mb-3">Información Clínica</h3>
              <p className="text-text-light text-sm mb-6 leading-relaxed">Acceda a sus resultados y planes de tratamiento de forma segura.</p>
              <button className="text-primary font-bold hover:text-accent-orange flex items-center gap-2">Explorar &rarr;</button>
            </div>

            <div className="bg-white p-8 rounded-4xl shadow-sm border border-secondary/10">
              <div className="w-12 h-12 bg-orange-50 text-accent-orange rounded-xl flex items-center justify-center text-xl mb-6">
                <FaLightbulb />
              </div>
              <h3 className="font-black text-primary text-xl mb-3">Soporte</h3>
              <p className="text-text-light text-sm mb-6 leading-relaxed">¿Tiene dudas? Estamos disponibles para asistirle rápidamente.</p>
              <a href="https://wa.me/5493816242482" target="_blank" rel="noreferrer" className="text-primary font-bold hover:text-accent-orange flex items-center gap-2">Consultar &rarr;</a>
            </div>
          </div>
        </div>

        {/* Sidebar Lateral Derecho */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Próxima Visita */}
          <div className="bg-orange-50 p-8 rounded-4xl border border-orange-100 relative overflow-hidden">
            <span className="text-[10px] font-black tracking-widest uppercase text-primary/40 mb-2 block">Próxima Visita</span>
            <h3 className="text-3xl font-black text-primary leading-tight">14 Octubre</h3>
            <p className="text-lg font-bold text-accent-orange mb-6">09:30 AM</p>
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm">
              <span className="text-2xl">👨‍⚕️</span>
              <div>
                <p className="text-xs font-black text-primary">Dr. Adolfo Martinez</p>
                <p className="text-[10px] text-primary/50 uppercase tracking-wider">Implantología</p>
              </div>
            </div>
          </div>

          {/* Estado de Cuenta */}
          <div className="bg-white p-8 rounded-4xl border border-secondary/10 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-primary text-lg">Estado de Cuenta</h3>
              <FaWallet className="text-primary/30" />
            </div>
            <p className="text-[10px] font-black tracking-widest uppercase text-primary/40">Saldo Pendiente</p>
            <p className="text-3xl font-black text-primary mb-6">$0.00</p>
            <button className="w-full py-3 rounded-lg border-2 border-primary/10 font-bold text-primary hover:bg-primary/5 transition-colors">
              Ver Facturación
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortalPaciente;
