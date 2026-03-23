import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaChartBar, FaFileInvoiceDollar, FaUsers } from 'react-icons/fa';

const AdminFinanzas = () => {
    return (
        <LayoutAdmin>
            <header className="mb-8" data-aos="fade-down">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Rendimiento Financiero</p>
                <h1 className="text-3xl font-black text-primary tracking-tight flex items-center gap-3">
                    <FaFileInvoiceDollar /> Ingresos vs Gastos
                </h1>
            </header>

            <main className="space-y-6" data-aos="fade-up">

                {/* Top Row: Two Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Nuevos Pacientes 2026 */}
                    <div className="bg-white rounded-4xl p-8 shadow-sm border border-secondary/50">
                        <h3 className="text-lg font-black text-primary mb-6 flex items-center gap-2"><FaUsers className="text-accent-orange" /> Nuevos Pacientes 2026</h3>
                        <div className="flex items-end gap-2 h-40 border-b border-secondary/50 pb-2">
                            {[10, 5, 2, 4, 3, 50, 15, 6].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="w-full max-w-[20px] bg-[#9b87f5] rounded-t-sm transition-all group-hover:brightness-110 relative" style={{ height: `${h}%` }}>
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100">{h * 5}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-text-light uppercase px-2">
                            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span>
                        </div>
                    </div>

                    {/* Ingresos por Profesional */}
                    <div className="bg-white rounded-4xl p-8 shadow-sm border border-secondary/50 flex flex-col">
                        <h3 className="text-lg font-black text-primary mb-6">Ingresos por Profesional</h3>
                        <div className="flex-1 flex items-center justify-between gap-6">
                            <div className="w-40 h-40 rounded-full bg-[conic-gradient(#5b21b6_0deg_180deg,#8b5cf6_180deg_270deg,#c4b5fd_270deg_360deg)] shadow-inner hover:scale-105 transition-transform"></div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between text-xs font-bold"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#5b21b6]"></div> Dr. Adolfo</div> <span>50%</span></div>
                                <div className="flex items-center justify-between text-xs font-bold"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#8b5cf6]"></div> Dra. Erina</div> <span>25%</span></div>
                                <div className="flex items-center justify-between text-xs font-bold"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#c4b5fd]"></div> Otros</div> <span>25%</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Big Bar Chart */}
                <div className="bg-white rounded-4xl p-8 shadow-sm border border-secondary/50">
                    <h3 className="text-xl font-black text-primary mb-8 flex items-center gap-2"><FaChartBar className="text-accent-orange" /> Ingresos vs Gastos 2026</h3>
                    <div className="flex items-end justify-between h-64 border-b border-secondary/50 pb-2 gap-4">
                        {[
                            { i: 30, g: 5 }, { i: 45, g: 8 }, { i: 20, g: 15 }, { i: 10, g: 8 },
                            { i: 80, g: 10 }, { i: 60, g: 8 }, { i: 70, g: 12 }, { i: 40, g: 9 }
                        ].map((month, i) => (
                            <div key={i} className="flex-1 flex items-end justify-center gap-1 group">
                                <div className="w-full max-w-[24px] bg-[#8b5cf6] rounded-t-md hover:brightness-110 transition-all relative" style={{ height: `${month.i}%` }}>
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded shadow-sm z-10">${month.i}k</div>
                                </div>
                                <div className="w-full max-w-[24px] bg-[#2e1065] rounded-t-md hover:brightness-110 transition-all" style={{ height: `${month.g}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs font-bold text-text-light uppercase px-6">
                        <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span>
                    </div>
                </div>

            </main>
        </LayoutAdmin>
    );
};

export default AdminFinanzas;
