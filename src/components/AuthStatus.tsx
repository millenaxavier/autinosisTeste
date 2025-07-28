"use client";

import { signOut } from "firebase/auth";
import React from "react";
import { AUTH } from "../firebase/firebaseInit";
import { useAuth } from "./AuthProvider";

const AuthStatus = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-sm text-blue-600">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return null;
};

export default AuthStatus; 