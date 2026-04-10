import React from "react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md" data-aos="zoom-in">
          <Card>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-green-100 text-primary rounded-full flex items-center justify-center mb-4">
                 <Shield size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Login Administrator</h1>
              <p className="text-sm text-gray-500 mt-2">Masuk untuk mengelola laporan dan fasilitas</p>
            </div>
            
            <form className="space-y-4">
              <Input 
                label="Username / NIS" 
                placeholder="Masukkan username" 
                type="text" 
              />
              <Input 
                label="Password" 
                placeholder="••••••••" 
                type="password" 
              />
              <div className="flex justify-end pt-1">
                 <Link href="#" className="text-xs text-primary hover:underline">Lupa password?</Link>
              </div>
              <div className="pt-4">
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full shadow-lg shadow-green-500/30">
                    Masuk
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-primary transition-colors">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
