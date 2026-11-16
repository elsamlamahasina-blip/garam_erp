# LAPORAN AUDIT KEAMANAN SISTEM OWASP TOP 10 (PEKAN 10)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-4 Clause 9 & OWASP Top 10 Application Security  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Security Testing: Vulnerability Assessment (SQLi, XSS, Broken Access Control) (Sub-CPMK 9)  
**Tanggal Eksekusi**: 16 November 2026  
**Status**: 100% PASS (Zero High-Risk Vulnerabilities)  

---

## 1. Ringkasan Eksekutif Audit Keamanan
Audit keamanan Pekan 10 memindai kerentanan web aplikasi SIGARA Pamekasan terhadap 4 kategori ancaman utama OWASP Top 10:
1. **A01: Broken Access Control**: Verifikasi otorisasi backend dan isolasi data privat antar-entitas UMKM.
2. **A03: Injection**: Uji injeksi SQL (`' OR '1'='1' --`) pada query pencarian WebGIS.
3. **A03: Stored XSS**: Uji penyusupan script berbahaya (`<script>alert()</script>`) pada form pendaftaran usaha.
4. **A07: Identification & Authentication Failures**: Uji atribut keamanan cookie sesi pengguna (`SameSite=Lax`, `Path=/`).

---

## 2. Hasil Audit Kerentanan Keamanan
| Vektor Ancaman OWASP | Skenario Uji | Hasil Uji Aktual | Status Evaluasi |
|---|---|---|:---:|
| **A01: Broken Access Control** | Upaya akses lintas akun UMKM privat | Backend memblokir akses privat UMKM lain via Policy | **AMAN (PASS)** |
| **A03: SQL Injection** | Injeksi SQL pada filter parameter | Tidak ada stack trace bocor, parameter disterilkan | **AMAN (PASS)** |
| **A03: Cross-Site Scripting (XSS)** | Payload HTML script pada form nama/produk | Payload ditangani dengan aman tanpa eksekusi DOM | **AMAN (PASS)** |
| **A07: Authentication Failures** | Verifikasi atribut session cookie | Menggunakan atribut `SameSite=Lax; Path=/` | **AMAN (PASS)** |
