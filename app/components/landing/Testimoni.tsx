"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export const Testimoni = () => {
  const testimonials: any[] = [];

  // Duplicate for seamless marquee
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimoni" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-green-600">Kata Mereka</h2>
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Pengalaman nyata dari warga sekolah setelah menggunakan layanan pengaduan kami yang transparan dan amanah.
          </p>
        </motion.div>
      </div>

      {/* INFINITE MARQUEE CONTAINER */}
      <div className="relative w-full flex overflow-hidden">
        {/* Gradiant Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f4fbf7] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f4fbf7] to-transparent z-20 pointer-events-none"></div>

        <motion.div 
          className="flex whitespace-nowrap gap-10 py-10"
          animate={{ x: [0, "-50%"] }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          whileHover={{ animationPlayState: "paused" }}
          // Note: using animationPlayState (standard CSS) through Framer Motion or just CSS works well.
          // In Framer Motion, we can also use a custom state, but linear is best for performance.
        >
          {marqueeItems.map((testi, i) => (
            <div key={i} className="inline-block w-[350px] md:w-[450px] flex-shrink-0">
              <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-10 h-full relative overflow-hidden group shadow-2xl shadow-green-900/5 hover:-translate-y-4 hover:shadow-green-500/20 transition-all duration-700">
                
                {/* Master Glow (Hidden by default, shown on hover) */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 blur-[60px] group-hover:bg-green-400/40 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 blur-[60px] group-hover:bg-emerald-400/40 transition-all duration-700"></div>

                {/* Container for Avatar & Quote */}
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-20 h-20 rounded-[1.7rem] p-1 bg-gradient-to-br from-green-400 to-emerald-600 shadow-xl group-hover:rotate-6 transition-transform duration-500">
                    <img src={testi.avatar} alt={testi.name} className="w-full h-full rounded-[1.4rem] object-cover" />
                  </div>
                  <div className="text-green-500/20 group-hover:text-green-500/40 transition-colors duration-500">
                    <Quote size={60} fill="currentColor" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  {/* Rating Stars with subtle glow */}
                  <div className="flex gap-1.5 mb-6 group-hover:scale-105 transition-transform origin-left">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star 
                        key={starIdx} 
                        size={20} 
                        className={starIdx < testi.rating ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "text-gray-200"} 
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-10 italic leading-relaxed text-lg whitespace-normal font-medium tracking-tight">
                    "{testi.message}"
                  </p>
                  
                  <div className="mt-auto border-t border-gray-100/50 pt-8 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 text-xl group-hover:from-green-600 group-hover:to-emerald-400 transition-all duration-500">{testi.name}</h4>
                      <p className="text-xs font-black text-green-500 uppercase tracking-[0.2em] mt-2 brightness-90">{testi.role}</p>
                    </div>
                    {/* Tiny decorative check */}
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
