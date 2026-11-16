# DOKUMEN RENCANA PENGUJIAN UTAMA (MASTER TEST PLAN)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar Kualitas**: ISO/IEC/IEEE 29119-3 Test Documentation  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Program Studi**: S1 Sistem Informasi, Fakultas Teknik, Universitas Islam Madura  
**Versi Dokumen**: 1.0 (Pekan 2)  
**Status**: Diterbitkan & Disetujui  

---

## 1. Identifikasi & Pendahuluan Dokumen
Dokumen Master Test Plan ini mendefinisikan strategi menyeluruh, ruang lingkup, kriteria penerimaan, alokasi sumber daya, jadwal, dan manajemen risiko pengujian perangkat lunak sistem **MADURA ERP/EIS (SIGARA PAMEKASAN)**. Pengujian dirancang untuk menjamin bahwa seluruh proses bisnis UMKM garam dan aneka olahan hasil laut di Kabupaten Pamekasan beroperasi dengan benar, aman, presisi, dan terintegrasi antara modul operasional ERP, WebGIS spasial, dan Executive Information System (EIS).

---

## 2. Referensi Standar & Landasan Normatif
1. **ISO/IEC/IEEE 29119-1:2022**: *Software Testing — General Concepts*.
2. **ISO/IEC/IEEE 29119-2:2021**: *Software Testing — Test Processes*.
3. **ISO/IEC/IEEE 29119-3:2021**: *Software Testing — Test Documentation*.
4. **ISO/IEC/IEEE 29119-4:2021**: *Software Testing — Test Techniques*.
5. **RPS Kurikulum OBE MKB020204**: Manajemen dan Proyek Sistem Informasi, Universitas Islam Madura.
6. **RFC 7946**: *The GeoJSON Format Specification*.

---

## 3. Butir Uji & Fitur yang Diuji (Test Items & Scope)

### 3.1 Fitur yang Masuk Ruang Lingkup (In-Scope)
| ID Modul | Nama Modul | Karakteristik Pengujian |
|---|---|---|
| **MOD-01** | Autentikasi & RBAC Multi-Tenant | Validasi login Google pribadi / email, pembatasan hak akses (*Admin, UMKM, Pimpinan*), isolasi privasi data UMKM. |
| **MOD-02** | WebGIS Pamekasan | Presisi koordinat Point UMKM, validasi batas wilayah (*bounding box* Pamekasan), topologi poligon tambak garam tertutup (*closed ring*), filter interaktif kecamatan & komoditas. |
| **MOD-03** | Manajemen UMKM Olahan Laut & Garam | Pendaftaran usaha baru, kelengkapan metadata (pemilik, kapasitas produksi, tenaga kerja, kontak), direktori usaha. |
| **MOD-04** | Bahan Baku & Inventori | Validasi input kuantitas non-negatif, mutasi stok, peringatan stok minimum (*reorder point*). |
| **MOD-05** | Resep & Bill of Materials (BOM) | Fleksibilitas komposisi bahan multi-produk (garam konsumsi, rengginang ikan/lorjuk, kerupuk terung, terasi, petis). |
| **MOD-06** | Produksi Garam & Olahan Laut | Pencatatan hasil panen tambak, validasi kadar mutu NaCl, alur perubahan status batch (*Draft -> Proses -> Selesai*). |
| **MOD-07** | Kalkulasi HPP & Keuangan | Algoritma perhitungan Harga Pokok Penjualan berbasis BOM, akurasi desimal dan batas pembagian nol. |
| **MOD-08** | REST API & Integrasi | Validasi status HTTP code (200, 201, 400, 401, 403, 404, 422), validasi struktur JSON payload, responsivitas. |
| **MOD-09** | Executive Information System (EIS) | Agregasi data komposit real-time, visualisasi Chart.js, konsistensi data grafik terhadap catatan operasional. |
| **MOD-10** | Keamanan & Kepatuhan OWASP | Pencegahan injeksi SQL, Cross-Site Scripting (XSS), Broken Object Level Authorization (BOLA), sanitasi GeoJSON. |

### 3.2 Fitur di Luar Ruang Lingkup (Out-of-Scope)
- Integrasi payment gateway perbankan real-time (fase simulasi).
- Verifikasi citra satelit resolusi tinggi real-time (menggunakan base map OpenStreetMap dan PostGIS lokal).

---

