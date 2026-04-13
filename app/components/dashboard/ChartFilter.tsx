'use client';

import { useState } from 'react';

interface ChartFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  kelas: string;
  kategori: string;
  jurusan: string;
}

export default function ChartFilter({ onFilterChange }: ChartFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    kelas: '',
    kategori: '',
    jurusan: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 mb-6">
      <select
        value={filters.kelas}
        onChange={(e) => handleFilterChange('kelas', e.target.value)}
        className="px-4 py-2 border rounded-lg bg-white"
      >
        <option value="">Semua Kelas</option>
        <option value="X">X</option>
        <option value="XI">XI</option>
        <option value="XII">XII</option>
      </select>

      <select
        value={filters.kategori}
        onChange={(e) => handleFilterChange('kategori', e.target.value)}
        className="px-4 py-2 border rounded-lg bg-white"
      >
        <option value="">Semua Kategori</option>
        <option value="Prestasi">Prestasi</option>
        <option value="Pelanggaran">Pelanggaran</option>
      </select>

      <select
        value={filters.jurusan}
        onChange={(e) => handleFilterChange('jurusan', e.target.value)}
        className="px-4 py-2 border rounded-lg bg-white"
      >
        <option value="">Semua Jurusan</option>
        <option value="RPL">RPL</option>
        <option value="TKJ">TKJ</option>
        <option value="MM">MM</option>
        <option value="AKL">AKL</option>
      </select>
    </div>
  );
}
