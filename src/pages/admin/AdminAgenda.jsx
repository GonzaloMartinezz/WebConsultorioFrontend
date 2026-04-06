import { useState, useEffect } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaChevronLeft, FaChevronRight, FaPlus, FaFilter, FaSpinner } from 'react-icons/fa';
import api from '../../api/axios.js';

const AdminAgenda = () => {
    const [turnosConfirmados, setTurnosConfirmados] = useState([]);
    const [cargando, setCargando] = useState(true);

    // ==========================================
    // 1. OBTENER TURNOS DE LA BASE DE DATOS
    // ==========================================
    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                const respuesta = await api.get('/turnos');
                // Solo queremos mostrar los turnos que ya fueron aprobados por recepción
                const aprobados = respuesta.data.filter(turno => turno.estado === 'Confirmado');
                setTurnosConfirmados(aprobados);
            } catch (error) {
                console.error("Error al cargar la agenda:", error);
            } finally {
                setCargando(false);
            }
        };
        fetchAgenda();
    }, []);

    // ==========================================
    // 2. LÓGICA DEL CALENDARIO (Días de esta semana)
    // ==========================================
    const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    
    // Generamos los próximos 5 días hábiles automáticamente a partir de hoy
    const generarDias = () => {
        const dias = [];
        const nombresDias = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
        let fechaActual = new Date();

        for (let i = 0; i < 5; i++) {
            // Evitamos sábados (6) y domingos (0) si la clínica no abre
            while (fechaActual.getDay() === 0 || fechaActual.getDay() === 6) {
                fechaActual.setDate(fechaActual.getDate() + 1);
            }
            
            const fechaISO = fechaActual.toISOString().split('T')[0]; // Ej: "2026-04-06"
            const diaNombre = nombresDias[fechaActual.getDay()];
            const diaNumero = fechaActual.getDate();

            dias.push({ id: fechaISO, textoTop: diaNombre, textoNum: diaNumero });
            fechaActual.setDate(fechaActual.getDate() + 1);
        }
        return dias;
    };

    const weekDays = generarDias();

    // ==========================================
    // 3. RENDERIZAR CHIP DE TURNO
    // ==========================================
    const buscarTurno = (fechaStr, horaStr) => {
        // Buscamos si existe un turno confirmado para esa fecha y esa hora exacta
        return turnosConfirmados.find(t => t.fecha === fechaStr && t.hora === horaStr);
    };

    return (
        <LayoutAdmin>
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4" data-aos="fade-down">
                <div>
                    <h1 className="text-3xl font-black text-primary tracking-tight">Agenda Médica y Calendario</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 text-white font-bold text-sm bg-accent-orange rounded-xl shadow-md hover:brightness-110 flex items-center gap-2 transition-all">
                        <FaPlus /> Añadir Cita Manual
                    </button>
                </div>
            </header>

            <main className="bg-white rounded-3xl shadow-sm border border-secondary/50 overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                {/* Herramientas Calendario */}
                <div className="flex items-center justify-between p-6 border-b border-secondary/50">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-text uppercase">Próximos Días</h2>
                    </div>
                    {cargando && <FaSpinner className="text-accent-orange animate-spin text-xl" />}
                </div>

                {/* Grid del Calendario Visual */}
                <div className="overflow-x-auto">
                    <div className="min-w-[900px]">
                        
                        {/* Cabecera de días (Dinámica) */}
                        <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-secondary/50 bg-background/30 text-center">
                            <div className="p-4"></div> {/* Esquina Vacia */}
                            {weekDays.map(day => (
                                <div key={day.id} className="p-4 border-l border-secondary/50 bg-white shadow-sm">
                                    <p className="font-bold text-text-light uppercase text-xs tracking-widest">{day.textoTop}</p>
                                    <p className="text-2xl font-black text-primary">{day.textoNum}</p>
                                </div>
                            ))}
                        </div>

                        {/* Cuerpo del Grid (Cruce de Horas x Días) */}
                        <div className="relative border-b border-secondary/50">
                            {hours.map((hour, idx) => (
                                <div key={hour} className={`grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] border-b border-secondary/30 min-h-[90px] ${idx % 2 === 0 ? 'bg-white' : 'bg-background/20'}`}>
                                    
                                    {/* Columna de la Hora */}
                                    <div className="p-3 text-xs font-bold text-text-light text-center border-r border-secondary/50 bg-background/50 flex flex-col justify-center">
                                        {hour}
                                    </div>

                                    {/* Columnas de los 5 días */}
                                    {weekDays.map(day => {
                                        const turnoAsignado = buscarTurno(day.id, hour);
                                        
                                        return (
                                            <div key={`${day.id}-${hour}`} className="border-r border-secondary/30 relative group hover:bg-accent-orange/5 transition-colors cursor-pointer p-1">
                                                
                                                {/* Si hay un turno, renderizamos el Chip */}
                                                {turnoAsignado && (
                                                    <div className={`absolute top-1 left-1 right-1 bottom-1 rounded-xl p-2 shadow-sm z-10 hover:scale-[1.02] transition-transform overflow-hidden
                                                        ${turnoAsignado.profesional === 'Dr. Adolfo' ? 'bg-blue-50 border border-blue-200' : 'bg-pink-50 border border-pink-200'}
                                                    `}>
                                                        <p className={`text-[10px] font-black uppercase ${turnoAsignado.profesional === 'Dr. Adolfo' ? 'text-blue-700' : 'text-pink-700'}`}>
                                                            {turnoAsignado.nombrePaciente} {turnoAsignado.apellidoPaciente}
                                                        </p>
                                                        <p className="text-[10px] text-text-light font-bold line-clamp-1">{turnoAsignado.motivo}</p>
                                                        <p className="text-[9px] text-text mt-1">{turnoAsignado.profesional}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
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
