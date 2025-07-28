"use client";

import { AUTH } from "../firebase/firebaseInit";

const FirebaseStatus = () => {
  const checkFirebaseStatus = () => {
    console.log('Firebase AUTH object:', AUTH);
    console.log('Environment variables:');
    console.log('NEXT_PUBLIC_APIKEY:', process.env.NEXT_PUBLIC_APIKEY ? 'Set' : 'Not set');
    console.log('NEXT_PUBLIC_AUTHDOMAIN:', process.env.NEXT_PUBLIC_AUTHDOMAIN ? 'Set' : 'Not set');
    console.log('NEXT_PUBLIC_PROJECTID:', process.env.NEXT_PUBLIC_PROJECTID ? 'Set' : 'Not set');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Firebase Status</h3>
      <p className="text-sm mb-2">
        Firebase Auth: {AUTH ? '✅ Configurado' : '❌ Não configurado'}
      </p>
      <button 
        onClick={checkFirebaseStatus}
        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
      >
        Verificar no Console
      </button>
    </div>
  );
};

export default FirebaseStatus; 