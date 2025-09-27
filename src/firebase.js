// src/firebase.js
// Reemplaza las variables de entorno en .env o directamente aquí (no recomendado para producción)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBZhCdwlhS8N61uxHC2bu2BMh0aSceCgH4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "proyecto-diplomado1-34f5a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "proyecto-diplomado1-34f5a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "proyecto-diplomado1-34f5a.firebasestorage.app",
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_ID || "882838227526",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:882838227526:web:16e4835d13f2d57b3cd847"
};

 

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
