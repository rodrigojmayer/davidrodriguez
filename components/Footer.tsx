
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white italic">DR</div>
              <span className="text-xl font-bold tracking-tight">David Rodriguez</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
              Calidad premium en reparación y pintura automotriz desde hace más de 10 años en la localidad de Pueblo Esther.
            </p>
          </div>

          <div className="flex space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">WhatsApp</a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} David Rodriguez.</p>
            <p className="text-gray-600 text-xs mt-1 italic">Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
