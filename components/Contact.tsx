
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-blue-600 font-bold uppercase tracking-widest mb-2">Contacto</h2>
        <h3 className="text-4xl font-bold text-gray-900 mb-6 font-title">¿Presupuesto sin cargo?</h3>
        <p className="text-gray-600 text-lg">Envianos una foto de tu daño por WhatsApp o completa el formulario y te responderemos en el día.</p>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 mb-16"> */}
      <div className="flex justify-center mb-16"> 
        {/* Contact Info */}
        <div className="w-full max-w-2xl space-y-8">
        {/* <div className="space-y-8"> */}
          <div className="bg-gray-900 text-white p-10 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            
            <h4 className="text-2xl font-bold mb-8">Información de Contacto</h4>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <p className="font-bold">Ubicación</p>
                  <p className="text-gray-400">Av. Pellegrini 1234, Rosario, Santa Fe</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p className="font-bold">Llamanos</p>
                  <p className="text-gray-400">+54 341 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-600/20 p-3 rounded-lg text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.626 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <p className="font-bold">WhatsApp Directo</p>
                  <p className="text-gray-400">Consultas rápidas: +54 9 341 555-9876</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <p className="font-bold">Horarios de Atención</p>
                  <p className="text-gray-400">Lunes a Viernes: 08:00 - 18:00 hs</p>
                  <p className="text-gray-400">Sábados: 09:00 - 13:00 hs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {/* <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase">Nombre Completo</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Juan Perez" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase">Teléfono</label>
                <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="+54 341 6..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="ejemplo@correo.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase">Mensaje / Detalle del trabajo</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Hola, quisiera presupuesto para pintar el capot de un VW Golf..."></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1">
              ENVIAR CONSULTA
            </button>
          </form>
        </div> */}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden h-[450px] shadow-2xl border-4 border-white">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107134.7431252112!2d-60.7666790240366!3d-32.95204680879447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6539335d7d75b%3A0xec2c9d77774093c7!2sRosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
