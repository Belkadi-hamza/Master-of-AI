import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD4IF2lQ8OEIv0Rl16bwgQhvM8h4p7u9jo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "school-management-2026.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "school-management-2026",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "school-management-2026.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "714910746083",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:714910746083:web:1b15e94466c00ff0d5ccd6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-2QFJMVTQEX"
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Initialize Analytics only in browser environment
export const analytics: Analytics | null = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

