"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, User, LogIn, ShieldAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a network delay for premium feel
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        router.push("/dashboard/admin");
        onClose();
      } else if (username === "siswa" && password === "siswa123") {
        router.push("/dashboard/student");
        onClose();
      } else {
        setError("Kredensial tidak valid. Silakan periksa kembali.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop with heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer"
          ></motion.div>

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(22,163,74,0.3)] border border-white/50 p-8 md:p-10 z-10 overflow-hidden"
          >
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition-all shadow-sm z-20 group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Header */}
            <div className="text-center mb-10 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-green-500/20 rotate-3">
                <Lock size={36} />
              </div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Login Sistem</h2>
              <p className="text-gray-500 text-sm font-bold mt-2 uppercase tracking-widest brightness-110">Akses Laporan Sekolah</p>
            </div>

            {/* ERROR ALERT */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold uppercase"
              >
                <ShieldAlert size={18} />
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form className="relative z-10 space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                  Username (NIS / NIP)
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Contoh: siswa / admin"
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-gray-700 clay-input focus:border-green-400 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-gray-700 clay-input focus:border-green-400 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm checkbox-success rounded-md" id="remember" />
                  <label htmlFor="remember" className="text-xs font-bold text-gray-500 cursor-pointer">Remember me</label>
                </div>
                <button type="button" className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors">Forgot Password?</button>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg rounded-2xl shadow-[0_15px_30px_rgba(22,163,74,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                    Masuk Sekarang
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center relative z-10">
              <p className="text-sm font-bold text-gray-400">
                Masalah akses? <span className="text-green-600 cursor-pointer hover:underline">Hubungi Admin Sarpras</span>
              </p>
            </div>

            {/* Bottom Alert Warning */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-2xl flex gap-4 items-start relative z-10">
               <ShieldAlert className="text-yellow-500 shrink-0" size={20} />
               <p className="text-[10px] font-bold text-yellow-700 leading-relaxed uppercase">
                 Hanya untuk akun NIS/NIP yang sudah terdaftar di database resmi Muhammadiyah School System.
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
