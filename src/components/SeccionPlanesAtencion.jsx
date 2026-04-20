import { Link } from 'react-router-dom';

const SeccionPlanesAtencion = () => {
    return (
        <section className="bg-secondary/10 py-24 px-4 sm:px-6 lg:px-8 w-full border-y border-secondary/20">
            <div className="mx-auto max-w-7xl">
                <div className="bg-primary rounded-[3rem] p-10 md:p-20 flex flex-col lg:flex-row items-center overflow-hidden relative shadow-2xl" data-aos="fade-up">
                    {/* Fondo decorativo */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]"></div>

                    <div className="w-full lg:w-1/2 z-10 text-center lg:text-left space-y-8">
                        <span className="inline-block px-5 py-2 rounded-full border border-accent-orange text-accent-orange font-black text-xs uppercase tracking-[0.2em]">
                            Tu salud, nuestra prioridad
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight tracking-tighter">
                            Elegí a tu <br /> <span className="text-accent-orange">Profesional</span>
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                            En simples pasos, elegí al profesional que mejor se adapta a tus necesidades y las de tu familia. Calidad médica garantizada.
                        </p>
                        <div className="pt-6">
                            <Link to="/acerca" className="inline-block w-full text-center md:w-auto bg-white text-primary px-12 py-5 rounded-full font-black text-lg transition-all duration-300 hover:bg-accent-orange hover:text-white hover:-translate-y-1 hover:shadow-2xl active:scale-95 uppercase tracking-widest">
                                Conocer equipo &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 mt-16 lg:mt-0 relative h-80 flex items-center justify-center scale-110">
                        <div className="relative z-10 flex flex-col gap-5 items-center">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white/50 px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest">Profesionales de salud</div>

                            <div className="bg-white text-primary px-10 py-5 rounded-3xl font-black text-xl shadow-2xl flex items-center gap-4 transition-transform hover:scale-105">
                                <div className="w-10 h-10 bg-accent-orange/10 rounded-full flex items-center justify-center text-2xl">👩‍⚕️</div>
                                <div className="flex flex-col">
                                    <span className="leading-none uppercase tracking-tight">Dra. Erina Carcara</span>
                                    <span className="text-[10px] text-accent-orange mt-1 uppercase tracking-widest font-black">Odontología General</span>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white/50 px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest">Especialistas</div>

                            <div className="bg-white text-primary px-10 py-5 rounded-3xl font-black text-xl shadow-2xl flex items-center gap-4 transition-transform hover:scale-105">
                                <div className="w-10 h-10 bg-accent-orange/10 rounded-full flex items-center justify-center text-2xl">👨‍⚕️</div>
                                <div className="flex flex-col">
                                    <span className="leading-none uppercase tracking-tight">Dr. Adolfo Martinez</span>
                                    <span className="text-[10px] text-accent-orange mt-1 uppercase tracking-widest font-black">Implantología & Cirugía</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SeccionPlanesAtencion;
