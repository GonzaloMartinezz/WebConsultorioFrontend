import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaUserCircle, FaWhatsapp, FaEnvelope, FaTags, FaStickyNote, FaExclamationTriangle, FaTrash } from 'react-icons/fa';

const AdminHistoriaClinica = () => {
    return (
        <LayoutAdmin>
            <main className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6" data-aos="fade-up">

                {/* Left Sidebar Profile */}
                <aside className="bg-white rounded-4xl p-6 shadow-sm border border-secondary/50 flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-4xl flex items-center justify-center text-blue-500 mb-4 shadow-inner">
                        <FaUserCircle className="text-6xl" />
                    </div>
                    <h2 className="text-xl font-black text-primary text-center leading-tight">Gonzalo Martínez</h2>
                    <p className="text-text-light font-bold text-sm mb-6">29 años</p>

                    <div className="flex gap-4 text-secondary-dark mb-6">
                        <FaWhatsapp className="text-2xl cursor-pointer hover:text-green-500 transition-colors" title="WhatsApp" />
                        <FaEnvelope className="text-2xl cursor-pointer hover:text-blue-500 transition-colors" title="Email" />
                    </div>

                    <div className="w-full space-y-2 mb-6">
                        <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl py-2 px-4 text-xs font-bold text-center">Deuda: $15.480</div>
                        <div className="bg-green-50 text-green-600 border border-green-200 rounded-xl py-2 px-4 text-xs font-bold text-center">Alta Proyectada: Jul 2026</div>
                    </div>

                    <div className="w-full border-t border-secondary/30 pt-4 space-y-1">
                        <button className="w-full text-left px-4 py-2 text-sm font-bold text-text-light hover:bg-secondary/20 rounded-lg">Filiación</button>
                        <button className="w-full text-left px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg shadow-md">Historia Clínica</button>
                        <button className="w-full text-left px-4 py-2 text-sm font-bold text-text-light hover:bg-secondary/20 rounded-lg">Odontograma</button>
                        <button className="w-full text-left px-4 py-2 text-sm font-bold text-text-light hover:bg-secondary/20 rounded-lg">Archivos</button>
                    </div>
                </aside>

                {/* Right Content Area */}
                <div className="space-y-6">
                    {/* Top Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Etiquetas */}
                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-secondary/50">
                            <h4 className="text-sm font-bold flex items-center gap-2 mb-4 text-text"><FaTags className="text-blue-500" /> Etiquetas</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-3 py-1 rounded-full border border-pink-200">Cordial</span>
                                <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full border border-yellow-200">Puntual</span>
                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">Ortodoncia</span>
                            </div>
                        </div>

                        {/* Notas */}
                        <div className="bg-[#fffdf0] rounded-3xl p-5 shadow-sm border border-yellow-200">
                            <h4 className="text-sm font-bold flex items-center gap-2 mb-2 text-yellow-800"><FaStickyNote className="text-yellow-500" /> Notas</h4>
                            <p className="text-xs text-yellow-900 font-medium">El paciente se adhirió al tratamiento. Muestra mejoras significativas en la higiene.</p>
                        </div>

                        {/* Alergias */}
                        <div className="bg-[#fff5f5] rounded-3xl p-5 shadow-sm border border-red-200">
                            <h4 className="text-sm font-bold flex items-center gap-2 mb-2 text-red-800"><FaExclamationTriangle className="text-red-500" /> Alergias</h4>
                            <p className="text-xs text-red-900 font-bold uppercase tracking-wider">Alérgica a los AINES</p>
                        </div>
                    </div>

                    {/* Presupuesto y Plan de Tratamiento */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

                        {/* Tabla Plan */}
                        <div className="bg-white rounded-3xl shadow-sm border border-secondary/50 overflow-hidden">
                            <div className="p-5 border-b border-secondary/50 flex justify-between items-center bg-background/50">
                                <h3 className="font-black text-primary uppercase tracking-tight">Plan de Tratamiento</h3>
                                <span className="text-xs font-bold text-accent-orange bg-accent-orange/10 px-3 py-1 rounded-lg">En Progreso</span>
                            </div>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="px-5 py-3 font-bold text-xs">N° Diente</th>
                                        <th className="px-5 py-3 font-bold text-xs">Hallazgos</th>
                                        <th className="px-5 py-3 font-bold text-xs">Nota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-secondary/30 hover:bg-secondary/10">
                                        <td className="px-5 py-4 font-black text-text text-center">45</td>
                                        <td className="px-5 py-4 font-medium text-text-light flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div> Caries mesial (nivel de dentina)
                                        </td>
                                        <td className="px-5 py-4 font-medium text-text-light flex items-center justify-between">
                                            <span>Requiere endodoncia</span> <FaTrash className="text-red-400 cursor-pointer hover:scale-110" />
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-secondary/10">
                                        <td className="px-5 py-4 font-black text-text text-center">23</td>
                                        <td className="px-5 py-4 font-medium text-text-light flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div> Caries distal
                                        </td>
                                        <td className="px-5 py-4 font-medium text-text-light flex items-center justify-between">
                                            <span>Se hará en 3 citas</span> <FaTrash className="text-red-400 cursor-pointer hover:scale-110" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Presupuesto Resumen */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/50">
                            <h3 className="font-black text-primary mb-4">Presupuesto</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm font-medium items-center">
                                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary shrink-0"></div> Profilaxis (1)</span> <span>$250</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium items-center">
                                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-primary shrink-0"></div> Blanqueamiento (1)</span> <span>$100</span>
                                </div>
                            </div>
                            <div className="border-t border-secondary/50 pt-4 space-y-2">
                                <div className="flex justify-between font-bold text-sm text-text-light"><span>Total:</span> <span>$1630.00</span></div>
                                <div className="flex justify-between font-bold text-sm text-text-light"><span>Pagado:</span> <span>$230.00</span></div>
                                <div className="flex justify-between font-black text-lg text-blue-600 pt-2 border-t border-secondary/30 mt-2"><span>Por pagar:</span> <span>$1400.00</span></div>
                            </div>
                            <button className="w-full mt-6 py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold rounded-xl shadow-md transition-colors text-sm uppercase tracking-wider">Crear Presupuesto</button>
                        </div>
                    </div>
                </div>

            </main>
        </LayoutAdmin>
    );
};

export default AdminHistoriaClinica;
