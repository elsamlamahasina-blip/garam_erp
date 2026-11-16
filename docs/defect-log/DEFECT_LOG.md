# LOG CACAT PERANGKAT LUNAK (DEFECT LOG)
### MADURA ERP/EIS — Siklus Pengujian 16 Pekan
**Standar**: ISO/IEC/IEEE 29119-3 Defect Reporting  
**Status Terakhir**: Pekan 3 (Seluruh Defect Teridentifikasi Telah Diperbaiki & Lolos Retest)  

---

## 1. Panduan Tingkat Keparahan (Severity Definitions):
- **S1 (Critical)**: Crash sistem, kebocoran data antar-UMKM, korupsi transaksi database.
- **S2 (High)**: Fitur modul utama tidak dapat digunakan atau menolak data valid / menerima data invalid tanpa validasi boundary.
- **S3 (Medium)**: Fitur dapat digunakan namun terdapat anomali validasi format atau penolakan input sekunder.
- **S4 (Low)**: Cacat tampilan, inkonsistensi label teks, atau perbaikan kosmetik.

---

## 2. Tabel Rekam Jejak Cacat (Defect Tracking Table)

| Defect ID | Judul Cacat | Modul Terkait | Severity | Priority | Status | Langkah Reproduksi & Temuan Empiris | Solusi Perbaikan & Hasil Retest |
|:---:|---|:---:|:---:|:---:|:---:|---|---|
| **DEF-001** | Ketiadaan Validasi Batas Wilayah Spasial (*Boundary Value Analysis*) pada Koordinat `POST /api/v1/umkm`. | WebGIS & UMKM | **S2 (High)** | **High** | **CLOSED (Resolved)** | Kirim request POST dengan koordinat di luar Kabupaten Pamekasan (Lat: -7.3501 atau Lng: 113.2999). Sistem sebelumnya menerima dan mengembalikan 201 Created. | Diterapkan validasi Bounding Box Pamekasan (Lat: [-7.3500 s/d -6.9500], Lng: [113.3000 s/d 113.6500]). Request di luar batas kini ditolak dengan HTTP 422. Lolos retest TC-BVA-003, 004, 007, 008. |
| **DEF-002** | Ketiadaan Validasi Partisi Ekuivalensi (*Equivalence Partitioning*) pada Field Wajib `name` dan `owner_name`. | Modul UMKM | **S2 (High)** | **High** | **CLOSED (Resolved)** | Kirim payload POST dengan `name: ""` atau `owner_name: ""`. Sistem sebelumnya menerima data tanpa nama dan menyimpan string kosong. | Diterapkan validasi string minimal 3 karakter untuk nama usaha dan nama pemilik. Mengembalikan HTTP 422 dengan pesan edukatif. Lolos retest TC-EP-001 & TC-EP-002. |
| **DEF-003** | Penerimaan Kategori Usaha Tidak Terdaftar dan Format Nomor Telepon Tidak Standar. | Modul UMKM & Form | **S3 (Medium)** | **Medium** | **CLOSED (Resolved)** | Kirim payload dengan kategori fiktif `category: "kategori_fiktif_palsu"` dan nomor telepon tidak sah `phone: "0812-ABC-7890"`. Sistem sebelumnya menerima tanpa validasi. | Diterapkan whitelist validasi enum 8 kategori komoditas lokal dan validasi regex nomor telepon (10-15 digit numerik murni). Lolos retest TC-EP-003, 004, 005. |
| **DEF-004** | Konflik Port 8000 dengan Servis Lokal PHP Lain di Mesin Pengembang. | Lingkungan & DevOps | **S2 (High)** | **High** | **CLOSED (Resolved)** | Port 8000 bertabrakan dengan server PHP lokal yang sedang berjalan di direktori lain, menyebabkan traffic loopback localhost dialihkan ke aplikasi lain. | Port default aplikasi SIGARA dipindahkan ke port 8080 secara independen (`PORT || 8080`). Akses localhost dan IP Wi-Fi kini 100% stabil tanpa interferensi port. |
