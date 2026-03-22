import { useState } from 'react';
import LayoutAdmin from "../../components/layouts/LayoutAdmin.jsx";
import { FaTooth, FaTools, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const AdminOdontograma = () => {
    // Top Row (18-28)
    const topRow = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
    // Bottom Row (48-38)
    const bottomRow = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

    // Simulating treatments based on Nubidoc image
    const [statusMatch] = useState({
        18: 'extraction',
        16: 'caries',
        23: 'implant',
        28: 'extraction',
        48: 'extraction',
        47: 'extraction',
        44: 'endo',
        34: 'caries'
    });

    const ToothVisual = ({ number }) => {
        const state = statusMatch[number];
        
        return (
            <div className="flex flex-col items-center gap-1 group cursor-pointer hover:scale-110 transition-transform">
                <span className="text-[10px] font-black text-text-light group-hover:text-primary">{number}</span>
                <div className="relative w-10 h-14 flex items-center justify-center">
                    {/* Diente Base (realista usando FaTooth pero estirado como molar/incisivo) */}
                    <FaTooth className={`w-8 h-10 ${state === 'extraction' ? 'text-secondary/50' : 'text-[#f8f9fa] drop-shadow-md stroke-secondary stroke-2'}`} style={{strokeWidth: '15', stroke: '#cbd5e1'}} />
                    
                    {/* Tratamientos Overlay */}
                    {state === 'extraction' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-red-500 font-bold text-3xl select-none rotate-12">X</span>
                        </div>
                    )}
                    {state === 'caries' && (
                        <div className="absolute w-3 h-3 bg-red-500 rounded-full top-[40%] right-[30%] shadow-black/20 shadow-sm border border-white"></div>
                    )}
                    {state === 'implant' && (
                        <div className="absolute w-4 h-2 bg-text border border-white top-[45%] left-1/2 -translate-x-1/2 shadow-sm rounded-sm"></div>
                    )}
                    {state === 'endo' && (
                        <div className="absolute w-1 h-5 bg-red-500 bottom-[10%] left-1/2 -translate-x-1/2"></div>
                    )}
                </div>

                {/* Grid Clínico (5 superficies) - MUY TÍPICO DE ODONTOGRAMAS */}
                <div className="w-5 h-5 grid grid-cols-3 grid-rows-3 gap-[1px] bg-secondary p-[1px] mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white col-start-2"></div>
                    <div className="bg-white col-start-1 row-start-2"></div>
                    <div className="bg-white col-start-2 row-start-2"></div>
                    <div className="bg-white col-start-3 row-start-2"></div>
                    <div className="bg-white col-start-2 row-start-3"></div>
                </div>
            </div>
        );
    };

    return (
        <LayoutAdmin>
            <header className="mb-8" data-aos="fade-down">
                 <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-orange mb-1">Registro Médico</p>
                <h1 className="text-3xl font-black text-primary tracking-tight">Odontograma Avanzado</h1>
            </header>

            <main className="space-y-6" data-aos="fade-up">
                
                {/* Herramientas */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-secondary/50 flex flex-wrap gap-4 items-center justify-center md:justify-start">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-secondary hover:bg-secondary/20 transition-all"><FaTools/> Herramientas</button>
                    <div className="w-px h-6 bg-secondary/50 hidden md:block"></div>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded hover:bg-red-50 text-red-600"><div className="w-3 h-3 rounded-full bg-red-500"></div> Caries</button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded hover:bg-blue-50 text-blue-600"><div className="w-3 h-3 bg-blue-500"></div> Obturación</button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded hover:bg-gray-50 text-gray-700"><span className="text-red-500 font-bold text-lg">X</span> Extracción</button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded hover:bg-gray-50 text-text"><div className="w-4 h-1 bg-text"></div> Implante</button>
                    <button className="ml-auto px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md text-sm transition-all flex items-center gap-2"><FaCheck /> Guardar Estado</button>
                </div>

                {/* El Odontograma Principal */}
                <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-secondary/50 overflow-x-auto custom-scrollbar">
                    
                    <div className="min-w-[800px] flex flex-col items-center gap-12 relative">
                        {/* Líneas divisorias en el centro estilo Nubidoc */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/30"></div>
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary/30"></div>

                        {/* Top Row */}
                        <div className="flex justify-center gap-1 sm:gap-2">
                            {topRow.map((tooth) => <ToothVisual key={tooth} number={tooth} />)}
                        </div>
                        
                        {/* Bottom Row */}
                        <div className="flex justify-center gap-1 sm:gap-2">
                            {bottomRow.map((tooth) => <ToothVisual key={tooth} number={tooth} />)}
                        </div>
                    </div>

                </div>

                {/* Notas de Tratamiento Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
                    <FaExclamationTriangle className="text-blue-500 text-xl mt-1 shrink-0" />
                    <div>
                        <h4 className="text-sm font-bold text-blue-900 mb-1">Acerca de la Notación FDI</h4>
                        <p className="text-xs text-blue-800/80 leading-relaxed font-medium">Este odontograma utiliza el sistema numérico de la Federación Dental Internacional (FDI). Haz clic en la corona o raíz de cualquier pieza dental para marcar un hallazgo, o selecciona las superficies (oclusal, mesial, distal, vestibular, palatino/lingual) en el grid inferior de cada diente.</p>
                    </div>
                </div>

            </main>
        </LayoutAdmin>
    );
};

export default AdminOdontograma;
