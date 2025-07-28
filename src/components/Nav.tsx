"use client";

import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import IniciarTriagemButton from "@/components/IniciarTriagemButton";
import { AUTH } from "@/firebase/firebaseInit";

const NavBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <nav className="w-full py-4 px-6 md:px-12 lg:px-24 flex justify-between items-center bg-gray-100">
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
              <Link href="/profile" legacyBehavior>
                <a
                  onClick={() => setToggleDropdown(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  My Profile
                </a>
              </Link>
              <Link href="/test" legacyBehavior>
                <a
                  onClick={() => setToggleDropdown(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  Take a Test
                </a>
              </Link>
              <button
                type="button"
                onClick={async () => {
                  setToggleDropdown(false);
                  if (AUTH) {
                    await signOut(AUTH);
                  }
                }}
                className="mt-2 w-full text-left px-4 py-2 bg-gradient-to-r 
                from-orange-500 to-pink-600 text-white rounded transition hover:bg-opacity-90"
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;
