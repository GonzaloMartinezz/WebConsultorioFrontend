import { Link } from 'react-router-dom';

const SeccionExpertos = () => {
  return (
    <section className="bg-background py-32 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left" data-aos="fade-right">
            <span className="inline-block px-5 py-2.5 rounded-full bg-primary/5 text-primary font-black text-xs uppercase tracking-[0.2em] border border-primary/10">
              Excelencia en Salud Dental
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary uppercase leading-[0.95] tracking-tighter">
              Expertos <br /> en lo que <br />
              <span className="text-accent-orange">te hace bien</span>
            </h2>
            <p className="text-lg md:text-2xl text-text-light font-medium leading-relaxed opacity-70">
              Atendiendo sonrisas y cuidando la salud dental de las familias tucumanas con la mejor tecnología y calidez humana.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
              <Link to="/turnos" className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest transition-all duration-300 hover:brightness-110 hover:-translate-y-1 hover:shadow-2xl active:scale-95 shadow-xl shadow-primary/20">
                Reservar turno &rarr;
              </Link>
              <Link to="/contacto" className="w-full sm:w-auto px-12 py-5 rounded-2xl border-2 border-secondary text-primary font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-secondary/20 hover:-translate-y-1 active:scale-95">
                Asesoramiento &rarr;
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0" data-aos="fade-left">
            <div className="relative group">
              <img src="/sala de espera 1.jpeg" alt="Instalaciones C&M" className="w-full h-[400px] md:h-[550px] object-cover rounded-[3rem] shadow-2xl border-8 border-white group-hover:scale-[1.02] transition-transform duration-500" />
              <div className="absolute inset-0 rounded-[3rem] ring-1 ring-inset ring-black/10"></div>
            </div>

            {/* Tarjeta flotante interactiva */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] bg-white rounded-4xl p-6 shadow-2xl border border-secondary/20 flex items-center gap-6 animate-bounce-slow">
              <div className="bg-accent-orange p-4 rounded-2xl text-white shadow-lg shadow-accent-orange/30">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 002 2h2v4l.586-.586z" /></svg>
              </div>
              <div>
                <p className="font-black text-primary text-xl uppercase tracking-tighter leading-none">Consultas</p>
                <p className="text-accent-orange font-black text-[10px] uppercase tracking-[0.2em] mt-2">Atención al instante por WhatsApp</p>
              </div>
            </div>

            {/* Decoraciones abstractas */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-orange/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionExpertos;
