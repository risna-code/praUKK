"use client";

import React from "react";
import { Sidebar } from "../components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f4fbf7] overflow-hidden">
      {/* SHARED MASTER BACKGROUND DECORATIONS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] -left-[5%] w-[600px] h-[600px] bg-green-200/20 rounded-full mix-blend-multiply blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[0%] w-[500px] h-[500px] bg-emerald-200/20 rounded-full mix-blend-multiply blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#22c55e 0.5px, transparent 0.5px)', backgroundSize: '32px 32px', opacity: 0.05 }}></div>
      </div>

      {/* DASHBOARD CONTENT */}
      <Sidebar />
      
      <main className="flex-1 relative z-10 overflow-y-auto h-screen custom-scrollbar p-4 md:p-8 pt-20 lg:pt-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
