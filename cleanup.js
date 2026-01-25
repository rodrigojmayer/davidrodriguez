import admin from "firebase-admin";
import { v2 as cloudinary } from "cloudinary";

// 1. Configurar Firebase (Usando variables de entorno de GitHub)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// 2. Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function run() {
    const ahora = Date.now();
    const unDiaEnMs = 24 * 60 * 60 * 1000;

    // Buscar imagenes marcadas como "deleted"
    const snapshot = await db.collection("imagenes")
        .where("status", "==", "deleted")
        .get();

    if (snapshot.empty) {
        console.log("No hay imágenes para eliminar.");
        return;
    }

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const fechaEliminado = data.deletedAt.toDate().getTime();

        // Busca esta línea:
        // if (ahora - fechaEliminado > unDiaEnMs) {
        //     console.log(`Eliminado: ${data.publicId}`);

        // Y cámbiala temporalmente por esta:
        if (true) { 
        console.log(`Eliminando permanentemente (MODO PRUEBA): ${data.publicId}`);
        
           try {
                // Borrar de Cloudinary
                await cloudinary.uploader.destroy(data.publicId);
                // Borrar de Firestore
                await doc.ref.delete();
                console.log(`Éxito: ${data.publicId} eliminado.`);
            } catch (err) {
                console.error(`Error eliminando ${data.publicId}:`, err);
            }
        } else {
        console.log(`Aún no pasan 24hs para: ${data.publicId}`);
        }
    }
}

run().catch(console.error);