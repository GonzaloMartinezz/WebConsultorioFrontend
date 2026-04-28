import React, { useState } from 'react';
import { FaSave, FaTimes, FaUndo } from 'react-icons/fa';

const topAdult = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const topChild = [null, null, null, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, null, null, null];
const bottomAdult = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
const bottomChild = [null, null, null, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75, null, null, null];

const ESTADOS = {
  sano: { color: '#10b981', border: '#059669', label: 'Sano', bgClass: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-400' },
  caries: { color: '#ef4444', border: '#b91c1c', label: 'Caries', bgClass: 'bg-red-50 text-red-700 hover:bg-red-100 border-red-500' },
  obturacion: { color: '#3b82f6', border: '#1d4ed8', label: 'Obturación', bgClass: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-500' },
  endodoncia: { color: '#8b5cf6', border: '#6d28d9', label: 'Endodoncia', bgClass: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-500' },
  implante: { color: '#f97316', border: '#c2410c', label: 'Implante', bgClass: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-500' },
  ausente: { isAusente: true, color: '#94a3b8', border: '#64748b', label: 'Ausente', bgClass: 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-400' }
};

const getAnatomicalType = (num) => {
  if (!num) return null;
  const d = num % 10;
  if (d === 1 || d === 2) return 'incisor';
  if (d === 3) return 'canine';
  if (d === 4 || d === 5) return 'premolar';
  return 'molar';
};

const SVGTooth = ({ type, position, color }) => {
  const isBottom = position === 'bottom';
  const rotation = isBottom ? 'rotate(180deg)' : 'none';
  const strokeColor = "#c5bba7";
  const strokeCrown = color ? color : "#b8b8b8";
  const fillCrown = color ? color : "url(#crownPearlGradient)";

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="rootBoneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f4efe1" />
            <stop offset="35%" stopColor="#faf7ee" />
            <stop offset="70%" stopColor="#e3dac1" />
            <stop offset="100%" stopColor="#c8bc9c" />
          </linearGradient>
          <linearGradient id="crownPearlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fdfdfd" />
            <stop offset="90%" stopColor="#e6ebed" />
            <stop offset="100%" stopColor="#d1d6db" />
          </linearGradient>
        </defs>
      </svg>
      <svg viewBox="0 0 50 100" className="w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] drop-shadow-[0_4px_4px_rgba(0,0,0,0.12)] h-full" style={{ transform: rotation }}>
        {type === 'molar' && (
          <>
            <path d="M 12 50 C 5 20 6 5 13 4 C 18 4 20 18 21 28 C 23 15 25 4 30 4 C 36 4 38 18 38 35 C 39 15 42 4 47 6 C 50 25 42 50 40 50 Z" fill="url(#rootBoneGradient)" stroke={strokeColor} strokeWidth="1" />
            <path d="M 10 50 C 5 60 4 75 10 85 C 16 95 34 95 40 85 C 46 75 45 60 40 50 C 35 52 15 52 10 50 Z" fill={fillCrown} stroke={strokeCrown} strokeWidth="1.2" />
            <path d="M 18 85 C 22 80 28 80 32 85" fill="none" stroke={strokeCrown} strokeWidth="0.8" opacity="0.5" />
            <path d="M 25 55 L 25 78" fill="none" stroke={strokeCrown} strokeWidth="0.8" opacity="0.5" />
          </>
        )}
        {type === 'premolar' && (
          <>
            <path d="M 18 50 C 13 25 16 5 25 4 C 34 5 37 25 32 50 Z" fill="url(#rootBoneGradient)" stroke={strokeColor} strokeWidth="1" />
            <path d="M 15 50 C 8 60 12 80 18 86 C 22 92 28 92 32 86 C 38 80 42 60 35 50 C 28 53 22 53 15 50 Z" fill={fillCrown} stroke={strokeCrown} strokeWidth="1.2" />
            <path d="M 25 55 L 25 82" fill="none" stroke={strokeCrown} strokeWidth="0.8" opacity="0.3" />
          </>
        )}
        {type === 'canine' && (
          <>
            <path d="M 18 50 C 15 20 20 2 25 2 C 30 2 35 20 32 50 Z" fill="url(#rootBoneGradient)" stroke={strokeColor} strokeWidth="1" />
            <path d="M 15 50 C 10 60 18 80 25 96 C 32 80 40 60 35 50 C 30 54 20 54 15 50 Z" fill={fillCrown} stroke={strokeCrown} strokeWidth="1.2" />
          </>
        )}
        {type === 'incisor' && (
          <>
            <path d="M 16 50 C 12 25 18 4 25 4 C 32 4 38 25 34 50 Z" fill="url(#rootBoneGradient)" stroke={strokeColor} strokeWidth="1" />
            <path d="M 10 50 C 8 70 12 88 15 92 C 20 95 30 95 35 92 C 38 88 42 70 40 50 C 30 52 20 52 10 50 Z" fill={fillCrown} stroke={strokeCrown} strokeWidth="1.2" />
          </>
        )}
      </svg>
    </>
  );
};

const QuadrantWidget = ({ num, estado, onClick }) => {
  if (!num) return <div className="w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] aspect-square mx-px" />;
  const est = ESTADOS[estado] || ESTADOS.sano;
  const isAusente = est.isAusente;
  const c = isAusente ? 'white' : est.color;
  const border = isAusente ? '#b0b0b0' : est.border;
  const faceFill = c;

  return (
    <div
      className="relative w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] aspect-square mx-px md:mx-[2px] cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onClick(num)}
      title={`Pieza ${num}\nEstado: ${est.label}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        <polygon points="0,0 100,0 75,25 25,25" fill={faceFill} stroke={border} strokeWidth="2.5" className="transition-colors" />
        <polygon points="0,100 100,100 75,75 25,75" fill={faceFill} stroke={border} strokeWidth="2.5" className="transition-colors" />
        <polygon points="0,0 25,25 25,75 0,100" fill={faceFill} stroke={border} strokeWidth="2.5" className="transition-colors" />
        <polygon points="100,0 75,25 75,75 100,100" fill={faceFill} stroke={border} strokeWidth="2.5" className="transition-colors" />
        <rect x="25" y="25" width="50" height="50" fill={faceFill} stroke={border} strokeWidth="2.5" className="transition-colors" />

        {isAusente && (
          <g className="text-gray-500">
            <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

const LabelBox = ({ num, isChild, onClick }) => {
  if (!num) return <div className="w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] h-[clamp(14px,2vw,22px)] mx-px" />;

  const bgClass = isChild
    ? 'bg-white border border-gray-400 text-gray-500'
    : 'bg-primary text-white shadow-sm';

  return (
    <div className="w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] mx-px md:mx-[2px] flex items-center justify-center">
      <div
        onClick={() => onClick && onClick(num)}
        className={`w-full h-[clamp(14px,2vw,22px)] md:h-6 flex items-center justify-center rounded-[3px] text-[8px] sm:text-[10px] md:text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity ${bgClass}`}
      >
        {num}
      </div>
    </div>
  );
};

export default function NeoOdontograma({ dientes, setDientes, pacienteNombre = 'No especificado', patientId = '0000', onSave, isSaving }) {
  const [activeTooth, setActiveTooth] = useState(null);
  const [filtroArcada, setFiltroArcada] = useState('completa'); // 'superior', 'inferior', 'completa'

  const handleToothClick = (num) => {
    setActiveTooth(num); // Abre el modal
  };

  const handleApplyState = (newStateName) => {
    if (activeTooth) {
      setDientes(prev => ({
        ...prev,
        [activeTooth]: newStateName
      }));
      setActiveTooth(null);
    }
  };

  const TopCol = ({ adultNum, childNum }) => {
    if (filtroArcada === 'inferior') return null;
    return (
      <div className="flex flex-col items-center animate-fade-in">
        {/* 1. Illustration */}
        <div className="h-16 sm:h-20 md:h-24 flex items-end justify-center mb-4 md:mb-6 cursor-pointer hover:scale-110 transition-transform" onClick={() => handleToothClick(adultNum)}>
          <SVGTooth type={getAnatomicalType(adultNum)} position="top" color={ESTADOS[dientes[adultNum]]?.color} />
        </div>
        {/* 2. Adult Label */}
        <div className="mb-[2px] md:mb-1"><LabelBox num={adultNum} isChild={false} onClick={() => handleToothClick(adultNum)} /></div>
        {/* 3. Child Label */}
        <div className="mb-3 md:mb-5"><LabelBox num={childNum} isChild={true} onClick={() => childNum && handleToothClick(childNum)} /></div>
        {/* 4. Quadrant */}
        <div className="flex flex-col gap-[2px] items-center justify-center w-full relative">
          <QuadrantWidget num={adultNum} estado={dientes[childNum] || dientes[adultNum]} onClick={handleToothClick} />
        </div>
      </div>
    );
  };

  const BottomCol = ({ adultNum, childNum }) => {
    if (filtroArcada === 'superior') return null;
    return (
      <div className="flex flex-col items-center animate-fade-in-up">
        {/* 1. Quadrant */}
        <div className="flex flex-col gap-[2px] items-center justify-center w-full mb-3 md:mb-5 relative">
          <QuadrantWidget num={adultNum} estado={dientes[childNum] || dientes[adultNum]} onClick={handleToothClick} />
        </div>
        {/* 2. Adult Label */}
        <div className="mb-[2px] md:mb-1"><LabelBox num={adultNum} isChild={false} onClick={() => handleToothClick(adultNum)} /></div>
        {/* 3. Child Label */}
        <div className="mb-4 md:mb-6"><LabelBox num={childNum} isChild={true} onClick={() => childNum && handleToothClick(childNum)} /></div>
        {/* 4. Illustration */}
        <div className="h-16 sm:h-20 md:h-24 flex items-start justify-center cursor-pointer hover:scale-110 transition-transform" onClick={() => handleToothClick(adultNum)}>
          <SVGTooth type={getAnatomicalType(adultNum)} position="bottom" color={ESTADOS[dientes[adultNum]]?.color} />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 md:p-10 max-w-[1300px] mx-auto w-full font-sans relative rounded-4xl shadow-2xl border border-secondary/10">

      {/* Modal de Selección */}
      {activeTooth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-[0_30px_100px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300 relative border border-secondary/10">
            <button
              onClick={() => setActiveTooth(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-background flex items-center justify-center text-text-light hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
            >
              <FaTimes />
            </button>
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange">Diagnóstico Pieza</span>
              <h3 className="text-4xl font-black text-primary mb-1">#{activeTooth}</h3>
              <div className="w-12 h-1 bg-accent-orange rounded-full"></div>
            </div>

            <div className="flex flex-col gap-3">
              {Object.entries(ESTADOS).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleApplyState(key)}
                  className={`group flex items-center justify-between p-5 rounded-3xl border-2 border-transparent transition-all active:scale-[0.98] ${data.bgClass}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border-2 shadow-sm group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: data.isAusente ? '#94a3b8' : data.color, borderColor: data.border }}></div>
                    <span className="text-xs font-black uppercase tracking-widest">{data.label}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEYENDA SUPERIOR (Estática) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light/50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-orange"></span> Referencias de Color
          </h3>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(ESTADOS).map(([key, data]) => (
            <div key={key} className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-xl border border-secondary/5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.isAusente ? '#94a3b8' : data.color }}></div>
              <span className="text-[9px] font-bold text-primary uppercase tracking-wider">{data.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-100">
        <h2 className="text-primary tracking-tight text-xl font-black italic">
          ODONTOGRAMA <span className="text-accent-orange">V4.0</span> • PACIENTE: <span className="uppercase text-primary/70">{pacienteNombre}</span>
        </h2>
        <div className="px-5 py-2 bg-secondary/10 rounded-full text-[10px] font-black text-secondary tracking-widest uppercase">
          ID FICHA: #{patientId}
        </div>
      </div>

      {/* Container Principal */}
      <div className="w-full flex flex-col items-center select-none gap-6 sm:gap-12 mb-10 overflow-x-auto pb-6">

        {/* Arcada Superior */}
        <div className={`flex justify-center xl:justify-between w-full transition-all duration-500 ${filtroArcada === 'inferior' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          {topAdult.map((adultNum, i) => (
            <TopCol key={`top-${i}`} adultNum={adultNum} childNum={topChild[i]} />
          ))}
        </div>

        {/* Separación Central */}
        <div className={`flex items-center justify-center w-full gap-4 ${filtroArcada !== 'completa' ? 'hidden' : ''}`}>
          <div className="h-[2px] flex-1 bg-linear-to-r from-transparent via-secondary/20 to-transparent"></div>
          <span className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.5em]">Línea de Oclusión</span>
          <div className="h-[2px] flex-1 bg-linear-to-r from-secondary/20 via-secondary/20 to-transparent"></div>
        </div>

        {/* Arcada Inferior */}
        <div className={`flex justify-center xl:justify-between w-full transition-all duration-500 ${filtroArcada === 'superior' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          {bottomAdult.map((adultNum, i) => (
            <BottomCol key={`bottom-${i}`} adultNum={adultNum} childNum={bottomChild[i]} />
          ))}
        </div>

      </div>

      {/* Footer Buttons matched to image */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 pt-8 gap-6">

        {/* Middle: Arcada buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center w-full sm:w-auto bg-background/50 p-2 rounded-[1.25rem] border border-secondary/10">
          <button
            onClick={() => setFiltroArcada('superior')}
            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${filtroArcada === 'superior' ? 'bg-primary text-white shadow-lg' : 'text-text-light hover:bg-white hover:text-primary'}`}
          >
            Arcada superior
          </button>
          <button
            onClick={() => setFiltroArcada('inferior')}
            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${filtroArcada === 'inferior' ? 'bg-primary text-white shadow-lg' : 'text-text-light hover:bg-white hover:text-primary'}`}
          >
            Arcada inferior
          </button>
          <button
            onClick={() => setFiltroArcada('completa')}
            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${filtroArcada === 'completa' ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/30' : 'text-text-light hover:bg-white hover:text-primary'}`}
          >
            Arcada completa
          </button>
        </div>

        {/* Right: Acciones / Save */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => setDientes({})}
            className="w-full sm:w-auto justify-center px-6 py-4 border-2 border-red-100 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all flex items-center gap-2"
          >
            <FaUndo className="text-xs" /> Reiniciar
          </button>

          {onSave && (
            <button
              onClick={onSave}
              disabled={isSaving}
              className="w-full sm:w-auto justify-center px-10 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-50 group active:scale-95"
            >
              <FaSave className={`text-lg transition-transform group-hover:scale-125 ${isSaving ? 'animate-pulse' : ''}`} />
              {isSaving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
