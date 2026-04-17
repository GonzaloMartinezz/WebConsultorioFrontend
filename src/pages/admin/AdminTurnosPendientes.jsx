import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaExternalLinkAlt, FaWhatsapp, FaInfoCircle, FaSpinner, FaCheckCircle, FaCalendarDay, FaFilter, FaClock, FaTimesCircle } from 'react-icons/fa';
import api from '../../api/axios.js';

const AdminTurnosPendientes = () => {
    const [pendientes, setPendientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Fecha de hoy en formato YYYY-MM-DD para comparación
    const fechaHoy = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchPendientes = async () => {
            try {
                const respuesta = await api.get('/turnos');
                // FILTRO INTELIGENTE: Solo pendientes con fecha de HOY en adelante
                const soloPendientesActuales = respuesta.data.filter(turno => {
                    // 1. Solo estado "Pendiente"
                    if (turno.estado !== 'Pendiente') return false;
                    // 2. Solo fecha de hoy en adelante (excluir turnos viejos)
                    if (turno.fecha && turno.fecha < fechaHoy) return false;
                    return true;
                });
                // Ordenar por fecha más próxima primero
                soloPendientesActuales.sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''));
                setPendientes(soloPendientesActuales);
            } catch (error) {
                console.error("Error al traer los turnos pendientes:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchPendientes();

        // Actualización en tiempo real cada 10 segundos
        const interval = setInterval(() => {
            fetchPendientes();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Toast System Nativo
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
    };

    const [notificacionPendiente, setNotificacionPendiente] = useState(null);

    // Acciones Directas
    const handleApprove = async (turno) => {
        try {
            await api.patch(`/turnos/${turno._id}/estado`, { estado: 'Confirmado' });
            setPendientes(prev => prev.filter(t => t._id !== turno._id));

            const fechaLegible = turno.fecha ? turno.fecha.split('-').reverse().join('/') : '';
            const msg = `¡Hola ${turno.nombrePaciente}! 🦷\nTe escribimos de *C&M Centro Odontológico*.\n\nTu turno ha sido *CONFIRMADO* ✅\n\n📅 Fecha: ${fechaLegible}\n⏰ Horario: ${turno.hora}\n\n¡Te esperamos!`;
            const waUrl = `https://wa.me/${turno.telefono?.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;

            setNotificacionPendiente({ waUrl, nombre: turno.nombrePaciente });
            showToast('✅ Turno confirmado exitosamente.', 'success');
        } catch (error) {
            showToast('❌ Error al confirmar el turno.', 'error');
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm('¿Rechazar este turno definitivamente?')) return;
        try {
            await api.patch(`/turnos/${id}/estado`, { estado: 'Cancelado' });
            setPendientes(prev => prev.filter(t => t._id !== id));
            showToast('Turno rechazado.', 'success');
        } catch (error) {
            showToast('Error al rechazar.', 'error');
        }
    };

    // Helper para calcular "hace cuánto" se solicitó
    const tiempoDesde = (fechaCreacion) => {
        if (!fechaCreacion) return '';
        const ahora = new Date();
        const creado = new Date(fechaCreacion);
        const diffMs = ahora - creado;
        const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDias = Math.floor(diffHoras / 24);
        if (diffDias > 0) return `Hace ${diffDias} día${diffDias > 1 ? 's' : ''}`;
        if (diffHoras > 0) return `Hace ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`;
        return 'Hace unos minutos';
    };

    return (
        <LayoutAdmin>
            <header className="mb-8" data-aos="fade-down">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500 mb-2 flex items-center gap-2">
                            <FaInfoCircle /> Acción Oportuna Requerida
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
                            Turnos Pendientes
                        </h1>
                        <p className="text-text-light font-medium mt-2 max-w-2xl text-sm">
                            Solicitudes de turnos recibidas desde hoy en adelante. Los turnos viejos y ya procesados se excluyen automáticamente.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-secondary/30 shadow-sm">
                        <FaFilter className="text-accent-orange text-sm" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                            {pendientes.length} pendiente{pendientes.length !== 1 ? 's' : ''} activo{pendientes.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </header>

            <main className="space-y-4" data-aos="fade-up">

                {/* ESTADO: Cargando */}
                {cargando ? (
                    <div className="flex justify-center py-20">
                        <FaSpinner className="text-4xl text-accent-orange animate-spin" />
                    </div>

                ) : pendientes.length === 0 ? (
                    /* ESTADO: Bandeja vacía */
                    <div className="bg-white rounded-3xl p-16 text-center border border-secondary shadow-sm">
                        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4 opacity-50" />
                        <h2 className="text-2xl font-black text-primary">Bandeja de Entrada Limpia</h2>
                        <p className="text-text-light font-medium mt-2">No hay turnos pendientes desde hoy en adelante. ¡Todo al día!</p>
                    </div>

                ) : (
                    /* ESTADO: Lista de turnos pendientes */
                    <div className="grid grid-cols-1 gap-4">
                        {pendientes.map((turno) => (
                            <div
                                key={turno._id}
                                className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-secondary/30 border-l-4 border-l-amber-500 flex flex-col xl:flex-row xl:items-center justify-between gap-6 hover:shadow-md transition-all group"
                            >
                                {/* Info del turno */}
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-5 xl:w-2/3">
                                    {/* Fecha y Hora */}
                                    <div className="bg-amber-50 rounded-xl p-4 text-center min-w-[130px] shrink-0 border border-amber-100 flex flex-col items-center justify-center gap-0.5">
                                        <FaCalendarDay className="text-amber-500 text-lg mb-1" />
                                        <p className="text-sm font-black text-primary">{turno.fecha ? turno.fecha.split('-').reverse().join('/') : 'Sin Fecha'}</p>
                                        <p className="text-base font-black text-amber-700">{turno.hora || 'Sin Hora'}</p>
                                        <p className="text-[9px] text-text-light font-bold uppercase mt-1 tracking-widest">Solicitado</p>
                                    </div>

                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-lg font-black text-primary uppercase tracking-tight">
                                                {turno.nombrePaciente} {turno.apellidoPaciente}
                                            </h3>
                                            <span className="bg-amber-100 text-amber-700 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg tracking-wider">
                                                Pendiente
                                            </span>
                                        </div>
                                        <p className="text-text-light font-medium text-sm">
                                            Motivo: <span className="text-text font-bold">{turno.motivo || 'Consulta general'}</span>
                                        </p>
                                        <p className="text-text-light font-medium text-sm">
                                            Profesional: <span className="text-primary font-bold">{turno.profesional}</span>
                                        </p>
                                        <div className="flex items-center gap-4 flex-wrap mt-1">
                                            {turno.telefono && (
                                                <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                                                    <FaWhatsapp className="text-green-500" /> {turno.telefono}
                                                </span>
                                            )}
                                            {turno.email && (
                                                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                                                    {turno.email}
                                                </span>
                                            )}
                                            {turno.createdAt && (
                                                <span className="text-[10px] font-bold text-text-light flex items-center gap-1 opacity-60">
                                                    <FaClock className="text-xs" /> {tiempoDesde(turno.createdAt)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Botón de acción único */}
                                <div className="flex w-full xl:w-auto items-center gap-3 xl:justify-end">
                                    <Link
                                        to="/admin"
                                        className="flex-1 xl:flex-none px-10 py-4 rounded-2xl text-white bg-primary shadow-xl hover:bg-primary/90 hover:-translate-y-1 font-black uppercase text-[11px] tracking-[2px] flex items-center justify-center gap-3 transition-all active:scale-95"
                                    >
                                        <FaExternalLinkAlt className="text-sm text-accent-orange" />
                                        <span>Gestionar en panel principal</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </LayoutAdmin>
    );
};

export default AdminTurnosPendientes;
