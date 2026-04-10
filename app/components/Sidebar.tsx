"use client";

import React from 'react';
import Link from 'next/link';
import { Home, FileText, CheckCircle, LogOut, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { href: '/dashboard/laporan', label: 'Data Laporan', icon: <FileText className="w-5 h-5" /> },
    { href: '/dashboard/selesai', label: 'Laporan Selesai', icon: <CheckCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        {/* Page content here */}
        <div className="navbar bg-base-100 shadow-sm lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <Menu className="w-6 h-6"/>
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold text-primary">Admin Panel</span>
          </div>
        </div>
        <main className="p-4 md:p-6 flex-1">
          {children}
        </main>
      </div> 
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content border-r border-gray-100">
          {/* Sidebar content here */}
          <div className="flex items-center gap-2 mb-6 px-4 py-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">M</div>
            <span className="font-bold text-xl text-primary">PengaduanKu</span>
          </div>
          {navLinks.map((link) => (
             <li key={link.href} className="mb-2">
               <Link href={link.href} className={`flex gap-3 hover:bg-green-50 ${pathname === link.href ? 'bg-primary text-white hover:bg-primary' : ''}`}>
                 {link.icon}
                 {link.label}
               </Link>
             </li>
          ))}
          <li className="mt-auto">
            <Link href="/" className="text-error hover:bg-red-50 flex gap-3">
              <LogOut className="w-5 h-5" />
              Keluar
            </Link>
          </li>
        </ul>
      
      </div>
    </div>
  );
};
