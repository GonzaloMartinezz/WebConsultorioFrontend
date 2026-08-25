import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// Helper function removed
const doctorsData = {
  erina: {
    id: 'erina',
    name: 'Dra. Erina Carcara',
    role: 'Ortodoncia & Estética Dental',
    image: '/dra-erina.jpg', // Placeholder for doctor image
    bio: 'La Dra. Erina Carcara es especialista en transformar sonrisas con los últimos avances en ortodoncia invisible y estética dental. Su enfoque minucioso garantiza resultados funcionales y armónicos.',
    specialties: [
      { title: 'ORTODONCIA', desc: 'Corrección de la mordida y alineación dental con brackets de última generación.' },
      { title: 'ORTOPEDIA FUNCIONAL DE LOS MAXILARES', desc: 'Tratamiento para guiar y estimular el crecimiento y desarrollo de los maxilares y musculatura facial en niños.' },
      { title: 'PERIODONCIA', desc: 'Tratamiento de enfermedades periodontales y cuidados de los tejidos que sostienen los dientes.' },
      { title: 'BLANQUEAMIENTO Y ESTETICA DENTAL', desc: 'Técnicas avanzadas para aclarar el tono de tus dientes de forma segura y eficaz' }
    ],
    certifications: [
      'Posgrado en Odontopediatría',
      'Posgrado en Ortopedia funcional de los maxilares',
      'Posgrado en Ortodoncia',
      'Posgrado en Ortodoncia digital con alineadores',
      'Posgrado en Estética Dental Avanzada'
    ],
    clinicalCases: [
      {
        id: 1,
        title: 'Ortodoncia Invisible (Apiñamiento Bimaxilar)',
        category: 'ortodoncia',
        categoryName: 'Ortodoncia Invisible',
        description: 'Tratamiento digital avanzado para corregir apiñamiento severo y rotación de piezas en ambas arcadas sin brackets, utilizando alineadores transparentes secuenciales.',
        duration: '14 meses',
        difficulty: 'Alta',
        technique: 'Alineadores Secuenciales Transparentes',
        image: '/alineadores.jpeg',
        layout: 'vertical-2',
        steps: [
          { key: 'before', name: 'Inicial (Antes)', desc: 'Apiñamiento severo superior e inferior con apiñamiento anterior y superposición dental en espejo.' },
          { key: 'after', name: 'Final (Después)', desc: 'Nivelación y alineación completa de ambas arcadas en forma parabólica ideal con excelente salud periodontal.' }
        ]
      },
      {
        id: 2,
        title: 'Corrección de Rotación Dental Inferior',
        category: 'ortodoncia',
        categoryName: 'Ortodoncia Invisible',
        description: 'Tratamiento localizado para alinear e incrustar una pieza dental inferior gravemente rotada que limitaba la estética y la correcta higiene dental.',
        duration: '8 meses',
        difficulty: 'Media',
        technique: 'Alineadores Secuenciales de Precisión',
        image: '/alineadores.png',
        layout: 'vertical-2',
        steps: [
          { key: 'before', name: 'Inicial (Antes)', desc: 'Pieza dentaria incisiva central inferior con rotación superior al 45% (señalada con la flecha).' },
          { key: 'after', name: 'Final (Después)', desc: 'Alineación perfecta del incisivo en el arco dental, logrando una anatomía armónica y mordida de encaje estable.' }
        ]
      },
      {
        id: 3,
        title: 'Blanqueamiento Progresivo en 3 Fases',
        category: 'estetica',
        categoryName: 'Estética Dental',
        description: 'Evolución paso a paso del tono dental durante un tratamiento de blanqueamiento profesional combinado en consultorio y hogar.',
        duration: '2 sesiones',
        difficulty: 'Baja',
        technique: 'Peróxido de Hidrógeno al 35% + Luz LED Clínica',
        image: '/casoclinico2.jpeg',
        layout: 'simple',
        steps: [
          { key: 'complete', name: 'Resultado', desc: 'Tratamiento de blanqueamiento profesional combinado en consultorio y hogar. Se muestran las 3 etapas del tratamiento.' }
        ]
      },
      {
        id: 4,
        title: 'Blanqueamiento Dental Clínico Express',
        category: 'estetica',
        categoryName: 'Estética Dental',
        description: 'Blanqueamiento express de una sesión clínica para pacientes que buscan resultados inmediatos y de alta luminosidad de forma segura.',
        duration: '1 sesión (45 min)',
        difficulty: 'Baja',
        technique: 'Gel de Peróxido Fotoactivado de Última Generación',
        image: '/casoclinico1.jpeg',
        layout: 'vertical-2',
        steps: [
          { key: 'before', name: 'Antes (Inicial)', desc: 'Piezas dentarias con pigmentación de partida en tono 3R 2.5 en la escala cromática odontológica clásica.' },
          { key: 'after', name: 'Ahora (Después)', desc: 'Aclarado instantáneo general de la sonrisa con excelente homogeneidad, brillo y esmalte protegido.' }
        ]
      }
    ]
  },
  adolfo: {
    id: 'adolfo',
    name: 'Dr. Adolfo Alejandro Martinez',
    role: 'Implantología & Cirugía Maxilofacial',
    image: '/dr-adolfo.jpg', // Placeholder
    bio: 'El Dr. Adolfo Martinez cuenta con amplia trayectoria en cirugías complejas e implantes dentales. Su dedicación a la tecnología 3D permite planificaciones precisas y postoperatorios más rápidos.',
    specialties: [
      { title: 'IMPLANTOLOGIA ORAL', desc: 'Colocación de implantes dentales, a traves de cirugias guiadas.' },
      { title: 'REHABILITACION PROTESICA', desc: 'Diseño digital de sonrisas , confeccion digital de coronas en un sesion  ' },
      { title: 'CIRUGIA', desc: 'Procedimientos quirurgicos de alta complejidad.' },
      { title: 'ESTETICA IDEAL ', desc: 'Devolución de la función y estética dental.Carillas y coronas esteticas.Blanqueamiento dental.' }
    ],
    certifications: [
      'Postgrado en cirugia y implantologia oral',
      'Especialista en Implantología Oral',
      'Certificación en Flujos Digitales y CAD/CAM',
      'Dictante de cursos de posgrado en Cirugía implantologica.'
    ],
    clinicalCases: [
      {
        id: 1,
        title: 'Rehabilitación Superior Completa',
        category: 'implantes',
        categoryName: 'Implantología & Prótesis',
        description: 'Colocación de 6 implantes superiores y prótesis fija definitiva con carga inmediata digital en un flujo 100% CAD/CAM.',
        duration: '24 horas',
        difficulty: 'Alta',
        technique: 'Cirugía Guiada 3D + Prótesis CAD/CAM',
        image: '/caso-adolfo-1.jpg', // Placeholder
        layout: 'simple',
        steps: [
          { key: 'complete', name: 'Resultado', desc: 'Rehabilitación masticatoria y estética completa del maxilar superior.' }
        ]
      },
      {
        id: 2,
        title: 'Elevación de Seno y Regeneración Ósea',
        category: 'cirugia',
        categoryName: 'Cirugía Maxilofacial',
        description: 'Regeneración ósea guiada mediante elevación de seno maxilar para posterior colocación segura de implantes en el sector posterior superior.',
        duration: '6 meses',
        difficulty: 'Alta',
        technique: 'Elevación de Seno Maxilar con Membrana PRF',
        image: '/caso-adolfo-2.jpg', // Placeholder
        layout: 'simple',
        steps: [
          { key: 'complete', name: 'Resultado', desc: 'Estructura ósea recuperada con éxito y posterior colocación estable del implante dental.' }
        ]
      }
    ]
  }
};

