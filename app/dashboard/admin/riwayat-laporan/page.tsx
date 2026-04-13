"use client";

import { useMemo, useState } from "react";
import { Download, Eye, X } from "lucide-react";
import { kategori, jurusan, kelas, reports, users } from "../dummy-data";

export default function RiwayatLaporanPage() {
  const [tanggalFilter, setTanggalFilter] = useState("semua");
  const [kelasFilter, setKelasFilter] = useState("semua");
  const [jurusanFilter, setJurusanFilter] = useState("semua");
  const [kategoriFilter, setKategoriFilter] = useState("semua");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const rows = useMemo(
    () =>
      reports
        .map((report) => {
          const siswa = users.find((user) => user.id === report.userId);
          const kategoriNama = kategori.find((item) => item.id === report.kategoriId)?.nama ?? "-";
          const kelasNama = kelas.find((item) => item.id === siswa?.kelasId)?.nama ?? "-";
          const jurusanNama = jurusan.find((item) => item.id === siswa?.jurusanId)?.nama ?? "-";
          const lamaSelesai =
            report.tanggalSelesai === null
              ? "-"
              : `${Math.max(
                  1,
                  Math.ceil(
                    (new Date(report.tanggalSelesai).getTime() - new Date(report.tanggalDibuat).getTime()) /
                      (1000 * 60 * 60 * 24),
                  ),
                )} hari`;

          return {
            ...report,
            siswa: siswa?.nama ?? "-",
            kelasNama,
            jurusanNama,
            kategoriNama,
            lamaSelesai,
          };
        })
        .filter((row) => (tanggalFilter === "semua" ? true : row.tanggalDibuat === tanggalFilter))
        .filter((row) => (kelasFilter === "semua" ? true : row.kelasNama === kelasFilter))
        .filter((row) => (jurusanFilter === "semua" ? true : row.jurusanNama === jurusanFilter))
        .filter((row) => (kategoriFilter === "semua" ? true : String(row.kategoriId) === kategoriFilter))
        .filter((row) => (statusFilter === "semua" ? true : row.status === statusFilter)),
    [tanggalFilter, kelasFilter, jurusanFilter, kategoriFilter, statusFilter],
  );

  const handleViewDetail = (row: any) => {
    setSelectedReport(row);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'dilaporkan': return 'bg-yellow-100 text-yellow-700';
      case 'diproses': return 'bg-blue-100 text-blue-700';
      case 'selesai': return 'bg-green-100 text-green-700';
      case 'ditolak': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Riwayat Laporan</h1>
          <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]">Monitoring Semua Laporan</p>
        </div>
        <button className="bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 w-fit">
          <Download size={15} /> Cetak PDF
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <select value={tanggalFilter} onChange={(event) => setTanggalFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Tanggal</option>
          {[...new Set(reports.map((item) => item.tanggalDibuat))].map((tgl) => (
            <option key={tgl} value={tgl}>{tgl}</option>
          ))}
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
        <select value={kategoriFilter} onChange={(event) => setKategoriFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Kategori</option>
          {kategori.map((item) => (
            <option key={item.id} value={String(item.id)}>{item.nama}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Status</option>
          <option value="dilaporkan">Dilaporkan</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
          <option value="ditolak">Ditolak</option>
        </select>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-2xl shadow-green-900/5 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Tanggal Dibuat</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Judul</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Siswa</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Kelas</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Jurusan</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Kategori</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Status</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Lama Selesai</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Tanggal Selesai</th>
              <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest px-2">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/50">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-green-50/30 transition-colors">
                <td className="py-5 px-2 text-xs font-black text-gray-500 uppercase">{row.tanggalDibuat}</td>
                <td className="py-5 px-2 font-bold text-gray-800">{row.judul}</td>
                <td className="py-5 px-2 text-sm font-bold text-gray-700">{row.siswa}</td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-500">{row.kelasNama}</td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-500">{row.jurusanNama}</td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-500">{row.kategoriNama}</td>
                <td className="py-5 px-2"><span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${getStatusColor(row.status)}`}>{row.status}</span></td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-500">{row.lamaSelesai}</td>
                <td className="py-5 px-2 text-xs font-black uppercase text-gray-500">{row.tanggalSelesai ?? "-"}</td>
                <td className="py-5 px-2">
                  <button 
                    onClick={() => handleViewDetail(row)}
                    className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:bg-blue-100 transition-colors"
                  >
                    <Eye size={12} /> Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailModal && selectedReport && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold">Detail Laporan #{selectedReport.id}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Informasi Laporan</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">JUDUL</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedReport.judul}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">KATEGORI</p>
                      <p className="text-gray-800">{selectedReport.kategoriNama}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">STATUS</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                        {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">PRIORITAS</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        selectedReport.prioritas === 'tinggi' ? 'bg-red-100 text-red-700' :
                        selectedReport.prioritas === 'sedang' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {selectedReport.prioritas.charAt(0).toUpperCase() + selectedReport.prioritas.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">TANGGAL DIBUAT</p>
                      <p className="text-gray-800">{selectedReport.tanggalDibuat}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">JAM DIBUAT</p>
                      <p className="text-gray-800">{selectedReport.jamDibuat} WIB</p>
                    </div>
                    {selectedReport.tanggalSelesai && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">TANGGAL SELESAI</p>
                          <p className="text-gray-800">{selectedReport.tanggalSelesai}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">LAMA PENYELESAIAN</p>
                          <p className="text-gray-800">{selectedReport.lamaSelesai}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Informasi Pelapor</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">NAMA PELAPOR</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedReport.siswa}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">KELAS</p>
                        <p className="text-gray-800">{selectedReport.kelasNama}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">JURUSAN</p>
                        <p className="text-gray-800">{selectedReport.jurusanNama}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Deskripsi</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedReport.deskripsi}
                </p>
              </div>

              {selectedReport.fotoBukti && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Foto Bukti</h3>
                  <img 
                    src={selectedReport.fotoBukti} 
                    alt="Bukti laporan" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors shadow-lg"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
