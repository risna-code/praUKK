"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { kategori, jurusan, kelas, reports, users } from "../dummy-data";

const piePalette = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#15803d", "#166534", "#14532d"];

function PieChart({ data }: { data: { label: string; value: number }[] }) {
  const total = Math.max(1, data.reduce((sum, item) => sum + item.value, 0));
  let offset = 0;
  return (
    <svg viewBox="0 0 42 42" className="w-56 h-56">
      {data.map((item, index) => {
        const percent = (item.value / total) * 100;
        const dashArray = `${percent} ${100 - percent}`;
        const currentOffset = offset;
        offset += percent;
        return (
          <circle
            key={item.label}
            cx="21"
            cy="21"
            r="15.9155"
            fill="transparent"
            stroke={piePalette[index % piePalette.length]}
            strokeWidth="7"
            strokeDasharray={dashArray}
            strokeDashoffset={-currentOffset}
          />
        );
      })}
      <circle cx="21" cy="21" r="8.5" fill="#ffffff" />
    </svg>
  );
}

export default function StatistikPage() {
  const [pieMode, setPieMode] = useState("ringkas");
  const [barPeriodFilter, setBarPeriodFilter] = useState("semua");
  const [barWeekFilter, setBarWeekFilter] = useState("1");
  const [barMonthFilter, setBarMonthFilter] = useState("4");
  const [barSemesterFilter, setBarSemesterFilter] = useState("2");
  const [barYearFilter, setBarYearFilter] = useState("2026");
  const [barKategoriFilter, setBarKategoriFilter] = useState("semua");
  const [barKelasFilter, setBarKelasFilter] = useState("semua");
  const [barJurusanFilter, setBarJurusanFilter] = useState("semua");
  const [showAllData, setShowAllData] = useState(false);

  const getPeriodInfo = () => {
    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    if (barPeriodFilter === "minggu") {
      const weekNum = Number(barWeekFilter);
      return `Minggu ke-${weekNum} (7 hari)`;
    }
    if (barPeriodFilter === "bulan") {
      const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      return `Bulan ${months[Number(barMonthFilter) - 1]} ${barYearFilter}`;
    }
    if (barPeriodFilter === "semester") {
      return `Semester ${barSemesterFilter} Tahun ${barYearFilter}`;
    }
    if (barPeriodFilter === "tahun") {
      return `Tahun ${barYearFilter}`;
    }
    return "Semua Data Tersedia";
  };

  const pieData = useMemo(() => {
    const completedReports = reports.filter(r => r.status === 'selesai');
    
    if (pieMode === "ringkas") {
      return [
        { label: "Selesai", value: completedReports.length },
      ];
    }
    if (pieMode === "kelas") {
      return kelas.map((item) => ({
        label: `Kelas ${item.nama}`,
        value: completedReports.filter((report) => users.find((user) => user.id === report.userId)?.kelasId === item.id).length,
      }));
    }
    if (pieMode === "jurusan") {
      return jurusan.map((item) => ({
        label: item.nama,
        value: completedReports.filter((report) => users.find((user) => user.id === report.userId)?.jurusanId === item.id).length,
      }));
    }
    return kategori.map((item) => ({
      label: item.nama,
      value: completedReports.filter((report) => report.kategoriId === item.id).length,
    }));
  }, [pieMode]);

  const filteredReports = useMemo(() => {
    const now = new Date();
    return reports.filter((report) => {
      // Only completed reports
      if (report.status !== 'selesai') return false;
      
      // Filter by period
      if (barPeriodFilter !== "semua") {
        const reportDate = new Date(report.tanggalDibuat);
        
        if (barPeriodFilter === "minggu") {
          const weekNum = Number(barWeekFilter);
          const weekStart = new Date(now.getTime() - (weekNum * 7 * 24 * 60 * 60 * 1000));
          const weekEnd = new Date(now.getTime() - ((weekNum - 1) * 7 * 24 * 60 * 60 * 1000));
          if (reportDate < weekStart || reportDate > weekEnd) return false;
        }
        if (barPeriodFilter === "bulan") {
          if (reportDate.getMonth() + 1 !== Number(barMonthFilter) || reportDate.getFullYear() !== Number(barYearFilter)) return false;
        }
        if (barPeriodFilter === "semester") {
          const semester = Number(barSemesterFilter);
          const year = Number(barYearFilter);
          const startMonth = semester === 1 ? 1 : 7;
          const endMonth = semester === 1 ? 6 : 12;
          if (reportDate.getFullYear() !== year || reportDate.getMonth() + 1 < startMonth || reportDate.getMonth() + 1 > endMonth) return false;
        }
        if (barPeriodFilter === "tahun") {
          if (reportDate.getFullYear() !== Number(barYearFilter)) return false;
        }
      }
      
      // Filter by kategori
      if (barKategoriFilter !== "semua" && report.kategoriId !== Number(barKategoriFilter)) return false;
      
      // Filter by kelas
      if (barKelasFilter !== "semua") {
        const user = users.find(u => u.id === report.userId);
        const userKelas = kelas.find(k => k.id === user?.kelasId)?.nama;
        if (userKelas !== barKelasFilter) return false;
      }
      
      // Filter by jurusan
      if (barJurusanFilter !== "semua") {
        const user = users.find(u => u.id === report.userId);
        const userJurusan = jurusan.find(j => j.id === user?.jurusanId)?.nama;
        if (userJurusan !== barJurusanFilter) return false;
      }
      
      return true;
    });
  }, [barPeriodFilter, barWeekFilter, barMonthFilter, barSemesterFilter, barYearFilter, barKategoriFilter, barKelasFilter, barJurusanFilter]);

  const getChartColors = () => {
    if (showAllData) {
      if (barKategoriFilter === "semua") {
        return kategori.map((k, i) => ({
          id: k.id,
          name: k.nama,
          color: ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#15803d', '#166534', '#14532d'][i % 7]
        }));
      }
      if (barKelasFilter === "semua") {
        return kelas.map((k, i) => ({
          id: k.id,
          name: `Kelas ${k.nama}`,
          color: ['#dc2626', '#ef4444', '#f87171'][i % 3]
        }));
      }
      if (barJurusanFilter === "semua") {
        return jurusan.map((j, i) => ({
          id: j.id,
          name: j.nama,
          color: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8', '#1e40af'][i % 6]
        }));
      }
    }
    
    if (barKategoriFilter !== "semua") {
      const kat = kategori.find(k => k.id === Number(barKategoriFilter));
      return [{ id: kat?.id || 0, name: kat?.nama || '', color: '#16a34a' }];
    }
    if (barKelasFilter !== "semua") {
      const kls = kelas.find(k => k.nama === barKelasFilter);
      return [{ id: kls?.id || 0, name: `Kelas ${kls?.nama}`, color: '#dc2626' }];
    }
    if (barJurusanFilter !== "semua") {
      const jur = jurusan.find(j => j.nama === barJurusanFilter);
      return [{ id: jur?.id || 0, name: jur?.nama || '', color: '#2563eb' }];
    }
    
    return [{ id: 'selesai', name: 'Selesai', color: '#16a34a' }];
  };

  const chartColors = getChartColors();

  const barData = useMemo(() => {
    const dataByDate: Record<string, Record<string, number>> = {};
    
    filteredReports.forEach((report) => {
      if (!dataByDate[report.tanggalDibuat]) {
        dataByDate[report.tanggalDibuat] = {};
      }
      
      let groupKey = '';
      if (showAllData) {
        if (barKategoriFilter === "semua") {
          groupKey = String(report.kategoriId);
        } else if (barKelasFilter === "semua") {
          const user = users.find(u => u.id === report.userId);
          groupKey = String(user?.kelasId || 0);
        } else if (barJurusanFilter === "semua") {
          const user = users.find(u => u.id === report.userId);
          groupKey = String(user?.jurusanId || 0);
        } else {
          groupKey = 'selesai';
        }
      } else {
        if (barKategoriFilter !== "semua") {
          groupKey = String(report.kategoriId);
        } else if (barKelasFilter !== "semua") {
          const user = users.find(u => u.id === report.userId);
          groupKey = String(user?.kelasId || 0);
        } else if (barJurusanFilter !== "semua") {
          const user = users.find(u => u.id === report.userId);
          groupKey = String(user?.jurusanId || 0);
        } else {
          groupKey = 'selesai';
        }
      }
      
      if (!dataByDate[report.tanggalDibuat][groupKey]) {
        dataByDate[report.tanggalDibuat][groupKey] = 0;
      }
      dataByDate[report.tanggalDibuat][groupKey]++;
    });
    
    return Object.entries(dataByDate).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredReports, showAllData, barKategoriFilter, barKelasFilter, barJurusanFilter]);

  const maxBarValue = Math.max(1, ...barData.flatMap(([, data]) => Object.values(data)), 10);

  const topSiswa = users
    .filter((user) => user.role === "siswa")
    .map((user) => ({
      nama: user.nama,
      total: reports.filter((report) => report.userId === user.id && report.status === 'selesai').length,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const handleExportPDF = () => {
    console.log("Exporting to PDF...", { period: getPeriodInfo(), totalReports: filteredReports.length });
    alert(`Fitur Export PDF\nPeriode: ${getPeriodInfo()}\nTotal Laporan: ${filteredReports.length}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Statistik</h1>
          <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]">Analisis Data Sistem</p>
        </div>
        <button 
          onClick={handleExportPDF}
          className="bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Download size={15} /> Cetak PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-4xl border border-white p-6 shadow-xl">
          <h3 className="font-black text-gray-800 mb-6">Top 10 Siswa Paling Aktif</h3>
          <div className="space-y-3">
            {topSiswa.map((item, index) => (
              <div key={item.nama} className="flex items-center justify-between p-4 rounded-2xl bg-green-50/50 border border-green-100">
                <p className="font-black text-gray-800">{index + 1}. {item.nama}</p>
                <span className="text-[10px] font-black bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-widest">{item.total} laporan</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-4xl border border-white p-6 shadow-xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-black text-gray-800">Diagram Lingkaran</h3>
            <select value={pieMode} onChange={(event) => setPieMode(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
              <option value="ringkas">Data Ringkas</option>
              <option value="jurusan">Per Jurusan</option>
              <option value="kelas">Per Kelas</option>
              <option value="kategori">Per Kategori</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <PieChart data={pieData.filter((item) => item.value > 0)} />
            <div className="space-y-2 w-full">
              {pieData.map((item, index) => (
                <div key={item.label} className="flex items-center justify-between text-sm font-bold text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: piePalette[index % piePalette.length] }} />
                    <span>{item.label}</span>
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-2xl shadow-green-900/5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-black text-gray-800">Diagram Batang (Laporan Selesai)</h3>
            <p className="text-sm font-bold text-green-600 mt-1">Periode: {getPeriodInfo()}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={barPeriodFilter} onChange={(event) => setBarPeriodFilter(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
              <option value="semua">Semua Periode</option>
              <option value="minggu">Per Minggu</option>
              <option value="bulan">Per Bulan</option>
              <option value="semester">Per Semester</option>
              <option value="tahun">Per Tahun</option>
            </select>
            {barPeriodFilter === "minggu" && (
              <select value={barWeekFilter} onChange={(event) => setBarWeekFilter(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
                <option value="1">Minggu ke-1</option>
                <option value="2">Minggu ke-2</option>
                <option value="3">Minggu ke-3</option>
                <option value="4">Minggu ke-4</option>
              </select>
            )}
            {barPeriodFilter === "bulan" && (
              <select value={barMonthFilter} onChange={(event) => setBarMonthFilter(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
                {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            )}
            {barPeriodFilter === "semester" && (
              <select value={barSemesterFilter} onChange={(event) => setBarSemesterFilter(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>
            )}
            {(barPeriodFilter === "bulan" || barPeriodFilter === "semester" || barPeriodFilter === "tahun") && (
              <select value={barYearFilter} onChange={(event) => setBarYearFilter(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            )}
            <select value={barKategoriFilter} onChange={(event) => setBarKategoriFilter(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
              <option value="semua">Semua Kategori</option>
              {kategori.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
            </select>
            <select value={barKelasFilter} onChange={(event) => setBarKelasFilter(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
              <option value="semua">Semua Kelas</option>
              {kelas.map(k => <option key={k.id} value={k.nama}>{k.nama}</option>)}
            </select>
            <select value={barJurusanFilter} onChange={(event) => setBarJurusanFilter(event.target.value)} className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">
              <option value="semua">Semua Jurusan</option>
              {jurusan.map(j => <option key={j.id} value={j.nama}>{j.nama}</option>)}
            </select>
            <button
              onClick={() => setShowAllData(!showAllData)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                showAllData ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {showAllData ? 'Tampil Semua ✓' : 'Tampil Semua'}
            </button>
          </div>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {barKategoriFilter !== "semua" && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              Kategori: {kategori.find(k => k.id === Number(barKategoriFilter))?.nama}
            </span>
          )}
          {barKelasFilter !== "semua" && (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
              Kelas: {barKelasFilter}
            </span>
          )}
          {barJurusanFilter !== "semua" && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
              Jurusan: {barJurusanFilter}
            </span>
          )}
        </div>

        {barData.length > 0 ? (
          <div className="flex gap-6">
            <div className="flex flex-col justify-between text-right pr-3 h-96">
              {[maxBarValue, Math.floor(maxBarValue * 0.75), Math.floor(maxBarValue * 0.5), Math.floor(maxBarValue * 0.25), 0].map((val, idx) => (
                <span key={idx} className="text-sm font-bold text-green-600">{val}</span>
              ))}
            </div>
            
            <div className="flex-1 flex items-end justify-around gap-4 h-96 border-b-2 border-l-2 border-gray-300 p-6 bg-gradient-to-t from-gray-50 to-white rounded-lg">
              {barData.map(([tanggal, data]) => {
                const [year, month, day] = tanggal.split('-');
                const shortDate = `${day}/${month}`;
                
                return (
                  <div key={tanggal} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {chartColors.map((colorConfig) => {
                        const value = data[String(colorConfig.id)] || 0;
                        const height = (value / maxBarValue) * 100;
                        
                        return (
                          <div key={colorConfig.id} className="flex flex-col items-center flex-1">
                            {value > 0 && (
                              <span className="text-xs font-bold text-gray-700 mb-1">{value}</span>
                            )}
                            <div
                              className="w-full rounded-t-lg hover:opacity-80 transition-all cursor-pointer shadow-md hover:shadow-lg"
                              style={{ 
                                backgroundColor: colorConfig.color,
                                height: `${height}%`,
                                minHeight: value > 0 ? '20px' : '0'
                              }}
                              title={`${colorConfig.name}: ${value}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-xs font-black text-green-600 block">{shortDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col justify-center gap-3 pl-6 border-l-2 border-gray-200">
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Keterangan</p>
              {chartColors.map((colorConfig) => (
                <div key={colorConfig.id} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: colorConfig.color }}
                  />
                  <span className="text-sm font-bold text-gray-600 whitespace-nowrap">{colorConfig.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-400 text-lg font-bold">Tidak ada data untuk filter yang dipilih</p>
            <p className="text-gray-400 text-sm mt-2">Coba ubah filter periode atau kategori</p>
          </div>
        )}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-green-600">{filteredReports.length}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Selesai</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-blue-600">{barData.length}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hari Aktif</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-purple-600">{barData.length > 0 ? (filteredReports.length / barData.length).toFixed(1) : 0}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Rata-rata/Hari</p>
          </div>
        </div>
      </div>
    </div>
  );
}
