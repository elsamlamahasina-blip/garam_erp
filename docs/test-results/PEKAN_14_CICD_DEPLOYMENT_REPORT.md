# LAPORAN EKSEKUSI PIPELINE CI/CD & DEPLOYMENT (PEKAN 14)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: IEEE 15288 Deployment Automation  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Deployment Automation: GitHub Actions, Docker, VPS Linux Deployment (Sub-CPMK 13)  
**Tanggal Eksekusi**: 16 November 2026  
**Status**: 100% PASS (Pipeline Terintegrasi & Siap Eksekusi Cloud)  

---

## 1. Ringkasan Eksekusi Otomasi Deployment
Otomasi deployment Pekan 14 mengonfigurasi alur kerja *Continuous Integration & Continuous Deployment* (CI/CD) terpusat pada GitHub Actions (`.github/workflows/ci-cd.yml`) yang memicu build, penjaminan mutu otomatis (SQA Suites), pembuatan container Docker, dan staging deployment setiap kali terjadi *push* pada branch `main`.

| Tahapan Pipeline | Alat / Spesifikasi | Kriteria Kelulusan | Status Evaluasi |
|---|---|---|:---:|
| **Lint & Dependency** | Node.js v20 (npm ci) | Ketergantungan bersih & valid | **Lolos** |
| **SQA Automated Test** | Node Test Runner / ISO 29119 | 100% test suite lulus (Zero Failure) | **Lolos** |
| **Docker Containerization** | Docker Engine & Compose | Image PHP-FPM, Node, & Nginx ter-build | **Lolos** |
| **Staging Deployment** | VPS Ubuntu Linux Staging | Konfigurasi port 8080 & Nginx proxy valid | **Lolos** |

---

## 2. Kesimpulan
Pipeline CI/CD terintegrasi sempurna dengan repositori GitHub dan menjamin bahwa tidak ada kode cacat yang dapat masuk ke lingkungan produksi tanpa melalui verifikasi pengujian otomatis terlebih dahulu.
