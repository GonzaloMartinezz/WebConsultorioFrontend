import { Link } from 'react-router-dom';

const BannerPlanes = () => {
  return (
    <section className="relative bg-background overflow-hidden border-b border-secondary/50">
      {/* Fondo decorativo sutil (círculo beige de fondo) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-secondary opacity-40 blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24 flex flex-col md:flex-row items-center gap-12">
        
        {/* COLUMNA IZQUIERDA: Textos y Botones */}
        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-secondary text-primary font-bold text-sm md:text-base mb-6 tracking-wide shadow-sm border border-primary/10">
            Atención Odontológica Integral
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
            Cuidamos tu salud dental con <span className="text-accent-orange">profesionalismo y calidez</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-light mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            En Carcara • Martínez, te ofrecemos tratamientos de primer nivel en un ambiente cómodo y relajado. Reserva tu turno online de forma rápida y sin complicaciones.
          </p>
          
          {/* Botones de Acción (Grandes y accesibles para celulares) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            {/* Botón principal de acción con naranja de marca */}
            <Link 
              to="/turnos" 
              className="w-full sm:w-auto text-center px-8 py-4 text-lg font-bold rounded-xl bg-accent-orange text-text shadow-md hover:brightness-110 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Solicitar Turno
            </Link>
            <Link 
              to="/acerca" 
              className="w-full sm:w-auto text-center px-8 py-4 text-lg font-bold rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              Conocer el Centro
            </Link>
          </div>

          {/* Indicadores de Confianza - Usaremos el ocre de las sillas para calidez */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-text-light text-base font-semibold">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Profesionales Especializados
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Atención Personalizada
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Imagen del Consultorio */}
        <div className="flex-1 w-full max-w-md md:max-w-full relative z-10 mt-8 md:mt-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Instalaciones del Consultorio Odontológico" 
              className="w-full h-100 object-cover rounded-xl"
            />
          </div>
          
          {/* Tarjeta flotante (Social Proof) - Icono de marca */}
          <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-background p-4 rounded-xl shadow-xl border border-secondary flex items-center gap-4">
            <div className="bg-secondary p-3 rounded-full text-accent-orange">
              <svg xmlns="/public/IMG_9166.jpeg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-text font-extrabold text-lg leading-tight">Turnos Rápidos</p>
              <p className="text-text-light font-medium">Sin largas esperas</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BannerPlanes;