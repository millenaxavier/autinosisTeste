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

// Initialize Firebase
let APP: any;
let AUTH: any;
let DB: any;

// Check if we have valid Firebase configuration
const hasValidConfig = process.env.NEXT_PUBLIC_APIKEY && 
                      process.env.NEXT_PUBLIC_APIKEY !== "dummy-api-key" &&
                      process.env.NEXT_PUBLIC_AUTHDOMAIN &&
                      process.env.NEXT_PUBLIC_PROJECTID;

console.log('Firebase initialization check:');
console.log('NEXT_PUBLIC_APIKEY:', process.env.NEXT_PUBLIC_APIKEY ? 'Set' : 'Not set');
console.log('NEXT_PUBLIC_AUTHDOMAIN:', process.env.NEXT_PUBLIC_AUTHDOMAIN ? 'Set' : 'Not set');
console.log('NEXT_PUBLIC_PROJECTID:', process.env.NEXT_PUBLIC_PROJECTID ? 'Set' : 'Not set');
console.log('hasValidConfig:', hasValidConfig);

if (hasValidConfig) {
  try {
    APP = initializeApp(FIREBASE_CONFIG);
    AUTH = getAuth(APP);
    DB = getFirestore(APP);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
} else {
  console.warn('⚠️ Firebase not configured - missing environment variables');
}

export { APP, AUTH, DB };
