import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Get config from import.meta.env or localStorage (dynamic in-app setup)
export function getStoredFirebaseConfig(): FirebaseConfig | null {
  const envConfig: FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  };

  if (envConfig.apiKey && envConfig.databaseURL) {
    return envConfig;
  }

  // Check localStorage for custom in-browser setup
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('uiux_firebase_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.apiKey && parsed.databaseURL) {
          return parsed;
        }
      } catch {
        // ignore
      }
    }
  }

  return null;
}

let app: FirebaseApp | null = null;
let db: Database | null = null;

export function initFirebase(): { app: FirebaseApp | null; db: Database | null; isConfigured: boolean } {
  const config = getStoredFirebaseConfig();
  if (!config) {
    return { app: null, db: null, isConfigured: false };
  }

  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    db = getDatabase(app);
    return { app, db, isConfigured: true };
  } catch (err) {
    console.warn('Firebase initialization error:', err);
    return { app: null, db: null, isConfigured: false };
  }
}

export function saveCustomFirebaseConfig(config: FirebaseConfig) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('uiux_firebase_config', JSON.stringify(config));
    window.location.reload();
  }
}

export function clearCustomFirebaseConfig() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('uiux_firebase_config');
    window.location.reload();
  }
}