// Slider removed

const PerfilDoctor = () => {
  const { id } = useParams();
  const doctor = doctorsData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, doctor]);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary">
        <h2 className="text-3xl font-black mb-4">Doctor no encontrado</h2>
        <Link to="/especialistas" className="bg-accent-orange text-white px-6 py-3 rounded-xl font-bold uppercase">
          Volver a Especialistas
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20 pt-32 lg:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Botón Volver */}
        <Link to="/especialistas" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent-orange transition-colors mb-8 bg-white px-6 py-2 rounded-full shadow-sm border border-secondary/20">
          <span>&larr;</span> Volver a Especialistas
        </Link>

        {/* Encabezado del Doctor */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-secondary/20 flex flex-col md:flex-row gap-10 items-center md:items-start mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>

          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl shrink-0 bg-gradient-to-br from-[#4a3b32] to-[#1a1410] relative z-10">
          </div>

          <div className="flex-1 text-center md:text-left relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-accent-orange text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-orange-100">
              {doctor.role}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
              {doctor.name}
            </h1>
            <p className="text-text-light text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
              {doctor.bio}
            </p>
          </div>
        </div>

        {/* Especialidades en Recuadros */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mb-10 flex items-center gap-4">
            <span className="w-8 h-[3px] bg-accent-orange rounded-full"></span>
            Áreas de Especialidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctor.specialties.map((spec, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-md border border-secondary/20 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-accent-orange text-xl mb-6 group-hover:bg-accent-orange group-hover:text-white transition-colors">
                  ✦
                </div>
                <h3 className="font-black text-xl text-primary mb-3 leading-tight">{spec.title}</h3>
                <p className="text-text-light text-sm font-medium leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Se eliminaron los casos clínicos */}

        {/* Certificaciones Formato Trophy Cabinet */}
        <div className="mb-20">
          <div className="bg-primary rounded-[3rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden">
            {/* Blur decorativo premium */}
            <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-20%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

            <h2 className="text-3xl font-black uppercase tracking-tight mb-10 flex items-center gap-3 relative z-10">
              <span className="text-accent-orange text-4xl">🏆</span> Formación Académica & Certificaciones
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {doctor.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group">
                  <span className="w-8 h-8 rounded-full bg-accent-orange/20 flex items-center justify-center text-accent-orange font-bold shrink-0 mt-0.5 group-hover:bg-accent-orange group-hover:text-white transition-colors">
                    ✓
                  </span>
                  <span className="font-semibold text-white/90 leading-relaxed text-sm md:text-base">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerfilDoctor;
