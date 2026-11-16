# LAPORAN TINJAUAN PASCA-IMPLEMENTASI (POST-IMPLEMENTATION REVIEW / PIR)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: IEEE 15288 Maintenance Process & RPS MKB020204 (Sub-CPMK 14)  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Tanggal Penerbitan**: Pekan 15 — 16 November 2026  

---

## 1. Evaluasi Capaian Proyek vs Sasaran Awal
Proyek MADURA ERP/EIS telah berhasil diselesaikan secara tepat waktu, memenuhi seluruh sasaran fungsional, dan memenuhi standar ISO/IEC/IEEE 29119:
- **ERP Operasional**: Alur bahan baku, BOM resep, alur status produksi, kalkulasi HPP otomatis, dan direktori usaha berfungsi penuh.
- **WebGIS Pamekasan**: Visualisasi spasial marker Point UMKM dan poligon tambak garam (Kecamatan Galis, Pademawu, Tlanakan) terintegrasi interaktif.
- **Executive Information System (EIS)**: Agregasi metrik analitik dan visualisasi Chart.js tersedia untuk pimpinan.
- **Software Quality Assurance (SQA)**: 100% test case (Unit, Black-box, White-box, API Newman, E2E, Load, Security, UAT, ETL) berstatus PASS dengan 0 blocker defects.

---

## 2. Pelajaran Penting yang Dipetik (Lessons Learned)
1. **Pentingnya Validasi Batas Wilayah Empiris (BVA)**: Validasi koordinat backend terbukti krusial untuk mencegah masuknya data usaha di luar Kabupaten Pamekasan (Resolusi DEF-001).
2. **Manajemen Lingkungan Pengembang**: Tabrakan port jaringan lokal (DEF-004) diatasi dengan isolasi port 8080 terdedikasi.
3. **Pembersihan Data Otomatis (ETL Healing)**: Format data mentah petambak yang sering terbalik koordinatnya berhasil dipulihkan secara otomatis tanpa kehilangan data.

---

## 3. Matriks Tipe Pemeliharaan Sistem (Software Maintenance Matrix)

| Tipe Pemeliharaan | Aktivitas Terencana | Frekuensi | SLA Respons |
|---|---|:---:|:---:|
| **Corrective Maintenance** | Penanganan bug darurat, error transaksi, atau anomali data | Insidental | < 4 Jam |
| **Adaptive Maintenance** | Penyesuaian sistem terhadap perubahan versi browser HP, OS server, atau API perizinan UMKM | Triwulan | < 48 Jam |
| **Perfective Maintenance** | Peningkatan fitur UI WebGIS, penambahan filter komoditas baru, optimasi kecepatan query | Semesteran | Terjadwal |
| **Preventive Maintenance** | Backup basis data harian otomatis, pembersihan log sesi usang, vacuum database PostGIS | Mingguan | Otomatis |

---

## 4. Estimasi Biaya Pemeliharaan Tahunan (Annual Maintenance Budget)
| Komponen Pemeliharaan | Deskripsi Alokasi | Biaya Estimasi (IDR) |
|---|---|:---:|
| **Cloud Hosting & VPS Linux** | Server Staging/Produksi 4 Core, 8GB RAM, SSD 160GB | Rp 3.600.000 / tahun |
| **Domain & SSL Certificate** | Domain resmi `.id` dan wildcard SSL certificate | Rp 650.000 / tahun |
| **Backup Storage Offsite** | Penyimpanan snapshot cadangan terenkripsi | Rp 950.000 / tahun |
| **Dukungan Teknis SQA & DevOps** | Monitoring performa sistem berkala dan update keamanan | Rp 4.800.000 / tahun |
| **Total Estimasi Anggaran** | Pemeliharaan sistem tahunan terpadu | **Rp 10.000.000 / tahun** |
