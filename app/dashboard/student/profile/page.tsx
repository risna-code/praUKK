"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Camera, 
  BookOpen,
  LogOut,
  Shield,
  Fingerprint,
  CheckCircle2,
  FileText
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentProfile() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-32 px-4 md:px-6">
      {/* Hero Banner */}
      <div className="relative group">
        <div className="h-56 w-full bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-[3rem] shadow-2xl shadow-green-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute top-8 right-8">
            <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
              <Shield size={14} className="text-green-300" /> Profil Terverifikasi
            </div>
          </div>
        </div>

        <div className="absolute -bottom-16 left-12 flex flex-col md:flex-row items-end gap-8">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative group/avatar">
            <div className="w-36 h-36 rounded-[3rem] bg-white p-2 shadow-2xl border-4 border-white overflow-hidden cursor-pointer relative">
              <img src="https://i.pravatar.cc/300?img=11" className="w-full h-full rounded-[2.3rem] object-cover group-hover/avatar:scale-110 transition-transform duration-500" alt="Profile" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={32} className="text-white" />
              </div>
            </div>
            <button className="absolute -bottom-2 -right-2 bg-green-600 rounded-2xl p-3 shadow-xl text-white border-4 border-white hover:scale-110 transition-all">
              <Camera size={18} />
            </button>
          </motion.div>
          <div className="pb-4">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">Siswa Sekolah</h1>
              <CheckCircle2 size={22} className="text-blue-500 fill-blue-50" />
            </div>
            <p className="text-sm font-black text-green-600 uppercase tracking-[0.3em]">Siswa Aktif SMK Muhammadiyah</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-50 mt-24">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-black text-gray-800 flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
              <User size={22} />
            </div>
            Informasi Identitas
          </h3>
          <div className="bg-gray-100 text-gray-400 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-200">
            Data Sistem
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Identitas Lengkap</span>
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 font-black text-gray-800 text-base">
              Siswa Muhammadiyah
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Nomor Induk (NIS)</span>
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 font-black text-gray-800 text-base">
              202611001
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2">Kelas & Kompetensi Keahlian</span>
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 font-black text-gray-800 text-base flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-600"><BookOpen size={18} /></div>
              XII PPLG (Pengembangan Perangkat Lunak)
            </div>
          </div>
        </div>

        <div className="mt-10 p-7 bg-amber-50/50 rounded-2xl border border-amber-100/50 flex items-center gap-5">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-lg">
            <Fingerprint size={24} />
          </div>
          <div>
            <p className="font-black text-gray-800 text-sm leading-none">Hanya Foto yang Dapat Diubah</p>
            <p className="text-[10px] font-bold text-amber-600/70 uppercase tracking-widest mt-2">Hubungi Admin untuk perubahan data teks</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Laporan</p>
            <p className="text-xl font-black text-gray-800">0 Laporan</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-13 h-13 px-5 py-3 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all font-black text-sm"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
