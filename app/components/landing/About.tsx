import React from "react";
import { Target, Lightbulb, Heart, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-white shadow-sm text-green-600 font-bold mb-6 text-sm uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Sistem Kami
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-600 tracking-tight leading-[1.15]">
              Membangun Sekolah <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Lebih Baik & Modern</span>
            </h2>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="max-w-lg"
          >
             <p className="text-lg text-gray-500 font-medium leading-relaxed border-l-4 border-green-400 pl-6">
                Kami mengubah cara pelaporan sarana prasarana sekolah dari konvensional menjadi sepenuhnya terdigitalisasi, mulus, transparan, dan mudah dilacak.
             </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Aesthetic Premium Image Grid (Masonry Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex gap-4"
          >
             {/* Left Column Photos */}
             <div className="flex-1 flex flex-col gap-4 pt-12">
               <div className="w-full h-[60%] rounded-[2rem] overflow-hidden shadow-2xl relative group">
                  <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Siswa Belajar" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
               </div>
               <div className="w-full h-[40%] rounded-[2rem] overflow-hidden shadow-xl relative group">
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Ruang Kelas" />
               </div>
             </div>
             
             {/* Right Column Photos */}
             <div className="flex-1 flex flex-col gap-4 pb-12">
               <div className="w-full h-[40%] rounded-[2rem] overflow-hidden shadow-xl relative group">
                  <div className="absolute inset-0 bg-green-500 flex items-center justify-center p-6 text-center">
                      <div className="flex flex-col items-center">
                        <h4 className="text-white font-black text-3xl mb-1">Amanah</h4>
                        <p className="text-green-100 font-bold text-xs uppercase tracking-wider">& Transparan</p>
                      </div>
                  </div>
               </div>
               <div className="w-full h-[60%] rounded-[2rem] overflow-hidden shadow-2xl relative group">
                  <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Fasilitas Modern" />
               </div>
             </div>

             {/* Floating Info Tag */}
             <div className="absolute top-[40%] -left-8 md:-left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white flex items-center gap-4 z-20 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white">
                  <CheckCircle2 size={24} />
                </div>
                <div className="pr-2">
                  <p className="text-sm font-bold text-gray-800">Cepat & Tepat</p>
                  <p className="text-xs text-gray-500 font-medium tracking-wide">Penanganan Laporan</p>
                </div>
             </div>
          </motion.div>

          {/* Right Side: Bento Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Box 1 */}
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl shadow-green-900/5 hover:shadow-green-900/10 transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform rounded-tr-[2rem]"></div>
               <div className="relative z-10 flex gap-6 sm:items-center flex-col sm:flex-row">
                 <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-green-500/30">
                    <Target size={32} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-gray-800 mb-2">Tujuan Aplikasi</h3>
                   <p className="text-gray-600 font-medium leading-relaxed">Mendokumentasikan keluhan fasilitas sekolah secara terpusat agar proses tindak lanjut dilakukan dengan cepat tanpa birokrasi rumit.</p>
                 </div>
               </div>
            </div>

            {/* Box 2 & 3 Side by side on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl shadow-green-900/5 hover:-translate-y-1 hover:shadow-green-900/10 transition-all flex flex-col">
                 <div className="w-16 h-16 rounded-[1.2rem] bg-green-50 text-green-600 flex items-center justify-center mb-6">
                    <Lightbulb size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-800 mb-3">Visi & Misi</h3>
                 <p className="text-gray-600 font-medium leading-relaxed mb-4 flex-1">Menjadi platform interaktif untuk mewujudkan infrastruktur pembelajaran modern secara berkala.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl shadow-green-900/5 hover:-translate-y-1 hover:shadow-green-900/10 transition-all flex flex-col">
                 <div className="w-16 h-16 rounded-[1.2rem] bg-green-50 text-green-600 flex items-center justify-center mb-6">
                    <Heart size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-800 mb-3">Harapan Sistem</h3>
                 <p className="text-gray-600 font-medium leading-relaxed mb-4 flex-1">Menumbuhkan empati siswa menjaga fasilitas agar Kegiatan Belajar Mengajar selalu maksimal.</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
