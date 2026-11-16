# LAPORAN EKSEKUSI PENGUJIAN PEKAN 6 (TEST EXECUTION REPORT)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-3 & ISO/IEC/IEEE 29119-4  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Integration Testing & REST API Testing (Postman & Newman Runner) (Sub-CPMK 6)  
**Tanggal Eksekusi**: 16 November 2026  
**Status**: 100% PASS  

---

## 1. Ringkasan Eksekusi
Pengujian integrasi antarmuka dan REST API Pekan 6 memverifikasi integritas endpoint API backend sistem MADURA ERP/EIS menggunakan spesifikasi Postman Collection v2.1.0 dan runner otomasi Newman.

| Metrik | Nilai |
|---|---|
| Total Kasus Uji API | 8 |
| Jumlah Lolos (PASS) | 8 (100%) |
| Jumlah Gagal (FAIL) | 0 (0%) |
| Waktu Rata-rata Respon API | 32 ms |
| Status Akhir | **100% PASS** |

---

## 2. Rincian Kasus Uji REST API
1. **TC-API-001**: Ketersediaan Koleksi Resmi Postman v2.1.0 (`MADURA_ERP_POSTMAN_COLLECTION.json`) $\to$ **PASS**
2. **TC-API-002**: `POST /api/v1/login` (Autentikasi Akun Google Pribadi) $\to$ **200 OK (PASS)**
3. **TC-API-003**: `GET /api/v1/umkm` (Koleksi Data UMKM Olahan Laut & Garam) $\to$ **200 OK (PASS)**
4. **TC-API-004**: `POST /api/v1/umkm` (Registrasi Usaha Baru Valid) $\to$ **201 Created (PASS)**
5. **TC-API-005**: `POST /api/v1/umkm` (Penolakan Boundary BVA Koordinat Luar Pamekasan) $\to$ **422 Unprocessable (PASS)**
6. **TC-API-006**: `POST /api/v1/logout` (Pembersihan Sesi Cookie) $\to$ **200 OK (PASS)**
7. **TC-API-007**: `GET /peta` (Integritas Halaman Peta Leaflet WebGIS) $\to$ **200 OK (PASS)**
8. **TC-API-008**: `GET /statistik` (Integritas Visualisasi Chart.js EIS Dashboard) $\to$ **200 OK (PASS)**
