# LAPORAN EKSEKUSI PENGUJIAN PERFORMA & LOAD TESTING (PEKAN 9)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-4 Clause 9 Non-Functional Testing  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Non-Functional Testing: Load & Performance Simulation (JMeter/k6 Benchmark) (Sub-CPMK 8)  
**Tanggal Eksekusi**: 16 November 2026  
**Status**: 100% PASS (SLA Response Time < 200ms, Error Rate 0.0%)  

---

## 1. Ringkasan Eksekusi Pengujian Beban
Pengujian beban Pekan 9 mensimulasikan akses konkurensi tinggi pengguna secara bersamaan pada endpoint REST API data UMKM (`/api/v1/umkm`) dan portal pemetaan spasial WebGIS Pamekasan (`/peta`) guna memastikan kestabilan sistem dalam menghadapi lonjakan traffic.

---

## 2. Metrik Kinerja Empiris Terukur (Benchmark Results)

| Parameter Kinerja | REST API Direktori UMKM | Portal Peta WebGIS Pamekasan | Batas Toleransi SLA | Status Evaluasi |
|---|:---:|:---:|:---:|:---:|
| **Total Permintaan (Requests)** | 100 request | 250 request | Min. 100 req | **Lolos** |
| **Konkurensi Pengguna** | 20 pengguna bersamaan | 25 pengguna bersamaan | 20-50 pengguna | **Lolos** |
| **Throughput (Kecepatan Pemrosesan)** | **450.45 Req/Detik** | **791.14 Req/Detik** | > 100 Req/Detik | **Sangat Baik** |
| **Rata-rata Waktu Respon (Avg Latency)**| **34.19 ms** | **30.05 ms** | < 200 ms | **Sangat Cepat** |
| **Persentil 95 (P95 Latency)** | **82.00 ms** | **44.00 ms** | < 500 ms | **Sangat Cepat** |
| **Tingkat Kegagalan (Error Rate)** | **0.00%** (0 request gagal) | **0.00%** (0 request gagal) | Maksimal 1.0% | **Sempurna (0%)** |

---

## 3. Kesimpulan & Analisis Arsitektur
Arsitektur modular *SIGARA PAMEKASAN* terbukti memiliki kestabilan tinggi dengan latensi respon rata-rata di bawah 35 milidetik dan throughput melebihi 400 transaksi/detik tanpa terjadi memory leak atau crash pada koneksi konkuren.
