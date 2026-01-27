import type { VercelRequest, VercelResponse } from '@vercel/node';
import admin from 'firebase-admin';
import { v2 as cloudinary } from 'cloudinary';

// Inicializar Firebase Admin (Singleton para evitar múltiples conexiones)
function initFirebase() {
    // if (!admin.apps.length) {
    if (admin.apps.length > 0) {
        return admin.firestore();
    }
        try {
        // Intentamos parsear la cuenta de servicio desde el entorno
        //   const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
        const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
        
        if (!base64Key) {
            throw new Error("❌ No se encontró la variable FIREBASE_SERVICE_ACCOUNT_BASE64");
        }

        // Decodificamos de Base64 a texto normal (JSON)
        const jsonString = Buffer.from(base64Key, 'base64').toString('utf-8');
        const serviceAccount = JSON.parse(jsonString);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("🔥 Firebase inicializado correctamente.");
        } catch (error) {
        console.error("❌ Error al parsear FIREBASE_SERVICE_ACCOUNT:", error);
        }
//   }
  return admin.firestore();
}

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo permitimos GET (que es lo que envía el Cron)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Validación de seguridad para Producción
  const authHeader = req.headers.authorization;
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  console.log("--- LISTA DE VARIABLES DETECTADAS ---");
  console.log(Object.keys(process.env).filter(key => key.includes('FIREBASE')));
  console.log("-------------------------------------");

  try {
    const db = initFirebase();
    const ahora = Date.now();
    const unDiaEnMs = 24 * 60 * 60 * 1000;

    // Buscar imágenes con status "deleted"
    const snapshot = await db
      .collection("imagenes")
      .where("status", "==", "deleted")
      .get();

    if (snapshot.empty) {
      return res.status(200).json({ message: "No hay imágenes para procesar.", deleted: 0 });
    }

    let borrados = 0;
    const logs: string[] = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();
      // Convertir Timestamp de Firebase a milisegundos
      const fechaEliminado = data.deletedAt?.toDate?.()?.getTime() || 0;

      // FILTRO: Más de 24 horas de antigüedad
    //   if (ahora - fechaEliminado > unDiaEnMs) {
      if (true) {
        try {
          // 1. Borrar de Cloudinary
          await cloudinary.uploader.destroy(data.publicId);
          console.log("DELETEEEEEEEEEEEEEE data.publicId: ", data.publicId)
          // 2. Borrar de Firestore
          await doc.ref.delete();
          
          logs.push(`Eliminado: ${data.publicId}`);
          borrados++;
        } catch (err) {
          logs.push(`Error en ${data.publicId}: ${err}`);
        }
      } else {
        logs.push(`En espera (menos de 24hs): ${data.publicId}`);
      }
    }

    return res.status(200).json({
      success: true,
      processed: snapshot.size,
      deletedCount: borrados,
      details: logs
    });

  } catch (error: any) {
    console.error("❌ Error en el proceso de limpieza:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}