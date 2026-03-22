import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaChevronLeft, FaChevronRight, FaPlus, FaFilter } from 'react-icons/fa';

const AdminAgenda = () => {
    // Horarios simulados (9am a 5pm)
    const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    const days = ["LUN 12", "MAR 13", "MIE 14", "JUE 15", "VIE 16"];

    return (
        <LayoutAdmin>
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4" data-aos="fade-down">
                <div>
                    <h1 className="text-3xl font-black text-primary tracking-tight">Agenda Médica y Calendario</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white rounded-xl border border-secondary shadow-sm overflow-hidden text-sm font-bold">
                        <button className="px-4 py-2 bg-primary text-white">Semana</button>
                        <button className="px-4 py-2 hover:bg-secondary/20">Mes</button>
                        <button className="px-4 py-2 hover:bg-secondary/20">Día</button>
                    </div>
                    <button className="px-5 py-2.5 text-white font-bold text-sm bg-accent-orange rounded-xl shadow-md hover:brightness-110 flex items-center gap-2 transition-all">
                        <FaPlus /> Añadir Cita
                    </button>
                </div>
            </header>

            <main className="bg-white rounded-3xl shadow-sm border border-secondary/50 overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                {/* Herramientas Calendario */}
                <div className="flex items-center justify-between p-6 border-b border-secondary/50">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-text uppercase">Marzo 2026</h2>
                        <div className="flex items-center gap-1">
                            <button className="p-2 border border-secondary rounded-lg hover:bg-secondary/30 transition-colors"><FaChevronLeft className="text-xs" /></button>
                            <button className="px-4 py-1.5 border border-secondary rounded-lg font-bold text-sm hover:bg-secondary/30 transition-colors hidden sm:block">Hoy</button>
                            <button className="p-2 border border-secondary rounded-lg hover:bg-secondary/30 transition-colors"><FaChevronRight className="text-xs" /></button>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-bold text-text-light px-4 py-2 border border-secondary rounded-xl hover:bg-secondary/20 transition-colors">
                        <FaFilter /> Filtrar por Profesional
                    </button>
                </div>

                {/* Grid del Calendario Visual (Maquetado puro Tailwind sin CSS externo) */}
                <div className="overflow-x-auto">
                    <div className="min-w-[900px]">
                        {/* Cabecera de días */}
                        <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-secondary/50 bg-background/30 text-center">
                            <div className="p-4"></div> {/* Esquina Vacia */}
                            {days.map(day => (
                                <div key={day} className="p-4 border-l border-secondary/50">
                                    <p className="font-bold text-text-light uppercase text-xs tracking-widest">{day.split(' ')[0]}</p>
                                    <p className="text-2xl font-black text-primary">{day.split(' ')[1]}</p>
                                </div>
                            ))}
                        </div>

                        {/* Cuerpo del Grid */}
                        <div className="relative border-b border-secondary/50">
                            {hours.map((hour, idx) => (
                                <div key={hour} className={`grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-secondary/30 min-h-[90px] ${idx % 2 === 0 ? 'bg-white' : 'bg-background/20'}`}>
                                    <div className="p-3 text-xs font-bold text-text-light text-center border-r border-secondary/50 bg-background/50 flex flex-col justify-center">
                                        {hour}
                                    </div>
                                    <div className="border-r border-secondary/30 relative group hover:bg-accent-orange/5 transition-colors cursor-pointer"></div>
                                    <div className="border-r border-secondary/30 relative group hover:bg-accent-orange/5 transition-colors cursor-pointer">
                                        {/* Mock Chip de Turno */}
                                        {hour === "10:00" && (
                                            <div className="absolute top-2 left-2 right-2 bg-green-100 border border-green-300 rounded-xl p-2 shadow-sm z-10 cursor-pointer hover:scale-105 transition-transform">
                                                <p className="text-[10px] font-bold text-green-700 uppercase">M. Rodriguez</p>
                                                <p className="text-[10px] text-green-800 line-clamp-1">Limpieza Dental</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="border-r border-secondary/30 relative group hover:bg-accent-orange/5 transition-colors cursor-pointer"></div>
                                    <div className="border-r border-secondary/30 relative group hover:bg-accent-orange/5 transition-colors cursor-pointer">
                                        {/* Mock Chip de Turno 2 */}
                                        {hour === "15:00" && (
                                            <div className="absolute top-2 left-2 right-2 bg-primary/10 border border-primary/30 rounded-xl p-2 shadow-sm z-10 cursor-pointer hover:scale-105 transition-transform h-[140%]">
                                                <p className="text-[10px] font-bold text-primary uppercase">G. Martínez</p>
                                                <p className="text-[10px] text-primary line-clamp-2">Odontograma Inicial e Implante</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative group hover:bg-accent-orange/5 transition-colors cursor-pointer"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </LayoutAdmin>
    );
};

export default AdminAgenda;
