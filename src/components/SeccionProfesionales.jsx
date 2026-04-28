import React from 'react';
import { Link } from 'react-router-dom';

const SeccionProfesionales = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-background relative overflow-hidden">
      {/* Glows Decorativos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">

          {/* Lado Izquierdo: Foto y Textos */}
          <div className="w-full lg:w-1/2 relative space-y-10" data-aos="fade-right">
            <div className="space-y-4 text-center lg:text-left">
              <span className="inline-block px-5 py-2 rounded-full border border-accent-orange/20 bg-accent-orange/5 text-accent-orange font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                Nuestros Especialistas
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary uppercase leading-[0.95] tracking-tighter">
                Doctores <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-orange to-orange-400">
                  Carcara & Martínez
                </span>
              </h2>
              <p className="text-text-light text-lg font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed pt-4">
                Profesionales con amplia trayectoria, dedicados a ofrecerte diagnósticos precisos y tratamientos mínimamente invasivos con tecnología de vanguardia.
              </p>
            </div>

            <div className="relative h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group">
              <img src="/sala de espera 2.jpeg" alt="Área de consulta Carcara Martínez" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/20 to-transparent flex items-end p-8">
                <p className="text-white font-black tracking-widest uppercase text-sm">Cuidado Personalizado</p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Tarjetas de los Doctores */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6" data-aos="fade-left" data-aos-delay="200">

            {/* Dr. Adolfo */}
            <Link to="/especialistas/adolfo" className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-secondary/20 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(255,120,0,0.1)] transition-all duration-300 group flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-5xl shrink-0 border-4 border-white shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                👨‍⚕️
              </div>

              <div className="text-center sm:text-left relative z-10 flex-1">
                <p className="text-[10px] font-black text-accent-orange uppercase tracking-[0.2em] mb-2">Implantología & Cirugía</p>
                <h3 className="text-2xl md:text-3xl font-black text-primary leading-tight mb-3">Dr. Adolfo <br /> Martinez</h3>
                <p className="text-sm font-medium text-text-light mb-5 line-clamp-2">Especialista en cirugías complejas e implantes dentales con tecnología 3D.</p>
                <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-accent-orange transition-colors w-full border-t border-secondary/10 pt-4">
                  Ver Perfil Completo <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </Link>

            {/* Dra. Erina */}
            <Link to="/especialistas/erina" className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-secondary/20 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(255,120,0,0.1)] transition-all duration-300 group flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-5xl shrink-0 border-4 border-white shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                👩‍⚕️
              </div>

              <div className="text-center sm:text-left relative z-10 flex-1">
                <p className="text-[10px] font-black text-accent-orange uppercase tracking-[0.2em] mb-2">Ortodoncia & Estética</p>
                <h3 className="text-2xl md:text-3xl font-black text-primary leading-tight mb-3">Dra. Erina <br /> Carcara</h3>
                <p className="text-sm font-medium text-text-light mb-5 line-clamp-2">Especialista en transformar sonrisas con ortodoncia invisible y estética dental.</p>
                <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-accent-orange transition-colors w-full border-t border-secondary/10 pt-4">
                  Ver Perfil Completo <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
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
