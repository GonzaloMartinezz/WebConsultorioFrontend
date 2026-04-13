import React, { useState } from 'react';
import { FaSave, FaTimes, FaUndo } from 'react-icons/fa';

const topAdult = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const topChild = [null, null, null, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, null, null, null];
const bottomAdult = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
const bottomChild = [null, null, null, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75, null, null, null];

const ESTADOS = {
  sano: { color: 'white', border: '#a0a0a0', label: 'Sano', bgClass: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-400' },
  caries: { color: '#ef4444', border: '#b91c1c', label: 'Caries', bgClass: 'bg-red-50 text-red-700 hover:bg-red-100 border-red-500' },
  obturacion: { color: '#3b82f6', border: '#1d4ed8', label: 'Obturación', bgClass: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-500' },
  endodoncia: { color: '#8b5cf6', border: '#6d28d9', label: 'Endodoncia', bgClass: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-500' },
  implante: { color: '#10b981', border: '#047857', label: 'Implante', bgClass: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-500' },
  ausente: { isAusente: true, label: 'Ausente', bgClass: 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-400' }
};

const getAnatomicalType = (num) => {
  if (!num) return null;
  const d = num % 10;
  if (d === 1 || d === 2) return 'incisor';
  if (d === 3) return 'canine';
  if (d === 4 || d === 5) return 'premolar';
  return 'molar';
};

const SVGTooth = ({ type, position }) => {
  const isBottom = position === 'bottom';
  const rotation = isBottom ? 'rotate(180deg)' : 'none';
  const strokeColor = "#c5bba7";
  const strokeCrown = "#b8b8b8";

  return (
    <>
      <svg width="0" height="0">
        <defs>
          {/* Gradiente realista del archivo JPG (Hueso/Crema suave) */}
          <linearGradient id="rootBoneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f4efe1" />
            <stop offset="35%" stopColor="#faf7ee" />
            <stop offset="70%" stopColor="#e3dac1" />
            <stop offset="100%" stopColor="#c8bc9c" />
          </linearGradient>
          {/* Gradiente de corona limpio (Blanco Perlado) */}
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
            <path d="M 10 50 C 5 60 4 75 10 85 C 16 95 34 95 40 85 C 46 75 45 60 40 50 C 35 52 15 52 10 50 Z" fill="url(#crownPearlGradient)" stroke={strokeCrown} strokeWidth="1.2" />
            <path d="M 18 85 C 22 80 28 80 32 85" fill="none" stroke={strokeCrown} strokeWidth="0.8" opacity="0.5"/>
            <path d="M 25 55 L 25 78" fill="none" stroke={strokeCrown} strokeWidth="0.8" opacity="0.5"/>
          </>
        )}
        {type === 'premolar' && (
          <>
            <path d="M 18 50 C 13 25 16 5 25 4 C 34 5 37 25 32 50 Z" fill="url(#rootBoneGradient)" stroke={strokeColor} strokeWidth="1" />
            <path d="M 15 50 C 8 60 12 80 18 86 C 22 92 28 92 32 86 C 38 80 42 60 35 50 C 28 53 22 53 15 50 Z" fill="url(#crownPearlGradient)" stroke={strokeCrown} strokeWidth="1.2" />
            <path d="M 25 55 L 25 82" fill="none" stroke={strokeCrown} strokeWidth="0.8" opacity="0.3" />
          </>
        )}
        {type === 'canine' && (
          <>
            <path d="M 18 50 C 15 20 20 2 25 2 C 30 2 35 20 32 50 Z" fill="url(#rootBoneGradient)" stroke={strokeColor} strokeWidth="1" />
            <path d="M 15 50 C 10 60 18 80 25 96 C 32 80 40 60 35 50 C 30 54 20 54 15 50 Z" fill="url(#crownPearlGradient)" stroke={strokeCrown} strokeWidth="1.2" />
          </>
        )}
        {type === 'incisor' && (
          <>
            <path d="M 16 50 C 12 25 18 4 25 4 C 32 4 38 25 34 50 Z" fill="url(#rootBoneGradient)" stroke={strokeColor} strokeWidth="1" />
            <path d="M 10 50 C 8 70 12 88 15 92 C 20 95 30 95 35 92 C 38 88 42 70 40 50 C 30 52 20 52 10 50 Z" fill="url(#crownPearlGradient)" stroke={strokeCrown} strokeWidth="1.2" />
          </>
        )}
      </svg>
    </>
  );
};

const QuadrantWidget = ({ num, estado, onClick }) => {
  if (!num) return <div className="w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] aspect-square mx-[1px]" />;
  const est = ESTADOS[estado] || ESTADOS.sano;
  const isAusente = est.isAusente;
  const c = isAusente ? 'white' : est.color;
  const border = isAusente ? '#b0b0b0' : est.border;

  return (
    <div 
      className="relative w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] aspect-square mx-[1px] md:mx-[2px] cursor-pointer hover:scale-105 transition-transform" 
      onClick={() => onClick(num)}
      title={`Pieza ${num}\nClic para modificar el estado`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        <polygon points="0,0 100,0 75,25 25,25" fill="white" stroke={border} strokeWidth="3" className="hover:fill-gray-100 transition-colors" />
        <polygon points="0,100 100,100 75,75 25,75" fill="white" stroke={border} strokeWidth="3" className="hover:fill-gray-100 transition-colors" />
        <polygon points="0,0 25,25 25,75 0,100" fill="white" stroke={border} strokeWidth="3" className="hover:fill-gray-100 transition-colors" />
        <polygon points="100,0 75,25 75,75 100,100" fill="white" stroke={border} strokeWidth="3" className="hover:fill-gray-100 transition-colors" />
        <rect x="25" y="25" width="50" height="50" fill={c} stroke={border} strokeWidth="3" className="transition-colors" />
        
        {isAusente && (
          <>
            <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="4" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="4" />
          </>
        )}
      </svg>
    </div>
  );
};

const LabelBox = ({ num, isChild, onClick }) => {
  if (!num) return <div className="w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] h-[clamp(14px,2vw,22px)] mx-[1px]" />;
  
  const bgClass = isChild 
    ? 'bg-white border border-gray-400 text-gray-500' 
    : 'bg-gray-500 text-white shadow-sm';

  return (
    <div className="w-[clamp(18px,3vw,35px)] md:w-[clamp(24px,3.5vw,40px)] mx-[1px] md:mx-[2px] flex items-center justify-center">
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

  const handleApplyState = (newStateName) => {
    if (activeTooth) {
      setDientes(prev => ({
        ...prev,
        [activeTooth]: newStateName
      }));
      setActiveTooth(null);
    }
  };

  const TopCol = ({ adultNum, childNum }) => (
    <div className="flex flex-col items-center">
      {/* 1. Illustration */}
      <div className="h-16 sm:h-20 md:h-24 flex items-end justify-center mb-4 md:mb-6 cursor-pointer hover:scale-110 transition-transform" onClick={() => setActiveTooth(adultNum)}>
        <SVGTooth type={getAnatomicalType(adultNum)} position="top" />
      </div>
      {/* 2. Adult Label */}
      <div className="mb-[2px] md:mb-1"><LabelBox num={adultNum} isChild={false} onClick={setActiveTooth} /></div>
      {/* 3. Child Label */}
      <div className="mb-3 md:mb-5"><LabelBox num={childNum} isChild={true} onClick={setActiveTooth} /></div>
      {/* 4. Quadrant */}
      <div className="flex flex-col gap-[2px] items-center justify-center w-full relative">
        <QuadrantWidget num={adultNum} estado={dientes[childNum] || dientes[adultNum]} onClick={setActiveTooth} />
      </div>
    </div>
  );

  const BottomCol = ({ adultNum, childNum }) => (
    <div className="flex flex-col items-center">
      {/* 1. Quadrant */}
      <div className="flex flex-col gap-[2px] items-center justify-center w-full mb-3 md:mb-5 relative">
        <QuadrantWidget num={adultNum} estado={dientes[childNum] || dientes[adultNum]} onClick={setActiveTooth} />
      </div>
      {/* 2. Adult Label */}
      <div className="mb-[2px] md:mb-1"><LabelBox num={adultNum} isChild={false} onClick={setActiveTooth} /></div>
      {/* 3. Child Label */}
      <div className="mb-4 md:mb-6"><LabelBox num={childNum} isChild={true} onClick={setActiveTooth} /></div>
      {/* 4. Illustration */}
      <div className="h-16 sm:h-20 md:h-24 flex items-start justify-center cursor-pointer hover:scale-110 transition-transform" onClick={() => setActiveTooth(adultNum)}>
        <SVGTooth type={getAnatomicalType(adultNum)} position="bottom" />
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 md:p-10 max-w-[1200px] mx-auto w-full font-sans relative">
      
      {/* Modal de Selección */}
      {activeTooth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 fade-in">
          <div className="bg-white rounded-xl p-6 md:p-8 w-full max-w-sm shadow-2xl scale-in relative">
            <button 
              onClick={() => setActiveTooth(null)} 
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Pieza {activeTooth}</h3>
            <p className="text-xs font-medium text-gray-500 mb-5 uppercase tracking-wider">
              Seleccionar estado
            </p>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ESTADOS).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleApplyState(key)}
                  className={`py-2 px-3 rounded font-semibold text-xs tracking-wide border transition-all active:scale-95 flex items-center justify-start gap-2 ${data.bgClass}`}
                >
                  <span className={`w-3 h-3 rounded-full border shadow-sm`} style={{ backgroundColor: data.isAusente ? 'white' : data.color, borderColor: data.border }}></span>
                  {data.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header aligned like image */}
      <div className="pb-4 mb-8 border-b border-gray-100 text-left w-full pl-2">
        <h2 className="text-gray-700 tracking-wide text-sm md:text-base font-normal">
          ODONTOGRAMA N°: {patientId} - {pacienteNombre}
        </h2>
      </div>

      {/* Container Principal */}
      <div className="w-full flex flex-col items-center select-none gap-6 sm:gap-8 mb-10">
        
        {/* Arcada Superior */}
        <div className="flex justify-center xl:justify-between w-full">
          {topAdult.map((adultNum, i) => (
            <TopCol key={`top-${i}`} adultNum={adultNum} childNum={topChild[i]} />
          ))}
        </div>

        {/* Separación Central entre Cuadrantes */}
        <div className="h-2 w-full"></div>

        {/* Arcada Inferior */}
        <div className="flex justify-center xl:justify-between w-full">
          {bottomAdult.map((adultNum, i) => (
            <BottomCol key={`bottom-${i}`} adultNum={adultNum} childNum={bottomChild[i]} />
          ))}
        </div>

      </div>

      {/* Footer Buttons matched to image */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 pt-6 gap-4">
        
        {/* Left: Undo/History button */}
        <div className="w-full sm:w-auto flex justify-center">
          <button className="w-10 h-10 border border-gray-200 rounded shrink-0 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-gray-700">
            <FaUndo />
          </button>
        </div>

        {/* Middle: Arcada buttons */}
        <div className="flex gap-2 justify-center w-full sm:w-auto">
          <button className="px-3 md:px-4 py-2 border border-gray-200 rounded text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Arcada superior
          </button>
          <button className="px-3 md:px-4 py-2 border border-gray-200 rounded text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Arcada inferior
          </button>
          <button className="px-3 md:px-4 py-2 border border-blue-200 bg-blue-50/50 rounded text-xs md:text-sm text-blue-700 hover:bg-blue-50 transition-colors">
            Arcada completa
          </button>
        </div>

        {/* Right: Acciones / Save */}
        <div className="w-full sm:w-auto flex justify-center gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
          <button className="px-4 py-2 border border-gray-200 rounded text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Ações
          </button>

          {onSave && (
            <button onClick={onSave} disabled={isSaving} className="px-4 py-2 border border-blue-500 bg-blue-600 rounded text-xs md:text-sm text-white hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50">
              <FaSave className={isSaving ? 'animate-pulse' : ''} />
              Guardar
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
