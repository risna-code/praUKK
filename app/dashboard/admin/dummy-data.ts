export type UserRole = "siswa" | "admin";
export type UserStatus = "aktif" | "alumni" | "nonaktif";
export type ReportStatus = "dilaporkan" | "diproses" | "selesai" | "ditolak";

export const kelas: { id: number; nama: string }[] = [];
export const jurusan: { id: number; nama: string }[] = [];
export const kategori: { id: number; nama: string }[] = [];
export const users: {
  id: number;
  nama: string;
  nis: string | null;
  role: UserRole;
  status: UserStatus;
  kelasId: number | null;
  jurusanId: number | null;
  angkatan: number | null;
  isAktif: boolean;
  fotoProfil: string;
}[] = [];

export const reports: {
  id: number;
  userId: number;
  kategoriId: number;
  judul: string;
  deskripsi: string;
  fotoBukti: string;
  status: ReportStatus;
  prioritas: string;
  estimasiHari: number;
  tanggalDibuat: string;
  jamDibuat: string;
  tanggalSelesai: string | null;
}[] = [];

export const progressUpdates: {
  id: number;
  reportId: number;
  deskripsi: string;
  tanggal: string;
}[] = [];

export const ratings: {
  id: number;
  reportId: number;
  userId: number;
  rating: number;
  testimoni: string;
  jenis: string;
}[] = [];

export const siswaList = users.filter((u) => u.role === "siswa");
export const siswaAktif = users.filter((u) => u.role === "siswa" && u.status === "aktif");
export const siswaAlumni = users.filter((u) => u.role === "siswa" && u.status === "alumni");
export const adminList = users.filter((u) => u.role === "admin");
