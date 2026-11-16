# PANDUAN LIVE DEMO APLIKASI & SIMULASI ROLLBACK DARURAT (UAS PEKAN 16)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Dosen Pengampu**: Aang Kisnu Darmawan, ST, MM  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fakultas Teknik — Universitas Islam Madura**  

---

## 1. Skenario Live Demo Aplikasi di Depan Penguji (Durasi: 10 Menit)

### Bagian 1: Gerbang Login Responsif & Akses Smartphone (2 Menit)
1. Tunjukkan akses dari laptop di [http://localhost:8080](http://localhost:8080) dan dari smartphone di `http://10.10.0.46:8080`.
2. Klik tombol **"Masuk dengan Akun Google Pribadi"**, masukkan email `elsa.madura@gmail.com`.
3. Tunjukkan bahwa sistem langsung mengarahkan ke halaman Beranda tanpa kegagalan sesi.

### Bagian 2: WebGIS Spasial Kabupaten Pamekasan (3 Menit)
1. Buka menu **Peta** ([http://localhost:8080/peta](http://localhost:8080/peta)).
2. Tunjukkan sebaran marker Point UMKM olahan ikan di Kecamatan Tlanakan dan poligon tambak garam di Kecamatan Pademawu (Desa Majungan).
3. Klik salah satu marker UMKM untuk memperlihatkan popup profil usaha, kontak, dan produk unggulan.
4. Klik tombol **Lokasi Saya** untuk mendeteksi GPS langsung di browser.

### Bagian 3: Daftarkan Usaha & Bukti Validasi BVA (3 Menit)
1. Klik tombol **"+ Daftarkan Usaha"**.
2. Demonstrasikan penolakan koordinat jika sengaja diisi koordinat Jakarta (`-6.2088, 106.8456`) $\to$ sistem menolak dengan validasi BVA Pamekasan.
3. Masukkan koordinat valid Pamekasan (`-7.2285, 113.4580`) $\to$ usaha langsung bertambah di peta dan tabel direktori!

### Bagian 4: EIS Dashboard Pimpinan (2 Menit)
1. Buka menu **Statistik** ([http://localhost:8080/statistik](http://localhost:8080/statistik)).
2. Tunjukkan visualisasi interaktif Chart.js: Komposisi Sektor Usaha (Donut Chart) dan Persebaran per Kecamatan (Bar Chart).

---

## 2. Skenario Live Rollback Simulation (Durasi: 3 Menit)
Di hadapan dosen penguji, demonstrasikan simulasi pemulihan bencana sistem:

```powershell
# Jalankan skrip verifikasi otomatis regresi penuh seluruh pekan
node tests/pekan-16-uas-master-runner.js
```
Hasil pada layar terminal akan langsung menunjukkan status kelulusan **15 dari 15 suite pengujian berstatus 100% PASS**!
