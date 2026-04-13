'use client'

import { useState, useMemo } from 'react'
import { TrendingUp, Clock, CheckCircle2, XCircle, Users, GraduationCap, BookOpen, FolderOpen, Plus, UserCog, X, Play, Ban, Upload, Image } from 'lucide-react'
import { reports as dummyReports, kelas as dummyKelas, jurusan as dummyJurusan, kategori as dummyKategori, users as dummyUsers } from './dummy-data'

export default function AdminDashboard() {
  const [reports, setReports] = useState(dummyReports)
  const [kelas, setKelas] = useState(dummyKelas)
  const [jurusan, setJurusan] = useState(dummyJurusan)
  const [kategori, setKategori] = useState(dummyKategori)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'semua' | 'pending' | 'proses' | 'selesai' | 'ditolak'>('semua')
  const [prioritasFilter, setPrioritasFilter] = useState<'semua' | 'rendah' | 'sedang' | 'tinggi'>('semua')
  const [selectedReport, setSelectedReport] = useState<typeof dummyReports[0] | null>(null)
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionType, setActionType] = useState<'proses' | 'selesai' | 'tolak'>('proses')
  const [keteranganSelesai, setKeteranganSelesai] = useState('')
  const [alasanTolak, setAlasanTolak] = useState('')
  const [fotoBuktiSelesai, setFotoBuktiSelesai] = useState<File | null>(null)
  const [previewBukti, setPreviewBukti] = useState<string>('')
  
  const [showKelasModal, setShowKelasModal] = useState(false)
  const [showJurusanModal, setShowJurusanModal] = useState(false)
  const [showKategoriModal, setShowKategoriModal] = useState(false)
  
  const [newKelasName, setNewKelasName] = useState('')
  const [newJurusanName, setNewJurusanName] = useState('')
  const [newKategoriName, setNewKategoriName] = useState('')

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = report.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.pelapor.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'semua' || report.status === statusFilter
      const matchesPrioritas = prioritasFilter === 'semua' || report.prioritas === prioritasFilter
      
      return matchesSearch && matchesStatus && matchesPrioritas
    })
  }, [reports, searchQuery, statusFilter, prioritasFilter])

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    proses: reports.filter(r => r.status === 'proses').length,
    selesai: reports.filter(r => r.status === 'selesai').length,
    ditolak: reports.filter(r => r.status === 'ditolak').length
  }

  const totalSiswa = dummyUsers.filter(u => u.role === 'siswa').length
  const totalSiswaAktif = dummyUsers.filter(u => u.role === 'siswa' && u.status === 'aktif').length
  const totalAlumni = dummyUsers.filter(u => u.role === 'siswa' && u.status === 'alumni').length
  const totalAdmin = dummyUsers.filter(u => u.role === 'admin').length

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'proses': return 'bg-blue-100 text-blue-700'
      case 'selesai': return 'bg-green-100 text-green-700'
      case 'ditolak': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPrioritasColor = (prioritas: string) => {
    switch(prioritas) {
      case 'tinggi': return 'bg-red-100 text-red-700'
      case 'sedang': return 'bg-yellow-100 text-yellow-700'
      case 'rendah': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleAction = (report: typeof dummyReports[0], type: 'proses' | 'selesai' | 'tolak') => {
    setSelectedReport(report)
    setActionType(type)
    setKeteranganSelesai('')
    setAlasanTolak('')
    setFotoBuktiSelesai(null)
    setPreviewBukti('')
    setShowActionModal(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFotoBuktiSelesai(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewBukti(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const confirmAction = () => {
    if (selectedReport) {
      if (actionType === 'selesai' && (!keteranganSelesai.trim() || !fotoBuktiSelesai)) {
        alert('Harap isi keterangan dan upload bukti penyelesaian!')
        return
      }
      if (actionType === 'tolak' && !alasanTolak.trim()) {
        alert('Harap isi alasan penolakan!')
        return
      }
      const newStatus = actionType === 'proses' ? 'diproses' : actionType === 'selesai' ? 'selesai' : 'ditolak'
      console.log(`Mengubah status laporan #${selectedReport.id} menjadi ${newStatus}`)
      if (actionType === 'selesai') {
        console.log('Keterangan:', keteranganSelesai)
        console.log('Bukti:', fotoBuktiSelesai?.name)
      }
      if (actionType === 'tolak') {
        console.log('Alasan Tolak:', alasanTolak)
      }
      setShowActionModal(false)
    }
  }

  const handleAddKelas = () => {
    if (newKelasName.trim()) {
      setKelas([...kelas, { id: kelas.length + 1, nama: newKelasName.trim() }])
      setNewKelasName('')
      setShowKelasModal(false)
    }
  }

  const handleAddJurusan = () => {
    if (newJurusanName.trim()) {
      setJurusan([...jurusan, { id: jurusan.length + 1, nama: newJurusanName.trim() }])
      setNewJurusanName('')
      setShowJurusanModal(false)
    }
  }

  const handleAddKategori = () => {
    if (newKategoriName.trim()) {
      setKategori([...kategori, { id: kategori.length + 1, nama: newKategoriName.trim() }])
      setNewKategoriName('')
      setShowKategoriModal(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">Kelola dan pantau semua laporan masuk</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistik Laporan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.total}</span>
            </div>
            <p className="text-emerald-100 text-sm">Total Laporan</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.pending}</span>
            </div>
            <p className="text-yellow-100 text-sm">Menunggu</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.proses}</span>
            </div>
            <p className="text-blue-100 text-sm">Diproses</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.selesai}</span>
            </div>
            <p className="text-green-100 text-sm">Selesai</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.ditolak}</span>
            </div>
            <p className="text-red-100 text-sm">Ditolak</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Master</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="bg-gradient-to-br from-lime-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{totalSiswaAktif}</span>
            </div>
            <p className="text-lime-100 text-sm">Siswa Aktif</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <GraduationCap className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{totalAlumni}</span>
            </div>
            <p className="text-blue-100 text-sm">Alumni</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <UserCog className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{totalAdmin}</span>
            </div>
            <p className="text-emerald-100 text-sm">Total Admin</p>
          </div>

          <div 
            onClick={() => setShowKelasModal(true)}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <GraduationCap className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{kelas.length}</span>
            </div>
            <p className="text-green-100 text-sm flex items-center gap-2">
              Total Kelas
              <Plus className="w-4 h-4" />
            </p>
          </div>

          <div 
            onClick={() => setShowJurusanModal(true)}
            className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{jurusan.length}</span>
            </div>
            <p className="text-teal-100 text-sm flex items-center gap-2">
              Total Jurusan
              <Plus className="w-4 h-4" />
            </p>
          </div>

          <div 
            onClick={() => setShowKategoriModal(true)}
            className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <FolderOpen className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{kategori.length}</span>
            </div>
            <p className="text-cyan-100 text-sm flex items-center gap-2">
              Total Kategori
              <Plus className="w-4 h-4" />
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari laporan atau pelapor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="semua">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="proses">Proses</option>
              <option value="selesai">Selesai</option>
              <option value="ditolak">Ditolak</option>
            </select>
            <select
              value={prioritasFilter}
              onChange={(e) => setPrioritasFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="semua">Semua Prioritas</option>
              <option value="tinggi">Tinggi</option>
              <option value="sedang">Sedang</option>
              <option value="rendah">Rendah</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Pelapor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kategori</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Prioritas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">#{report.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{report.judul}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.pelapor}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.kategori}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioritasColor(report.prioritas)}`}>
                      {report.prioritas.charAt(0).toUpperCase() + report.prioritas.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.tanggal}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {report.status === 'dilaporkan' && (
                        <button
                          onClick={() => handleAction(report, 'proses')}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          Proses
                        </button>
                      )}
                      {report.status === 'diproses' && (
                        <button
                          onClick={() => handleAction(report, 'selesai')}
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          Selesai
                        </button>
                      )}
                      {(report.status === 'dilaporkan' || report.status === 'diproses') && (
                        <button
                          onClick={() => handleAction(report, 'tolak')}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Ban className="w-3 h-3" />
                          Tolak
                        </button>
                      )}
                      {(report.status === 'selesai' || report.status === 'ditolak') && (
                        <span className="text-xs text-gray-400 font-medium">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada laporan yang ditemukan</p>
          </div>
        )}
      </div>

      {showActionModal && selectedReport && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`p-6 flex items-center justify-between rounded-t-2xl text-white ${
              actionType === 'proses' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
              actionType === 'selesai' ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
              'bg-gradient-to-r from-red-600 to-pink-600'
            }`}>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {actionType === 'proses' && <><Play className="w-5 h-5" /> Proses Laporan</>
                }
                {actionType === 'selesai' && <><CheckCircle2 className="w-5 h-5" /> Selesaikan Laporan</>
                }
                {actionType === 'tolak' && <><Ban className="w-5 h-5" /> Tolak Laporan</>
                }
              </h2>
              <button
                onClick={() => setShowActionModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {/* Detail Laporan */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Detail Laporan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Kolom Kiri - Info Laporan */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">ID Laporan</p>
                      <p className="text-sm font-bold text-gray-800">#{selectedReport.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tanggal</p>
                      <p className="text-sm font-bold text-gray-800">{selectedReport.tanggalDibuat} - {selectedReport.jamDibuat} WIB</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Judul</p>
                      <p className="text-base font-bold text-gray-800">{selectedReport.judul}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Kategori</p>
                      <p className="text-sm font-bold text-gray-800">{selectedReport.kategori}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Prioritas</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        selectedReport.prioritas === 'tinggi' ? 'bg-red-100 text-red-700' :
                        selectedReport.prioritas === 'sedang' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {selectedReport.prioritas.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Deskripsi</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedReport.deskripsi}</p>
                    </div>
                  </div>

                  {/* Kolom Kanan - Info Pelapor & Foto */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Pelapor</p>
                      <p className="text-base font-bold text-gray-800">{selectedReport.pelapor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">NIS</p>
                      <p className="text-sm font-bold text-gray-800">{selectedReport.nis}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Kelas</p>
                        <p className="text-sm font-bold text-gray-800">{selectedReport.kelas}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Jurusan</p>
                        <p className="text-sm font-bold text-gray-800">{selectedReport.jurusan}</p>
                      </div>
                    </div>
                    {selectedReport.fotoBukti && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Foto Bukti Laporan</p>
                        <img 
                          src={selectedReport.fotoBukti} 
                          alt="Bukti laporan" 
                          className="w-full h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Selesai */}
              {actionType === 'selesai' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Keterangan Penyelesaian <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={keteranganSelesai}
                      onChange={(e) => setKeteranganSelesai(e.target.value)}
                      placeholder="Jelaskan bagaimana laporan ini diselesaikan..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Foto Bukti Penyelesaian <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      {previewBukti ? (
                        <div className="space-y-3">
                          <img src={previewBukti} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                          <button
                            onClick={() => {
                              setFotoBuktiSelesai(null)
                              setPreviewBukti('')
                            }}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Hapus Foto
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="w-12 h-12 text-gray-400" />
                            <p className="text-sm font-medium text-gray-600">Klik untuk upload foto</p>
                            <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</p>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Tolak */}
              {actionType === 'tolak' && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Alasan Penolakan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={alasanTolak}
                    onChange={(e) => setAlasanTolak(e.target.value)}
                    placeholder="Jelaskan mengapa laporan ini ditolak..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">Alasan ini akan dikirimkan ke pelapor</p>
                </div>
              )}

              {/* Info Box - hanya untuk Proses */}
              {actionType === 'proses' && (
                <div className="rounded-lg p-4 mb-6 bg-blue-50 border border-blue-200">
                  <p className="text-sm font-bold mb-1 text-blue-800">Laporan akan diproses</p>
                  <p className="text-sm text-blue-700">Status akan berubah menjadi "Diproses"</p>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowActionModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-6 py-2 text-white rounded-lg transition-colors shadow-lg ${
                    actionType === 'proses' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' :
                    actionType === 'selesai' ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' :
                    'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                  }`}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKelasModal && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Tambah Kelas Baru</h2>
              <button
                onClick={() => setShowKelasModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kelas</label>
                <input
                  type="text"
                  value={newKelasName}
                  onChange={(e) => setNewKelasName(e.target.value)}
                  placeholder="Contoh: XII RPL 1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowKelasModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddKelas}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors shadow-lg"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showJurusanModal && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Tambah Jurusan Baru</h2>
              <button
                onClick={() => setShowJurusanModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Jurusan</label>
                <input
                  type="text"
                  value={newJurusanName}
                  onChange={(e) => setNewJurusanName(e.target.value)}
                  placeholder="Contoh: Teknik Komputer dan Jaringan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowJurusanModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddJurusan}
                  className="px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-colors shadow-lg"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKategoriModal && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Tambah Kategori Baru</h2>
              <button
                onClick={() => setShowKategoriModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kategori</label>
                <input
                  type="text"
                  value={newKategoriName}
                  onChange={(e) => setNewKategoriName(e.target.value)}
                  placeholder="Contoh: Kerusakan Peralatan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowKategoriModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddKategori}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors shadow-lg"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
