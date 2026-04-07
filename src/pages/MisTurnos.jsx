import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import {
  FaCalendarAlt,
  FaUserMd,
  FaClock,
  FaSpinner,
  FaCalendarPlus,
  FaFilter,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaArrowLeft,
  FaLock,
} from "react-icons/fa";

// =============================================
// Configuración de estados visuales
// =============================================
const ESTADOS = {
  Todos: {
    color: "bg-primary/10 text-primary border-primary/20",
    icon: FaFilter,
  },
  Pendiente: {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700 ring-amber-300/50",
    icon: FaHourglassHalf,
    accentBorder: "border-l-amber-400",
    description: "Esperando confirmación del consultorio",
  },
  Confirmado: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700 ring-emerald-300/50",
    icon: FaCheckCircle,
    accentBorder: "border-l-emerald-500",
    description: "Tu turno está confirmado",
  },
  Cancelado: {
    color: "bg-red-50 text-red-600 border-red-200",
    badgeColor: "bg-red-100 text-red-600 ring-red-300/50",
    icon: FaTimesCircle,
    accentBorder: "border-l-red-400",
    description: "Este turno fue cancelado",
  },
};

const MisTurnos = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [error, setError] = useState("");

  // =============================================
  // Traer los turnos del paciente logueado
  // =============================================
  useEffect(() => {
    if (!user) return;

    const fetchMisTurnos = async () => {
      try {
        const respuesta = await api.get("/turnos");
        // Filtramos por nombre+apellido del paciente logueado (case-insensitive)
        const misTurnos = respuesta.data.filter(
          (t) =>
            t.nombrePaciente?.trim().toLowerCase() ===
              user.nombre?.trim().toLowerCase() &&
            t.apellidoPaciente?.trim().toLowerCase() ===
              user.apellido?.trim().toLowerCase()
        );
        // Ordenamos por fecha más reciente primero
        misTurnos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setTurnos(misTurnos);
      } catch (err) {
        console.error("Error al cargar turnos:", err);
        setError("No se pudieron cargar tus turnos. Intentá más tarde.");
      } finally {
        setCargando(false);
      }
    };

    fetchMisTurnos();

    // Polling cada 15s para actualizar estado en tiempo real
    const interval = setInterval(fetchMisTurnos, 15000);
    return () => clearInterval(interval);
  }, [user]);

  // =============================================
  // Filtrado de turnos
  // =============================================
  const turnosFiltrados =
    filtroActivo === "Todos"
      ? turnos
      : turnos.filter((t) => t.estado === filtroActivo);

  // Contadores por estado
  const contadores = {
    Todos: turnos.length,
    Pendiente: turnos.filter((t) => t.estado === "Pendiente").length,
    Confirmado: turnos.filter((t) => t.estado === "Confirmado").length,
    Cancelado: turnos.filter((t) => t.estado === "Cancelado").length,
  };

  // =============================================
  // Si no hay usuario logueado → Gate de Login
  // =============================================
  if (!user) {
    return (
      <main className="grow bg-background flex flex-col">
        <section className="bg-primary text-background pt-10 pb-20 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange relative overflow-hidden flex-1 sm:min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_left,white,transparent_50%)]"></div>
          <div className="text-center space-y-6 relative z-10 max-w-md mx-auto animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-accent-orange/20 flex items-center justify-center mx-auto">
              <FaLock className="text-3xl text-accent-orange" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Acceso <span className="text-accent-orange">Requerido</span>
            </h1>
            <p className="text-secondary/90 font-medium leading-relaxed">
              Necesitás iniciar sesión para ver tus turnos. Si aún no tenés
              cuenta, podés crearla en segundos.
            </p>
            <Link
              to="/login"
              className="inline-block bg-accent-orange text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 uppercase text-sm tracking-wide"
            >
              Iniciar Sesión / Registrarse
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // =============================================
  // RENDER PRINCIPAL
  // =============================================
  return (
    <main className="grow bg-background flex flex-col">
      <section className="bg-primary text-background pt-10 pb-12 md:pb-20 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b-8 border-accent-orange relative overflow-hidden flex-1">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]"></div>

        <div className="mx-auto max-w-5xl w-full relative z-10">
          {/* HEADER */}
          <div className="text-center mb-10 md:mb-14" data-aos="fade-down">
            <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange text-accent-orange font-bold text-xs uppercase tracking-wider shadow-sm mb-4">
              Portal del Paciente
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              Mis <span className="text-accent-orange">Turnos</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary/90 font-medium leading-relaxed max-w-2xl mx-auto mt-4">
              Seguí en tiempo real el estado de cada uno de tus turnos
              solicitados. Si necesitás hacer cambios, contactanos por WhatsApp.
            </p>
          </div>

          {/* FILTROS POR ESTADO */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {Object.entries(ESTADOS).map(([estado, config]) => {
              const Icon = config.icon;
              const activo = filtroActivo === estado;
              return (
                <button
                  key={estado}
                  onClick={() => setFiltroActivo(estado)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border-2 ${
                    activo
                      ? "bg-accent-orange text-white border-accent-orange shadow-lg scale-105"
                      : "bg-white/10 text-secondary/80 border-secondary/30 hover:border-accent-orange/50 hover:text-white"
                  }`}
                >
                  <Icon className="text-xs" />
                  {estado}
                  <span
                    className={`ml-1 text-[10px] px-2 py-0.5 rounded-full ${
                      activo
                        ? "bg-white/20 text-white"
                        : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {contadores[estado]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div data-aos="fade-up" data-aos-delay="200">
            {/* Estado: Cargando */}
            {cargando ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <FaSpinner className="text-5xl text-accent-orange animate-spin" />
                <p className="text-secondary font-bold text-sm uppercase tracking-wider">
                  Buscando tus turnos...
                </p>
              </div>
            ) : error ? (
              /* Estado: Error */
              <div className="bg-red-500/10 border border-red-400/30 rounded-3xl p-10 text-center">
                <FaTimesCircle className="text-4xl text-red-400 mx-auto mb-4" />
                <p className="text-white font-bold">{error}</p>
              </div>
            ) : turnosFiltrados.length === 0 ? (
              /* Estado: Sin turnos */
              <div className="bg-white/5 border-2 border-dashed border-secondary/30 rounded-4xl p-12 md:p-16 text-center">
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <FaCalendarAlt className="text-3xl text-secondary/50" />
                </div>
                <h2 className="text-2xl font-black text-white mb-3">
                  {filtroActivo === "Todos"
                    ? "Aún no tenés turnos"
                    : `No tenés turnos con estado "${filtroActivo}"`}
                </h2>
                <p className="text-secondary/80 font-medium mb-8 max-w-md mx-auto">
                  {filtroActivo === "Todos"
                    ? "Solicitá tu primer turno y gestioná tus visitas desde este panel."
                    : "Probá cambiando el filtro o solicitá un turno nuevo."}
                </p>
                <Link
                  to="/turnos"
                  className="inline-flex items-center gap-2 bg-accent-orange text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 uppercase text-sm tracking-wide"
                >
                  <FaCalendarPlus /> Solicitar un turno
                </Link>
              </div>
            ) : (
              /* Estado: Lista de turnos */
              <div className="grid grid-cols-1 gap-5">
                {turnosFiltrados.map((turno) => {
                  const estadoConfig = ESTADOS[turno.estado] || ESTADOS.Pendiente;
                  const IconEstado = estadoConfig.icon;

                  return (
                    <div
                      key={turno._id}
                      className={`bg-white rounded-3xl xl:rounded-4xl shadow-lg border-l-[6px] ${estadoConfig.accentBorder} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                    >
                      <div className="p-5 sm:p-7 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                        {/* Bloque Fecha */}
                        <div className="bg-primary/5 rounded-2xl p-4 text-center min-w-[130px] shrink-0 border border-primary/10">
                          <FaCalendarAlt className="text-accent-orange text-xl mx-auto mb-1.5 opacity-80" />
                          <p className="text-lg font-black text-primary leading-tight">
                            {turno.fecha
                              ? turno.fecha.split("-").reverse().join("/")
                              : "Sin fecha"}
                          </p>
                          <p className="text-xs font-bold text-text-light mt-1 uppercase tracking-wider">
                            {turno.hora || "Sin hora"}
                          </p>
                        </div>

                        {/* Info del turno */}
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg font-black text-primary capitalize truncate">
                              {turno.motivo || "Consulta"}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase px-3 py-1 rounded-full ring-1 ${estadoConfig.badgeColor}`}
                            >
                              <IconEstado className="text-[10px]" />
                              {turno.estado}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-light font-medium">
                            <span className="flex items-center gap-1.5">
                              <FaUserMd className="text-primary/60 text-xs" />
                              {turno.profesional || "Sin asignar"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FaClock className="text-primary/60 text-xs" />
                              {estadoConfig.description}
                            </span>
                          </div>
                        </div>

                        {/* Acción: Solicitar nuevo (si cancelado) */}
                        {turno.estado === "Cancelado" && (
                          <div className="shrink-0">
                            <Link
                              to="/turnos"
                              className="inline-flex items-center gap-2 bg-accent-orange text-white font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                            >
                              <FaCalendarPlus className="text-[10px]" />
                              Re-agendar
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* BOTÓN SOLICITAR NUEVO TURNO (siempre visible si hay turnos) */}
          {!cargando && turnos.length > 0 && (
            <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="300">
              <Link
                to="/turnos"
                className="inline-flex items-center gap-2 bg-accent-orange text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 uppercase text-sm tracking-wide"
              >
                <FaCalendarPlus /> Solicitar otro turno
              </Link>
            </div>
          )}

          {/* Enlace volver */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-secondary/70 hover:text-white transition-colors font-semibold text-sm"
            >
              <FaArrowLeft className="text-xs" /> Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MisTurnos;
