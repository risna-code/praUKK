"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil, PlusCircle, Trash2, Users, X, CheckSquare, Square, ArrowUpCircle } from "lucide-react";
import { jurusan, kelas, reports, siswaList } from "../dummy-data";

export default function SiswaPage() {
  const [kelasFilter, setKelasFilter] = useState("semua");
  const [jurusanFilter, setJurusanFilter] = useState("semua");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [selectedSiswa, setSelectedSiswa] = useState<number[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showNaikKelasModal, setShowNaikKelasModal] = useState(false);
  const [showAddSiswaModal, setShowAddSiswaModal] = useState(false);
  const [currentSiswa, setCurrentSiswa] = useState<any>(null);
  const [editForm, setEditForm] = useState({ nama: "", nis: "", kelasId: 0, jurusanId: 0, angkatan: 2026 });
  const [addSiswaForm, setAddSiswaForm] = useState({ nama: "", nis: "", kelasId: 1, jurusanId: 1, angkatan: 2026 });

  const siswaRows = useMemo(
    () =>
      siswaList
        .map((siswa) => {
          const kelasSiswa = kelas.find((item) => item.id === siswa.kelasId)?.nama ?? "-";
          const jurusanSiswa = jurusan.find((item) => item.id === siswa.jurusanId)?.nama ?? "-";
          const jumlahLaporan = reports.filter((report) => report.userId === siswa.id).length;
          return { ...siswa, kelasSiswa, jurusanSiswa, jumlahLaporan };
        })
        .filter((siswa) => (kelasFilter === "semua" ? true : siswa.kelasSiswa === kelasFilter))
        .filter((siswa) => (jurusanFilter === "semua" ? true : siswa.jurusanSiswa === jurusanFilter))
        .filter((siswa) => (statusFilter === "semua" ? true : siswa.status === statusFilter))
        .sort((a, b) => b.jumlahLaporan - a.jumlahLaporan),
    [kelasFilter, jurusanFilter, statusFilter],
  );

  const handleSelectAll = () => {
    if (selectedSiswa.length === siswaRows.length) {
      setSelectedSiswa([]);
    } else {
      setSelectedSiswa(siswaRows.map(s => s.id));
    }
  };

  const handleSelectSiswa = (id: number) => {
    if (selectedSiswa.includes(id)) {
      setSelectedSiswa(selectedSiswa.filter(sid => sid !== id));
    } else {
      setSelectedSiswa([...selectedSiswa, id]);
    }
  };

  const handleViewDetail = (siswa: any) => {
    setCurrentSiswa(siswa);
    setShowDetailModal(true);
  };

  const handleEdit = (siswa: any) => {
    setCurrentSiswa(siswa);
    setEditForm({ nama: siswa.nama, nis: siswa.nis, kelasId: siswa.kelasId, jurusanId: siswa.jurusanId, angkatan: siswa.angkatan });
    setShowEditModal(true);
  };

  const handleDelete = (siswa: any) => {
    setCurrentSiswa(siswa);
    setShowDeleteModal(true);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteModal(true);
  };

  const handleNaikKelas = () => {
    setShowNaikKelasModal(true);
  };

  const confirmDelete = () => {
    console.log("Menghapus siswa:", currentSiswa.nama);
    setShowDeleteModal(false);
  };

  const confirmBulkDelete = () => {
    console.log("Menghapus siswa:", selectedSiswa);
    setSelectedSiswa([]);
    setShowBulkDeleteModal(false);
  };

  const confirmNaikKelas = () => {
    console.log("Menaikkan kelas siswa:", selectedSiswa);
    setSelectedSiswa([]);
    setShowNaikKelasModal(false);
  };

  const saveEdit = () => {
    console.log("Menyimpan perubahan:", editForm);
    setShowEditModal(false);
  };

  const handleAddSiswa = () => {
    if (addSiswaForm.nama.trim() && addSiswaForm.nis.trim()) {
      console.log("Menambah siswa baru:", addSiswaForm);
      setAddSiswaForm({ nama: "", nis: "", kelasId: 1, jurusanId: 1, angkatan: 2026 });
      setShowAddSiswaModal(false);
    } else {
      alert('Harap isi semua field!');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Siswa</h1>
          <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]">Kelola Data Siswa</p>
        </div>
        <div className="flex gap-2">
          {selectedSiswa.length > 0 && (
            <>
              <button 
                onClick={handleNaikKelas}
                className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 w-fit"
              >
                <ArrowUpCircle size={15} /> Naik Kelas {selectedSiswa.length} Siswa
              </button>
              <button 
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 w-fit"
              >
                <Trash2 size={15} /> Hapus {selectedSiswa.length} Siswa
              </button>
            </>
          )}
          <button 
            onClick={() => setShowAddSiswaModal(true)}
            className="bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 w-fit"
          >
            <PlusCircle size={15} /> Tambah Siswa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <select value={kelasFilter} onChange={(event) => setKelasFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Kelas (Semua)</option>
          {kelas.map((item) => (
            <option key={item.id} value={item.nama}>{item.nama}</option>
          ))}
        </select>
        <select value={jurusanFilter} onChange={(event) => setJurusanFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Jurusan (Semua)</option>
          {jurusan.map((item) => (
            <option key={item.id} value={item.nama}>{item.nama}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Status (Semua)</option>
          <option value="aktif">Aktif</option>
          <option value="alumni">Alumni</option>
          <option value="nonaktif">Non-Aktif</option>
        </select>
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">Sorting Laporan Terbanyak</div>
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
          <Users size={14} /> Total Siswa {siswaRows.length}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-2xl shadow-green-900/5 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 px-2">
                <button onClick={handleSelectAll} className="text-gray-400 hover:text-green-600">
                  {selectedSiswa.length === siswaRows.length ? <CheckSquare size={18} /> : <Square size={18} />}
                </button>
              </th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Nama</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">NIS</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Kelas</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Jurusan</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Status</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Angkatan</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Jumlah Laporan</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/50">
            {siswaRows.map((siswa) => (
              <tr key={siswa.id} className="hover:bg-green-50/30 transition-colors">
                <td className="py-5 px-2">
                  <button onClick={() => handleSelectSiswa(siswa.id)} className="text-gray-400 hover:text-green-600">
                    {selectedSiswa.includes(siswa.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                  </button>
                </td>
                <td className="py-5 px-2">
                  <div className="flex items-center gap-3">
                    <img src={siswa.fotoProfil} alt={siswa.nama} className="w-10 h-10 rounded-xl object-cover border border-white shadow-sm" />
                    <span className="font-bold text-gray-800">{siswa.nama}</span>
                  </div>
                </td>
                <td className="py-5 px-2 text-sm font-bold text-gray-600">{siswa.nis}</td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-500">{siswa.kelasSiswa}</td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-500">{siswa.jurusanSiswa}</td>
                <td className="py-5 px-2">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                    siswa.status === 'alumni' ? 'bg-blue-50 text-blue-600' : 
                    siswa.status === 'aktif' ? 'bg-green-50 text-green-600' : 
                    'bg-gray-50 text-gray-600'
                  }`}>{siswa.status.toUpperCase()}</span>
                </td>
                <td className="py-5 px-2 text-sm font-bold text-gray-600">{siswa.angkatan}</td>
                <td className="py-5 px-2"><span className="text-[10px] font-black bg-green-50 text-green-600 px-3 py-1 rounded-full">{siswa.jumlahLaporan}</span></td>
                <td className="py-5 px-2">
                  <div className="flex gap-2">
                    <button onClick={() => handleViewDetail(siswa)} className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:bg-blue-100"><Eye size={12} />Detail</button>
                    <button onClick={() => handleEdit(siswa)} className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-amber-50 text-amber-600 uppercase tracking-widest flex items-center gap-1 hover:bg-amber-100"><Pencil size={12} />Edit</button>
                    <button onClick={() => handleDelete(siswa)} className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-red-50 text-red-600 uppercase tracking-widest flex items-center gap-1 hover:bg-red-100"><Trash2 size={12} />Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailModal && currentSiswa && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Detail Siswa</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-white hover:bg-white/20 rounded-lg p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <img src={currentSiswa.fotoProfil} alt={currentSiswa.nama} className="w-20 h-20 rounded-xl object-cover border-2 border-green-500" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{currentSiswa.nama}</h3>
                  <p className="text-gray-500">NIS: {currentSiswa.nis}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Kelas</p>
                  <p className="text-lg font-bold text-gray-800">{currentSiswa.kelasSiswa}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Jurusan</p>
                  <p className="text-lg font-bold text-gray-800">{currentSiswa.jurusanSiswa}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    currentSiswa.status === 'alumni' ? 'bg-blue-100 text-blue-700' : 
                    currentSiswa.status === 'aktif' ? 'bg-green-100 text-green-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>{currentSiswa.status.toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Angkatan</p>
                  <p className="text-lg font-bold text-gray-800">{currentSiswa.angkatan}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Akses Login</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    currentSiswa.isAktif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>{currentSiswa.isAktif ? 'AKTIF' : 'NONAKTIF'}</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Total Laporan</p>
                  <p className="text-lg font-bold text-gray-800">{currentSiswa.jumlahLaporan}</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button onClick={() => setShowDetailModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && currentSiswa && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Edit Siswa</h2>
              <button onClick={() => setShowEditModal(false)} className="text-white hover:bg-white/20 rounded-lg p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama</label>
                <input type="text" value={editForm.nama} onChange={(e) => setEditForm({...editForm, nama: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">NIS</label>
                <input type="text" value={editForm.nis} onChange={(e) => setEditForm({...editForm, nis: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Angkatan</label>
                <input type="number" value={editForm.angkatan} onChange={(e) => setEditForm({...editForm, angkatan: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kelas</label>
                  <select value={editForm.kelasId} onChange={(e) => setEditForm({...editForm, kelasId: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500">
                    {kelas.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Jurusan</label>
                  <select value={editForm.jurusanId} onChange={(e) => setEditForm({...editForm, jurusanId: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500">
                    {jurusan.map(j => <option key={j.id} value={j.id}>{j.nama}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button onClick={() => setShowEditModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                <button onClick={saveEdit} className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && currentSiswa && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Konfirmasi Hapus</h2>
              <button onClick={() => setShowDeleteModal(false)} className="text-white hover:bg-white/20 rounded-lg p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">Apakah Anda yakin ingin menghapus siswa <span className="font-bold">{currentSiswa.nama}</span>?</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowDeleteModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                <button onClick={confirmDelete} className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBulkDeleteModal && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Konfirmasi Hapus Massal</h2>
              <button onClick={() => setShowBulkDeleteModal(false)} className="text-white hover:bg-white/20 rounded-lg p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">Apakah Anda yakin ingin menghapus <span className="font-bold">{selectedSiswa.length} siswa</span> yang dipilih? (Lulus/Keluar)</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowBulkDeleteModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                <button onClick={confirmBulkDelete} className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700">Hapus Semua</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNaikKelasModal && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ArrowUpCircle size={24} />
                Konfirmasi Naik Kelas
              </h2>
              <button onClick={() => setShowNaikKelasModal(false)} className="text-white hover:bg-white/20 rounded-lg p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">Apakah Anda yakin ingin menaikkan kelas <span className="font-bold">{selectedSiswa.length} siswa</span> yang dipilih?</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 font-bold mb-2">Perubahan yang akan terjadi:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Kelas 10 → Kelas 11</li>
                  <li>• Kelas 11 → Kelas 12</li>
                  <li>• Kelas 12 → Alumni (Lulus)</li>
                </ul>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowNaikKelasModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                <button onClick={confirmNaikKelas} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2">
                  <ArrowUpCircle size={16} />
                  Naik Kelas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddSiswaModal && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Tambah Siswa Baru</h2>
              <button onClick={() => setShowAddSiswaModal(false)} className="text-white hover:bg-white/20 rounded-lg p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={addSiswaForm.nama}
                  onChange={(e) => setAddSiswaForm({...addSiswaForm, nama: e.target.value})}
                  placeholder="Contoh: Ahmad Rizki"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">NIS <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={addSiswaForm.nis}
                  onChange={(e) => setAddSiswaForm({...addSiswaForm, nis: e.target.value})}
                  placeholder="Contoh: 1001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kelas</label>
                  <select
                    value={addSiswaForm.kelasId}
                    onChange={(e) => setAddSiswaForm({...addSiswaForm, kelasId: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {kelas.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Jurusan</label>
                  <select
                    value={addSiswaForm.jurusanId}
                    onChange={(e) => setAddSiswaForm({...addSiswaForm, jurusanId: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {jurusan.map(j => <option key={j.id} value={j.id}>{j.nama}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Angkatan</label>
                <input
                  type="number"
                  value={addSiswaForm.angkatan}
                  onChange={(e) => setAddSiswaForm({...addSiswaForm, angkatan: Number(e.target.value)})}
                  placeholder="Contoh: 2026"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button onClick={() => setShowAddSiswaModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                <button onClick={handleAddSiswa} className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700">Tambah Siswa</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
