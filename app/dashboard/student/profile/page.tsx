"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Settings, 
  Camera, 
  Calendar, 
  Award,
  BookOpen,
  LogOut,
  Shield,
  Fingerprint,
  Zap,
  Sparkles,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Trophy,
  Crown,
  Medal,
  FileText
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentProfile() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const rankings = [
    { rank: 1, name: "Budi Santoso", class: "XII RPL 1", exp: 2450, avatar: "https://i.pravatar.cc/100?img=12" },
    { rank: 2, name: "Siti Aminah", class: "XII RPL 2", exp: 2100, avatar: "https://i.pravatar.cc/100?img=5" },
    { rank: 3, name: "Ahmad Dani", class: "XI RPL 1", exp: 1850, avatar: "https://i.pravatar.cc/100?img=3" },
    { rank: 4, name: "Siswa Sekolah", class: "XII PPLG", exp: 850, avatar: "https://i.pravatar.cc/300?img=11", isMe: true },
    { rank: 5, name: "Rina Wijaya", class: "X RPL 1", exp: 720, avatar: "https://i.pravatar.cc/100?img=9" },
    { rank: 6, name: "Fajar Siddiq", class: "XII RPL 1", exp: 680, avatar: "https://i.pravatar.cc/100?img=15" },
    { rank: 7, name: "Dewi Lestari", class: "XI RPL 2", exp: 590, avatar: "https://i.pravatar.cc/100?img=20" },
    { rank: 8, name: "Eko Prasetyo", class: "X RPL 2", exp: 450, avatar: "https://i.pravatar.cc/100?img=22" },
    { rank: 9, name: "Maya Putri", class: "XI RPL 1", exp: 380, avatar: "https://i.pravatar.cc/100?img=24" },
    { rank: 10, name: "Hendra Kurnia", class: "XII RPL 2", exp: 320, avatar: "https://i.pravatar.cc/100?img=26" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 px-4 md:px-6">
      {/* Premium Hero Banner Section */}
      <div className="relative group">
         <div className="h-64 w-full bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-[3rem] shadow-2xl shadow-green-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            
            <div className="absolute top-8 right-8">
               <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2 shadow-2xl">
                  <Shield size={14} className="text-green-300" /> Profil Terverifikasi
               </div>
            </div>
         </div>

         <div className="absolute -bottom-20 left-12 flex flex-col md:flex-row items-end gap-10 text-left">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative group/avatar">
               <div className="w-44 h-44 md:w-52 md:h-52 rounded-[3.5rem] bg-white p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white overflow-hidden cursor-pointer relative">
                  <img src="https://i.pravatar.cc/300?img=11" className="w-full h-full rounded-[2.8rem] object-cover group-hover/avatar:scale-110 transition-transform duration-500" alt="Profile" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                     <Camera size={40} className="text-white animate-bounce" />
                  </div>
               </div>
               <button className="absolute -bottom-2 -right-2 bg-green-600 rounded-[1.5rem] p-4 shadow-2xl text-white border-4 border-white hover:scale-110 transition-all active:scale-95">
                  <Camera size={20} />
               </button>
            </motion.div>
            <div className="pb-6">
               <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <div className="flex items-center gap-3 mb-2">
                     <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight">Siswa Sekolah</h1>
                     <CheckCircle2 size={24} className="text-blue-500 fill-blue-50" />
                  </div>
                  <p className="text-base font-black text-green-600 uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
                    <Zap size={18} className="fill-current" /> Siswa Aktif SMK Muhammadiyah
                  </p>
                  
                  {/* EXP & TOTAL REPORTS SUMMARY BADGES */}
                  <div className="flex flex-wrap items-center gap-4">
                     <div className="bg-white px-6 py-3 rounded-[1.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-4 group hover:scale-105 transition-all cursor-default">
                        <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-white shadow-lg shadow-amber-400/30 group-hover:rotate-12 transition-transform">
                           <Zap size={20} className="fill-current" />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Total Pengalaman</p>
                           <p className="text-lg font-black text-gray-800 leading-none">850 <span className="text-xs text-amber-500">XP</span></p>
                        </div>
                     </div>

                     <div className="bg-white px-6 py-3 rounded-[1.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-4 group hover:scale-105 transition-all cursor-default">
                        <div className="w-10 h-10 rounded-2xl bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-600/30 group-hover:rotate-12 transition-transform">
                           <FileText size={20} />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Total Kontribusi</p>
                           <p className="text-lg font-black text-gray-800 leading-none">12 <span className="text-xs text-green-600">Laporan</span></p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-32">
        {/* Left Side: Deep Info */}
        <div className="lg:col-span-7 space-y-10">
           {/* Detailed Profile Card */}
           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white rounded-[3.5rem] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-green-50 rounded-bl-[10rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center justify-between mb-12 relative z-10">
                 <div className="space-y-1">
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
                        <User size={24} />
                      </div>
                      Informasi Identitas
                    </h3>
                 </div>
                 <div className="bg-gray-100 text-gray-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-gray-200">
                   Data Sistem
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <div className="space-y-3 group/field">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-2 group-hover/field:text-green-500 transition-colors">Identitas Lengkap</span>
                    <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 font-black text-gray-800 text-lg transition-all group-hover/field:bg-white group-hover/field:shadow-xl group-hover/field:shadow-gray-900/5 group-hover/field:border-green-100">
                       Siswa Muhammadiyah
                    </div>
                 </div>
                 <div className="space-y-3 group/field">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-2 group-hover/field:text-green-500 transition-colors">Nomor Induk (NIS)</span>
                    <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 font-black text-gray-800 text-lg transition-all group-hover/field:bg-white group-hover/field:shadow-xl group-hover/field:shadow-gray-900/5 group-hover/field:border-green-100">
                       202611001
                    </div>
                 </div>
                 <div className="space-y-3 md:col-span-2 group/field">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-2 group-hover/field:text-green-500 transition-colors">Kelas & Kompetensi Keahlian</span>
                    <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 font-black text-gray-800 text-lg flex items-center gap-4 transition-all group-hover/field:bg-white group-hover/field:shadow-xl group-hover/field:shadow-gray-900/5 group-hover/field:border-green-100">
                       <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-600"><BookOpen size={20} /></div>
                       XII PPLG (Pengembangan Perangkat Lunak)
                    </div>
                 </div>
              </div>

              <div className="mt-16 p-8 bg-amber-50/50 rounded-[2.5rem] border border-amber-100/50 flex items-center justify-between group/alert">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-amber-500 shadow-xl group-hover/alert:rotate-12 transition-transform">
                       <Fingerprint size={26} />
                    </div>
                    <div>
                       <p className="font-black text-gray-800 text-base leading-none">Hanya Foto yang Dapat Diubah</p>
                       <p className="text-[10px] font-bold text-amber-600/70 uppercase tracking-widest mt-2 leading-none">Hubungi Admin untuk perubahan data teks</p>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Registry Card Summary */}
           <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center justify-between">
              <div className="flex gap-8">
                <div className="text-center">
                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Terdaftar</p>
                   <p className="text-lg font-black text-gray-800">12 Jan 2024</p>
                </div>
                <div className="w-px h-12 bg-gray-100"></div>
                <div className="text-center">
                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">XP Anda</p>
                   <p className="text-lg font-black text-green-600">850 XP</p>
                </div>
                <div className="w-px h-12 bg-gray-100"></div>
                <div className="text-center">
                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Rank Global</p>
                   <p className="text-lg font-black text-amber-500">#4</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-14 h-14 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all group shadow-lg shadow-red-500/10"
              >
                <LogOut size={24} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
           </div>
        </div>

        {/* Right Side: LEADERBOARD NEW */}
        <div className="lg:col-span-5">
           <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white rounded-[3.5rem] shadow-[0_45px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-50 overflow-hidden flex flex-col h-full ring-1 ring-gray-100">
              <div className="p-10 bg-gradient-to-br from-green-600 to-emerald-700 text-white relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                       <Trophy size={28} className="text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight leading-none uppercase">Leaderboard</h3>
                      <p className="text-[10px] font-black text-green-100/70 uppercase tracking-[0.2em] mt-2">Top 10 Pejuang Fasilitas</p>
                    </div>
                 </div>

                 {/* Top 3 Teaser */}
                 <div className="mt-10 grid grid-cols-3 gap-4 relative z-10">
                    {rankings.slice(0, 3).map((top, idx) => (
                       <div key={idx} className={`flex flex-col items-center p-4 rounded-3xl border border-white/10 shadow-lg ${idx === 0 ? 'bg-white/20 scale-110 -translate-y-2' : 'bg-white/5'}`}>
                          <div className="relative">
                             <img src={top.avatar} className="w-12 h-12 rounded-full border-2 border-white/50" alt="Top Avatar" />
                             <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-lg ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-300' : 'bg-amber-600'}`}>
                                {idx === 0 ? <Crown size={10} className="text-white fill-current" /> : <Medal size={10} className="text-white" />}
                             </div>
                          </div>
                          <span className="text-[9px] font-black mt-3 truncate w-full text-center">{top.name.split(' ')[0]}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="p-6 md:p-10 space-y-4 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                 {rankings.map((user, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 5 }}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${user.isMe ? 'bg-green-50 border-green-200 shadow-lg shadow-green-500/10' : 'bg-white border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-gray-200/40'}`}
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${idx === 0 ? 'bg-yellow-400 text-white' : idx === 1 ? 'bg-gray-200 text-gray-600' : idx === 2 ? 'bg-amber-100 text-amber-700' : 'text-gray-400 font-bold'}`}>
                             {idx + 1}
                          </div>
                          <div className="w-10 h-10 rounded-[1rem] overflow-hidden border-2 border-white shadow-sm">
                             <img src={user.avatar} className="w-full h-full object-cover" alt="User" />
                          </div>
                          <div>
                             <p className={`text-sm font-black leading-none ${user.isMe ? 'text-green-700' : 'text-gray-800'}`}>{user.name} {user.isMe && "(Anda)"}</p>
                             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{user.class}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                          <Zap size={12} className="text-amber-500 fill-current" />
                          <span className="text-xs font-black text-gray-700">{user.exp} <span className="text-[8px] opacity-40">XP</span></span>
                       </div>
                    </motion.div>
                 ))}
              </div>

              <div className="p-10 border-t border-gray-50 text-center bg-gray-50/30">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                   <Sparkles size={12} className="text-amber-500" /> Update Real-time Berdasarkan Kontribusi
                 </p>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
