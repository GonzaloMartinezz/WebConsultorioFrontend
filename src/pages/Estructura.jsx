import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import odontogramaMock from '../assets/odontograma-mock.png';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Microscope, Stethoscope, BrainCircuit, CalendarDays, 
  CheckCircle2, RefreshCw, Braces, ShieldCheck, Radar, Database, 
  History, Focus, Bell, Activity, LogIn 
} from 'lucide-react';

const Estructura = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#ff7a00] selection:text-[#5c2800] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-24 px-6 max-w-7xl mx-auto w-full">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1b1b] border border-[#584235]/30 mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#ff7a00] animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-widest text-[#e0c0af] uppercase">SYSTEM_STATUS: OPERATIONAL</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6"
            >
              MÁXIMA <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#ffb68b] to-[#ff7a00]">PRECISIÓN</span> <br/>DENTAL_OS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-[#e0c0af] text-lg max-w-xl mb-10 leading-relaxed"
            >
              Acceda al ecosistema centralizado de ODONTO_CORE. Ingeniería clínica de alto rendimiento diseñada para la excelencia diagnóstica y la gestión táctica de pacientes.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/turnos">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-br from-[#ffb68b] to-[#ff7a00] px-8 py-4 text-[#321200] font-black text-sm uppercase tracking-widest flex items-center gap-3 rounded shadow-lg shadow-[#ff7a00]/20">
                  COMENZAR AHORA
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              <motion.button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} whileHover={{ scale: 1.05, backgroundColor: "#353534" }} whileTap={{ scale: 0.95 }} className="bg-[#2a2a2a] px-8 py-4 text-[#e5e2e1] font-bold text-sm uppercase tracking-widest border-b border-[#584235]/40 rounded hover:text-[#ffb68b] transition-colors cursor-pointer">
                DOCUMENTACIÓN
              </motion.button>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square bg-[#2a2a2a]/40 backdrop-blur-md rounded-xl overflow-hidden relative border border-[#584235]/30 shadow-2xl">
              <img className="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="Technical medical interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj47gUHdFbBIWVRcRwkSeqgrCYyjBhOkBX9Bwg2iEtbyFwEp7rOyMGGRwhuIa0yvk98iMPCYG6yhxLkm9gfx5QpDbN3t0hhaXNsQm3AYDeQxLQpMJoVJJqquK18zOfcskGt0a9tGlOxo7SDEcuChQiOcfPWyZeY64HtDxeK-E5lEFZXWwbVT2r156Yg5ju7BEi22QCsO_vW77NpEhv7nzcnzZOlo4grbLtl9IDX-HzKRTCkhqFctbpG9RYEsAhj0KtKaS2gAEXzedm"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 p-4 bg-[#2a2a2a]/40 backdrop-blur-md border border-[#584235]/30 rounded-lg">
                <div className="flex gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#ffb68b]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#95ccff]"></span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 w-24 bg-[#e0c0af]/40 rounded"></div>
                  <div className="h-1 w-16 bg-[#e0c0af]/40 rounded"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 bg-[#353534] border border-[#584235]/30 rounded-xl shadow-2xl hidden md:block">
              <span className="text-xs font-black text-[#ff7a00] block mb-1">LATENCY</span>
              <span className="text-2xl font-mono text-[#e5e2e1]">14ms</span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <motion.div whileHover={{ y: -5 }} className="bg-[#1c1b1b] p-8 rounded-lg group transition-all duration-300 border-b-2 border-transparent hover:border-[#ff7a00]">
            <Microscope className="text-[#ff7a00] mb-6" size={36} />
            <h3 className="text-xl font-bold mb-3 tracking-tight">Información de Excelencia</h3>
            <p className="text-sm text-[#e0c0af] leading-relaxed">
              Base de datos clínica estructurada con protocolos de intervención validados y sincronización en tiempo real.
            </p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-[#1c1b1b] p-8 rounded-lg group transition-all duration-300 border-b-2 border-transparent hover:border-[#ff7a00]">
            <Stethoscope className="text-[#ff7a00] mb-6" size={36} />
            <h3 className="text-xl font-bold mb-3 tracking-tight">Atención Directa</h3>
            <p className="text-sm text-[#e0c0af] leading-relaxed">
              Canales de comunicación encriptados para una interacción médico-paciente sin intermediarios ni latencia.
            </p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-[#1c1b1b] p-8 rounded-lg group transition-all duration-300 border-b-2 border-transparent hover:border-[#ff7a00]">
            <BrainCircuit className="text-[#ff7a00] mb-6" size={36} />
            <h3 className="text-xl font-bold mb-3 tracking-tight">Soporte Inteligente</h3>
            <p className="text-sm text-[#e0c0af] leading-relaxed">
              IA asistida para la clasificación de casos y respuesta inmediata a consultas técnicas frecuentes.
            </p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-[#1c1b1b] p-8 rounded-lg group transition-all duration-300 border-b-2 border-transparent hover:border-[#ff7a00]">
            <CalendarDays className="text-[#ff7a00] mb-6" size={36} />
            <h3 className="text-xl font-bold mb-3 tracking-tight">Gestión de Turnos</h3>
            <p className="text-sm text-[#e0c0af] leading-relaxed">
              Algoritmo de optimización de agenda con recordatorios automáticos y balanceo de carga operativa.
            </p>
          </motion.div>
        </section>

        {/* --- NUEVO COMPONENTE: CLINICAL PRECISION (SaaS Tech) --- */}
        <section className="mb-24 relative bg-[#0a0a0a] rounded-3xl border border-[#584235]/30 p-8 md:p-16 overflow-hidden shadow-2xl">
          {/* Fondo técnico SaaS */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c1b1b] via-[#0a0a0a] to-[#0a0a0a] opacity-80 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff7a00]/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff7a00]/20 to-transparent"></div>
          
          {/* Grid visual del fondo */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(88,66,53,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(88,66,53,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Columna de Texto Tech */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#ff7a00]/30 bg-[#ff7a00]/5 mb-6">
                 <Radar className="text-[#ff7a00]" size={14} />
                 <span className="text-[10px] font-mono tracking-widest text-[#ffb68b] uppercase">DIAGNÓSTICO AVANZADO</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                CLINICAL <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5e2e1] to-[#795b42]">PRECISION</span>
              </h2>
              <p className="text-[#e0c0af] text-lg mb-8 leading-relaxed font-light">
                Nuestro odontograma digital SaaS de próxima generación utiliza mapeo topográfico y análisis de datos en tiempo real para visualizar el estado dental exacto con un margen de error menor al 0.01%.
              </p>
              
              <ul className="space-y-5 mb-8">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#1c1b1b] border border-[#584235]/50 flex items-center justify-center group-hover:border-[#ff7a00]/50 transition-colors">
                    <Database className="text-[#ff7a00]" size={18} />
                  </div>
                  <div>
                    <span className="text-[#e5e2e1] text-sm font-bold block mb-0.5">Mapeo Interproximal</span>
                    <span className="text-[#e0c0af] text-xs">Registro milimétrico de cada pieza.</span>
                  </div>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#1c1b1b] border border-[#584235]/50 flex items-center justify-center group-hover:border-[#ff7a00]/50 transition-colors">
                    <History className="text-[#ff7a00]" size={18} />
                  </div>
                  <div>
                    <span className="text-[#e5e2e1] text-sm font-bold block mb-0.5">Historial Inmutable</span>
                    <span className="text-[#e0c0af] text-xs">Evolución guardada de forma segura.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Interfaz Gráfica (Imagen/Odontograma interactivo) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-[#131313] rounded-2xl border border-[#584235]/40 shadow-[0_20px_60px_-15px_rgba(255,122,0,0.15)] p-2 relative group hover:-translate-y-1 transition-transform duration-500">
                
                {/* Simulated SaaS App Window Frame */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#1c1b1b] rounded-t-[14px] border-b border-[#584235]/30 mb-2">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-[#584235]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#584235]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#ff7a00] animate-pulse"></div>
                   </div>
                   <div className="text-[10px] font-mono text-[#795b42] tracking-wider">ODONTOGRAMA_VIEWER_v2.1</div>
                </div>
                
                {/* Contenedor del Odontograma */}
                <div className="relative rounded-b-xl overflow-hidden bg-[#0e0e0e] aspect-[4/3] sm:aspect-video flex items-center justify-center">
                   
                   <img src={odontogramaMock} alt="Odontograma SaaS Interface" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                   <div className="absolute inset-0 bg-[#ff7a00]/5 mix-blend-overlay"></div>
                   
                   {/* Elementos HUD Tecnológicos sobre la imagen */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-48 h-48 sm:w-64 sm:h-64 border border-[#ff7a00]/20 rounded-full animate-[spin_12s_linear_infinite] absolute"></div>
                      <div className="w-32 h-32 sm:w-40 sm:h-40 border border-dashed border-[#ffb68b]/30 rounded-full animate-[spin_18s_linear_infinite_reverse] absolute"></div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ff7a00]/10 rounded-full flex items-center justify-center backdrop-blur-md border border-[#ff7a00]/40 absolute shadow-[0_0_20px_#ff7a00]">
                         <Focus className="text-[#ffb68b]" size={36} />
                      </div>
                   </div>

                   {/* Tarjeta flotante con datos de la pieza */}
                   <div className="absolute top-6 right-6 bg-[#131313]/80 backdrop-blur-md border border-[#ff7a00]/40 rounded-xl p-4 shadow-2xl hidden sm:block">
                      <div className="text-[10px] text-[#ff7a00] font-mono tracking-widest mb-1">PIEZA SELECCIONADA: 24</div>
                      <div className="text-base font-bold text-[#e5e2e1] mb-2">Caries Oclusal</div>
                      <div className="w-full bg-[#1c1b1b] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#ffb68b] w-3/4 h-full"></div>
                      </div>
                      <div className="text-[10px] text-[#e0c0af] text-right mt-1 font-mono">SEVERIDAD 75%</div>
                   </div>
                   
                   {/* Status Indicator */}
                   <div className="absolute bottom-6 left-6 bg-[#131313]/80 backdrop-blur-md border border-[#584235]/60 rounded-xl p-3 px-4 shadow-xl flex items-center gap-3">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff7a00] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff7a00]"></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-[#e0c0af] font-mono tracking-widest">SISTEMA CORE</span>
                        <span className="text-sm font-bold text-[#e5e2e1]">SINC. ACTIVA</span>
                      </div>
                   </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="bg-[#0e0e0e] rounded-2xl overflow-hidden border border-[#584235]/20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20">
              <h2 className="text-4xl font-bold tracking-tighter mb-8 leading-tight">
                INFRAESTRUCTURA <br/>PARA EL <span className="text-[#ff7a00]">FUTURO</span>
              </h2>
              <ul className="space-y-6 mb-12">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-[#ff7a00]" size={24} />
                  <div>
                    <span className="block font-bold text-[#e5e2e1]">Arquitectura Node-Based</span>
                    <span className="text-sm text-[#e0c0af]">Escalabilidad modular para clínicas en crecimiento.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-[#ff7a00]" size={24} />
                  <div>
                    <span className="block font-bold text-[#e5e2e1]">Encriptación de Extremo a Extremo</span>
                    <span className="text-sm text-[#e0c0af]">Cumplimiento total con estándares de seguridad HIPAA/GDPR.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#ff7a00]">check_circle</span>
                  <div>
                    <span className="block font-bold text-[#e5e2e1]">Imaging Stack Integrado</span>
                    <span className="text-sm text-[#e0c0af]">Visualizador DICOM nativo de alto rendimiento.</span>
                  </div>
                </li>
              </ul>
              <div className="p-1 bg-[#2a2a2a] rounded inline-block">
                <div className="flex items-center gap-4 px-4 py-2 bg-[#131313] rounded-sm">
                  <span className="text-xs font-mono text-[#e0c0af]">terminal@core:~$</span>
                  <span className="text-xs font-mono text-[#ff7a00] animate-pulse">npm run clinical-excellence</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1c1b1b] p-2 flex items-center justify-center relative min-h-[400px]">
              <img className="w-full h-full object-cover rounded-xl shadow-inner brightness-75 mix-blend-luminosity opacity-80" alt="3D dental implant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIkx8gGexkaySGTSPgtNWqnuq5EPUCQ_-QYQZNRJ-Yl0gaAXNXKrK6wvXAbJeg5SBj1aCHWRbm8Q_MjZU0jyW3PK8a7Yb_brP3KcmZrS6MSa1nuntzlC-RLeTxpj4iohumKPykMs4kx9YVq_nOSaVo17ttjLISFdYmLoNf-ZrfiRM9mdPY6ApdeSBM_lUucg6LWE_RAxsUCrR4PV9n-QMrcYlfJ_b_JG5_TKiTsSfm1GNrXUf7h4lThOazpIBEJ4MZ7VGH_Ykr47IH"/>
              <div className="absolute inset-0 bg-[#ff7a00]/5 mix-blend-overlay border-l border-[#584235]/20"></div>
            </div>
          </div>
        </section>

        <section className="mt-32 pt-16 border-t border-[#584235]/20">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#ff7a00] font-mono text-sm tracking-widest uppercase block mb-4">EXPANSIÓN CONTINUA</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                CAPACIDADES <br className="hidden md:block" /><span className="text-[#e0c0af] font-light">EXTENDIDAS</span>
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <span className="block text-3xl font-mono font-bold text-[#e5e2e1]">99.9%</span>
                <span className="text-sm text-[#e0c0af]">Uptime</span>
              </div>
              <div className="w-px bg-[#584235]/40 h-12"></div>
              <div className="text-right">
                <span className="block text-3xl font-mono font-bold text-[#e5e2e1]">&lt;14ms</span>
                <span className="text-sm text-[#e0c0af]">Latencia</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-[#1c1b1b] to-transparent p-px rounded-2xl group cursor-pointer hover:shadow-[0_0_40px_-15px_rgba(255,122,0,0.3)] transition-all duration-500">
              <div className="bg-[#131313] h-full p-8 rounded-[15px] group-hover:bg-[#1a1919] transition-colors">
                <div className="w-12 h-12 bg-[#ff7a00]/10 rounded-xl flex items-center justify-center mb-6 border border-[#ff7a00]/20">
                  <RefreshCw className="text-[#ff7a00]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#e5e2e1]">Sincronización en la Nube</h3>
                <p className="text-sm text-[#e0c0af] leading-relaxed mb-6">
                  Respaldos automáticos distribuidos geográficamente garantizan que su información clínica nunca sufra interrupciones.
                </p>
                <motion.button whileHover={{ x: 5 }} className="text-xs font-bold uppercase tracking-wider text-[#ffb68b] group-hover:text-[#ff7a00] transition-colors flex items-center gap-1 cursor-pointer">
                  Ver especificaciones <ArrowRight size={14} />
                </motion.button>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#1c1b1b] to-transparent p-px rounded-2xl group cursor-pointer hover:shadow-[0_0_40px_-15px_rgba(255,122,0,0.3)] transition-all duration-500 relative mt-0 md:-mt-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff7a00]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-[#131313] h-full p-8 rounded-[15px] group-hover:bg-[#1a1919] transition-colors relative z-10 border-t-2 border-transparent group-hover:border-[#ff7a00] duration-500">
                <div className="w-12 h-12 bg-[#ff7a00] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_rgba(255,122,0,0.6)]">
                  <Braces className="text-[#321200]" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#e5e2e1]">Integración API</h3>
                <p className="text-sm text-[#e0c0af] leading-relaxed mb-6">
                  Conexión perfecta con laboratorios, sistemas de facturación y proveedores a través de nuestra API RESTful.
                </p>
                <div className="p-3 bg-[#0a0a0a] rounded border border-[#584235]/30">
                  <code className="text-xs font-mono text-[#ffb68b]">GET /v1/patients/sync</code>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#1c1b1b] to-transparent p-px rounded-2xl group cursor-pointer hover:shadow-[0_0_40px_-15px_rgba(255,122,0,0.3)] transition-all duration-500">
              <div className="bg-[#131313] h-full p-8 rounded-[15px] group-hover:bg-[#1a1919] transition-colors">
                <div className="w-12 h-12 bg-[#ff7a00]/10 rounded-xl flex items-center justify-center mb-6 border border-[#ff7a00]/20">
                  <ShieldCheck className="text-[#ff7a00]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#e5e2e1]">Seguridad Biométrica</h3>
                <p className="text-sm text-[#e0c0af] leading-relaxed mb-6">
                  Políticas de acceso zero-trust y validación 2FA requerida para modificaciones en planes de tratamiento críticos.
                </p>
                <motion.button whileHover={{ x: 5 }} className="text-xs font-bold uppercase tracking-wider text-[#ffb68b] group-hover:text-[#ff7a00] transition-colors flex items-center gap-1 cursor-pointer">
                  Certificaciones <ArrowRight size={14} />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* --- NUEVO COMPONENTE: BIENVENIDA APP OBSIDIAN CORE --- */}
        <section className="mt-32 relative bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#584235]/30">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#ff7a00]/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 relative z-10 flex flex-col justify-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131313] border border-[#584235]/50 w-max mb-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                 <span className="flex h-2 w-2 rounded-full bg-[#ff7a00] animate-pulse"></span>
                 <span className="text-[10px] font-bold tracking-widest text-[#ffb68b] uppercase">APP PACIENTE v3.0</span>
               </div>
               
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
                 BIENVENIDO A <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb68b] to-[#ff7a00]">OBSIDIAN_CORE</span>
               </h2>
               
               <p className="text-[#e0c0af] text-lg mb-10 leading-relaxed font-light">
                 Lleve su experiencia clínica en el bolsillo. Gestione turnos, consulte sus odotogramas interactivos y comuníquese directamente con sus especialistas sin latencia.
               </p>
               
               <div className="flex flex-wrap gap-4">
                 <Link to="/mi-perfil">
                   <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#ff7a00] text-[#321200] px-8 py-4 rounded font-bold uppercase tracking-widest text-sm hover:bg-[#ffb68b] transition-colors shadow-[0_0_30px_-5px_rgba(255,122,0,0.4)] flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center">
                     ENTRAR AL PORTAL <LogIn size={18} />
                   </motion.button>
                 </Link>
                 <Link to="/login">
                   <motion.button whileHover={{ scale: 1.05, backgroundColor: "#2a2a2a" }} whileTap={{ scale: 0.95 }} className="bg-[#131313] text-[#e5e2e1] px-8 py-4 rounded font-bold uppercase tracking-widest text-sm border border-[#584235]/50 transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center">
                     CREAR CUENTA
                   </motion.button>
                 </Link>
               </div>
            </div>
            
            <div className="relative p-12 lg:p-0 flex items-center justify-center lg:justify-end overflow-hidden">
               <div className="bg-[#131313] rounded-t-3xl rounded-b-0 lg:rounded-l-3xl lg:rounded-r-0 lg:rounded-none w-full max-w-sm h-full lg:h-auto min-h-[400px] border-t border-l border-[#584235]/30 relative z-10 p-6 shadow-2xl flex flex-col gap-4 transform rotate-0 lg:translate-x-6 lg:translate-y-6 mt-12 lg:mt-0">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[#e5e2e1] font-bold tracking-tight">Hola, Paciente</span>
                     <div className="w-10 h-10 rounded-full bg-[#1c1b1b] border border-[#584235]/30 flex items-center justify-center">
                        <Bell className="text-[#ff7a00]" size={14} />
                     </div>
                  </div>
                  
                  <div className="bg-[#1c1b1b] rounded-xl p-5 border border-[#584235]/20 shadow-inner group">
                     <span className="text-[#ff7a00] text-xs font-bold tracking-widest mb-1 block group-hover:text-[#ffb68b] transition-colors">PRÓXIMO TURNO</span>
                     <div className="text-xl text-[#e5e2e1] font-bold group-hover:text-[#ff7a00] transition-colors">14 Oct, 10:30 AM</div>
                     <div className="text-[#e0c0af] text-sm mt-1">Dr. Martín Carcará</div>
                  </div>
                  
                  <div className="bg-[#1c1b1b] rounded-xl p-5 border border-[#584235]/20 flex-grow shadow-inner relative overflow-hidden group">
                     <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                        <Activity className="text-[#ff7a00] w-24 h-24 opacity-80" />
                     </div>
                     <span className="text-[#ffb68b] text-xs font-bold tracking-widest mb-1 block group-hover:text-[#ff7a00] transition-colors">ODONTOGRAMA</span>
                     <div className="text-[#e5e2e1] text-sm font-bold">Tratamiento de conducto V2</div>
                     <div className="mt-4 flex gap-2">
                        <div className="flex-1 bg-[#131313] h-2 rounded-full overflow-hidden">
                           <div className="bg-[#ff7a00] h-full w-[70%] group-hover:shadow-[0_0_10px_#ff7a00]"></div>
                        </div>
                     </div>
                     <div className="text-[#e0c0af] text-xs mt-2 text-right">70% Completado</div>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Estructura;
