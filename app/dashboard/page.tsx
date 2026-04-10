import React from "react";
import { Card } from "../components/ui/Card";
import { CheckCircle, Clock, AlertTriangle, MoreVertical, Image as ImageIcon } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Menunggu Tindakan", count: 12, icon: <AlertTriangle size={24} />, color: "text-warning", bg: "bg-warning/10" },
    { title: "Sedang Diproses", count: 5, icon: <Clock size={24} />, color: "text-info", bg: "bg-info/10" },
    { title: "Laporan Selesai", count: 48, icon: <CheckCircle size={24} />, color: "text-success", bg: "bg-success/10" },
  ];

  // Enhanced dummy data with images and description
  const dummyLaporan = [
    { 
        id: "LP-001", 
        lokasi: "Lab RPL 1", 
        kategori: "lab rpl", 
        deskripsi: "AC nomor 2 dari depan meneteskan air ke meja komputer.",
        status: "menunggu", 
        tgl: "10 Apr 2026", 
        pelapor: "Ahmad Rizky",
        foto: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=200&auto=format&fit=crop"
    },
    { 
        id: "LP-002", 
        lokasi: "Kamar Mandi Lt 2", 
        kategori: "kamar mandi", 
        deskripsi: "Kran air di wastafel sebelah kanan patah dan air terus mengalir.",
        status: "proses", 
        tgl: "09 Apr 2026", 
        pelapor: "Budi Santoso",
        foto: "https://images.unsplash.com/photo-1584622650111-993a426fbfd1?q=80&w=200&auto=format&fit=crop"
    },
    { 
        id: "LP-003", 
        lokasi: "Kelas 10.1", 
        kategori: "kelas", 
        deskripsi: "Proyektor di kelas warnanya jadi kuning dan tidak fokus.",
        status: "selesai", 
        tgl: "08 Apr 2026", 
        pelapor: "Siti Rahma",
        foto: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=200&auto=format&fit=crop"
    },
    { 
        id: "LP-004", 
        lokasi: "Ruang Pertemuan", 
        kategori: "ruang pertemuan", 
        deskripsi: "Mic wireless nomor 1 baterainya bocor tidak bisa nyala.",
        status: "selesai", 
        tgl: "07 Apr 2026", 
        pelapor: "Joko Widodo",
        foto: "https://images.unsplash.com/photo-1577414445831-7e8e918b9bca?q=80&w=200&auto=format&fit=crop"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "menunggu": return <span className="badge badge-warning gap-1 border-none"><AlertTriangle size={12}/> Menunggu</span>;
      case "proses": return <span className="badge badge-info gap-1 text-white border-none"><Clock size={12}/> Proses</span>;
      case "selesai": return <span className="badge badge-success gap-1 text-white border-none"><CheckCircle size={12}/> Selesai</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         <div>
           <h2 className="text-2xl font-extrabold text-gray-800">Dashboard Admin</h2>
           <p className="text-sm text-gray-500 mt-1">Kelola dan tinjau semua laporan kerusakan fasilitas sekolahan</p>
         </div>
         <div className="hidden sm:block text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg font-medium border border-gray-100">
           Hari ini: {new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
         </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:-translate-y-1 transition-transform cursor-default border-0 shadow-lg shadow-gray-200/50">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">{stat.count}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <Card className="border-0 shadow-lg shadow-gray-200/40 overflow-hidden p-0 rounded-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
             <h3 className="text-lg font-bold text-gray-800">Data Laporan Terbaru</h3>
             <p className="text-sm text-gray-500">Laporan yang masuk dalam minggu ini</p>
          </div>
          <button className="btn btn-sm btn-outline text-gray-600">Lihat Semua Laporan</button>
        </div>
        <div className="overflow-x-auto bg-white">
          <table className="table table-lg w-full">
            {/* head */}
            <thead className="bg-gray-50/80 text-gray-500 text-sm">
              <tr>
                <th>Bukti Foto</th>
                <th>Info Pengadu</th>
                <th>Detail Kerusakan</th>
                <th>Kategori & Lokasi</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyLaporan.map((item, i) => (
                <tr key={i} className="hover:bg-green-50/30 transition-colors group">
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-14 h-14 bg-gray-100 group-hover:shadow-md transition-shadow">
                        {item.foto ? (
                            <img src={item.foto} alt="Kerusakan" className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex flex-col justify-center items-center text-gray-400">
                               <ImageIcon size={20} />
                            </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                     <div className="font-bold text-gray-800">{item.pelapor}</div>
                     <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock size={10} /> {item.tgl}
                     </div>
                  </td>
                  <td>
                     <div className="font-bold text-gray-700 text-sm">{item.id}</div>
                     <div className="text-sm text-gray-500 max-w-[200px] truncate" title={item.deskripsi}>{item.deskripsi}</div>
                  </td>
                  <td>
                    <div className="font-medium text-gray-700">{item.lokasi}</div>
                    <div className="text-xs text-primary bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1 font-semibold tracking-wide uppercase">
                        {item.kategori}
                    </div>
                  </td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm btn-square text-gray-400 hover:text-primary">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
