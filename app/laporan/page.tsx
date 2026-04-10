import React from "react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { FileWarning } from "lucide-react";

export default function LaporanPage() {
  return (
    <>
      <Navbar />
      <div className="flex-1 bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto" data-aos="fade-up">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Buat Laporan Baru</h1>
            <p className="text-gray-600 mt-2">Masukan detail keluhan atau kerusakan fasilitas di bawah ini.</p>
          </div>
          
          <Card className="shadow-2xl shadow-green-900/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Lokasi Fasilitas" 
                  placeholder="Contoh: Lab Komputer 1, Kamar Mandi Kiri" 
                  type="text" 
                  required
                />
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Kategori</span>
                  </label>
                  <select className="select select-bordered w-full" defaultValue="" required>
                    <option value="" disabled>Pilih kategori fasilitas</option>
                    <option value="kelas">Kelas</option>
                    <option value="kamar mandi">Kamar Mandi</option>
                    <option value="lab rpl">Lab RPL</option>
                    <option value="lab boga">Lab Boga</option>
                    <option value="lab busana">Lab Busana</option>
                    <option value="lab perhotelan">Lab Perhotelan</option>
                    <option value="ruang pertemuan">Ruang Pertemuan</option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Keterangan / Deskripsi Kerusakan</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered h-32 w-full" 
                  placeholder="Jelaskan secara detail kerusakan yang terjadi (misal: AC tidak dingin dan meneteskan air)"
                  required
                ></textarea>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Bukti Foto (Opsional)</span>
                </label>
                <input type="file" className="file-input file-input-bordered file-input-primary w-full" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" type="button">Batal</Button>
                <Button type="submit" className="gap-2 px-8 shadow-lg shadow-green-500/30">
                  <FileWarning size={18} />
                  Kirim Laporan
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
