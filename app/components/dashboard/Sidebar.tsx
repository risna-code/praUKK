"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  FileText, 
  LogOut, 
  Menu, 
  Shield, 
  User, 
  Users,
  MessageSquareQuote,
  BarChart3,
  X,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = pathname.includes("/admin");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinks = isAdmin ? [
    { href: '/dashboard/admin', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { href: '/dashboard/admin/siswa', label: 'Siswa', icon: <Users className="w-5 h-5" /> },
    { href: '/dashboard/admin/admin', label: 'Admin', icon: <User className="w-5 h-5" /> },
    { href: '/dashboard/admin/riwayat-laporan', label: 'Riwayat Laporan', icon: <FileText className="w-5 h-5" /> },
    { href: '/dashboard/admin/riwayat-hapus', label: 'Riwayat Hapus', icon: <Trash2 className="w-5 h-5" /> },
    { href: '/dashboard/admin/testimoni', label: 'Testimoni', icon: <MessageSquareQuote className="w-5 h-5" /> },
    { href: '/dashboard/admin/statistik', label: 'Statistik', icon: <BarChart3 className="w-5 h-5" /> },
  ] : [
    { href: '/dashboard/student', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { href: '/dashboard/student/history', label: 'Riwayat Laporan', icon: <FileText className="w-5 h-5" /> },
    { href: '/dashboard/student/profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-green-50 z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white shadow-lg">
            <Shield size={18} />
          </div>
          <span className="font-black text-green-700 tracking-tight">MOE Panel</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-green-50 text-green-600 active:scale-95 transition-all"
        >
           <Menu size={20} />
        </button>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-60 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-70 p-6 lg:hidden flex flex-col"
            >
               <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-2 text-green-600">
                    <Shield size={24} />
                    <span className="font-black">Menu Navigasi</span>
                  </div>
                  <button onClick={toggleSidebar} className="p-2 rounded-lg bg-gray-50 text-gray-400">
                    <X size={20} />
                  </button>
               </div>
               
               <nav className="flex-1 space-y-2">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href}
                      onClick={toggleSidebar}
                      className={`flex items-center gap-3 px-4 py-4 rounded-2xl font-bold ${
                        pathname === link.href ? 'bg-green-500 text-white' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
               </nav>

               <button 
                  onClick={handleSignOut}
                  className="w-full mt-auto flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-red-500 bg-red-50"
               >
                  <LogOut size={20} />
                  Logout
               </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-72 flex-col h-screen sticky top-0 bg-white border-r border-gray-200 p-6 z-50 flex-shrink-0">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
            <Shield size={22} />
          </div>
          <div>
            <span className="font-black text-gray-800 text-lg block leading-none">MOE Dashboard</span>
            <span className="text-[10px] font-black text-green-600/60 uppercase tracking-widest mt-1 block">
              {isAdmin ? "Administrator" : "Student Access"}
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300 group ${
                  isActive 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                    : 'text-gray-500 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <div className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-500'} transition-colors`}>
                  {link.icon}
                </div>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm mb-6">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-black">
                  {isAdmin ? "AD" : "ST"}
                </div>
                <div className="overflow-hidden">
                   <p className="text-xs font-black text-gray-800 truncate">{isAdmin ? "Admin Sarpras" : "Siswa Sekolah"}</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase truncate">Connected</p>
                </div>
             </div>
          </div>

          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 hover:text-red-500 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
