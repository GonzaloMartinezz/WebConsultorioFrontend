import { Link } from 'react-router-dom';

const Estructura = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#ff7a00] selection:text-[#5c2800]">
      <main className="min-h-screen pt-24 pb-24 px-6 max-w-7xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1b1b] border border-[#584235]/30 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#ff7a00] animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-widest text-[#e0c0af] uppercase">SYSTEM_STATUS: OPERATIONAL</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              MÁXIMA <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#ffb68b] to-[#ff7a00]">PRECISIÓN</span> <br/>DENTAL_OS
            </h1>
            <p className="text-[#e0c0af] text-lg max-w-xl mb-10 leading-relaxed">
              Acceda al ecosistema centralizado de ODONTO_CORE. Ingeniería clínica de alto rendimiento diseñada para la excelencia diagnóstica y la gestión táctica de pacientes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/turnos" className="bg-gradient-to-br from-[#ffb68b] to-[#ff7a00] px-8 py-4 text-[#321200] font-black text-sm uppercase tracking-widest flex items-center gap-3 rounded hover:opacity-90 transition-opacity active:scale-95 duration-150">
                COMENZAR AHORA
                <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </Link>
              <button className="bg-[#2a2a2a] px-8 py-4 text-[#e5e2e1] font-bold text-sm uppercase tracking-widest border-b border-[#584235]/40 hover:bg-[#353534] transition-colors rounded">
                DOCUMENTACIÓN
              </button>
            </div>
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
          <div className="bg-[#1c1b1b] p-8 rounded-lg group hover:bg-[#201f1f] transition-all duration-300 border-b-2 border-transparent hover:border-[#ff7a00]">
            <span className="material-symbols-outlined text-[#ff7a00] text-4xl mb-6 block">biotech</span>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Información de Excelencia</h3>
            <p className="text-sm text-[#e0c0af] leading-relaxed">
              Base de datos clínica estructurada con protocolos de intervención validados y sincronización en tiempo real.
            </p>
          </div>
          <div className="bg-[#1c1b1b] p-8 rounded-lg group hover:bg-[#201f1f] transition-all duration-300 border-b-2 border-transparent hover:border-[#ff7a00]">
            <span className="material-symbols-outlined text-[#ff7a00] text-4xl mb-6 block">medical_services</span>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Atención Directa</h3>
            <p className="text-sm text-[#e0c0af] leading-relaxed">
              Canales de comunicación encriptados para una interacción médico-paciente sin intermediarios ni latencia.
            </p>
          </div>
          <div className="bg-[#1c1b1b] p-8 rounded-lg group hover:bg-[#201f1f] transition-all duration-300 border-b-2 border-transparent hover:border-[#ff7a00]">
            <span className="material-symbols-outlined text-[#ff7a00] text-4xl mb-6 block">psychology</span>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Soporte Inteligente</h3>
            <p className="text-sm text-[#e0c0af] leading-relaxed">
              IA asistida para la clasificación de casos y respuesta inmediata a consultas técnicas frecuentes.
            </p>
          </div>
          <div className="bg-[#1c1b1b] p-8 rounded-lg group hover:bg-[#201f1f] transition-all duration-300 border-b-2 border-transparent hover:border-[#ff7a00]">
            <span className="material-symbols-outlined text-[#ff7a00] text-4xl mb-6 block">calendar_today</span>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Gestión de Turnos</h3>
            <p className="text-sm text-[#e0c0af] leading-relaxed">
              Algoritmo de optimización de agenda con recordatorios automáticos y balanceo de carga operativa.
            </p>
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
                  <span className="material-symbols-outlined text-[#ff7a00]">check_circle</span>
                  <div>
                    <span className="block font-bold text-[#e5e2e1]">Arquitectura Node-Based</span>
                    <span className="text-sm text-[#e0c0af]">Escalabilidad modular para clínicas en crecimiento.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#ff7a00]">check_circle</span>
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
      </main>
    </div>
  );
};

export default Estructura;
