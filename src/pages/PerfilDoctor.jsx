import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

const doctorsData = {
  erina: {
    id: 'erina',
    name: 'Dra. Erina Carcara',
    role: 'Ortodoncia & Estética Dental',
    image: '/dra-erina.jpg', // Placeholder for doctor image
    bio: 'La Dra. Erina Carcara es especialista en transformar sonrisas con los últimos avances en ortodoncia invisible y estética dental. Su enfoque minucioso garantiza resultados funcionales y armónicos.',
    specialties: [
      { title: 'Ortodoncia Invisible', desc: 'Tratamientos discretos y efectivos utilizando alineadores transparentes.' },
      { title: 'Ortodoncia Convencional', desc: 'Corrección de la mordida y alineación dental con brackets de última generación.' },
      { title: 'Diseño de Sonrisa', desc: 'Planificación digital para lograr la sonrisa perfecta y natural.' },
      { title: 'Blanqueamiento Dental', desc: 'Técnicas avanzadas para aclarar el tono de tus dientes de forma segura.' }
    ],
    certifications: [
      'Especialista en Ortodoncia y Ortopedia Maxilar',
      'Certificación Internacional en Invisalign',
      'Miembro de la Sociedad Argentina de Ortodoncia',
      'Posgrado en Estética Dental Avanzada'
    ],
    clinicalCases: [
      {
        id: 1,
        title: 'Alineación Compleja',
        description: 'Tratamiento de 18 meses con alineadores invisibles para corregir apiñamiento severo.',
        image: '/caso-erina-1.jpg' // Placeholder
      },
      {
        id: 2,
        title: 'Diseño de Sonrisa',
        description: 'Combinación de ortodoncia y carillas de porcelana para una sonrisa armónica.',
        image: '/caso-erina-2.jpg' // Placeholder
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
      { title: 'Implantología Digital', desc: 'Colocación de implantes mediante guías quirúrgicas impresas en 3D.' },
      { title: 'Cirugía Maxilofacial', desc: 'Extracciones complejas y cirugías reconstructivas óseas.' },
      { title: 'Regeneración Ósea', desc: 'Técnicas avanzadas para recuperar el volumen óseo perdido.' },
      { title: 'Rehabilitación Oral', desc: 'Devolución de la función y estética mediante prótesis sobre implantes.' }
    ],
    certifications: [
      'Especialista en Cirugía y Traumatología Bucomaxilofacial',
      'Especialista en Implantología Oral',
      'Certificación en Flujos Digitales y CAD/CAM',
      'Dictante de cursos de posgrado en Cirugía Guiada'
    ],
    clinicalCases: [
      {
        id: 1,
        title: 'Rehabilitación Total',
        description: 'Colocación de 6 implantes superiores y prótesis fija definitiva con carga inmediata.',
        image: '/caso-adolfo-1.jpg' // Placeholder
      },
      {
        id: 2,
        title: 'Elevación de Seno Maxilar',
        description: 'Regeneración ósea guiada para posterior colocación de implantes en sector posterior.',
        image: '/caso-adolfo-2.jpg' // Placeholder
      }
    ]
  }
};

const PerfilDoctor = () => {
  const { id } = useParams();
  const doctor = doctorsData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
          
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl shrink-0 bg-secondary/10 flex items-center justify-center relative z-10">
            {/* Si no hay imagen real, mostrar un emoji o inicial por ahora */}
            <span className="text-6xl">{doctor.id === 'erina' ? '👩‍⚕️' : '👨‍⚕️'}</span>
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

        {/* Certificaciones y Casos Clínicos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Certificaciones */}
          <div className="lg:col-span-1">
            <div className="bg-primary rounded-[2rem] p-8 md:p-10 shadow-xl text-white h-full relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-accent-orange/20 rounded-full blur-3xl"></div>
              
              <h2 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3 relative z-10">
                <span className="text-accent-orange">🏆</span> Certificaciones
              </h2>
              
              <ul className="space-y-6 relative z-10">
                {doctor.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-accent-orange mt-2 shrink-0"></span>
                    <span className="font-medium text-white/90 leading-relaxed">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Casos Clínicos */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mb-8 flex items-center gap-4">
              <span className="w-8 h-[3px] bg-accent-orange rounded-full"></span>
              Casos Clínicos Destacados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {doctor.clinicalCases.map((caso) => (
                <div key={caso.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-secondary/20 group">
                  <div className="h-64 bg-secondary/10 relative overflow-hidden flex items-center justify-center">
                    {/* Placeholder de imagen */}
                    <span className="text-4xl opacity-50">📷</span>
                    <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold uppercase text-sm tracking-widest">Ver Detalles</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="font-black text-xl text-primary mb-3">{caso.title}</h3>
                    <p className="text-text-light text-sm font-medium leading-relaxed">
                      {caso.description}
                    </p>
                  </div>
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
