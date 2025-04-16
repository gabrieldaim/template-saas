import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import { getStorage } from "firebase-admin/storage";
import "server-only";

const decodedKey = Buffer.from(
    process.env.FIREBASE_PRIVATE_KEY_BASE64!,
    "base64"
).toString("utf-8");

// Carrega variáveis de ambiente
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = decodedKey
// const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;



// Define credencial
export const firebaseCert = cert({
  projectId,
  clientEmail,
  privateKey,
});

if (!getApps().length) {
  // Initialize Firebase Admin SDK
  initializeApp({
    credential: firebaseCert,
    // storageBucket: storageBucket,
  });
}


export const db = getFirestore();
// export const storage = getStorage(adminApp).bucket();
