import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaSmile, FaCheckCircle, FaStar, FaAward, FaHeart } from 'react-icons/fa';

const AdminEncuestas = () => {
    return (
        <LayoutAdmin>
            <header className="mb-10" data-aos="fade-down">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Satisfacción del Cliente</p>
                <h1 className="text-3xl font-black text-primary tracking-tight">Resultados (NPS)</h1>
            </header>

            <main className="space-y-8" data-aos="fade-up">

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="bg-white rounded-4xl p-8 shadow-sm border border-secondary/50 flex-1 flex flex-col items-center justify-center">
                        <p className="text-sm font-bold text-text-light uppercase tracking-wider mb-2">Encuestas Enviadas</p>
                        <p className="text-6xl font-black text-primary">38</p>
                    </div>
                    <div className="bg-white rounded-4xl p-8 shadow-sm border border-secondary/50 flex-1 flex flex-col items-center justify-center">
                        <p className="text-sm font-bold text-text-light uppercase tracking-wider mb-2">Encuestas Respondidas</p>
                        <p className="text-6xl font-black text-accent-orange">29</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Ring 1 */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/50 flex flex-col items-center justify-between text-center group cursor-pointer hover:border-[#82a5c0] hover:-translate-y-1 transition-all">
                        <h4 className="text-sm font-bold text-text-light min-h-[40px] flex items-center justify-center">Área y Ambiente</h4>
                        <div className="my-6 relative w-24 h-24 rounded-full bg-[conic-gradient(#82a5c0_0deg_320deg,#e2e8f0_320deg_360deg)] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="font-black text-[#82a5c0] text-xl">4.88</span>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-[#82a5c0] uppercase">Ver Detalle</p>
                    </div>

                    {/* Ring 2 */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/50 flex flex-col items-center justify-between text-center group cursor-pointer hover:border-[#82a5c0] hover:-translate-y-1 transition-all">
                        <h4 className="text-sm font-bold text-text-light min-h-[40px] flex items-center justify-center">Atención</h4>
                        <div className="my-6 relative w-24 h-24 rounded-full bg-[conic-gradient(#82a5c0_0deg_350deg,#e2e8f0_350deg_360deg)] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="font-black text-[#82a5c0] text-xl">6.57</span>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-[#82a5c0] uppercase">Ver Detalle</p>
                    </div>

                    {/* Ring 3 */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/50 flex flex-col items-center justify-between text-center group cursor-pointer hover:border-[#82a5c0] hover:-translate-y-1 transition-all">
                        <h4 className="text-sm font-bold text-text-light min-h-[40px] flex items-center justify-center">Eficacia</h4>
                        <div className="my-6 relative w-24 h-24 rounded-full bg-[conic-gradient(#82a5c0_0deg_300deg,#e2e8f0_300deg_360deg)] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="font-black text-[#82a5c0] text-xl">4.88</span>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-[#82a5c0] uppercase">Ver Detalle</p>
                    </div>

                    {/* Ring 4 */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/50 flex flex-col items-center justify-between text-center group cursor-pointer hover:border-[#82a5c0] hover:-translate-y-1 transition-all">
                        <h4 className="text-sm font-bold text-text-light min-h-[40px] flex items-center justify-center">Organización</h4>
                        <div className="my-6 relative w-24 h-24 rounded-full bg-[conic-gradient(#82a5c0_0deg_360deg,#e2e8f0_360deg_360deg)] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="font-black text-[#82a5c0] text-xl">6.38</span>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-[#82a5c0] uppercase">Ver Detalle</p>
                    </div>

                    {/* Ring 5 */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/50 flex flex-col items-center justify-between text-center group cursor-pointer hover:border-[#82a5c0] hover:-translate-y-1 transition-all">
                        <h4 className="text-sm font-bold text-text-light min-h-[40px] flex items-center justify-center">Satisfacción General</h4>
                        <div className="my-6 relative w-24 h-24 rounded-full bg-[conic-gradient(#82a5c0_0deg_240deg,#e2e8f0_240deg_360deg)] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="font-black text-[#82a5c0] text-xl">3.25</span>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-[#82a5c0] uppercase">Ver Detalle</p>
                    </div>
                </div>

            </main>
        </LayoutAdmin>
    );
};

export default AdminEncuestas;
