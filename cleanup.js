const admin = require("firebase-admin");
const cloudinary = require("cloudinary").v2;

// 1. Configurar Firebase (Usando variables de entorno de GitHub)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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
    const snapshot = await db.collection("imagenes").where("status", "==", "deleted").get();

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const fechaEliminado = data.deletedAt.toDate().getTime();

        if (ahora - fechaEliminado > unDiaEnMs) {
            console.log(`Eliminado: ${data.publicId}`);
            // Borrar de Cloudinary
            await cloudinary.uploader.destroy(data.publicId);
            // Borrar de Firestore definitivamente
            await doc.ref.delete();
        }
    }
}

run().catch(console.error);