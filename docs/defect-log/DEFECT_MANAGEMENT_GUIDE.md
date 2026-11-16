# PANDUAN SISTEM MANAJEMEN CACAT (DEFECT MANAGEMENT GUIDE)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-3 Clause 8 Defect Report & IEEE Std 1044-2009 Classification  
**Integrasi Platform**: GitHub Issues / Jira Software  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Pekan 7  

---

## 1. Siklus Hidup Penanganan Bug (Defect Lifecycle Workflow)
Setiap anomali atau kegagalan pengujian dikelola melalui alur state machine berikut:

```
[NEW / DISCOVERED]
       │
       ▼
  [CONFIRMED] ──(Bukan Cacat / Duplikat)──> [REJECTED / INVALID]
       │
       ▼
 [IN PROGRESS] (Perbaikan Kode / Validasi)
       │
       ▼
  [RESOLVED]
       │
       ▼
   [RETEST] ───(Gagal Uji Ulang)───> [REOPENED] ──> [IN PROGRESS]
       │
   (Lolos Retest)
       ▼
    [CLOSED]
```

---

## 2. Format Standar Pelaporan Bug (GitHub Issue Template)
```markdown
### [DEF-XXX] Judul Ringkas Cacat Perangkat Lunak

**Modul Terdampak**: [Auth / WebGIS / UMKM / Produksi / HPP / EIS]
**Tingkat Keparahan (Severity)**: [S1-Critical / S2-High / S3-Medium / S4-Low]
**Prioritas Penanganan (Priority)**: [P0-Immediate / P1-High / P2-Medium / P3-Low]
**Lingkungan Uji**: Node.js v20 / Windows 11 / Chrome Desktop & Mobile

#### Langkah Reproduksi (Steps to Reproduce):
1. Buka endpoint ...
2. Masukkan payload input ...
3. Kirim request HTTP POST ...

#### Hasil Aktual (Actual Result):
Sistem mengembalikan respons HTTP 201 Created dan menyimpan data cacat.

#### Hasil Diharapkan (Expected Result):
Sistem menolak dengan HTTP 422 Unprocessable Entity dan pesan kesalahan validasi.

#### Bukti Log / Cuplikan Pengujian (Log Trace):
```json
{ "error": "BVA Boundary Violated" }
```
```

---

## 3. Matriks Rekonsiliasi Cacat Proyek (Pekan 1 s/d Pekan 7)
- **DEF-001**: Ketiadaan Validasi Batas Wilayah Spasial BVA (Status: **CLOSED**)
- **DEF-002**: Ketiadaan Validasi Partisi Ekuivalensi EP Nama & Pemilik (Status: **CLOSED**)
- **DEF-003**: Kategori Usaha Tidak Terdaftar & Telepon Non-Numerik (Status: **CLOSED**)
- **DEF-004**: Tabrakan Port 8000 dengan Servis Lain di Mesin Pengembang (Status: **CLOSED**)
- **Tingkat Penyelesaian Cacat (Resolution Rate)**: **100% (4 dari 4 Cacat Berhasil Diperbaiki)**
