import { Link } from 'react-router-dom';

const BannerPlanes = () => {
  return (
    <>
      {/* SECCIÓN DE TEXTO (Más compacta y fina) */}
      <section className="bg-linear-to-b from-accent-orange/10 via-background to-background py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t-8 border-accent-orange text-center flex flex-col items-center relative overflow-hidden">

        {/* Decoraciones ajustadas */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10" data-aos="fade-up">
          <span className="inline-block py-2 px-6 rounded-full bg-accent-orange/10 text-accent-orange font-bold text-[10px] md:text-xs mb-6 tracking-widest uppercase border border-accent-orange/20 shadow-sm">
            Excelencia en Odontología
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight mb-6 tracking-tight uppercase">
            Cuidamos tu salud <br className="hidden md:block" />
            con <span className="text-accent-orange">profesionalismo</span>
          </h1>

          <p className="text-base md:text-lg text-text-light mb-10 leading-relaxed font-medium max-w-2xl mx-auto opacity-90">
            Te ofrecemos tratamientos de primer nivel en un ambiente cómodo y relajado. Atendemos cada detalle para que tu experiencia sea única.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link to="/turnos" className="w-full sm:w-auto text-center px-8 py-3 text-white font-bold text-sm md:text-base rounded-xl bg-accent-orange shadow-lg shadow-accent-orange/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 uppercase tracking-wider">
              Solicitar Turno
            </Link>
            <Link to="/acerca" className="w-full sm:w-auto text-center px-8 py-3 text-primary font-bold text-sm md:text-base rounded-xl border-2 border-secondary/30 hover:bg-secondary/10 transition-all active:scale-95 uppercase tracking-wider bg-white/50 backdrop-blur-sm">
              Nuestro Centro
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN CHECKLIST (Sin cambios funcionales, solo márgenes ajustados) */}
      <section className="pb-16 px-4 sm:px-6 lg:px-10 bg-background">
        <div className="mx-auto max-w-6xl border-t border-secondary/20 pt-12">
          <p className="text-center text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-10">¿Por qué elegirnos?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-5 text-text-light text-sm md:text-base font-bold mx-auto max-w-4xl">
            {/* Iconos del Checklist */}
            <div className="flex items-center gap-3"><div className="bg-accent-orange/10 p-2.5 rounded-full text-accent-orange"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div><span>Profesionales Especializados</span></div>
            <div className="flex items-center gap-3"><div className="bg-accent-orange/10 p-2.5 rounded-full text-accent-orange"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div><span>Atención Personalizada</span></div>
            <div className="flex items-center gap-3"><div className="bg-accent-orange/10 p-2.5 rounded-full text-accent-orange"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div><span>Máquinas de última generación</span></div>
            <div className="flex items-center gap-3"><div className="bg-accent-orange/10 p-2.5 rounded-full text-accent-orange"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div><span>Resultados Garantizados</span></div>
            <div className="flex items-center gap-3"><div className="bg-accent-orange/10 p-2.5 rounded-full text-accent-orange"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div><span>Turnos Rápidos y Sin Esperas</span></div>
            <div className="flex items-center gap-3"><div className="bg-accent-orange/10 p-2.5 rounded-full text-accent-orange"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div><span>Tratamientos por especialistas</span></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerPlanes;
