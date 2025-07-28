import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY || "dummy-api-key",
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN || "dummy-auth-domain",
  projectId: process.env.NEXT_PUBLIC_PROJECTID || "dummy-project-id",
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET || "dummy-storage-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID || "dummy-sender-id",
  appId: process.env.NEXT_PUBLIC_APPID || "dummy-app-id",
};

// Only initialize Firebase if we're in the browser and have valid config
let APP: any;
let AUTH: any;
let DB: any;

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_APIKEY) {
  try {
    APP = initializeApp(FIREBASE_CONFIG);
    AUTH = getAuth(APP);
    DB = getFirestore(APP);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

export { APP, AUTH, DB };
