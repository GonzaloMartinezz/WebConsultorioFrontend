import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import api from '../../api/axios.js';
import {
  FaTooth, FaFolderOpen, FaUserInjured, FaChartLine,
  FaSpinner, FaArrowLeft, FaCalendarCheck, FaFileMedical,
  FaExclamationTriangle, FaCloudDownloadAlt, FaIdCard,
  FaEnvelope, FaPhone
} from 'react-icons/fa';

const AdminHistoriaClinica = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [historia, setHistoria] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // 1. Intentamos traer los datos del paciente por su ID de usuario
        //    Usamos la ruta de pacientes/auth que ya existe
        const resPacientes = await api.get('/auth/pacientes');
        const pacienteEncontrado = resPacientes.data.find(p => p._id === id);
        
        if (pacienteEncontrado) {
          setPaciente(pacienteEncontrado);
        }

        // 2. Intentamos traer la historia clínica (si el endpoint existe)
        try {
          const resHistoria = await api.get(`/historias/paciente/${id}`);
          setHistoria(resHistoria.data);
        } catch {
          // Si el endpoint de historias no existe aún, no es un error fatal
          setHistoria(null);
        }

      } catch (err) {
        console.error("Error cargando datos del paciente:", err);
        setError("No se pudo cargar la información del paciente.");
      } finally {
        setCargando(false);
      }
    };
    fetchDatos();
  }, [id]);

  // =============================================
  // ESTADO: Cargando
  // =============================================
  if (cargando) {
    return (
      <LayoutAdmin>
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <FaSpinner className="text-5xl text-accent-orange animate-spin" />
          <p className="text-text-light font-bold text-sm uppercase tracking-wider">
            Cargando expediente clínico...
          </p>
        </div>
      </LayoutAdmin>
    );
  }

  // =============================================
  // ESTADO: Error
  // =============================================
  if (error) {
    return (
      <LayoutAdmin>
        <div className="bg-red-50 border border-red-200 rounded-3xl p-12 text-center">
          <FaExclamationTriangle className="text-4xl text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-black text-red-700 mb-2">Error al cargar</h2>
          <p className="text-red-600 font-medium mb-6">{error}</p>
          <Link to="/admin/pacientes" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all text-sm uppercase">
            <FaArrowLeft /> Volver al directorio
          </Link>
        </div>
      </LayoutAdmin>
    );
  }

  // Datos del paciente (desde la BD o desde la historia)
  const nombre = paciente?.nombre || historia?.nombrePaciente || 'Paciente';
  const apellido = paciente?.apellido || historia?.apellidoPaciente || '';
  const email = paciente?.email || '';
  const telefono = paciente?.telefono || '';
  const fechaRegistro = paciente?.createdAt ? new Date(paciente.createdAt).toLocaleDateString('es-AR') : 'N/D';
  const contadorVisitas = historia?.contadorVisitas ?? 0;
  const archivos = historia?.archivos || [];

  return (
    <LayoutAdmin>
      <div className="space-y-6">

        {/* BOTÓN VOLVER */}
        <Link
          to="/admin/pacientes"
          className="inline-flex items-center gap-2 text-text-light hover:text-primary font-bold text-sm transition-colors"
        >
          <FaArrowLeft /> Volver al Directorio
        </Link>

        {/* =============================================
            CABECERA DEL EXPEDIENTE
            ============================================= */}
        <header
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-4xl shadow-md border-l-8 border-accent-orange"
          data-aos="fade-down"
        >
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-white flex items-center justify-center font-black text-2xl md:text-3xl shadow-lg shrink-0">
              {nombre?.charAt(0)?.toUpperCase() || ''}{apellido?.charAt(0)?.toUpperCase() || ''}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Expediente Clínico</p>
              <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight">
                {nombre} {apellido}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-text-light font-medium">
                {email && (
                  <span className="flex items-center gap-1.5">
                    <FaEnvelope className="text-xs text-secondary" /> {email}
                  </span>
                )}
                {telefono && (
                  <span className="flex items-center gap-1.5">
                    <FaPhone className="text-xs text-secondary" /> {telefono}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <FaIdCard className="text-xs text-secondary" /> Registro: {fechaRegistro}
                </span>
              </div>
            </div>
          </div>

          {/* Contador de visitas */}
          <div className="bg-primary/5 p-5 rounded-2xl text-center border border-primary/20 min-w-[140px] shrink-0 hover:shadow-md transition-shadow">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Total Visitas</p>
            <p className="text-4xl font-black text-accent-orange leading-none">{contadorVisitas}</p>
            <p className="text-[10px] text-text-light font-bold mt-1">registradas</p>
          </div>
        </header>

        {/* =============================================
            ACCESOS RÁPIDOS
            ============================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">

          {/* 1. ODONTOGRAMA */}
          <Link
            to={`/admin/odontograma-avanzado/${id}`}
            className="bg-white p-8 rounded-4xl shadow-md border-b-8 border-primary hover:-translate-y-2 transition-all duration-300 text-center group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <FaTooth className="text-3xl text-primary" />
            </div>
            <h3 className="font-black text-xl text-primary uppercase tracking-tight">Odontograma</h3>
            <p className="text-text-light text-sm mt-2 font-medium">Mapa dental interactivo del paciente</p>
          </Link>

          {/* 2. TURNOS DEL PACIENTE */}
          <div className="bg-white p-8 rounded-4xl shadow-md border-b-8 border-accent-orange text-center">
            <div className="w-16 h-16 rounded-full bg-accent-orange/10 flex items-center justify-center mx-auto mb-4">
              <FaCalendarCheck className="text-3xl text-accent-orange" />
            </div>
            <h3 className="font-black text-xl text-primary uppercase tracking-tight">Turnos</h3>
            <p className="text-text-light text-sm mt-2 font-medium">Historial de citas y agenda</p>
          </div>

          {/* 3. ESTADÍSTICAS */}
          <div className="bg-white p-8 rounded-4xl shadow-md border-b-8 border-emerald-500 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <FaChartLine className="text-3xl text-emerald-500" />
            </div>
            <h3 className="font-black text-xl text-primary uppercase tracking-tight">Evolución</h3>
            <p className="text-text-light text-sm mt-2 font-medium">Progreso y seguimiento clínico</p>
          </div>
        </div>

        {/* =============================================
            DOCUMENTOS Y RADIOGRAFÍAS
            ============================================= */}
        <div
          className="bg-white p-6 md:p-8 rounded-4xl shadow-md border border-secondary/40"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-secondary/30">
            <h3 className="font-black text-primary flex items-center gap-2 uppercase tracking-tight">
              <FaFolderOpen className="text-accent-orange" /> Documentos y Radiografías
            </h3>
            <button className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:brightness-110 transition-all uppercase tracking-wide shadow-sm flex items-center gap-2">
              <FaFileMedical /> Subir Archivo
            </button>
          </div>

          {archivos.length > 0 ? (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {archivos.map((archivo, index) => (
                <div
                  key={archivo.url || index}
                  className="flex items-center justify-between bg-background p-4 rounded-xl border border-secondary/20 hover:border-accent-orange/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center shrink-0">
                      <FaFileMedical className="text-accent-orange" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-text">{archivo.nombre || `Archivo ${index + 1}`}</p>
                      <p className="text-xs text-text-light">
                        {archivo.fecha ? new Date(archivo.fecha).toLocaleDateString('es-AR') : 'Sin fecha'}
                      </p>
                    </div>
                  </div>
                  <a
                    href={archivo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent-orange font-bold text-xs uppercase hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaCloudDownloadAlt /> Descargar
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-background/60 rounded-2xl p-10 text-center border-2 border-dashed border-secondary/30">
              <FaFolderOpen className="text-4xl text-secondary/40 mx-auto mb-3" />
              <p className="text-text-light font-bold text-sm">No hay archivos subidos aún.</p>
              <p className="text-text-light/70 text-xs mt-1">Podés subir radiografías, estudios y documentación clínica.</p>
            </div>
          )}
        </div>

        {/* =============================================
            INFO: ID del paciente
            ============================================= */}
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex items-center gap-3" data-aos="fade-up" data-aos-delay="200">
          <FaUserInjured className="text-primary/50 shrink-0" />
          <p className="text-xs font-bold text-primary/60">
            ID de paciente en base de datos: <span className="font-mono text-primary/80">{id}</span>
          </p>
        </div>

      </div>
    </LayoutAdmin>
  );
};

export default AdminHistoriaClinica;
