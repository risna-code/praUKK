"use client";

import { useMemo, useState } from "react";
import { PlusCircle, ShieldCheck } from "lucide-react";
import { adminList } from "../dummy-data";

export default function AdminPage() {
  const [statusFilter, setStatusFilter] = useState("semua");

  const filteredAdmins = useMemo(
    () => adminList.filter((admin) => (statusFilter === "semua" ? true : admin.status === statusFilter)),
    [statusFilter],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Admin</h1>
          <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]">Kelola Akun Admin</p>
        </div>
        <button className="bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 w-fit">
          <PlusCircle size={15} /> Tambah Admin
        </button>
      </div>

      <div className="max-w-xs">
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="w-full bg-white/70 backdrop-blur-xl rounded-2xl border border-white p-4 shadow-xl text-xs font-black uppercase tracking-widest text-gray-500">
          <option value="semua">Filter Status (Semua)</option>
          <option value="aktif">Aktif</option>
          <option value="alumni">Alumni</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-2xl shadow-green-900/5">
        <h3 className="text-xl font-black text-gray-800 tracking-tight mb-6">List Admin</h3>
        <div className="space-y-4">
          {filteredAdmins.map((admin) => (
            <div key={admin.id} className="flex items-center justify-between p-5 rounded-2xl bg-green-50/50 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="font-black text-gray-800">{admin.nama}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Role {admin.role}</p>
                </div>
              </div>
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-green-100 text-green-700 uppercase tracking-widest">{admin.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
