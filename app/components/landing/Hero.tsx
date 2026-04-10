import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="min-h-[100vh] flex flex-col justify-center items-center relative px-4 pt-24 pb-20">

      <div className="max-w-6xl mx-auto z-10 w-full relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >

          {/* HEADLINE: Strictly forced to 2 lines via flex column and nowrap */}
          <h1 className="flex flex-col items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.2] tracking-tight drop-shadow-sm w-full">
            <span className="whitespace-nowrap text-green-600">
              Laporkan Masalah Sekolah
            </span>
            <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400 mt-2 lg:mt-4">
              dengan Cepat & Transparan
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="mt-8 text-lg md:text-xl text-gray-600 font-medium max-w-2xl leading-relaxed">
            Sistem pengaduan sarana prasarana modern untuk mewujudkan fasilitas sekolah yang lebih baik dengan respon penanganan yang transparan.
          </p>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto justify-center"
          >
            <Link 
              href="#laporan" 
              className="clay-green border-none w-full sm:w-auto px-10 py-4 font-bold text-lg hover:scale-[1.03] transition-transform duration-300 flex justify-center items-center gap-2 group shadow-xl shadow-green-500/20"
            >
              Buat Laporan
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#testimoni" 
              className="clay-card border border-green-100 bg-white text-green-600 w-full sm:w-auto px-10 py-4 font-bold text-lg hover:scale-[1.03] hover:text-green-700 transition-transform duration-300 shadow-xl shadow-gray-200/50 flex justify-center items-center"
            >
              Lihat Testimoni
            </Link>
          </motion.div>

          {/* TRUST INDICATOR */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-16 w-full max-w-3xl clay-card bg-white/80 backdrop-blur-xl px-6 py-5 hover:scale-[1.02] transition-transform duration-300 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 flex-wrap border border-white"
          >
            {/* RATING */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-yellow-100/50 px-3 py-1.5 rounded-full">
                <div className="rating rating-sm">
                  <input type="radio" className="mask mask-star-2 bg-yellow-400" disabled />
                  <input type="radio" className="mask mask-star-2 bg-yellow-400" disabled />
                  <input type="radio" className="mask mask-star-2 bg-yellow-400" disabled />
                  <input type="radio" className="mask mask-star-2 bg-yellow-400" disabled />
                  <input type="radio" className="mask mask-star-2 bg-yellow-400" checked disabled />
                </div>
              </div>
              <span className="text-sm text-gray-700 font-bold">4.9 <span className="text-gray-500 font-medium">dari 120+ siswa</span></span>
            </div>

            <div className="hidden md:block w-px h-8 bg-green-200/50"></div>

            {/* DATA 1 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full clay-green flex items-center justify-center text-white flex-shrink-0">
                <ShieldCheck size={16} />
              </div>
              <span className="text-sm font-bold text-gray-700">150+ <span className="font-medium text-gray-500">Laporan masuk</span></span>
            </div>

            <div className="hidden md:block w-px h-8 bg-green-200/50"></div>

            {/* DATA 2 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full clay-green flex items-center justify-center text-white flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-700">120+ <span className="font-medium text-gray-500">Selesai ditangani</span></span>
            </div>
            
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
