"use client";

import { useMemo, useState } from "react";
import { Download, Star } from "lucide-react";
import { jurusan, kelas, ratings, users } from "../dummy-data";

export default function TestimoniPage() {
  const [jenisFilter, setJenisFilter] = useState("semua");
  const [kelasFilter, setKelasFilter] = useState("semua");
  const [jurusanFilter, setJurusanFilter] = useState("semua");
  const [ratingFilter, setRatingFilter] = useState("semua");

  const rows = useMemo(
    () =>
      ratings
        .map((rating) => {
          const siswa = users.find((user) => user.id === rating.userId);
          return {
            ...rating,
            siswaNama: siswa?.nama ?? "-",
            fotoProfil: siswa?.fotoProfil ?? "https://i.pravatar.cc/120?img=1",
            kelasNama: kelas.find((item) => item.id === siswa?.kelasId)?.nama ?? "-",
            jurusanNama: jurusan.find((item) => item.id === siswa?.jurusanId)?.nama ?? "-",
          };
        })
        .filter((item) => (jenisFilter === "semua" ? true : item.jenis === jenisFilter))
        .filter((item) => (kelasFilter === "semua" ? true : item.kelasNama === kelasFilter))
        .filter((item) => (jurusanFilter === "semua" ? true : item.jurusanNama === jurusanFilter))
        .filter((item) => (ratingFilter === "semua" ? true : String(item.rating) === ratingFilter)),
    [jenisFilter, kelasFilter, jurusanFilter, ratingFilter],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Testimoni</h1>
          <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]">Feedback Pengguna Sistem</p>
        </div>
        <button className="bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 w-fit">
          <Download size={15} /> Cetak PDF
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select value={jenisFilter} onChange={(event) => setJenisFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Jenis Testimoni</option>
          <option value="Testimoni aplikasi">Testimoni aplikasi</option>
          <option value="Testimoni laporan">Testimoni laporan</option>
        </select>
        <select value={kelasFilter} onChange={(event) => setKelasFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Kelas</option>
          {kelas.map((item) => (
            <option key={item.id} value={item.nama}>{item.nama}</option>
          ))}
        </select>
        <select value={jurusanFilter} onChange={(event) => setJurusanFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Jurusan</option>
          {jurusan.map((item) => (
            <option key={item.id} value={item.nama}>{item.nama}</option>
          ))}
        </select>
        <select value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Rating</option>
          <option value="5">Bintang 5</option>
          <option value="4">Bintang 4</option>
          <option value="3">Bintang 3</option>
          <option value="2">Bintang 2</option>
          <option value="1">Bintang 1</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rows.map((item) => (
          <div key={item.id} className="bg-white/70 backdrop-blur-xl rounded-4xl border border-white p-6 shadow-xl shadow-green-900/5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <img src={item.fotoProfil} alt={item.siswaNama} className="w-10 h-10 rounded-xl object-cover border border-white shadow-sm" />
                  <p className="font-black text-gray-800">{item.siswaNama}</p>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.kelasNama} - {item.jurusanNama}</p>
              </div>
              <span className="text-[10px] font-black bg-green-50 text-green-700 px-3 py-1 rounded-full uppercase tracking-widest">{item.jenis}</span>
            </div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, index) => (
                <Star key={`${item.id}-${index}`} size={14} className={index < item.rating ? "text-yellow-500 fill-current" : "text-gray-200"} />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-600 leading-relaxed">"{item.testimoni}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
