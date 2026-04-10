"use client";

import React, { useState } from "react";
import { Navbar } from "./components/landing/Navbar";
import { Hero } from "./components/landing/Hero";
import { About } from "./components/landing/About";
import { Laporan } from "./components/landing/Laporan";
import { Testimoni } from "./components/landing/Testimoni";
import { Footer } from "./components/landing/Footer";
import { LoginModal } from "./components/auth/LoginModal";

export default function Home() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleOpenLogin = () => setLoginOpen(true);
  const handleCloseLogin = () => setLoginOpen(false);

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Navbar onLoginClick={handleOpenLogin} />
      
      <main className="flex-1 flex flex-col master-bg relative">
        {/* SHARED MASTER BACKGROUND DECORATIONS */}
        <div className="absolute top-[5%] -left-[10%] w-[700px] h-[700px] bg-green-400/30 rounded-full mix-blend-multiply blur-[160px] z-0 animate-pulse"></div>
        <div className="absolute top-[18%] -right-[10%] w-[600px] h-[600px] bg-emerald-400/30 rounded-full mix-blend-multiply blur-[140px] z-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[45%] left-[15%] w-[800px] h-[800px] bg-lime-300/30 rounded-full mix-blend-multiply blur-[180px] z-0 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[70%] -left-[20%] w-[900px] h-[900px] bg-green-300/30 rounded-full mix-blend-multiply blur-[200px] z-0 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-[15%] -right-[15%] w-[750px] h-[750px] bg-emerald-300/30 rounded-full mix-blend-multiply blur-[160px] z-0 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-[5%] left-[0%] w-[650px] h-[650px] bg-green-400/25 rounded-full mix-blend-multiply blur-[140px] z-0 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* MISTY OVERLAY */}
        <div className="absolute inset-0 z-0 backdrop-blur-[2px] pointer-events-none opacity-50"></div>

        <div className="relative z-10">
          <Hero />
          <About />
          <Laporan onLoginClick={handleOpenLogin} />
          <Testimoni />
        </div>
      </main>

      <Footer />

      {/* GLOBAL LOGIN MODAL */}
      <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} />
    </div>
  );
}
