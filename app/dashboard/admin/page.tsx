"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  MoreVertical,
  ArrowUpRight,
  Filter,
  Download
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Laporan", value: "156", icon: <ClipboardList size={22} />, color: "bg-blue-500", trend: "+12%" },
    { label: "Dalam Proses", value: "24", icon: <Clock size={22} />, color: "bg-amber-500", trend: "+2" },
    { label: "Selesai", value: "128", icon: <CheckCircle2 size={22} />, color: "bg-green-500", trend: "82%" },
    { label: "Warga Aktif", value: "892", icon: <Users size={22} />, color: "bg-purple-500", trend: "+45" },
  ];

  const recentReports = [
    { id: "RPT-102", user: "Budi Santoso", subject: "AC Lab RPL Bocor", status: "Proses", date: "10 Apr 2026", priority: "High" },
    { id: "RPT-101", user: "Siti Aminah", subject: "Kursi Kelas 12A Patah", status: "Diproses", date: "09 Apr 2026", priority: "Medium" },
    { id: "RPT-100", user: "Andi Wijaya", subject: "Lampu Kantin Mati", status: "Selesai", date: "08 Apr 2026", priority: "Low" },
    { id: "RPT-099", user: "Dewi Lestari", subject: "Wastafel Macet", status: "Menunggu", date: "08 Apr 2026", priority: "High" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Overview Dashboard</h1>
          <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Administrator Console
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-all">
              <Download size={18} />
              Export Data
           </button>
           <button className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl shadow-green-500/20 font-black flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <Filter size={18} />
              Filter Laporan
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-xl shadow-green-900/5 group hover:shadow-green-500/10 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
               <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {stat.icon}
               </div>
               <span className="text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <TrendingUp size={10} />
                  {stat.trend}
               </span>
            </div>
            <h3 className="text-3xl font-black text-gray-800 tracking-tight group-hover:text-green-600 transition-colors">{stat.value}</h3>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Reports Table */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-2xl shadow-green-900/5 overflow-hidden">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-gray-800 tracking-tight">Laporan Terbaru</h3>
              <button className="text-sm font-black text-green-600 hover:text-green-700 underline underline-offset-4">Lihat Semua</button>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">ID & Subjek</th>
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Pelapor</th>
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Prioritas</th>
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Status</th>
                    <th className="pb-4 px-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/50">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="group hover:bg-green-50/30 transition-colors">
                      <td className="py-5 px-2">
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1 block w-fit">{report.id}</span>
                        <span className="font-bold text-gray-800 block text-sm">{report.subject}</span>
                      </td>
                      <td className="py-5 px-2">
                        <span className="font-bold text-gray-700 text-sm">{report.user}</span>
                        <span className="text-xs text-gray-400 block mt-0.5">{report.date}</span>
                      </td>
                      <td className="py-5 px-2">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter w-fit block ${
                           report.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {report.priority}
                        </span>
                      </td>
                      <td className="py-5 px-2">
                        <div className="flex items-center gap-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${
                              report.status === 'Selesai' ? 'bg-green-500' : 'bg-amber-400'
                           }`}></div>
                           <span className="text-xs font-black text-gray-700">{report.status}</span>
                        </div>
                      </td>
                      <td className="py-5 px-2 text-right">
                         <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all">
                            <MoreVertical size={16} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-green-600/30">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                    <AlertCircle size={24} />
                 </div>
                 <h3 className="text-xl font-black mb-2 tracking-tight">Panduan Admin</h3>
                 <p className="text-green-50 text-sm font-medium leading-relaxed mb-6">
                    Segera lakukan verifikasi laporan "High Priority" yang masuk hari ini untuk menjaga standar fasilitas sekolah.
                 </p>
                 <button className="bg-white text-green-600 px-6 py-3 rounded-1.5xl font-black text-sm flex items-center gap-2 hover:translate-x-1 transition-all">
                    Baca SOP Lengkap
                    <ArrowUpRight size={16} />
                 </button>
              </div>
           </div>

           <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-xl shadow-green-900/5">
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 border-l-4 border-green-500 pl-4">Aktifitas Terkini</h4>
              <div className="space-y-6">
                 {[1, 2, 3].map(item => (
                   <div key={item} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-300 mt-2 flex-shrink-0"></div>
                      <div>
                         <p className="text-xs font-bold text-gray-700 leading-relaxed">
                            <span className="text-green-600">Admin Sarpras</span> menyelesaikan penanganan laporan keran lab boga.
                         </p>
                         <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase leading-none">5 Menit yang lalu</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
