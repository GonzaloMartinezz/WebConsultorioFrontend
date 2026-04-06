import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaExternalLinkAlt, FaWhatsapp, FaInfoCircle, FaSpinner, FaCheckCircle, FaCalendarDay } from 'react-icons/fa';
import api from '../../api/axios.js';

const AdminTurnosPendientes = () => {
    const [pendientes, setPendientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    // ==========================================
    // TRAER TURNOS REALES DE LA BASE DE DATOS
    // ==========================================
    useEffect(() => {
        const fetchPendientes = async () => {
            try {
                const respuesta = await api.get('/turnos');
                // Filtramos para mostrar SOLO los que están pendientes
                const soloPendientes = respuesta.data.filter(turno => turno.estado === 'Pendiente');
                setPendientes(soloPendientes);
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

    return (
        <LayoutAdmin>
            <header className="mb-10" data-aos="fade-down">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1 flex items-center gap-2">
                    <FaInfoCircle /> Acción Oportuna Requerida
                </p>
                <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
                    Auditoría de Turnos Entrantes
                </h1>
                <p className="text-text-light font-medium mt-3 max-w-2xl">
                    Revisa los turnos solicitados a través del sitio web por los pacientes. La gestión final y modificación de horarios se realiza exclusivamente desde tu Panel Principal.
                </p>
            </header>

            <main className="space-y-6" data-aos="fade-up">

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
                        <p className="text-text-light font-medium mt-2">Has procesado todas las solicitudes de turno pendientes.</p>
                    </div>

                ) : (
                    /* ESTADO: Lista de turnos pendientes */
                    <div className="grid grid-cols-1 gap-6">
                        {pendientes.map((turno) => (
                            <div
                                key={turno._id}
                                className="bg-white rounded-4xl p-6 lg:p-8 shadow-md border-l-8 border-accent-orange flex flex-col xl:flex-row xl:items-center justify-between gap-8 hover:-translate-y-1 transition-transform"
                            >
                                {/* Info del turno */}
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 xl:w-2/3">
                                    {/* Mostrar Fecha y Hora Solicitada como vista, sin inputs */}
                                    <div className="bg-primary/5 rounded-2xl p-5 text-center min-w-[160px] shrink-0 border border-primary/10 flex flex-col items-center justify-center gap-1">
                                        <FaCalendarDay className="text-accent-orange text-2xl mb-1 opacity-80" />
                                        <p className="text-sm font-black text-primary">{turno.fecha ? turno.fecha.split('-').reverse().join('/') : 'Sin Fecha'}</p>
                                        <p className="text-lg font-black text-text">{turno.hora || 'Sin Hora'}</p>
                                        <p className="text-[10px] text-text-light font-bold uppercase mt-1 tracking-widest">Horario Solicitado</p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-xl font-bold text-text">
                                                {turno.nombrePaciente} {turno.apellidoPaciente}
                                            </h3>
                                            <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                                                Turno Pendiente
                                            </span>
                                        </div>
                                        <p className="text-text-light font-medium">
                                            Motivo: <span className="text-text font-bold">{turno.motivo}</span>
                                        </p>
                                        <p className="text-text-light font-medium">
                                            Solicita consultar con: <span className="text-primary font-bold">{turno.profesional}</span>
                                        </p>
                                        {turno.telefono && (
                                            <p className="text-secondary-dark font-medium flex items-center gap-2 mt-1">
                                                <FaWhatsapp className="text-green-500" /> {turno.telefono}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Botón de acción simplificado, Redirige al panel principal */}
                                <div className="flex w-full xl:w-auto items-center xl:justify-end border-t xl:border-t-0 border-secondary/40 pt-6 xl:pt-0">
                                    <Link
                                        to="/admin"
                                        className="w-full xl:w-auto px-10 py-5 rounded-2xl text-white bg-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 transition-all"
                                    >
                                        <span>Gestionar en Panel Principal</span>
                                        <FaExternalLinkAlt className="text-lg opacity-80" />
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
