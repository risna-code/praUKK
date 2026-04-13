"use client";

import React from "react";
import { Shield, Mail, Phone, MapPin, Globe, MessageSquare, Send } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const socialIcons = [
    { Icon: MessageSquare, label: "WhatsApp", id: "social-wa" },
    { Icon: Globe, label: "Website", id: "social-web" },
    { Icon: Send, label: "Telegram", id: "social-tg" }
  ];

  return (
    <footer className="relative mt-20 pb-12 px-4 overflow-hidden" suppressHydrationWarning>
      {/* Decorative Top Line Gradient */}
      <div className="max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-green-200 to-transparent mb-12 opacity-50"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 text-green-600 group">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-green-900/5 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-full h-full" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight block">Pengaduan MOE</span>
                <span className="text-[10px] font-black text-green-500/60 uppercase tracking-[0.3em]">Muhammadiyah School System</span>
              </div>
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
              Mewujudkan transparansi pemeliharaan sarana prasarana sekolah demi kenyamanan belajar mengajar yang modern dan amanah.
            </p>
            <div className="flex items-center gap-4" suppressHydrationWarning>
               {socialIcons.map(({ Icon, label, id }) => (
                  <button 
                    key={id}
                    type="button"
                    aria-label={label}
                    suppressHydrationWarning
                    className="w-10 h-10 rounded-xl bg-white shadow-md shadow-green-900/5 flex items-center justify-center text-gray-400 hover:text-green-500 hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </button>
               ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-6">
            <h6 className="text-xs font-black text-gray-400 uppercase tracking-widest border-l-2 border-green-500 pl-3">Navigasi Cepat</h6>
            <ul className="space-y-4">
              {['Beranda', 'Tentang', 'Laporan', 'Testimoni'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-gray-600 font-bold hover:text-green-500 transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-200 group-hover:bg-green-500 transition-colors"></div>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-6">
            <h6 className="text-xs font-black text-gray-400 uppercase tracking-widest border-l-2 border-green-500 pl-3">Hubungi Kami</h6>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform shrink-0">
                  <Phone size={14} />
                </div>
                <span className="text-sm font-bold text-gray-600">0812-3456-7890 <span className="text-gray-400 font-medium block mt-1">(WhatsApp Official)</span></span>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform shrink-0">
                  <Mail size={14} />
                </div>
                <span className="text-sm font-bold text-gray-600 underline underline-offset-4 decoration-green-100 group-hover:decoration-green-400 transition-all cursor-pointer">info@smkmuhammadiyah.sch.id</span>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform shrink-0">
                  <MapPin size={14} />
                </div>
                <span className="text-sm font-bold text-gray-600 leading-relaxed max-w-[200px]">Jalan Pendidikan No. 1, D.I. Yogyakarta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-green-600">SMK Muhammadiyah</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-green-500 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-green-500 transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
      
      {/* Decorative Orbs for Footer */}
      <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-green-400/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none"></div>
    </footer>
  );
};
