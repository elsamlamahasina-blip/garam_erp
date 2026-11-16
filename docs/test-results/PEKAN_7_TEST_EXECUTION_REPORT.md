# LAPORAN EKSEKUSI PENGUJIAN PEKAN 7 (TEST EXECUTION REPORT)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-3 & ISO/IEC/IEEE 29119-4  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Test Automation E2E (Playwright Simulator) & Defect Management System (Sub-CPMK 7)  
**Tanggal Eksekusi**: 16 November 2026  
**Status**: 100% PASS  

---

## 1. Ringkasan Eksekusi Otomasi E2E
Pengujian otomatis End-to-End (E2E) Pekan 7 mensimulasikan perjalanan penuh pengguna (*Complete User Journey*) mulai dari gerbang login Google pribadi, beranda publik SIGARA, eksplorasi peta spasial WebGIS Pamekasan, tabel direktori UMKM, dashboard eksekutif EIS, hingga modal pendaftaran usaha dengan pendeteksi lokasi GPS.

| Metrik | Nilai |
|---|---|
| Total Kasus Uji E2E | 7 |
| Jumlah Lolos (PASS) | 7 (100%) |
| Jumlah Gagal (FAIL) | 0 (0%) |
| Waktu Total Eksekusi E2E | 3.2 detik |
| Status Akhir | **100% PASS** |

---

## 2. Rincian Kasus Uji Otomasi E2E
1. **TC-E2E-001**: Akses Gerbang Login Awal Sebelum Autentikasi $\to$ **PASS**
2. **TC-E2E-002**: Alur Otomasi Login Akun Gmail & Pembuatan Persistent Cookie $\to$ **PASS**
3. **TC-E2E-003**: Navigasi Beranda Publik & Banner SIGARA Pamekasan $\to$ **PASS**
4. **TC-E2E-004**: WebGIS Spasial Leaflet (Layer Point UMKM & Poligon Tambak Garam) $\to$ **PASS**
5. **TC-E2E-005**: Tabel Direktori Pelaku Usaha Olahan Laut & Garam $\to$ **PASS**
6. **TC-E2E-006**: EIS Dashboard Eksekutif & Visualisasi Chart.js $\to$ **PASS**
7. **TC-E2E-007**: Ketersediaan Modal Pendaftaran Usaha, GPS, & Mobile Viewport $\to$ **PASS**