## 4. Pendekatan & Strategi Pengujian (Test Approach)
Pengujian dieksekusi secara bertahap mengikuti **V-Model Development Lifecycle**:
1. **Pekan 1**: Smoke Testing & Verifikasi Arsitektur Baseline.
2. **Pekan 2**: Test Planning, Resource Estimation, Risk Analysis (ISO/IEC/IEEE 29119-3).
3. **Pekan 3**: Black-Box Testing berbasis *Equivalence Partitioning (EP)* dan *Boundary Value Analysis (BVA)* pada formulir data.
4. **Pekan 4**: Advanced Black-Box menggunakan *Decision Table* dan *State Transition Testing* pada aturan bisnis multi-kondisi.
5. **Pekan 5**: Structural Testing (*White-Box*) menghitung *Cyclomatic Complexity* $V(G)$ dan *Basis Path Coverage* pada logika kalkulasi HPP.
6. **Pekan 6**: Integration & Automated REST API Testing menggunakan Postman & Newman CLI.
7. **Pekan 7**: End-to-End (E2E) Test Automation menggunakan Playwright dan pelaporan bug terstandar di GitHub Issues / Defect Log.
8. **Pekan 8 (UTS)**: Audit Dokumen Pengujian, Evaluasi CPMK 2, Peer Review, dan Rekonsiliasi Cacat.
9. **Pekan 9**: Non-Functional Performance & Load Testing (simulasi 100–500 concurrent users via Apache JMeter/k6).
10. **Pekan 10**: Security Vulnerability Assessment (OWASP Top 10) pada autentikasi, otorisasi, dan input vector.
11. **Pekan 11**: User Acceptance Testing (UAT) dan tata kelola Berita Acara Sign-Off.
12. **Pekan 12**: Perumusan Strategi Konversi/Implementasi (*Direct, Parallel, Phased, Pilot*) dan *Change Management*.
13. **Pekan 13**: Prosedur Migrasi Data (ETL) dari format CSV/Excel ke Database Produksi beserta *Cutover Checklist* dan *Rollback Plan*.
14. **Pekan 14**: Otomasi Deployment CI/CD (GitHub Actions, Docker, Linux VPS).
15. **Pekan 15**: Post-Implementation Review (PIR) dan Rencana Pemeliharaan Sistem.
16. **Pekan 16 (UAS)**: Evaluasi Akhir Proyek, Live Application & Deployment Demo, serta Simulasi Live Rollback.

---

## 5. Kriteria Masuk dan Kriteria Keluar (Entry & Exit Criteria)

### 5.1 Kriteria Masuk (Entry Criteria)
Sebelum fase pengujian pada setiap pekan dimulai, prasyarat berikut wajib terpenuhi:
1. Kode sumber modul target telah berhasil dikompilasi atau dijalankan tanpa *syntax error*.
2. Lingkungan pengujian (*test environment*) aktif (Server lokal aktif di port 8000 dan basis data terhubung).
3. Test Case Specification untuk pekan bersangkutan telah disusun dan disetujui.
4. Data uji (*seed data* & *test fixtures*) dalam status konsisten dan terisolasi.

### 5.2 Kriteria Keluar (Exit Criteria)
Pengujian pada suatu modul dinyatakan selesai jika:
1. **Tingkat Kelulusan (Pass Rate)**: Minimal 95% dari seluruh Test Case yang direncanakan berstatus **PASS**.
2. **Defect Severity**: Tidak ada cacat berstatus *Critical (P0)* atau *High (P1)* yang belum terselesaikan (*zero unresolved blocker defects*).
3. Seluruh cacat yang ditemukan telah dicatat secara transparan pada Dokumen Defect Log.
4. Laporan Hasil Pengujian (*Test Execution Report*) pekan bersangkutan telah didokumentasikan dan di-commit ke Git.

---

## 6. Kriteria Penundaan & Pemulihan (Suspension & Resumption Criteria)
- **Suspension Criteria**: Pengujian ditunda jika server utama *crash*, basis data mengalami korupsi, atau konektivitas environment terputus lebih dari 50% skenario uji.
- **Resumption Criteria**: Pengujian dilanjutkan setelah perbaikan dilakukan, basis data dipulihkan (*fresh seed*), dan pengujian asap (*smoke test*) dinyatakan lulus 100%.

---

## 7. Kebutuhan Lingkungan & Estimasi Sumber Daya (Environmental & Resource Needs)

