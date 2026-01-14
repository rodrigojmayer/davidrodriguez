
import React, { useState } from 'react';
import { GalleryImage } from '../types';

interface AdminPanelProps {
  images: GalleryImage[];
  onAdd: (img: Omit<GalleryImage, 'id'>) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ images, onAdd, onDelete, onToggleFeatured }) => {
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState<GalleryImage['category']>('Terminado');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    onAdd({
      url: newUrl,
      title: newTitle || 'Trabajo nuevo',
      category: newCat,
      featured: false
    });
    setNewUrl('');
    setNewTitle('');
  };

  return (
    <div className="space-y-12">
      {/* Upload Form */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar Nueva Foto
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">URL de Imagen</label>
            <input 
              type="text" 
              placeholder="https://..." 
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Título / Descripción</label>
            <input 
              type="text" 
              placeholder="Ej: Pintura BMW" 
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Categoría</label>
            <select 
              value={newCat}
              onChange={e => setNewCat(e.target.value as any)}
              className="w-full p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Antes">Antes</option>
              <option value="Después">Después</option>
              <option value="Proceso">Proceso</option>
              <option value="Terminado">Terminado</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            SUBIR FOTO
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-400">
          Nota: En una app real, aquí usaríamos un selector de archivos. Para este demo, usa una URL de imagen (ej. de Picsum o Unsplash).
        </p>
      </div>

      {/* Grid of existing images with controls */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Gestionar Galería ({images.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <img src={img.url} className="w-full h-32 object-cover" alt="" />
              <div className="p-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase truncate">{img.title}</p>
                <div className="flex justify-between items-center mt-2">
                  <button 
                    onClick={() => onToggleFeatured(img.id)}
                    className={`p-1 rounded ${img.featured ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300'}`}
                    title="Destacar"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => onDelete(img.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
