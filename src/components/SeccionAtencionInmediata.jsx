import { Link } from 'react-router-dom';

const SeccionAtencionInmediata = () => {
  return (
    <section className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10" data-aos="fade-up">
        <div className="bg-gray-100 rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-gray-200 relative overflow-hidden">
          {/* Elemento decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="w-full md:w-5/12 space-y-6 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent-orange bg-accent-orange/10 text-accent-orange font-black text-xs uppercase tracking-wider">
                Tu salud al instante
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight tracking-tight uppercase">
                ¡Bienvenido a <br />
                <span className="text-accent-orange">nuestra App!</span>
              </h2>
              <p className="text-lg text-text-light font-medium leading-relaxed">
                Diseñamos esta plataforma para que gestionar tu salud bucal sea rápido y sencillo. Para comenzar, solo necesitas registrarte con tu correo electrónico y tu nombre completo.
              </p>
              <div className="pt-4 flex justify-center md:justify-start">
                <Link to="/login" className="inline-block w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-full font-black hover:bg-accent-orange hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all uppercase tracking-widest text-center">
                  Comenzar ahora
                </Link>
              </div>
            </div>

            <div className="w-full md:w-7/12">
              <div className="bg-white/50 backdrop-blur-sm rounded-4xl p-8 border border-secondary/20 shadow-inner">
                <h3 className="text-xl font-black text-primary mb-8 uppercase tracking-tight">En nuestra plataforma podrás:</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-5">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-2xl">🏥</div>
                    <div>
                      <p className="font-black text-primary text-lg leading-tight uppercase tracking-tight">Información de excelencia</p>
                      <p className="text-text-light text-sm font-medium mt-1">Conocer toda la información sobre nuestro Centro Odontológico.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-5">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-2xl">💬</div>
                    <div>
                      <p className="font-black text-primary text-lg leading-tight uppercase tracking-tight">Atención directa</p>
                      <p className="text-text-light text-sm font-medium mt-1">Contactarnos directamente por WhatsApp ante cualquier duda.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-5">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-2xl">🤖</div>
                    <div>
                      <p className="font-black text-primary text-lg leading-tight uppercase tracking-tight">Soporte Inteligente</p>
                      <p className="text-text-light text-sm font-medium mt-1">Consultar a nuestro Asistente Virtual disponible 24/7.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-5">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-2xl">📅</div>
                    <div>
                      <p className="font-black text-primary text-lg leading-tight uppercase tracking-tight">Gestión de Turnos</p>
                      <p className="text-text-light text-sm font-medium mt-1">Solicitar tu turno de forma digital y recibir confirmación inmediata.</p>
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
