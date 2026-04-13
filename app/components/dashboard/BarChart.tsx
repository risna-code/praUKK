'use client';

import { useState, useEffect } from 'react';
import ChartFilter, { FilterState } from './ChartFilter';

interface ChartData {
  month: string;
  value1: number;
  value2: number;
  kelas: string;
  kategori: string;
  jurusan: string;
}

const mockData: ChartData[] = [
  { month: 'Jan', value1: 45, value2: 32, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Jan', value1: 38, value2: 28, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Jan', value1: 25, value2: 18, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Jan', value1: 30, value2: 22, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Feb', value1: 52, value2: 35, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Feb', value1: 40, value2: 30, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Feb', value1: 28, value2: 20, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Feb', value1: 35, value2: 25, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Mar', value1: 60, value2: 42, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Mar', value1: 48, value2: 35, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Mar', value1: 32, value2: 24, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Mar', value1: 38, value2: 28, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Apr', value1: 55, value2: 38, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Apr', value1: 45, value2: 32, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Apr', value1: 30, value2: 22, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Apr', value1: 40, value2: 30, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'May', value1: 58, value2: 40, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'May', value1: 50, value2: 36, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'May', value1: 35, value2: 26, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'May', value1: 42, value2: 32, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Jun', value1: 62, value2: 44, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Jun', value1: 52, value2: 38, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Jun', value1: 38, value2: 28, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Jun', value1: 45, value2: 34, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Jul', value1: 48, value2: 35, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Jul', value1: 42, value2: 30, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Jul', value1: 28, value2: 20, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Jul', value1: 35, value2: 26, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Aug', value1: 65, value2: 46, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Aug', value1: 55, value2: 40, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Aug', value1: 40, value2: 30, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Aug', value1: 48, value2: 36, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Sep', value1: 70, value2: 50, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Sep', value1: 58, value2: 42, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Sep', value1: 42, value2: 32, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Sep', value1: 50, value2: 38, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Oct', value1: 68, value2: 48, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Oct', value1: 56, value2: 40, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Oct', value1: 40, value2: 30, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Oct', value1: 48, value2: 36, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Nov', value1: 72, value2: 52, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Nov', value1: 60, value2: 44, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Nov', value1: 45, value2: 34, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Nov', value1: 52, value2: 40, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
  { month: 'Dec', value1: 75, value2: 54, kelas: 'X', kategori: 'Prestasi', jurusan: 'RPL' },
  { month: 'Dec', value1: 62, value2: 46, kelas: 'XI', kategori: 'Prestasi', jurusan: 'TKJ' },
  { month: 'Dec', value1: 48, value2: 36, kelas: 'XII', kategori: 'Pelanggaran', jurusan: 'MM' },
  { month: 'Dec', value1: 55, value2: 42, kelas: 'X', kategori: 'Pelanggaran', jurusan: 'AKL' },
];

export default function BarChart() {
  const [filteredData, setFilteredData] = useState<ChartData[]>(mockData);
  const [aggregatedData, setAggregatedData] = useState<{ month: string; value1: number; value2: number }[]>([]);

  useEffect(() => {
    const monthlyData = filteredData.reduce((acc, curr) => {
      const existing = acc.find(item => item.month === curr.month);
      if (existing) {
        existing.value1 += curr.value1;
        existing.value2 += curr.value2;
      } else {
        acc.push({ month: curr.month, value1: curr.value1, value2: curr.value2 });
      }
      return acc;
    }, [] as { month: string; value1: number; value2: number }[]);
    
    setAggregatedData(monthlyData);
  }, [filteredData]);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = mockData.filter(item => {
      return (
        (!filters.kelas || item.kelas === filters.kelas) &&
        (!filters.kategori || item.kategori === filters.kategori) &&
        (!filters.jurusan || item.jurusan === filters.jurusan)
      );
    });
    setFilteredData(filtered);
  };

  const maxValue = Math.max(...aggregatedData.flatMap(d => [d.value1, d.value2]), 100);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Jumlah Laporan</h2>
      <p className="text-gray-600 mb-6">Statistik laporan berdasarkan waktu</p>
      
      <ChartFilter onFilterChange={handleFilterChange} />

      <div className="relative h-80">
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-600">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        <div className="ml-12 h-full flex items-end justify-around gap-2 border-b border-gray-200">
          {aggregatedData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex justify-center gap-1 items-end h-full pb-2">
                <div className="relative flex flex-col items-center w-8">
                  <span className="text-xs font-semibold mb-1">{data.value1}</span>
                  <div
                    className="w-full bg-green-600 rounded-t-lg transition-all duration-300"
                    style={{ height: `${(data.value1 / maxValue) * 100}%` }}
                  />
                </div>
                <div className="relative flex flex-col items-center w-8">
                  <span className="text-xs font-semibold mb-1">{data.value2}</span>
                  <div
                    className="w-full bg-green-300 rounded-t-lg transition-all duration-300"
                    style={{ height: `${(data.value2 / maxValue) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
