# STRATEGI PENGUJIAN AWAL (INITIAL TEST STRATEGY)
### MADURA ERP/EIS — Pekan 1
**Standar**: ISO/IEC/IEEE 29119-3 Test Documentation  

---

## 1. Ruang Lingkup Pengujian (Test Scope)
Pengujian pada Pekan 1 difokuskan pada pengujian asap (*Smoke Testing*) dan verifikasi fondasi arsitektur, meliputi:
1. **Verifikasi Integritas Direktori**: Memastikan seluruh direktori arsitektur Modular Monolith telah tersedia.
2. **Verifikasi Autentikasi & RBAC**: Memastikan struktur role (admin, umkm, pimpinan) dan aturan validasi form login.
3. **Verifikasi Isolasi Data Multi-Tenant**: Memastikan policy backend memblokir akses lintas entitas bisnis UMKM.
4. **Verifikasi Logika Spasial WebGIS**: Memastikan algoritma boundary validation menolak koordinat di luar Kabupaten Pamekasan dan menerima koordinat valid Pademawu/Galis/Tlanakan.
5. **Verifikasi Standar GeoJSON**: Memastikan poligon tambak garam tertutup sempurna (*closed ring*) dan marker UMKM bertipe Point sesuai RFC 7946.

---

## 2. Klasifikasi Keparahan Cacat (Defect Severity Classification)
- **Critical (P0)**: Sistem lumpuh, terjadi kebocoran data antar-UMKM, kegagalan fatal koneksi database, atau pelanggaran integritas data transaksi.
- **High (P1)**: Fitur bisnis utama gagal berfungsi (misal: marker WebGIS tidak muncul, resep tidak dapat dihitung).
- **Medium (P2)**: Fungsi berjalan namun terdapat anomali minor (misal: format angka desimal tidak rapi, filter tidak mereset nilai default).
- **Low (P3)**: Cacat kosmetik atau perbaikan teks label antarmuka pengguna.

