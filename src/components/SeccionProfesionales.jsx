import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const SeccionProfesionales = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-background relative overflow-hidden">
      {/* Glows Decorativos */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Encabezado Centrado */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24" data-aos="fade-up">
          <span className="inline-block px-5 py-2 rounded-full border border-accent-orange/20 bg-accent-orange/5 text-accent-orange font-black text-[10px] uppercase tracking-[0.3em] mb-5 shadow-[0_0_15px_rgba(255,120,0,0.1)]">
            Nuestros Especialistas
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary uppercase leading-[0.95] tracking-tighter mb-8">
            Doctores <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-orange to-orange-400">
              Carcara & Martínez
            </span>
          </h2>
          <p className="text-text-light text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Profesionales con amplia trayectoria, dedicados a ofrecerte diagnósticos precisos y tratamientos mínimamente invasivos con tecnología de vanguardia.
          </p>
        </div>

        {/* Contenedor Principal de Tarjetas */}
        <div className="flex flex-col gap-6">

          {/* Tarjeta Ancha Superior: Equipo Integral */}
          <div className="w-full bg-gradient-to-br from-primary to-[#3a2a1f] border border-secondary/20 shadow-xl rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center justify-center text-center relative overflow-hidden" data-aos="fade-up" data-aos-delay="100">
            {/* Glow decorativo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                Red Médica
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-2">
                Equipo Integral
              </h3>
              <p className="text-lg md:text-2xl font-medium text-accent-orange tracking-wide">
                Especialistas Asociados
              </p>
              <div className="w-24 h-[2px] bg-white/10 mx-auto mt-6"></div>
              <p className="text-sm md:text-base font-medium text-white/60 mt-6 max-w-2xl mx-auto leading-relaxed">
                Una red de expertos altamente capacitados en el cuidado general, preventivo y casos de alta complejidad colaborando para tu salud bucal.
              </p>
            </div>
          </div>

          {/* Fila Inferior: Doctores Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Tarjeta Dr. Adolfo */}
            <Link to="/especialistas/adolfo" className="group bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-700 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-[380px] relative overflow-hidden" data-aos="fade-up" data-aos-delay="200">
              
              {/* Onda de color (Background Fill) animada al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange to-orange-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-[2.5rem]"></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black text-accent-orange group-hover:text-white uppercase tracking-[0.2em] bg-orange-50 group-hover:bg-white/20 px-4 py-1.5 rounded-full border border-orange-100 group-hover:border-white/30 transition-colors duration-500">
                    Implantología & Cirugía
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary group-hover:text-white leading-none mb-4 transition-colors duration-500">
                  Dr. Adolfo Alejandro <br /> Martinez
                </h3>
                
                {/* Línea en el medio */}
                <div className="w-full h-[2px] bg-secondary/30 group-hover:bg-white/30 my-4 transition-colors duration-500"></div>
                
                <p className="text-sm font-medium text-text-light group-hover:text-white/90 line-clamp-3 leading-relaxed transition-colors duration-500">
                  Especialista en cirugías complejas e implantes dentales con tecnología 3D.
                </p>
              </div>
              
              <div className="flex items-center justify-between w-full pt-4 mt-auto relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors duration-500">
                  Ver Perfil
                </span>
                <div className="w-10 h-10 rounded-full bg-secondary/10 group-hover:bg-white flex items-center justify-center transition-colors duration-500 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  <FaArrowRight className="text-sm text-primary group-hover:text-accent-orange transition-colors duration-500" />
                </div>
              </div>
            </Link>

            {/* Tarjeta Dra. Erina */}
            <Link to="/especialistas/erina" className="group bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-700 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-[380px] relative overflow-hidden" data-aos="fade-up" data-aos-delay="300">
              
              {/* Onda de color (Background Fill) animada al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange to-orange-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-[2.5rem]"></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black text-accent-orange group-hover:text-white uppercase tracking-[0.2em] bg-orange-50 group-hover:bg-white/20 px-4 py-1.5 rounded-full border border-orange-100 group-hover:border-white/30 transition-colors duration-500">
                    Ortodoncia & Estética
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary group-hover:text-white leading-none mb-4 transition-colors duration-500">
                  Dra. Erina <br /> Carcara
                </h3>
                
                {/* Línea en el medio */}
                <div className="w-full h-[2px] bg-secondary/30 group-hover:bg-white/30 my-4 transition-colors duration-500"></div>
                
                <p className="text-sm font-medium text-text-light group-hover:text-white/90 line-clamp-3 leading-relaxed transition-colors duration-500">
                  Especialista en transformar sonrisas con ortodoncia invisible y estética dental.
                </p>
              </div>
              
              <div className="flex items-center justify-between w-full pt-4 mt-auto relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors duration-500">
                  Ver Perfil
                </span>
                <div className="w-10 h-10 rounded-full bg-secondary/10 group-hover:bg-white flex items-center justify-center transition-colors duration-500 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  <FaArrowRight className="text-sm text-primary group-hover:text-accent-orange transition-colors duration-500" />
                </div>
              </div>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SeccionProfesionales;
