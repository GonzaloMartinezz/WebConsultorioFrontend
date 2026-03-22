import { useState } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaCheckCircle, FaTimesCircle, FaWhatsapp, FaInfoCircle } from 'react-icons/fa';

const AdminTurnosPendientes = () => {
    // Sistema Nativo de Notificaciones (TOASTS)
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const showToast = (message, type = 'success') => {
      setToast({ show: true, message, type });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
    };

    const [pendientes, setPendientes] = useState([
        { id: 101, fecha: "15 Mar", hora: "09:00", paciente: "Nuevo Paciente - Jose Paz", profesional: "Dra. Erina Carcara", telefono: "381 555-4444", creadoHace: "2 mins" },
        { id: 102, fecha: "15 Mar", hora: "16:30", paciente: "Lucía Fernandez", profesional: "Dr. Adolfo Martínez", telefono: "381 666-2222", creadoHace: "1 hora" },
        { id: 103, fecha: "16 Mar", hora: "11:00", paciente: "Emilio Gomez", profesional: "Dra. Erina Carcara", telefono: "381 777-1111", creadoHace: "3 horas" },
    ]);

    const handleAceptar = (id) => {
        setPendientes(p => p.filter(t => t.id !== id));
        showToast(`Turno agendado en el calendario. Mensaje automático de WhatsApp enviado al paciente con la confirmación.`, 'success');
    };

    const handleRechazar = (id) => {
        setPendientes(p => p.filter(t => t.id !== id));
        showToast(`Turno rechazado. El paciente recibirá un email pidiendo que se comunique para reprogramar.`, 'error');
    };

    return (
        <LayoutAdmin>
            {/* ALERTAS */}
            {toast.show && (
                <div className={`fixed top-10 right-10 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold animate-fade-in text-white tracking-wide border-2 
                ${toast.type === 'success' ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400'}`}
                >
                {toast.type === 'success' ? <FaCheckCircle className="text-2xl" /> : <FaTimesCircle className="text-2xl" />}
                {toast.message}
                </div>
            )}

            <header className="mb-10" data-aos="fade-down">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1 flex items-center gap-2"><FaInfoCircle /> Acción Inmediata Requerida</p>
                <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">
                    Auditoría de Turnos Entrantes
                </h1>
                <p className="text-text-light font-medium mt-3 max-w-2xl">Revisa y acepta rápidamente los turnos solicitados a través del sitio web por los pacientes. El sistema ejecutará las automatizaciones (WhatsApp y Email) cuando tomes una decisión.</p>
            </header>

            <main className="space-y-6" data-aos="fade-up">
                {pendientes.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-secondary shadow-sm">
                        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4 opacity-50" />
                        <h2 className="text-2xl font-black text-primary">Bandeja de Entrada Limpia</h2>
                        <p className="text-text-light font-medium mt-2">Has procesado todas las solicitudes de turno pendientes.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {pendientes.map((turno) => (
                            <div key={turno.id} className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-md border-l-8 border-accent-orange flex flex-col xl:flex-row xl:items-center justify-between gap-8 hover:-translate-y-1 transition-transform cursor-pointer">
                                
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 xl:w-2/3">
                                    <div className="bg-primary/10 rounded-2xl p-4 text-center min-w-[100px] shrink-0 border border-primary/20">
                                        <p className="text-xs font-black uppercase text-accent-orange tracking-widest">{turno.fecha}</p>
                                        <p className="text-2xl font-black text-primary">{turno.hora}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-text">{turno.paciente}</h3>
                                            <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">Nuevo Hace {turno.creadoHace}</span>
                                        </div>
                                        <p className="text-text-light font-medium">Solicita consultar con: <span className="text-primary font-bold">{turno.profesional}</span></p>
                                        <p className="text-secondary-dark font-medium flex items-center gap-2 mt-1">
                                            <FaWhatsapp className="text-green-500"/> +54 9 {turno.telefono}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 xl:w-1/3 xl:justify-end border-t xl:border-t-0 border-secondary/40 pt-6 xl:pt-0">
                                    <button onClick={() => handleRechazar(turno.id)} className="flex-1 xl:flex-none justify-center px-6 py-4 rounded-xl border-2 border-red-200 text-red-600 bg-red-50 hover:bg-red-500 hover:text-white font-black uppercase text-sm tracking-wider flex items-center gap-2 transition-all">
                                        <FaTimesCircle className="text-lg" /> Rechazar
                                    </button>
                                    <button onClick={() => handleAceptar(turno.id)} className="flex-1 xl:flex-none justify-center px-8 py-4 rounded-xl text-white bg-green-500 border-b-4 border-green-700 hover:brightness-110 active:border-b-0 active:translate-y-1 font-black uppercase text-sm tracking-wider flex items-center gap-2 transition-all shadow-lg">
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
