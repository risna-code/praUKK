"use client";

import React from "react";
import Link from "next/link";
import { Shield, LogIn, Menu } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar = ({ onLoginClick }: NavbarProps) => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none"
    >
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-md rounded-[2rem] border border-white/50 px-6 py-3 flex items-center justify-between pointer-events-auto shadow-xl shadow-green-900/5">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2 text-xl text-green-600 font-extrabold hover:scale-105 transition-transform">
            <Shield className="w-8 h-8 flex-shrink-0" />
            <span className="hidden sm:inline">Pengaduan MOE</span>
          </Link>
        </div>
        
        <div className="flex-none hidden lg:flex">
          <ul className="flex items-center gap-8 font-bold text-gray-500 mr-8">
            <li><Link href="#home" className="hover:text-green-500 transition-colors">Home</Link></li>
            <li><Link href="#about" className="hover:text-green-500 transition-colors">About</Link></li>
            <li><Link href="#laporan" className="hover:text-green-500 transition-colors">Laporan</Link></li>
            <li><Link href="#testimoni" className="hover:text-green-500 transition-colors">Testimoni</Link></li>
          </ul>
        </div>
        
        <div className="flex-none flex items-center gap-2">
           <button 
             onClick={onLoginClick}
             className="clay-green px-6 py-2.5 flex items-center gap-2 font-bold text-sm hidden sm:flex hover:scale-[1.03] transition-transform"
           >
              <LogIn size={16} />
              Login
           </button>
           <button className="clay-card p-2 bg-white text-green-500 lg:hidden ml-2">
              <Menu size={20} />
           </button>
        </div>
      </div>
    </motion.div>
  );
};
