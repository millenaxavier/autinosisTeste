"use client";

import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import IniciarTriagemButton from "@/components/IniciarTriagemButton";
import { AUTH } from "@/firebase/firebaseInit";
import { useAuth } from "./AuthProvider";

const NavBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      if (AUTH) {
        await signOut(AUTH);
        console.log('Logout successful');
        router.push("/");
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <nav className="z-20 w-full py-4 px-6 md:px-12 lg:px-24 flex justify-between items-center bg-gray-100">
      {/* Brand Logo & Name */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <Link href="/" legacyBehavior>
          <a className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.svg"
              alt="logo da Autinosis"
              width={30}
              height={30}
              className="object-contain"
            />
            <span
              className="text-xl font-bold bg-clip-text 
              text-transparent bg-gradient-to-r from-blue-500 to-blue-600"
            >
              Autinosis
            </span>
          </a>
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden sm:flex space-x-4 md:space-x-8 items-center"
      >
        <Link href="/" legacyBehavior>
          <a className="text-gray-700 hover:text-orange-500 transition-colors">
            Home
          </a>
        </Link>
        <IniciarTriagemButton variant="nav" />
        
        {/* User info and logout for desktop */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Olá, {user.email?.split('@')[0] || 'Usuário'}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-600 transition hover:bg-blue-50 text-sm"
            >
              Sair
            </button>
          </div>
        ) : null}
      </motion.div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex items-center relative">
        <button
          onClick={() => setToggleDropdown(!toggleDropdown)}
          className="p-2 text-gray-700 focus:outline-none"
        >
          {toggleDropdown ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>

        <AnimatePresence>
          {toggleDropdown && (
            <motion.div
              ref={dropdownRef}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-4"
            >
              <Link href="/" legacyBehavior>
                <a
                  onClick={() => setToggleDropdown(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  Home
                </a>
              </Link>
              <Link href="/test" legacyBehavior>
                <a
                  onClick={() => setToggleDropdown(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  Fazer Teste
                </a>
              </Link>
              
              {/* User info and logout for mobile */}
              {user ? (
                <>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="px-4 py-2 text-sm text-gray-600">
                      Olá, {user.email?.split('@')[0] || 'Usuário'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      setToggleDropdown(false);
                      await handleLogout();
                    }}
                    className="mt-2 w-full text-left px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded transition hover:bg-blue-50"
                  >
                    Sair
                  </button>
                </>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;
