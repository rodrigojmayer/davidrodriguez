
import React from 'react';
import { ICONS } from '../constants';

const services = [
  {
    title: 'Chapería General',
    description: 'Reparación de choques, enderezado de chasis y recuperación de paneles con precisión milimétrica.',
    icon: ICONS.Hammer
  },
  {
    title: 'Pintura Premium',
    description: 'Cabinas de pintura presurizadas y colorimetría computarizada para un tono 100% exacto al original.',
    icon: ICONS.Paint
  },
  {
    title: 'Restauración',
    description: 'Recuperamos vehículos clásicos y de colección devolviéndoles su gloria original con materiales de época.',
    icon: ICONS.Car
  },
  {
    title: 'Detailing & Pulido',
    description: 'Tratamientos cerámicos, acrílicos y limpieza de interiores de nivel exposición.',
    icon: ICONS.Sparkle
  },
  {
    title: 'Tratamientos Protectores',
    description: 'Protección contra granizo, rayas y corrosión mediante películas transparentes de alta resistencia.',
    icon: ICONS.Shield
  }
];

const Services: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-blue-600 font-bold uppercase tracking-widest mb-2">Nuestros Servicios</h2>
        <h3 className="text-4xl font-bold text-gray-900 mb-6 font-title">Soluciones Integrales para tu Vehículo</h3>
        <p className="text-gray-600 text-lg">
          Utilizamos tecnología de punta y materiales importados para asegurar resultados que superan los estándares de fábrica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index}
            className="group bg-gray-50 p-8 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <service.icon className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4 font-title">{service.title}</h4>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
