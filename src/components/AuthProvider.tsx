"use client";

import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AUTH } from "../firebase/firebaseInit";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only set up auth listener if Firebase is initialized
    if (!AUTH) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(AUTH, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 