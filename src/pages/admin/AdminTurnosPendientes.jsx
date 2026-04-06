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
    const [ediciones, setEdiciones] = useState({});

    const handleEditChange = (id, field, value) => {
        setEdiciones(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

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

        // Actualización en tiempo real cada 10 segundos
        const interval = setInterval(() => {
            fetchPendientes();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // ==========================================
    // ACCIONES REALES CONTRA LA BASE DE DATOS
    // ==========================================
    const handleAceptar = async (turno) => {
        const id = turno._id;
        const horaDefinitiva = ediciones[id]?.hora !== undefined ? ediciones[id].hora : turno.hora;
        const fechaDefinitiva = ediciones[id]?.fecha || turno.fecha;

        try {
            await api.patch(`/turnos/${id}/estado`, { 
                estado: 'Confirmado',
                hora: horaDefinitiva,
                fecha: fechaDefinitiva
            });
            // Lo quitamos visualmente de la lista de pendientes
            setPendientes(p => p.filter(t => t._id !== id));
            showToast('¡Turno Confirmado! Guardado en la agenda oficial.', 'success');

            // --- INTEGRACIÓN: Generar Link de Google Calendar ---
            let startTime = '090000';
            let endTime = '130000';
            if (horaDefinitiva.includes(':')) {
                // Formato exacto ej: 10:30
                const partes = horaDefinitiva.replace(/[^0-9:]/g, '').split(':');
                if (partes.length >= 2) {
                    startTime = `${partes[0].padStart(2, '0')}${partes[1].padStart(2, '0')}00`;
                    const endH = (parseInt(partes[0]) + 1).toString().padStart(2, '0');
                    endTime = `${endH}${partes[1].padStart(2, '0')}00`;
                }
            } else if (horaDefinitiva.includes('Tarde')) {
                startTime = '160000';
                endTime = '200000';
            }
            
            const fechaLimpia = fechaDefinitiva ? fechaDefinitiva.replace(/-/g, '') : '';
            const gcalLink = fechaLimpia 
                ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Turno Odontológico: ' + turno.profesional)}&dates=${fechaLimpia}T${startTime}/${fechaLimpia}T${endTime}&details=${encodeURIComponent('Consulta por: ' + turno.motivo)}`
                : '';

            // --- INTEGRACIÓN: Redirigir a WhatsApp al paciente ---
            const telefonoLimpio = turno.telefono ? turno.telefono.replace(/\D/g, '') : '';
            if (telefonoLimpio) {
                const fechaLegible = fechaDefinitiva ? fechaDefinitiva.split('-').reverse().join('/') : '';
                const mensaje = `Hola ${turno.nombrePaciente}, ¡tu turno ha sido confirmado! ✅\n\n🦷 *Profesional:* ${turno.profesional}\n📅 *Fecha:* ${fechaLegible}\n⏰ *Horario:* ${horaDefinitiva}\n\nAgendalo en tu Google Calendar para no olvidarte:\n👉 ${gcalLink}\n\n¡Te esperamos!`;
                const waUrl = `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`;
                window.open(waUrl, '_blank');
            } else {
                showToast('Advertencia: El paciente no dejó un teléfono.', 'error');
            }

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
                                    <div className="bg-primary/10 rounded-2xl p-4 text-center min-w-[160px] shrink-0 border border-primary/20 flex flex-col gap-2">
                                        <input 
                                            type="date"
                                            value={ediciones[turno._id]?.fecha || turno.fecha}
                                            onChange={(e) => handleEditChange(turno._id, 'fecha', e.target.value)}
                                            className="text-xs font-black uppercase text-accent-orange bg-transparent border-b border-primary/30 focus:border-primary outline-none focus:bg-white text-center w-full pb-1"
                                        />
                                        <select 
                                            value={ediciones[turno._id]?.hora !== undefined ? ediciones[turno._id].hora : turno.hora}
                                            onChange={(e) => handleEditChange(turno._id, 'hora', e.target.value)}
                                            className="text-lg font-black text-primary text-center bg-white rounded shadow-sm py-1.5 outline-none border border-transparent focus:border-accent-orange w-full cursor-pointer appearance-none"
                                        >
                                            {(!turno.hora || turno.hora.includes('Mañana') || turno.hora.includes('Tarde')) && <option value={turno.hora} disabled>{turno.hora}</option>}
                                            <optgroup label="Mañana">
                                                <option value="09:00">09:00</option>
                                                <option value="09:30">09:30</option>
                                                <option value="10:00">10:00</option>
                                                <option value="10:30">10:30</option>
                                                <option value="11:00">11:00</option>
                                                <option value="11:30">11:30</option>
                                                <option value="12:00">12:00</option>
                                                <option value="12:30">12:30</option>
                                                <option value="13:00">13:00</option>
                                            </optgroup>
                                            <optgroup label="Tarde">
                                                <option value="16:00">16:00</option>
                                                <option value="16:30">16:30</option>
                                                <option value="17:00">17:00</option>
                                                <option value="17:30">17:30</option>
                                                <option value="18:00">18:00</option>
                                                <option value="18:30">18:30</option>
                                                <option value="19:00">19:00</option>
                                                <option value="19:30">19:30</option>
                                                <option value="20:00">20:00</option>
                                            </optgroup>
                                        </select>
                                        <p className="text-[9px] text-text-light font-bold">ASIGNAR HORA FINAL</p>
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
                                        onClick={() => handleAceptar(turno)}
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
