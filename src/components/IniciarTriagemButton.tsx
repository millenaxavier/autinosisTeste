"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import LoginForm from "@/components/LoginForm";
import { createPortal } from "react-dom";

interface IniciarTriagemButtonProps {
  variant?: 'nav' | 'hero' | 'cta';
  className?: string;
}

const IniciarTriagemButton = ({ variant = 'hero', className = '' }: IniciarTriagemButtonProps) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (loading) return;
    if (user) {
      router.push("/test");
    } else {
      setShowModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowModal(false);
    router.push("/test");
  };

  // Estilos baseados na variante
  const getButtonStyles = () => {
    switch (variant) {
      case 'nav':
        return "px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium";
      case 'hero':
        return "px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg";
      case 'cta':
        return "px-8 py-4 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg mx-auto block";
      default:
        return "px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-300";
    }
  };

  const getButtonText = () => {
    if (loading) return "Carregando...";
    switch (variant) {
      case 'nav':
        return "Iniciar triagem";
      case 'hero':
        return "Iniciar Triagem";
      case 'cta':
        return "Iniciar Triagem Gratuita";
      default:
        return "Iniciar Triagem";
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${getButtonStyles()} ${className} flex items-center justify-center gap-2`}
        onClick={handleClick}
        disabled={loading}
      >
        {/* Ícone */}
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        {getButtonText()}
      </motion.button>
      
      {showModal && mounted && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center" 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            pointerEvents: 'auto',
            zIndex: 9999
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative mx-4"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo ao Autinosis</h2>
              <p className="text-gray-600">Faça login para iniciar sua triagem</p>
            </div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        </div>,
        document.body
      )}
    </>
  );
};

export default IniciarTriagemButton; 