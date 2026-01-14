
import React, { useState } from 'react';
import { GalleryImage } from '../types';

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [filter, setFilter] = useState<string>('Todos');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = ['Todos', 'Antes', 'Después', 'Proceso', 'Terminado'];

  const filteredImages = filter === 'Todos' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-blue-600 font-bold uppercase tracking-widest mb-2">Nuestro Trabajo</h2>
        <h3 className="text-4xl font-bold text-gray-900 mb-8 font-title">Galería de Resultados</h3>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div 
            key={image.id}
            className="relative group overflow-hidden rounded-xl bg-gray-200 aspect-[4/3] cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">{image.category}</span>
              <h4 className="text-white font-bold text-lg">{image.title}</h4>
              <div className="mt-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm self-end">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {image.featured && (
              <div className="absolute top-4 left-4 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-md">
                Destacado
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/95 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h4 className="text-2xl font-bold text-white mb-1">{selectedImage.title}</h4>
              <span className="text-blue-400 font-medium uppercase tracking-widest">{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
