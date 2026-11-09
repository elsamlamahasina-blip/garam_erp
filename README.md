# MADURA ERP/EIS
### Sistem Informasi Terintegrasi UMKM Garam dan Olahan Laut Kabupaten Pamekasan
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204)  
**Program Studi**: S1 Sistem Informasi, Universitas Islam Madura  
**Semester**: Ganjil 2026/2027  
**Pendekatan**: Project-Based Learning (PjBL) 16 Pekan  

---

## 📌 Ringkasan Eksekutif
MADURA ERP/EIS adalah platform terpadu berbasis web yang mengintegrasikan:
1. **ERP (Enterprise Resource Planning)**: Mengelola rantai pasok garam rakyat dan UMKM olahan laut (rengginang ikan, kerupuk ikan, terasi, dll.) dari pembelian bahan baku, formulasi resep (BOM), perintah produksi berbasis batch, kartu persediaan (inventory movement), HPP, hingga penjualan dan distribusi.
2. **WebGIS (Geographic Information System)**: Visualisasi spasial interaktif berbasis Leaflet, PostGIS, dan GeoJSON yang memetakan sebaran titik lokasi UMKM (*Point*) dan poligon lahan tambak garam (*Polygon/MultiPolygon*) di sentra pesisir Kabupaten Pamekasan (Kecamatan Galis, Pademawu, Tlanakan).
3. **EIS (Executive Information System)**: Dashboard analitik eksekutif untuk pengambil kebijakan dan asosiasi guna memantau produktivitas panen garam, tren omzet UMKM, stok penyangga bahan baku, dan indikator strategis secara *real-time*.
4. **SQA (Software Quality Assurance)**: Penerapan disiplin pengujian perangkat lunak standar industri mengacu pada **ISO/IEC/IEEE 29119** dan kerangka kerja **V-Model** dari Pekan 1 hingga Pekan 16.

---

## 🛠 Tech Stack Utama
- **Backend**: Laravel 11 / PHP 8.2+, RESTful API, Service-Repository Pattern, Form Requests, Policies, Database Transactions.
- **Frontend**: Vue 3 (Composition API), TypeScript, Inertia.js, Tailwind CSS, Vite.
- **Database**: PostgreSQL 16 + Ekstensi PostGIS 3.4.
- **WebGIS**: Leaflet 1.9+, OpenStreetMap, GeoJSON, PostGIS spatial queries (ST_AsGeoJSON, ST_Contains).
- **Dashboard & Analitik**: Chart.js.
- **SQA & Testing Tools**: Pest / PHPUnit, Playwright (E2E), Postman/Newman (API), Apache JMeter (Load Testing), OWASP ZAP (Security).
- **DevOps**: Docker, Docker Compose, Git, GitHub Actions, Nginx.

---

## 👥 Hak Akses & Role (RBAC)
Sistem memiliki 3 role utama dengan isolasi ketat antar-tenant (*multi-tenant business isolation*):

| Role | Kredensial Demo | Kewenangan |
|---|---|---|
| **Admin** | `admin@madura-erp.id` / `Password123!` | Pengelolaan master data wilayah, kategori UMKM, audit sistem, dan konfigurasi global. |
| **Pelaku UMKM (Garam)** | `garam@majungan.id` / `Password123!` | Kelola tambak garam, pencatatan musim, panen, stok garam mentah, dan penjualan. |
| **Pelaku UMKM (Rengginang)** | `rengginang@branta.id` / `Password123!` | Kelola resep/BOM rengginang, pembelian ketan & ikan, batch produksi, HPP, dan stok olahan. |
| **Pimpinan / Dinas** | `pimpinan@pamekasan.go.id` / `Password123!` | Akses dashboard EIS, peta sebaran agregat, analitik volume produksi dan tren pasar. |

> **PERINGATAN SQA**: Pengguna UMKM tidak dapat melihat atau memanipulasi data privat milik UMKM lain. Kebijakan ini diamankan pada tingkat backend melalui `UmkmPolicy.php` dan query scoping, bukan hanya menyembunyikan tombol UI.

---

## 🚀 Panduan Memulai Cepat (Quickstart)

### Opsi A: Menggunakan Docker (Rekomendasi untuk PostgreSQL + PostGIS)
1. Pastikan Docker Desktop berjalan di sistem Anda.
2. Jalankan container:
   ```bash
   docker-compose up -d
   ```
3. Akses container app dan jalankan migrasi:
   ```bash
   docker-compose exec app php artisan migrate --seed
   docker-compose exec app npm run build
   ```
4. Buka peramban di `http://localhost:8000`.

### Opsi B: Menggunakan Environment Lokal
1. **Frontend dependencies**:
   ```powershell
   cmd /c npm install
   cmd /c npm run dev
   ```
2. **Backend**:
   Pastikan PHP 8.2+ dan PostgreSQL dengan PostGIS terinstal.
   ```powershell
   copy .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```

---

## 📂 Struktur Direktori Modular Monolith
```text
├── app/
│   ├── Http/Controllers/ (Auth, Gis, Umkm, Dashboard)
│   ├── Http/Middleware/  (HandleInertiaRequests, RoleMiddleware)
│   ├── Models/           (User, Umkm, SaltPond, District, Village)
│   ├── Modules/          (Domain-driven: Gis, Umkm, SaltProduction, etc.)
│   ├── Policies/         (UmkmPolicy - isolasi keamanan data)
│   └── Services/         (GisService, UmkmService, DashboardService)
├── database/
│   ├── migrations/       (Tabel Users, Wilayah, UMKM Point, Tambak Polygon)
│   └── seeders/          (User demo, wilayah Pamekasan, spatial demo)
├── docs/                 (Dokumentasi lengkap SQA 16 Pekan)
│   ├── architecture/     (Arsitektur sistem)
│   ├── requirements/     (SRS, FRS, NFRS)
│   ├── sqa/              (SQA Plan, V-Model)
│   ├── test-cases/       (Matriks Test Case tiap pekan)
│   └── test-results/     (Laporan eksekusi pengujian aktual)
├── resources/
│   ├── js/
│   │   ├── Components/   (LeafletMap, Navbar, Sidebar, StatCard)
│   │   ├── Pages/        (Auth, Dashboard, Gis, Umkm)
│   │   └── Types/        (TypeScript definitions)
├── tests/                (Unit, Feature, API, E2E)
├── docker-compose.yml
└── MASTER_PROJECT_PROMPT.md
```

---

## 🧪 Siklus Penjaminan Mutu (SQA) Pekan 1
Pada Pekan 1, sistem telah dilengkapi dengan:
- **Dokumen SQA Plan & V-Model**: Verifikasi spesifikasi dan validasi kebutuhan UMKM.
- **Test Case Smoke Test**: Verifikasi RBAC, validasi koordinat WebGIS, integritas migrasi database.
- **Penanda DEMO Spasial**: Semua data tambak dan UMKM awal ditandai eksplisit sebagai `DEMO_DATA` guna menjaga integritas data ilmiah sebelum survei lapangan dilakukan.

