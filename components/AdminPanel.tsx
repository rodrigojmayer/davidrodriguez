
import React, { useState } from 'react';
import { GalleryImage } from '../types';

export const uploadImage = async (file: File) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await response.json();
    return data.secure_url; 
  } catch (error) {
    console.error("Error en Cloudinary:", error);
    return null;
  }
};

interface AdminPanelProps {
  images: GalleryImage[];
  // onAdd: (img: Omit<GalleryImage, 'id'>) => void;
  onAdd: (file: File, title: string, category: string) => Promise<void>;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, currentStatus: boolean) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ images, onAdd, onDelete, onToggleFeatured }) => {
  // const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState<GalleryImage['category']>('Terminado');
  const [isUploading, setIsUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setImageToDelete(id);
  };
  const handleFinalDelete = async () => {
    if (imageToDelete) {
      await onDelete(imageToDelete);
      setImageToDelete(null);
    }
  }

  // Manejador del boton "Listo para subir"
  const handleFinalUpload = async () => {
    if (!selectedFile) {
      alert("Primero selecciona una imagen");
      return;
    }

    setIsUploading(true);
    try {
      // Llamamos a la funcion que pasamos por props
      await onAdd(selectedFile, newTitle, newCat);

      // Limpiamos el formulario después de subir con éxito
      setSelectedFile(null);
      setNewTitle('');
    } catch (error) {
      console.error("Error al subir:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Upload Form - Actualizado para Archivos Reales */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar Nueva Foto
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Selector de Archivo / Cámara (Solo guarda en estado) */}
          <div className="space-y-2 md:col-span-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Seleccionar Foto</label>
            <label className={`flex items-center justify-center w-full p-2 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isUploading ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-blue-300 hover:border-blue-500'}`}>
              <span className="text-sm text-blue-600 font-medium truncate px-2">
                {/* {isUploading ? "Procesando..." : "📸 Abrir Cámara/Galeria"} */}
                {selectedFile ? `✅ ${selectedFile.name}` : "📸 Abrir Cámara/Galeria"}
              </span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  // setIsUploading(true);
                  // await onAdd(e); // Llama a la función de App.tsx que sube a Cloudinary y guarda en Firebase
                  // setIsUploading(false);
                  if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
                }} 
                // disabled={isUploading}
                className="hidden" 
              />
            </label>
          </div>

          {/* Título - Estos ahora podrían ser opcionales o manejarse con un estado local si quieres enviarlos */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Título (Opcional)</label>
            <input 
              type="text" 
              value={newTitle}
              placeholder="Ej: Pintura BMW" 
              className="w-full p-2 border rounded bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          
          {/* 3. CATEGORÍA */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Categoría</label>
            <select 
              value={newCat}
              onChange={e => setNewCat(e.target.value as any)}
              className="w-full p-2 border rounded bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Antes">Antes</option>
              <option value="Después">Después</option>
              <option value="Proceso">Proceso</option>
              <option value="Terminado">Terminado</option>
            </select>
          </div>

          {/* 4. BOTÓN DE ACCIÓN (Ahora sí dispara la subida) */}
          <div className="md:col-span-1">
            <button
              onClick={handleFinalUpload}
              disabled={isUploading || !selectedFile}
              className={`w-full py-2 px-4 rounded font-bold text-white shadow-lg transition-all ${
                isUploading || !selectedFile 
                ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-green-600 hover:bg-green-700 active:scale-95'
              }`}
            >
              {isUploading ? 'SUBIENDO...' : 'LISTO PARA SUBIR'}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Gestionar Galería Real ({images?.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images?.map(img => (
            <div key={img.id} className="relative group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={img.url.replace('/upload/', '/upload/w_400,c_fill/')} // Optimización rápida de Cloudinary
                className="w-full h-32 object-cover" 
                alt={img.title} 
              />
              <div className="p-2 bg-gray-50">
                <p className="text-[10px] font-bold text-gray-700 uppercase truncate">{img.title || 'Sin título'}</p>
                <div className="flex justify-between items-center mt-2">
                  <button 
                    onClick={() => onToggleFeatured(img.id, img.featured)}
                    className={`p-1.5 rounded-full transition-colors ${img.featured ? 'text-yellow-500 bg-yellow-100' : 'text-gray-400 bg-gray-100'}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <button 
                    // onClick={() => onDelete(img.id)}
                    onClick={() => confirmDelete(img.id)}
                    className="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
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
      {/* Modal de Confirmacion */}
      {imageToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">¿Eliminar imagen?</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Esta acción no se puede deshacer. La foto desaparecerá de la galería para todos los clientes.
                </p>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setImageToDelete(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleFinalDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
