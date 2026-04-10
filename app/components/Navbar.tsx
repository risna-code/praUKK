import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-primary font-bold gap-2">
          <Shield className="w-6 h-6" />
          PengaduanKu
        </Link>
      </div>
      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Beranda</Link></li>
          <li><Link href="/laporan">Buat Laporan</Link></li>
        </ul>
      </div>
      <div className="flex-none gap-2">
        <Link href="/login" className="btn btn-primary">Login</Link>
      </div>
    </div>
  );
};
