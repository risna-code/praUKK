import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AOSInit } from "./components/AOSInit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistem Pengaduan Sekolah Muhammadiyah",
  description: "Layanan pengaduan fasilitas dan layanan sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-base-100 flex flex-col`}>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
