import { useState, useEffect } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaCheckCircle, FaTimesCircle, FaWhatsapp, FaInfoCircle, FaSpinner } from 'react-icons/fa';
import api from '../../api/axios.js';

const AdminTurnosPendientes = () => {
    // Sistema Nativo de Notificaciones (TOASTS)
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
    };

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
                showToast("Error de conexión con el servidor", "error");
            } finally {
                setCargando(false);
            }
        };

        fetchPendientes();
    }, []);

    // ==========================================
    // ACCIONES REALES CONTRA LA BASE DE DATOS
    // ==========================================
    const handleAceptar = async (id) => {
        try {
            await api.patch(`/turnos/${id}/estado`, { estado: 'Confirmado' });
            // Lo quitamos visualmente de la lista de pendientes
            setPendientes(p => p.filter(t => t._id !== id));
            showToast('¡Turno Confirmado! Guardado en la agenda oficial.', 'success');
        } catch (error) {
            console.error(error);
            showToast('Hubo un error al confirmar el turno', 'error');
        }
    };

    const handleRechazar = async (id) => {
        try {
            await api.patch(`/turnos/${id}/estado`, { estado: 'Cancelado' });
            // Lo quitamos visualmente de la lista
            setPendientes(p => p.filter(t => t._id !== id));
            showToast('Turno Cancelado y removido de la bandeja.', 'error');
        } catch (error) {
            console.error(error);
            showToast('Hubo un error al cancelar el turno', 'error');
        }
    };

    return (
        <LayoutAdmin>
            {/* TOAST DE NOTIFICACIONES */}
            {toast.show && (
                <div className={`fixed top-10 right-10 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold animate-fade-in text-white tracking-wide border-2 
                ${toast.type === 'success' ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400'}`}
                >
                    {toast.type === 'success' ? <FaCheckCircle className="text-2xl" /> : <FaTimesCircle className="text-2xl" />}
                    {toast.message}
                </div>
            )}

            <header className="mb-10" data-aos="fade-down">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1 flex items-center gap-2">
                    <FaInfoCircle /> Acción Inmediata Requerida
                </p>
                <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
                    Auditoría de Turnos Entrantes
                </h1>
                <p className="text-text-light font-medium mt-3 max-w-2xl">
                    Revisa y acepta rápidamente los turnos solicitados a través del sitio web por los pacientes. El sistema ejecutará las automatizaciones cuando tomes una decisión.
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
                                    <div className="bg-primary/10 rounded-2xl p-4 text-center min-w-[120px] shrink-0 border border-primary/20">
                                        <p className="text-xs font-black uppercase text-accent-orange tracking-widest">{turno.fecha}</p>
                                        <p className="text-2xl font-black text-primary">{turno.hora}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-xl font-bold text-text">
                                                {turno.nombrePaciente} {turno.apellidoPaciente}
                                            </h3>
                                            <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                                                Nuevo Ingreso
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

                                {/* Botones de acción */}
                                <div className="flex items-center gap-4 xl:w-1/3 xl:justify-end border-t xl:border-t-0 border-secondary/40 pt-6 xl:pt-0">
                                    <button
                                        onClick={() => handleRechazar(turno._id)}
                                        className="flex-1 xl:flex-none justify-center px-6 py-4 rounded-xl border-2 border-red-200 text-red-600 bg-red-50 hover:bg-red-500 hover:text-white font-black uppercase text-sm tracking-wider flex items-center gap-2 transition-all"
                                    >
                                        <FaTimesCircle className="text-lg" /> Rechazar
                                    </button>
                                    <button
                                        onClick={() => handleAceptar(turno._id)}
                                        className="flex-1 xl:flex-none justify-center px-8 py-4 rounded-xl text-white bg-green-500 border-b-4 border-green-700 hover:brightness-110 active:border-b-0 active:translate-y-1 font-black uppercase text-sm tracking-wider flex items-center gap-2 transition-all shadow-lg"
                                    >
                                        <FaCheckCircle className="text-lg" /> Aprobar Turno
                                    </button>
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
