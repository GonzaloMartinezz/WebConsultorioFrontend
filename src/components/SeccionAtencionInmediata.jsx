import { Link } from 'react-router-dom';
import { Hospital, MessageCircle, Bot, Calendar } from 'lucide-react';

const SeccionAtencionInmediata = () => {
  return (
    <section className="bg-[#050505] py-32 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10" data-aos="fade-up">
        {/* Contenedor Principal Glassmorphism */}
        <div className="bg-[#111] rounded-[3rem] p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] border border-white/10 relative overflow-hidden group">
          {/* Glow Effects */}
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF7800]/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none group-hover:bg-[#FF7800]/20 transition-colors duration-1000"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
            {/* Textos y CTA */}
            <div className="w-full lg:w-5/12 space-y-8 text-center lg:text-left">
              <span className="inline-block px-5 py-2 rounded-full border border-[#FF7800]/30 bg-[#FF7800]/5 text-[#FF7800] font-black text-[10px] uppercase tracking-[0.3em] backdrop-blur-md">
                Experiencia Digital Completa
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                Tu Salud <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7800] to-orange-300">A Un Clic</span>
              </h2>
              <p className="text-lg text-white/50 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                Diseñamos esta plataforma para que gestionar tu salud bucal sea rápido y sencillo. Registrate para acceder a un ecosistema de atención clínica de vanguardia.
              </p>
              <div className="pt-4 flex justify-center lg:justify-start">
                <Link to="/login" className="group relative inline-flex items-center justify-center gap-3 bg-linear-to-r from-[#FF7800] to-orange-300 text-white font-black px-10 py-5 rounded-full uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,120,0,0.4)] hover:shadow-[0_15px_50px_rgba(255,120,0,0.6)] active:scale-95 transition-all overflow-hidden w-full sm:w-auto">
                  <span className="relative z-10">Acceder a la App</span>
                </Link>
              </div>
            </div>

            {/* Panel de Funcionalidades */}
            <div className="w-full lg:w-7/12">
              <div className="bg-black/60 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#FF7800]/50 to-transparent"></div>
                
                <h3 className="text-sm font-black text-[#FF7800] mb-10 uppercase tracking-[0.2em]">En nuestra plataforma podrás:</h3>
                
                <ul className="space-y-8">
                  <li className="flex items-start gap-6 group/item">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg text-[#FF7800] group-hover/item:border-[#FF7800]/50 group-hover/item:bg-[#FF7800]/10 transition-all duration-300">
                      <Hospital size={24} />
                    </div>
                    <div>
                      <p className="font-black text-white text-lg uppercase tracking-tight mb-1">Información Clínica</p>
                      <p className="text-white/40 text-sm font-light">Conoce todas nuestras instalaciones y tecnologías 3D.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6 group/item">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg text-[#FF7800] group-hover/item:border-[#FF7800]/50 group-hover/item:bg-[#FF7800]/10 transition-all duration-300">
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <p className="font-black text-white text-lg uppercase tracking-tight mb-1">Atención Directa</p>
                      <p className="text-white/40 text-sm font-light">Contacto directo por WhatsApp ante cualquier inquietud.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6 group/item">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg text-[#FF7800] group-hover/item:border-[#FF7800]/50 group-hover/item:bg-[#FF7800]/10 transition-all duration-300">
                      <Bot size={24} />
                    </div>
                    <div>
                      <p className="font-black text-white text-lg uppercase tracking-tight mb-1">Soporte IA 24/7</p>
                      <p className="text-white/40 text-sm font-light">Consulta a nuestro Asistente Virtual en cualquier momento.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6 group/item">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg text-[#FF7800] group-hover/item:border-[#FF7800]/50 group-hover/item:bg-[#FF7800]/10 transition-all duration-300">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="font-black text-white text-lg uppercase tracking-tight mb-1">Gestión Inteligente</p>
                      <p className="text-white/40 text-sm font-light">Reserva y administra tus turnos digitales sin demoras.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionAtencionInmediata;