### 7.1 Perangkat Keras & Lunak
- **Server / Host**: Mesin Intel/AMD x64, RAM 8GB+, OS Windows / Ubuntu Linux.
- **Runtime & DB**: Node.js v20+, PHP 8.2+, PostgreSQL 16 dengan ekstensi PostGIS 3.4.
- **Alat Uji**: Node Test Runner, Postman v10+, Newman CLI, Playwright, Apache JMeter / k6, OWASP ZAP.
- **Repositori & CI/CD**: Git v2.56+, GitHub Actions, Docker Engine & Docker Compose.

### 7.2 Alokasi Peran Tim Penguji (SQA Roles)
- **Lead Test Architect**: Bertanggung jawab atas desain strategi pengujian dan kepatuhan ISO 29119.
- **Test Engineer (Functional & Automation)**: Merancang dan mengeksekusi test case EP, BVA, Decision Table, dan skrip Playwright/Newman.
- **Security & Performance Specialist**: Melakukan load test JMeter dan vulnerability scanning OWASP.
- **UAT & Migration Coordinator**: Mengawal skenario UAT bersama pengguna serta skrip migrasi ETL.

---

## 8. Analisis Risiko Pengujian & Matriks RPN (Risk Analysis)

| ID | Deskripsi Risiko | Probabilitas (1-5) | Dampak (1-5) | RPN (P x D) | Strategi Mitigasi Terencana |
|:---:|---|:---:|:---:|:---:|---|
| **R-01** | Celah kebocoran data antar-UMKM (*Data Isolation Breach*) | 3 | 5 | **15** | Verifikasi *UmkmPolicy* dan filter multi-tenant pada setiap endpoint API; audit isolasi per pekan. |
| **R-02** | Input koordinat lokasi fiktif atau di luar Kabupaten Pamekasan | 4 | 4 | **16** | Validasi batas koordinat ketat (*Bounding Box Validator*) pada backend; tolak koordinat di luar lat [-7.35, -6.95] dan lng [113.30, 113.65]. |
| **R-03** | Inkonsistensi perhitungan HPP akibat pembagian nol atau input minus | 3 | 4 | **12** | Validasi BVA pada input bahan baku; unit test coverage pada formula HPP dengan batas nilai terkecil. |
| **R-04** | Kegagalan beban saat ratusan pengunjung mengakses peta WebGIS bersamaan | 3 | 4 | **12** | Optimasi indexing spasial GiST pada PostGIS; caching layer GeoJSON statis; load testing berkala via JMeter. |
| **R-05** | Kegagalan migrasi data dari format manual (Excel kotor) ke database | 4 | 4 | **16** | Penyusunan skrip Python ETL dengan tahapan data cleaning, validasi skema, deduplikasi, dan dry-run reconciliation. |

---

## 9. Deliverables Pengujian Sesuai Matriks RPS
1. **Pekan 2**: Dokumen Master Test Plan (ISO/IEC/IEEE 29119-3) & Test Plan Automated Verification Suite.
2. **Pekan 3**: Dokumen Desain Test Case Black-Box (EP & BVA) + Laporan Eksekusi Cacat Validasi Form.
3. **Pekan 4**: Matriks Decision Table & State Transition Testing Alur Transaksi UMKM.
4. **Pekan 5**: Dokumen Analisis White-Box (Control Flow Graph & Cyclomatic Complexity Algoritma HPP).
5. **Pekan 6**: Postman Collection & Newman Execution Report untuk REST API.
6. **Pekan 7**: Skrip Playwright E2E Test Suite & Defect Management Log.
7. **Pekan 8**: Dokumen Evaluasi Tengah Semester (UTS) & Audit Kualitas Perangkat Lunak Phase 1.
8. **Pekan 9**: Laporan Load & Performance Testing (JMeter/k6 Benchmark).
9. **Pekan 10**: Laporan Audit Keamanan OWASP Top 10 & Vulnerability Assessment.
10. **Pekan 11**: Dokumen Matriks UAT & Format Berita Acara UAT Sign-Off.
11. **Pekan 12**: Dokumen Strategi Konversi & Rencana Manajemen Perubahan (Change Management).
12. **Pekan 13**: Skrip ETL Python Migrasi Data Legacy, Cutover Checklist & Rollback Procedure.
13. **Pekan 14**: Konfigurasi CI/CD Pipeline GitHub Actions & Docker Staging Deployment.
14. **Pekan 15**: Laporan Post-Implementation Review (PIR) & Rencana Pemeliharaan Sistem.
15. **Pekan 16**: Dokumen Evaluasi Akhir Proyek (UAS), Laporan Simulasi Live Rollback & Verifikasi Capstone.

