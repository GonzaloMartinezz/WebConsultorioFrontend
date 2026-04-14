import { Link } from 'react-router-dom';

const SeccionProfesionales = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background flex justify-center">
      <div className="w-full max-w-6xl bg-[#4A3B32] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
        
        {/* Decoración de fondo */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Columna Izquierda: Texto */}
        <div className="flex-1 space-y-6 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange/50 text-accent-orange text-xs font-bold tracking-[0.2em] uppercase">
            Tu salud, nuestra prioridad
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter">
            ELEGÍ A TU <br />
            <span className="text-accent-orange">PROFESIONAL</span>
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-md font-medium leading-relaxed">
            En simples pasos, elegí al profesional que mejor se adapta a tus necesidades y las de tu familia. Calidad médica garantizada en San Miguel de Tucumán.
          </p>
          <div className="pt-4">
            <Link to="/acerca" className="inline-block bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:bg-accent-orange hover:text-white transition-colors duration-300 shadow-lg">
              CONOCER EQUIPO &rarr;
            </Link>
          </div>
        </div>

        {/* Columna Derecha: Tarjetas de Doctores */}
        <div className="flex-1 flex flex-col gap-6 w-full max-w-md relative z-10">
          <div className="text-center md:text-right mb-2">
             <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10">
               Especialistas
             </span>
          </div>

          {/* Tarjeta Dra. Erina */}
          <div className="bg-white rounded-full p-3 pr-8 flex items-center gap-5 shadow-xl hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center shrink-0 border border-orange-100">
              <span className="text-2xl">👩‍⚕️</span>
            </div>
            <div>
              <h3 className="font-black text-primary text-lg leading-tight uppercase">Dra. Erina Carcara</h3>
              <p className="text-accent-orange text-xs font-bold tracking-widest uppercase">Ortodoncia</p>
            </div>
          </div>

          {/* Tarjeta Dr. Adolfo */}
          <div className="bg-white rounded-full p-3 pr-8 flex items-center gap-5 shadow-xl hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center shrink-0 border border-orange-100">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <div>
              <h3 className="font-black text-primary text-lg leading-tight uppercase">Dr. Adolfo Martinez</h3>
              <p className="text-accent-orange text-xs font-bold tracking-widest uppercase">Implantología & Cirugía</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SeccionProfesionales;
