'use client'

import { useState, useMemo } from 'react'
import { Trash2, RotateCcw, Eye, X } from 'lucide-react'

export default function RiwayatHapusPage() {
  const [alasanFilter, setAlasanFilter] = useState('semua')
  const [deletedSiswa] = useState<any[]>([])

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentSiswa, setCurrentSiswa] = useState<any>(null)

  const filteredSiswa = useMemo(() => {
    return deletedSiswa.filter(siswa => 
      alasanFilter === 'semua' || siswa.alasan === alasanFilter
    )
  }, [deletedSiswa, alasanFilter])

  const handleViewDetail = (siswa: any) => {
    setCurrentSiswa(siswa)
    setShowDetailModal(true)
  }

  const handleRestore = (siswa: any) => {
    console.log("Memulihkan siswa:", siswa.nama)
  }

  const getAlasanColor = (alasan: string) => {
    if (alasan === 'Alumni') return 'bg-blue-100 text-blue-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Riwayat Hapus</h1>
        <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]">Data Siswa yang Telah Dihapus</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select 
          value={alasanFilter} 
          onChange={(e) => setAlasanFilter(e.target.value)} 
          className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500"
        >
          <option value="semua">Filter Status (Semua)</option>
          <option value="Alumni">Alumni</option>
          <option value="Keluar">Keluar</option>
        </select>
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          Total: {filteredSiswa.length} Siswa
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold">{filteredSiswa.length} Siswa</p>
            <p className="text-red-100 text-sm">Data yang ditampilkan</p>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-2xl shadow-red-900/5 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Nama</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">NIS</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Kelas</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Jurusan</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Status</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Angkatan</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Tanggal</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/50">
            {filteredSiswa.map((siswa) => (
              <tr key={siswa.id} className="hover:bg-red-50/30 transition-colors">
                <td className="py-5 px-2">
                  <div className="flex items-center gap-3">
                    <img src={siswa.fotoProfil} alt={siswa.nama} className="w-10 h-10 rounded-xl object-cover border border-white shadow-sm opacity-60" />
                    <span className="font-bold text-gray-600">{siswa.nama}</span>
                  </div>
                </td>
                <td className="py-5 px-2 text-sm font-bold text-gray-500">{siswa.nis}</td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-400">{siswa.kelas}</td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-400">{siswa.jurusan}</td>
                <td className="py-5 px-2">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full ${getAlasanColor(siswa.alasan)}`}>
                    {siswa.alasan}
                  </span>
                </td>
                <td className="py-5 px-2 text-sm font-bold text-gray-600">{siswa.angkatan}</td>
                <td className="py-5 px-2 text-sm text-gray-500">{siswa.tanggalHapus}</td>
                <td className="py-5 px-2">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewDetail(siswa)}
                      className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:bg-blue-100"
                    >
                      <Eye size={12} />Detail
                    </button>
                    <button 
                      onClick={() => handleRestore(siswa)}
                      className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-green-50 text-green-600 uppercase tracking-widest flex items-center gap-1 hover:bg-green-100"
                    >
                      <RotateCcw size={12} />Pulihkan
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredSiswa.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada data yang ditemukan</p>
          </div>
        )}
      </div>

      {showDetailModal && currentSiswa && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Detail Siswa Terhapus</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-white hover:bg-white/20 rounded-lg p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <img src={currentSiswa.fotoProfil} alt={currentSiswa.nama} className="w-20 h-20 rounded-xl object-cover border-2 border-red-500 opacity-60" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{currentSiswa.nama}</h3>
                  <p className="text-gray-500">NIS: {currentSiswa.nis}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Kelas</p>
                  <p className="text-lg font-bold text-gray-800">{currentSiswa.kelas}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Jurusan</p>
                  <p className="text-lg font-bold text-gray-800">{currentSiswa.jurusan}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getAlasanColor(currentSiswa.alasan)}`}>
                    {currentSiswa.alasan}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Angkatan</p>
                  <p className="text-lg font-bold text-gray-800">{currentSiswa.angkatan}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Tanggal</p>
                  <p className="text-lg font-bold text-gray-800">{currentSiswa.tanggalHapus}</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button onClick={() => setShowDetailModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Tutup</button>
                <button onClick={() => handleRestore(currentSiswa)} className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center gap-2">
                  <RotateCcw size={16} />
                  Pulihkan Siswa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
