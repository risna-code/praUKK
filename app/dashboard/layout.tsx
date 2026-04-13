"use client";

import React from "react";
import { Sidebar } from "../components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f4fbf7]">
      {/* DASHBOARD CONTENT */}
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
