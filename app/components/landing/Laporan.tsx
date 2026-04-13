"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, AlertCircle, LogIn, ClipboardList, Star, CalendarDays, Filter, ChevronDown, ListFilter, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const Laporan = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeStatus, setActiveStatus] = useState("Semua");
  const [sortDate, setSortDate] = useState("terbaru"); // terbaru, terlama
  const [showPopup, setShowPopup] = useState(false); // Modal untuk Semua Laporan

  const categories = [
    "Semua",
    "Ruang Kelas",
    "Kamar Mandi",
    "Lab RPL",
    "Lab Boga",
    "Lab Busana",
    "Lab Perhotelan",
    "Kantin",
    "Parkiran",
    "Miniresto",
    "Ruang Pertemuan"
  ];

  const statuses = [
    "Semua",
    "Selesai",
    "Diproses",
    "Menunggu"
  ];

  const mockReports: any[] = [];

  /* Filtering Logic */
  let filteredReports = [...mockReports];

  if (activeCategory !== "Semua") {
    filteredReports = filteredReports.filter(report => report.kategori === activeCategory);
  }

  if (activeStatus !== "Semua") {
    filteredReports = filteredReports.filter(report => report.status === activeStatus);
  }

  filteredReports.sort((a, b) => {
    if (sortDate === "terbaru") {
      return b.rawDate - a.rawDate;
    } else {
      return a.rawDate - b.rawDate;
    }
  });

  const displayReports = filteredReports.slice(0, 4);

  const ReportCard = ({ report }: { report: any }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-green-900/5 hover:-translate-y-2 hover:shadow-green-500/10 transition-all duration-300 flex flex-col group overflow-hidden h-full"
    >
      <div className="w-full h-40 relative bg-gray-100 overflow-hidden">
        <img src={report.image} alt={report.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm flex flex-col gap-1">
            <span className="text-gray-400">{report.id}</span>
            <span className="text-green-600">{report.kategori}</span>
        </div>
        {report.rating > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span className="text-xs font-black text-gray-800">{report.rating}.0</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-black text-gray-800 group-hover:text-green-600 transition-colors leading-snug line-clamp-1 mb-2">{report.judul}</h4>
        <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2 mb-5">
            {report.deskripsi}
        </p>
        
        <div className="mt-auto bg-gray-50/80 rounded-xl p-3 flex flex-col gap-2 border border-gray-100 mb-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-bold">Tgl Lapor:</span>
              <span className="text-gray-700 font-semibold flex items-center gap-1.5"><CalendarDays size={12} /> {report.tglUpload}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-bold">Diselesaikan:</span>
              <span className="text-gray-700 font-semibold flex items-center gap-1.5"><CalendarDays size={12} className="text-green-500"/> {report.tglSelesai}</span>
            </div>
        </div>
        
        <div className={`px-4 py-2.5 flex items-center justify-center gap-2 rounded-xl font-bold text-sm w-full border ${report.warnaStatus}`}>
            {report.icon}
            {report.status}
        </div>
      </div>
    </motion.div>
  );

  const FilterControls = ({ isModal = false }) => (
    <div className={`${isModal ? "p-4 bg-gray-50/50 rounded-2xl border border-green-100/50 mb-6" : "bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl shadow-green-900/5 border border-white"} flex flex-col md:flex-row gap-4 items-end md:items-center justify-between`}>
      <div className="flex items-center gap-2 text-green-600 font-bold px-2 whitespace-nowrap hidden md:flex">
          <Filter size={18} />
          <span>Filter:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {/* Kategori */}
        <div className="flex flex-col relative group">
          <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Kategori</label>
          <div className="relative">
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer shadow-sm"
            >
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col relative group">
          <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Status</label>
          <div className="relative">
            <select 
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer shadow-sm"
            >
              {statuses.map((stat, i) => <option key={i} value={stat}>{stat}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Urutan */}
        <div className="flex flex-col relative group">
          <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Urutan</label>
          <div className="relative">
            <select 
              value={sortDate}
              onChange={(e) => setSortDate(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer shadow-sm"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section id="laporan" className="py-28 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-xl shadow-green-900/5 text-green-500 mb-6 border border-green-50 hover:scale-105 transition-transform duration-300">
              <ClipboardList size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-green-600 tracking-tight">Daftar Pengaduan Terkini</h2>
            <p className="text-gray-500 mt-4 text-lg font-medium max-w-2xl mx-auto">
              Transparansi adalah kunci. Berikut adalah pantauan real-time terhadap penyelesaian masalah sarana dan prasarana di lingkungan sekolah.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="lg:col-span-8 flex flex-col gap-6"
            >
               {/* Filter Bar */}
               <FilterControls />

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                 <AnimatePresence mode="popLayout">
                   {displayReports.length > 0 ? displayReports.map((report) => (
                      <motion.div 
                         layout
                         key={report.id}
                      >
                         <ReportCard report={report} />
                      </motion.div>
                   )) : (
                      <motion.div 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }} 
                         className="col-span-full py-16 text-center clay-card bg-white rounded-[2rem] border border-gray-100"
                      >
                         <AlertCircle size={48} className="text-gray-300 mx-auto mb-4" />
                         <h3 className="text-lg font-bold text-gray-600">Belum Ada Laporan Terkait</h3>
                         <p className="text-gray-400 font-medium mt-1">Gunakan kombinasi pencarian kategori dan status lain.</p>
                      </motion.div>
                   )}
                 </AnimatePresence>
               </div>
               
               {filteredReports.length > 4 && (
                 <div className="mt-4 text-center bg-white/50 backdrop-blur py-4 rounded-2xl border border-white hover:bg-white transition-colors w-full group">
                    <button 
                      onClick={() => setShowPopup(true)} // Open Full Modal
                      suppressHydrationWarning
                      className="text-green-600 font-extrabold hover:text-green-700 transition-all flex items-center justify-center gap-3 mx-auto group-hover:scale-105"
                    >
                       Muat Lebih Banyak
                       <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                       </div>
                    </button>
                 </div>
               )}
            </motion.div>

            {/* Akses Login Sidebar */}
           <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="lg:col-span-4"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-[2.5rem] shadow-2xl shadow-green-600/30 text-white relative overflow-hidden group h-full flex flex-col justify-center min-h-[400px]">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                <div className="relative z-10 text-center md:text-left">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/30 mx-auto md:mx-0">
                    <AlertCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Ingin Melapor?</h3>
                  <p className="text-green-50 font-medium leading-relaxed mb-8">
                    Halaman ini bersifat peninjauan publik. Untuk dapat mengajukan keluhan kerusakan sarana prasarana, siswa dan guru diwajibkan untuk <b>login</b> terlebih dahulu menggunakan akun NIS/NIP resmi sekolah.
                  </p>
                  <div className="block w-full">
                    <button 
                      onClick={onLoginClick}
                      suppressHydrationWarning
                      className="w-full bg-white text-green-600 py-4 px-6 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                      Login Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MODAL POPUP - FULL LIST DATA LAPORAN DENGAN FILTER INTERNAL */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-gray-900/70 backdrop-blur-md cursor-pointer"
            ></motion.div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-6xl bg-[#f8fcf9] rounded-[2.5rem] shadow-2xl z-10 flex flex-col overflow-hidden max-h-[90vh] border-4 border-white"
            >
               {/* Modal Header */}
               <div className="p-6 md:p-8 bg-white border-b border-green-50 shadow-sm relative z-20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-inner">
                          <ListFilter size={24} />
                       </div>
                       <div>
                          <h3 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">Katalog Laporan Sekolah</h3>
                          <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Database Transparansi Sarpras</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setShowPopup(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition-all font-bold group"
                    >
                      <X size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  {/* Filter inside Popup */}
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">
                        <Search size={14} className="text-green-500" />
                        Pencarian Spesifik
                     </div>
                     <FilterControls isModal={true} />
                  </div>
               </div>

               {/* Modal Body with Scrollable Grid */}
               <div className="p-6 md:p-8 overflow-y-auto w-full custom-scrollbar bg-green-50/20">
                  <AnimatePresence mode="popLayout">
                    {filteredReports.length > 0 ? (
                      <motion.div 
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        {filteredReports.map((report) => (
                            <ReportCard key={report.id} report={report} />
                        ))}
                      </motion.div>
                    ) : (
                       <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="py-32 text-center w-full bg-white/50 rounded-[3rem] border-2 border-dashed border-gray-200"
                       >
                         <AlertCircle size={64} className="text-gray-200 mx-auto mb-6" />
                         <h3 className="text-2xl font-black text-gray-400">Data Tidak Ditemukan</h3>
                         <p className="text-gray-500 font-medium">Coba sesuaikan kembali filter kategori atau status Anda.</p>
                         <button 
                            onClick={() => {setActiveCategory('Semua'); setActiveStatus('Semua');}}
                            className="mt-8 px-8 py-3 bg-green-500 text-white font-black rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                         >
                            Reset Semua Filter
                         </button>
                       </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Modal Footer Info */}
               <div className="px-8 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     Menampilkan {filteredReports.length} Laporan
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Muhammadiyah School Complaint System</p>
               </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
