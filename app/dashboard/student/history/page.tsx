"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  History, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Filter,
  X,
  MapPin,
  Calendar,
  Timer,
  Pencil,
  ShieldCheck,
  Star,
  PlusCircle
} from "lucide-react";

import Link from "next/link";

export default function ReportHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const categories = ["Semua", "Fasilitas Lab", "Lingkungan", "Ruang Kelas", "Kantin"];
  const statuses = ["Semua", "Proses", "Selesai", "Menunggu", "Ditolak"];

  // FULL REPORTS LIST WITH XP REWARDS
  const [reports, setReports] = useState<any[]>([]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.subject.toLowerCase().includes(searchQuery.toLowerCase()) || report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || report.type === selectedCategory;
    const matchesStatus = selectedStatus === "Semua" || report.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <Link href="/dashboard/student" className="flex items-center gap-2 text-green-600 font-black text-xs uppercase tracking-widest mb-4 hover:-translate-x-1 transition-transform w-fit"><ArrowLeft size={16} /> Kembali ke Dashboard</Link>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-500/20"><History size={24} /></div>
             <h1 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">Riwayat Laporan</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={16} />
              <input type="text" placeholder="Cari ID atau judul..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none focus:ring-4 focus:ring-green-400/10 focus:border-green-400 transition-all w-64 shadow-sm"/>
           </div>
           <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-black text-gray-600 outline-none focus:border-green-400 transition-all cursor-pointer shadow-sm">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
           <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-black text-gray-600 outline-none focus:border-green-400 transition-all cursor-pointer shadow-sm">{statuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredReports.map((report) => (
            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} key={report.id} className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/40 hover:shadow-green-500/10 transition-all overflow-hidden flex flex-col group">
               <div className="h-48 w-full relative overflow-hidden">
                  <img src={report.image} alt={report.subject} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* BADGE */}
                  <div className="absolute top-4 left-4">
                     <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/50">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block leading-none mb-1">ID: {report.id}</span>
                        <span className="text-[10px] font-black text-green-600 uppercase tracking-wider">{report.type}</span>
                     </div>
                  </div>

                  <div className={`absolute top-4 right-4 w-3.5 h-3.5 rounded-full border-2 border-white/50 ${report.status === 'Selesai' ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-amber-400 shadow-lg shadow-amber-500/50'}`}></div>
               </div>
               <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-gray-800 leading-tight mb-2 group-hover:text-green-600 transition-colors line-clamp-1">{report.subject}</h3>
                  <div className="flex items-center gap-2 mb-6">
                     <MapPin size={12} className="text-gray-300" />
                     <span className="text-[10px] font-bold text-gray-400">{report.location}</span>
                  </div>
                  
                  <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 mb-6">
                     <div className="flex items-center justify-between relative px-2">
                        <div className="absolute left-4 right-4 h-0.5 bg-gray-200 top-2 z-0"></div>
                        {report.steps.map((step: any, idx: number) => (
                           <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5">
                              <div className={`w-3 h-3 rounded-full border-2 border-white ${step.status === 'completed' ? 'bg-green-500' : step.status === 'active' ? 'bg-amber-400 animate-pulse' : 'bg-gray-200'}`}></div>
                              <span className="text-[7px] font-black uppercase text-gray-400 tracking-tighter">{step.label}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                        <Clock size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">{report.date}</span>
                     </div>
                     <button onClick={() => setSelectedReport(report)} className="px-5 py-2 rounded-xl bg-gray-50 text-[10px] font-black text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm uppercase tracking-widest">Detail Laporan</button>
                  </div>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
         {selectedReport && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReport(null)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer" />
              <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden z-10 border-4 border-white max-h-[95vh] overflow-y-auto custom-scrollbar">
                 <div className="h-64 w-full relative"><img src={selectedReport.image} className="w-full h-full object-cover" alt="Detail" /><button onClick={() => setSelectedReport(null)} className="absolute top-6 right-6 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all"><X size={20} /></button>{selectedReport.status === 'Selesai' && (<div className="absolute top-6 left-6 bg-green-600 text-white px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20"><Timer size={18} className="fill-current" /><div className="text-left"><p className="text-[8px] font-black uppercase opacity-70 leading-none mb-1">Total Waktu</p><p className="text-sm font-black leading-none">{selectedReport.handlingDuration}</p></div></div>)}<div className="absolute bottom-6 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl border border-white shadow-xl flex items-center gap-6"><div><span className="text-[10px] font-black text-green-600 uppercase tracking-widest">ID: {selectedReport.id}</span><h3 className="text-2xl font-black text-gray-800 leading-tight mt-1">{selectedReport.subject}</h3></div></div></div>
                 <div className="p-10 space-y-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-1"><span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Lokasi</span><div className="flex items-center gap-2"><MapPin size={12} className="text-green-500" /><span className="text-[10px] font-bold text-gray-700">{selectedReport.location}</span></div></div>
                       <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-1"><span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Status</span><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${selectedReport.status === 'Selesai' ? 'bg-green-500' : 'bg-amber-400'}`}></div><span className="text-[10px] font-black uppercase text-gray-700">{selectedReport.status}</span></div></div>
                       {selectedReport.solvedAt && (<div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex flex-col gap-1"><span className="text-[8px] font-black text-green-600 uppercase tracking-widest">Ditutup</span><div className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-600" /><span className="text-[10px] font-black text-green-700">{selectedReport.solvedAt}</span></div></div>)}
                    </div>
                    <div className="space-y-4"><h4 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Timeline Penanganan</h4><div className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100/50"><div className="flex items-center justify-between relative px-6 text-center"><div className="absolute left-12 right-12 h-1 bg-gray-200 top-3 z-0"></div>{selectedReport.steps.map((step: any, idx: number) => (<div key={idx} className="relative z-10 flex flex-col items-center gap-3"><div className={`w-6 h-6 rounded-full border-4 border-white shadow-md ${step.status === 'completed' ? 'bg-green-500 scale-110' : step.status === 'active' ? 'bg-amber-400 animate-pulse scale-125' : 'bg-gray-200'}`}></div><div className="flex flex-col items-center"><span className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'active' ? 'text-amber-500' : step.status === 'completed' ? 'text-gray-800' : 'text-gray-300'}`}>{step.label}</span><span className="text-[9px] font-bold text-gray-500 mt-1">{step.date}</span><span className="text-[8px] font-black text-green-600/60 leading-none">{step.time !== '--' ? `Pkl ${step.time}` : ''}</span></div></div>))}</div></div></div><div className="space-y-3"><h4 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Deskripsi Kejadian</h4><p className="text-gray-600 font-bold leading-relaxed bg-gray-50/50 p-8 rounded-[3rem] border border-gray-100/50 italic text-lg">"{selectedReport.desc}"</p></div><div className="flex items-center justify-between pt-10 border-t border-gray-100"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner"><ShieldCheck size={24} /></div><div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Tim</p><p className="text-sm font-black text-gray-800">Verifikasi Teknisi Berhasil</p></div></div><button onClick={() => setSelectedReport(null)} className="bg-green-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-600/30">Tutup Detail</button></div></div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
