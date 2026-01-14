
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-slideUp">
          <h2 className="text-blue-500 font-bold uppercase tracking-widest mb-4">Especialistas en Estética Automotriz</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Chapería y Pintura <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Alta Gama</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
            Más de 10 años devolviéndole vida a tu vehículo con procesos de pintura oficiales y acabados impecables. Confianza y garantía en cada detalle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contacto" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg text-center transition-all shadow-xl hover:shadow-blue-500/20"
            >
              CONTACTANOS
            </a>
            <a 
              href="#galeria" 
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-10 py-4 rounded-full font-bold text-lg text-center border border-white/20 transition-all"
            >
              VER TRABAJOS
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white/50 text-xs uppercase tracking-widest mb-2">Deslizar</span>
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default Hero;
