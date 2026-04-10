"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  ArrowLeft, 
  Send, 
  Image as ImageIcon, 
  MapPin, 
  ClipboardList,
  CheckCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateReport() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium submission experience
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto redirect after success message
      setTimeout(() => {
        router.push("/dashboard/student");
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-green-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-green-500/30 mb-8"
        >
          <CheckCircle size={48} />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-gray-800 tracking-tight"
        >
          Laporan Terkirim!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 font-bold mt-4 text-lg max-w-md mx-auto"
        >
          Aduan Anda telah berhasil masuk ke sistem kami. Tim Sarpras akan segera meninjau laporan tersebut.
        </motion.p>
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
           className="mt-12 flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-[0.2em]"
        >
           <Loader2 className="animate-spin" size={16} />
           Mengarahkan ke dashboard...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Back Header */}
      <div className="flex items-center gap-6">
         <Link href="/dashboard/student">
            <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-green-500 hover:scale-110 transition-all shadow-sm">
                <ArrowLeft size={20} />
            </button>
         </Link>
         <div>
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">Buat Pengaduan Baru</h1>
            <p className="text-xs font-black text-green-600 uppercase tracking-widest mt-1">Layanan Aspirasi Fasilitas</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-8">
           <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-green-900/5 space-y-8">
              
              {/* Kategori & Lokasi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">
                      Pilih Kategori
                    </label>
                    <select className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 h-14 font-bold text-gray-700 outline-none focus:border-green-400 transition-all cursor-pointer">
                       <option>Ruang Kelas</option>
                       <option>Laboratorium</option>
                       <option>Kamar Mandi</option>
                       <option>Kantin</option>
                       <option>Lainnya</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">
                      Titik Lokasi
                    </label>
                    <div className="relative">
                       <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input 
                         type="text" 
                         placeholder="Cth: Lantai 2, Sebelah Tangga"
                         className="w-full bg-gray-50 border-2 border-transparent rounded-2xl pl-12 pr-5 h-14 font-bold text-gray-700 outline-none focus:border-green-400 transition-all"
                       />
                    </div>
                 </div>
              </div>

              {/* Judul Laporan */}
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">
                  Judul Singkat Kerusakan
                </label>
                <div className="relative">
                   <ClipboardList className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                     type="text" 
                     required
                     placeholder="Cth: AC Berisik di Lab RPL"
                     className="w-full bg-gray-50 border-2 border-transparent rounded-2xl pl-12 pr-5 h-14 font-bold text-gray-700 outline-none focus:border-green-400 transition-all"
                   />
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">
                  Detail Keluhan
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Ceritakan detail kerusakan agar tim sarpras dapat menyiapkan peralatan yang tepat..."
                  className="w-full bg-gray-50 border-2 border-transparent rounded-3xl p-6 font-bold text-gray-700 outline-none focus:border-green-400 transition-all resize-none"
                ></textarea>
              </div>

              {/* Upload Gambar Placeholder */}
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">
                  Foto Bukti Kerusakan
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center group hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer">
                   <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-green-100 group-hover:text-green-500 transition-all mb-4">
                      <ImageIcon size={32} />
                   </div>
                   <p className="text-sm font-black text-gray-500 transition-colors group-hover:text-green-600">Klik atau Geser Foto ke Sini</p>
                   <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">Maksimal 5MB (JPG, PNG)</p>
                </div>
              </div>

              {/* CTA */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg rounded-2.5xl shadow-2xl shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                   <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <Send size={20} />
                    Kirim Laporan Sekarang
                  </>
                )}
              </button>
           </form>
        </div>

        {/* Tips Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-xl shadow-green-900/5">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 border-l-4 border-amber-400 pl-4">Cara Melapor</h4>
              <ul className="space-y-6">
                 {[
                   { t: "Pastikan Foto Jelas", d: "Foto jarak dekat dan jarak jauh agar teknisi tahu lokasi persisnya." },
                   { t: "Gunakan Judul Deskriptif", d: "Sebutkan nama barang dan jenis kerusakannya dengan singkat." },
                   { t: "Tentukan Lokasi Akurat", d: "Sertakan nomor ruang atau patokan lantai." }
                 ].map((step, i) => (
                   <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                         <p className="text-sm font-black text-gray-800 tracking-tight">{step.t}</p>
                         <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">{step.d}</p>
                      </div>
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
