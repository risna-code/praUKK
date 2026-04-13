"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusCircle, 
  Search, 
  History, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Star,
  Activity,
  Settings,
  X,
  MapPin,
  Calendar,
  MessageSquareQuote,
  Send,
  Paperclip,
  Smile,
  Circle,
  Pencil,
  Timer,
  Upload
} from "lucide-react";

import Link from "next/link";

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTestimonyModalOpen, setIsTestimonyModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // FORM STATES
  const [createForm, setCreateForm] = useState({ subject: "", desc: "", type: "Fasilitas Lab", location: "" });
  const [editForm, setEditForm] = useState({ subject: "", desc: "", type: "" });
  const [testimonyForm, setTestimonyForm] = useState({ text: "", rating: 5 });

  const categories = ["Fasilitas Lab", "Lingkungan", "Ruang Kelas", "Kantin"];
  const statuses = ["Semua", "Proses", "Selesai", "Menunggu"];

  const [reports, setReports] = useState<any[]>([]);
  const [testimony, setTestimony] = useState<any>(null);

  // Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ id: 1, sender: "bot", text: "Halo! Saya Budi dari tim Sarpras. Ada yang bisa saya bantu terkait laporan Anda?", time: "13:10" }]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { scrollToBottom(); }, [chatMessages, isTyping]);

  // HANDLERS
  const handleCreateNewReport = () => {
    const newId = `RPT-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const newReport = {
      id: newId,
      ...createForm,
      status: "Menunggu",
      date: dateStr,
      createdAt: `${dateStr} ${timeStr}`,
      solvedAt: null,
      handlingDuration: null,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&fit=crop",
      lastEditDate: null,
      rating: null,
      ratingComment: "",
      steps: [
        { label: "Lapor", date: now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }), time: timeStr, status: "completed" },
        { label: "Verif", date: "--", time: "--", status: "pending" },
        { label: "Proses", date: "--", time: "--", status: "pending" },
        { label: "Selesai", date: "--", time: "--", status: "pending" },
      ]
    };
    
    setReports([newReport, ...reports]);
    setCreateForm({ subject: "", desc: "", type: "Fasilitas Lab", location: "" });
    setIsCreateModalOpen(false);
  };

  const handleEditReport = (report: any) => {
    setEditForm({ subject: report.subject, desc: report.desc, type: report.type });
    setIsEditModalOpen(true);
  };

  const saveEditedReport = () => {
    setReports(prev => prev.map(r => r.id === selectedReport.id ? { ...r, ...editForm, lastEditDate: new Date().toLocaleDateString('id-ID') } : r));
    setSelectedReport({ ...selectedReport, ...editForm, lastEditDate: "Baru saja" });
    setIsEditModalOpen(false);
  };

  const handleEditTestimony = () => {
     setTestimonyForm({ text: testimony.text, rating: testimony.rating });
     setIsTestimonyModalOpen(true);
  };

  const saveTestimony = () => {
     setTestimony({ ...testimony, text: testimonyForm.text, rating: testimonyForm.rating, date: new Date().toLocaleDateString('id-ID') });
     setIsTestimonyModalOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMsg = { id: Date.now(), sender: "me", text: inputMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages([...chatMessages, newMsg]);
    setInputMessage("");
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
         const reply = { id: Date.now() + 1, sender: "bot", text: "Baik, laporan Anda sedang kami tinjau lebih lanjut. Harap tunggu sebentar ya.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
         setChatMessages(prev => [...prev, reply]);
         setIsTyping(false);
      }, 2000);
    }, 500);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.subject.toLowerCase().includes(searchQuery.toLowerCase()) || report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || report.type === selectedCategory;
    const matchesStatus = selectedStatus === "Semua" || report.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex-1">
           <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-xl text-green-600"><Activity size={24} className="animate-pulse" /></div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">Halo, Siswa! 👋</h1>
           </div>
           <p className="text-gray-500 font-bold text-lg max-w-xl leading-relaxed">Selamat datang kembali. Mari bersama-sama menjaga fasilitas sekolah SMK Muhammadiyah agar tetap prima.</p>
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full md:w-auto bg-green-600 text-white px-8 py-5 rounded-[2rem] shadow-2xl shadow-green-500/30 flex items-center gap-4 group active:scale-95 transition-all"
        >
           <div className="bg-white/20 p-2 rounded-xl"><PlusCircle size={24} /></div>
           <div className="text-left"><span className="block text-xs font-black uppercase tracking-[0.2em] opacity-80">Laporkan Sesuatu</span><span className="block text-lg font-black leading-tight">Buat Pengaduan</span></div>
           <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8 space-y-12">
           {/* Section 1: Laporan Terbaru (Limit 2) */}
           <div id="reports" className="space-y-8">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-3"><History className="text-green-500" size={24} /><h2 className="text-2xl font-black text-gray-800 tracking-tight">Laporan Terbaru</h2></div>
                 <Link href="/dashboard/student/history" className="flex items-center gap-2 text-green-600 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">Lihat Seluruh Riwayat <ArrowRight size={14} /></Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <AnimatePresence mode="popLayout">
                    {filteredReports.slice(0, 2).map((report) => (
                      <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} key={report.id} className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-xl shadow-green-900/5 group hover:shadow-green-500/10 transition-all overflow-hidden flex flex-col h-full">
                         <div className="h-44 w-full relative overflow-hidden">
                            <img src={report.image} alt={report.subject} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            
                            <div className="absolute top-4 left-4">
                               <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/50">
                                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block leading-none mb-1">ID: {report.id}</span>
                                  <span className="text-[10px] font-black text-green-600 uppercase tracking-wider">{report.type}</span>
                               </div>
                            </div>

                            <div className={`absolute top-4 right-4 w-3.5 h-3.5 rounded-full animate-pulse border-2 border-white/50 ${report.status === 'Selesai' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`}></div>
                            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 px-4 gap-4"><div className="flex items-center gap-1.5 text-white/90"><Clock size={10} className="text-green-400" /><span className="text-[8px] font-black uppercase tracking-tighter">Mulai: {report.createdAt.split(' ').slice(0,2).join(' ')} ({report.createdAt.split(' ')[2]})</span></div>{report.solvedAt && (<div className="flex items-center gap-1.5 text-white/90"><CheckCircle2 size={10} className="text-green-400" /><span className="text-[8px] font-black uppercase tracking-tighter">Selesai: {report.solvedAt.split(' ').slice(0,2).join(' ')} ({report.solvedAt.split(' ')[2]})</span></div>)}</div>
                         </div>
                         <div className="p-8 flex-1 flex flex-col">
                            <h3 className="text-xl font-black text-gray-800 leading-tight group-hover:text-green-600 transition-colors mb-4 line-clamp-1">{report.subject}</h3>
                            <div className="mb-8 p-5 bg-gray-50/50 rounded-[2rem] border border-gray-100"><div className="flex items-center justify-between mb-4 px-1"><span className="text-[8px] font-black uppercase text-green-600 tracking-widest opacity-60">Status Tracking</span></div><div className="flex items-center justify-between relative px-2"><div className="absolute left-4 right-4 h-0.5 bg-gray-200 top-2 z-0"></div>{report.steps.map((step: any, idx: number) => (<div key={idx} className="relative z-10 flex flex-col items-center gap-2"><div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm transition-all duration-500 ${step.status === 'completed' ? 'bg-green-500' : step.status === 'active' ? 'bg-amber-400 animate-pulse scale-125' : 'bg-gray-200'}`}></div><div className="flex flex-col items-center"><span className={`text-[7px] font-black uppercase ${step.status === 'active' ? 'text-amber-500' : step.status === 'completed' ? 'text-gray-800' : 'text-gray-300'}`}>{step.label}</span><span className="text-[6px] font-bold text-gray-400 opacity-80">{step.time !== '--' ? `${step.date} (${step.time})` : '--'}</span></div></div>))}</div></div>
                            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">{report.handlingDuration ? (<div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100"><Timer size={12} className="text-green-500" /><span className="text-[9px] font-black text-green-600 uppercase italic">Durasi: {report.handlingDuration}</span></div>) : (<div className="flex items-center gap-2 text-gray-400"><Clock size={14} /><span className="text-[10px] font-black uppercase tracking-widest">{report.date}</span></div>)}<button onClick={() => setSelectedReport(report)} className="px-5 py-2 rounded-xl bg-gray-50 text-[10px] font-black text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm uppercase tracking-widest">Details</button></div>
                         </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>

           {/* Section 2: Testimoni Saya */}
           <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between px-2"><div className="flex items-center gap-3"><MessageSquareQuote className="text-gray-400" size={24} /><h2 className="text-2xl font-black text-gray-800 tracking-tight">Testimoni Saya</h2></div>{testimony && (<button onClick={handleEditTestimony} className="bg-amber-100 text-amber-600 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-amber-600 hover:text-white transition-all shadow-sm"><Pencil size={14} />Edit Testimoni</button>)}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{testimony && (<motion.div layout className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-lg shadow-gray-200/40 relative"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < testimony.rating ? "text-yellow-500 fill-current" : "text-gray-200 font-bold"} />)}</div><p className="text-gray-600 text-lg font-bold leading-relaxed italic">"{testimony.text}"</p><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-8 flex items-center gap-2"><Calendar size={12} /> {testimony.date}</p></motion.div>)}<div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center group shadow-xl shadow-green-500/20"><CheckCircle2 size={40} className="mb-4 opacity-60" /><h4 className="text-xl font-black leading-tight">Masukan Anda Membantu Kami</h4><p className="text-[10px] text-green-50 font-bold mt-3 max-w-[200px] uppercase tracking-widest leading-loose">Hanya 1 Testimoni per Siswa untuk Menjamin Kualitas Feedback.</p></div></div>
           </div>
        </div>

        {/* Right Column: Profile & Info */}
        <div className="lg:col-span-4 space-y-8 sticky top-10">
           <Link href="/dashboard/student/profile" className="block group"><div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-green-900/5 group-hover:-translate-y-2 transition-all group-hover:shadow-green-500/10"><div className="flex flex-col items-center text-center"><div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-green-500 to-emerald-600 p-1 shadow-2xl mb-6 relative"><img src="https://i.pravatar.cc/150?img=11" className="w-full h-full rounded-[1.8rem] object-cover" alt="Siswa Profile" /><div className="absolute -bottom-2 -right-2 bg-white rounded-xl p-1.5 shadow-xl text-green-600 group-hover:scale-110 transition-transform"><Settings size={14} /></div></div><h4 className="text-2xl font-black text-gray-800 tracking-tight">Siswa Sekolah</h4><p className="text-xs font-black text-green-50 uppercase tracking-[0.2em] mt-2 brightness-90">NIS: 202611001</p><div className="grid grid-cols-2 gap-3 w-full mt-10"><div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center"><span className="block text-xl font-black text-gray-800">12</span><span className="block text-[8px] font-black text-gray-400 uppercase mt-1">Laporan</span></div><div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100 flex flex-col items-center"><span className="block text-xl font-black text-amber-600">3</span><span className="block text-[8px] font-black text-amber-500/70 uppercase mt-1">Di Proses</span></div><div className="bg-green-50/50 p-3 rounded-2xl border border-green-100 flex flex-col items-center"><span className="block text-xl font-black text-green-600">8</span><span className="block text-[8px] font-black text-green-500/70 uppercase mt-1">Selesai</span></div><div className="bg-red-50/50 p-3 rounded-2xl border border-red-100 flex flex-col items-center"><span className="block text-xl font-black text-red-600">1</span><span className="block text-[8px] font-black text-red-500/70 uppercase mt-1">Ditolak</span></div></div></div></div></Link>
        </div>
      </div>

      {/* NEW REPORT MODAL */}
      <AnimatePresence>
         {isCreateModalOpen && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCreateModalOpen(false)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer" />
               <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl p-10 z-10 border-4 border-white">
                  <div className="flex items-center gap-4 mb-8"><div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-inner"><PlusCircle size={28} /></div><div><h3 className="text-2xl font-black text-gray-800 tracking-tight leading-none">Buat Aduan Baru</h3><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 leading-none">Laporkan kerusakan fasilitas demi kenyamanan bersama</p></div></div>
                  <div className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Judul Aduan</label><input type="text" placeholder="Contoh: AC Bocor" value={createForm.subject} onChange={(e) => setCreateForm({...createForm, subject: e.target.value})} className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl p-4 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all shadow-sm" /></div>
                        <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Kategori</label><select value={createForm.type} onChange={(e) => setCreateForm({...createForm, type: e.target.value})} className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl p-4 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all shadow-sm cursor-pointer">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                     </div>
                     <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Lokasi Kejadian</label><div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} /><input type="text" placeholder="Contoh: Lab RPL 1" value={createForm.location} onChange={(e) => setCreateForm({...createForm, location: e.target.value})} className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all shadow-sm" /></div></div>
                     <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Detail Kerusakan</label><textarea rows={4} placeholder="Jelaskan secara detail kondisi kerusakan..." value={createForm.desc} onChange={(e) => setCreateForm({...createForm, desc: e.target.value})} className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl p-5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all shadow-sm resize-none" /></div>
                     <div className="p-8 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:bg-green-50/30 transition-all cursor-pointer"><div className="w-12 h-12 bg-white shadow-xl rounded-2xl flex items-center justify-center text-gray-300 group-hover:text-green-500 transition-colors mb-3"><Upload className="w-6 h-6" /></div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Klik untuk Unggah Foto Bukti</p></div>
                  </div>

                  <div className="flex gap-4 mt-8"><button onClick={() => setIsCreateModalOpen(false)} className="flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all">Batal</button><button onClick={handleCreateNewReport} className="flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest bg-green-600 text-white shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-95 transition-all">Kirim Laporan</button></div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* REPORT DETAIL MODAL POPUP */}
      <AnimatePresence>
         {selectedReport && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReport(null)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-md cursor-pointer" />
              <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden z-10 border-4 border-white max-h-[95vh] overflow-y-auto custom-scrollbar">
                 <div className="h-64 w-full relative"><img src={selectedReport.image} className="w-full h-full object-cover" alt="Detail" /><button onClick={() => setSelectedReport(null)} className="absolute top-6 right-6 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all"><X size={20} /></button>{selectedReport.status === 'Selesai' && (<div className="absolute top-6 left-6 bg-green-600 text-white px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20"><Timer size={18} className="fill-current" /><div className="text-left"><p className="text-[8px] font-black uppercase opacity-70 leading-none mb-1">Total Waktu</p><p className="text-sm font-black leading-none">{selectedReport.handlingDuration}</p></div></div>)}<div className="absolute bottom-6 left-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl border border-white shadow-xl flex items-center gap-6"><div><span className="text-[10px] font-black text-green-600 uppercase tracking-widest">ID: {selectedReport.id}</span><h3 className="text-2xl font-black text-gray-800 leading-tight mt-1">{selectedReport.subject}</h3></div>{selectedReport.status !== 'Selesai' && (<button onClick={() => handleEditReport(selectedReport)} className="p-3 bg-green-600 text-white rounded-2xl shadow-lg hover:scale-110 transition-all"><Pencil size={20} /></button>)}</div></div>
                 <div className="p-10 space-y-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-1"><span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Lokasi</span><div className="flex items-center gap-2"><MapPin size={12} className="text-green-500" /><span className="text-[10px] font-bold text-gray-700">{selectedReport.location}</span></div></div>
                       <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-1"><span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Status</span><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${selectedReport.status === 'Selesai' ? 'bg-green-500' : 'bg-amber-400'}`}></div><span className="text-[10px] font-black uppercase text-gray-700">{selectedReport.status}</span></div></div>
                       {selectedReport.solvedAt && (<div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex flex-col gap-1"><span className="text-[8px] font-black text-green-600 uppercase tracking-widest">Ditutup</span><div className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-600" /><span className="text-[10px] font-black text-green-700">{selectedReport.solvedAt}</span></div></div>)}
                    </div>
                    <div className="space-y-4"><h4 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Timeline Penanganan (Per Jam)</h4><div className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100/50"><div className="flex items-center justify-between relative px-6 text-center"><div className="absolute left-12 right-12 h-1 bg-gray-200 top-3 z-0"></div>{selectedReport.steps.map((step: any, idx: number) => (<div key={idx} className="relative z-10 flex flex-col items-center gap-3"><div className={`w-6 h-6 rounded-full border-4 border-white shadow-md transition-all duration-700 ${step.status === 'completed' ? 'bg-green-500 scale-110' : step.status === 'active' ? 'bg-amber-400 animate-pulse scale-125' : 'bg-gray-200'}`}></div><div className="flex flex-col items-center"><span className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'active' ? 'text-amber-500' : step.status === 'completed' ? 'text-gray-800' : 'text-gray-300'}`}>{step.label}</span><span className="text-[9px] font-bold text-gray-500 mt-1">{step.date}</span><span className="text-[8px] font-black text-green-600/60 leading-none">{step.time !== '--' ? `Pkl ${step.time}` : ''}</span></div></div>))}</div></div></div>{selectedReport.status === 'Selesai' && (<div className="space-y-6 bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-[3rem] border border-green-100 flex flex-col items-center"><h4 className="text-sm font-black text-green-600 uppercase tracking-[0.2em]">Feedback & Penilaian</h4><div className="flex gap-4">{[1, 2, 3, 4, 5].map((s) => (<button key={s} onClick={() => setReports(prev => prev.map(r => r.id === selectedReport.id ? { ...r, rating: s } : r))} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${(reports.find(r => r.id === selectedReport.id)?.rating || 0) >= s ? 'bg-yellow-400 text-white shadow-xl shadow-yellow-200 scale-110' : 'bg-white text-gray-200 border border-gray-100 hover:scale-110'}`}><Star size={30} className={ (reports.find(r => r.id === selectedReport.id)?.rating || 0) >= s ? 'fill-current' : '' } /></button>))}</div><div className="w-full space-y-3"><label className="text-[10px] font-black text-green-700/60 uppercase tracking-widest ml-4">Alasan Anda</label><textarea placeholder="Berikan alasan penilaian Anda..." value={reports.find(r => r.id === selectedReport.id)?.ratingComment || ""} onChange={(e) => { const val = e.target.value; setReports(prev => prev.map(r => r.id === selectedReport.id ? { ...r, ratingComment: val } : r)); }} className="w-full bg-white/80 border border-green-100 rounded-3xl p-6 text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-green-400/10 resize-none shadow-sm" rows={3}/></div></div>)}<div className="space-y-3"><h4 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Deskripsi Kejadian</h4><p className="text-gray-600 font-bold leading-relaxed bg-gray-50/50 p-8 rounded-[3rem] border border-gray-100/50 italic text-lg">"{selectedReport.desc}"</p></div><div className="flex items-center justify-between pt-10 border-t border-gray-100"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner"><ShieldCheck size={24} /></div><div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Tim</p><p className="text-sm font-black text-gray-800">Verifikasi Teknisi Berhasil</p></div></div><button onClick={() => { setSelectedReport(null); setIsChatOpen(true); }} className="bg-green-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-600/30 hover:scale-105 active:scale-95 transition-all">Hubungi Petugas</button></div></div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* EDIT MODALS & CHAT */}
      {/* ... (Existing Edit/Testimony/Chat logic remains the same) */}
      <AnimatePresence>
         {isChatOpen && (
           <>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsChatOpen(false)} className="fixed inset-0 z-[110] bg-gray-900/40 backdrop-blur-sm" />
             <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[120] shadow-2xl border-l border-gray-100 flex flex-col"><div className="p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-between shadow-xl"><div className="flex items-center gap-4"><div className="relative"><div className="w-12 h-12 rounded-2xl bg-white/20 p-1 backdrop-blur-md"><img src="https://i.pravatar.cc/150?img=12" className="w-full h-full rounded-xl object-cover" alt="Petugas" /></div><div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-green-600 flex items-center justify-center"><Circle size={4} className="fill-white text-white" /></div></div><div><h4 className="font-black tracking-tight leading-none">Pak Budi</h4><p className="text-[10px] font-bold text-green-100 uppercase tracking-widest mt-1.5 flex items-center gap-1.5"><Circle size={6} className="fill-current" /> Teknisi Sarpras (Online)</p></div></div><button onClick={() => setIsChatOpen(false)} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><X size={20} /></button></div><div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">{chatMessages.map((msg) => (<div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm ${msg.sender === 'me' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'}`}><p className="font-bold leading-relaxed">{msg.text}</p><span className={`text-[9px] mt-2 block font-black opacity-60 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>{msg.time}</span></div></div>))}{isTyping && (<div className="flex justify-start"><div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div><div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div><div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div></div></div>)}<div ref={chatEndRef} /></div><div className="p-6 border-t border-gray-100 bg-white"><div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-green-100 transition-all"><button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-green-600 transition-all"><Paperclip size={20} /></button><input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Tulis pesan..." className="flex-1 bg-transparent border-none outline-none font-bold text-gray-700 placeholder:text-gray-300 text-sm" /><button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-green-600 transition-all"><Smile size={20} /></button><button onClick={handleSendMessage} disabled={!inputMessage.trim()} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${inputMessage.trim() ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-gray-100 text-gray-300'}`}><Send size={18} /></button></div></div></motion.div>
           </>
         )}
      </AnimatePresence>
    </div>
  );
}
