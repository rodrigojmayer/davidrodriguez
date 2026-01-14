
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { GalleryImage } from './types';

const INITIAL_GALLERY: GalleryImage[] = [
  { id: '1', url: 'https://picsum.photos/id/111/800/600', category: 'Terminado', title: 'Restauración BMW M3', featured: true },
  { id: '2', url: 'https://picsum.photos/id/183/800/600', category: 'Antes', title: 'Daño Paragolpes', featured: false },
  { id: '3', url: 'https://picsum.photos/id/133/800/600', category: 'Proceso', title: 'Cabina de Pintura', featured: false },
  { id: '4', url: 'https://picsum.photos/id/146/800/600', category: 'Después', title: 'Acabado Espejo', featured: true },
  { id: '5', url: 'https://picsum.photos/id/1071/800/600', category: 'Terminado', title: 'Pulido cerámico', featured: false },
  { id: '6', url: 'https://picsum.photos/id/1072/800/600', category: 'Proceso', title: 'Lijado al agua', featured: false },
];

const App: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('davidrodriguez_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#inicio');

  useEffect(() => {
    localStorage.setItem('davidrodriguez_gallery', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#inicio');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addImage = (img: Omit<GalleryImage, 'id'>) => {
    const newImg = { ...img, id: Math.random().toString(36).substr(2, 9) };
    setImages(prev => [newImg, ...prev]);
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, featured: !img.featured } : img));
  };

  // Check if we are in admin mode via hidden hash
  const showAdmin = currentHash === '#admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {showAdmin ? (
        <main className="flex-grow pt-24 bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
              <button 
                onClick={() => window.location.hash = '#inicio'}
                className="text-blue-600 hover:underline font-medium"
              >
                Volver al Sitio
              </button>
            </div>
            <AdminPanel 
              images={images} 
              onAdd={addImage} 
              onDelete={deleteImage} 
              onToggleFeatured={toggleFeatured} 
            />
          </div>
        </main>
      ) : (
        <main className="flex-grow">
          <section id="inicio">
            <Hero />
          </section>
          
          <section id="servicios" className="py-20 bg-white">
            <Services />
          </section>

          <section id="galeria" className="py-20 bg-gray-50">
            <Gallery images={images} />
          </section>

          <section id="contacto" className="py-20 bg-white">
            <Contact />
          </section>
        </main>
      )}

      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/5493415559876" 
          target="_blank" 
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all flex items-center justify-center animate-bounce"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            {/* Icono de WhatsApp */}
            {/* <img src="./wts1.jpg" alt="24" /> */}
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.626 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

      <Footer />
      
      {/* Hidden admin trigger for the owner */}
      <button 
        className="fixed bottom-4 right-4 w-8 h-8 opacity-0 hover:opacity-10 transition-opacity bg-gray-400 rounded-full"
        onClick={() => window.location.hash = '#admin'}
        title="Admin"
      />
    </div>
  );
};

export default App;
