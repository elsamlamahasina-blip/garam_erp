# CHANGELOG — MADURA ERP/EIS

Semua perubahan tercatat secara berurutan dan terikat pada pekan pengembangan PjBL.

---

## [Pekan 1] - 2026-11-04
### Added (Ditambahkan)
- Inisialisasi struktur Modular Monolith Laravel + Vue 3 Inertia TypeScript.
- Berkas panduan acuan `MASTER_PROJECT_PROMPT.md`, `PROJECT_STATUS.md`, `WEEKLY_PROGRESS.md`, dan `README.md`.
- Konfigurasi Docker Compose (`docker-compose.yml`) dengan layanan PostgreSQL 16 + PostGIS 3.4, Nginx, dan PHP-FPM.
- Migrasi database:
  - `0001_01_01_000000_create_users_table.php` (mendukung role: admin, umkm, pimpinan).
  - `2026_01_01_000001_create_regions_tables.php` (kabupaten, kecamatan, desa di Pamekasan).
  - `2026_01_01_000002_create_umkms_table.php` (mendukung 8 kategori UMKM, kolom koordinat spasial POINT, validasi isolasi data).
  - `2026_01_01_000003_create_salt_ponds_table.php` (tambak garam dengan koordinat POLYGON PostGIS dan luas lahan).
- Database Seeders:
  - `RoleAndUserSeeder.php` (akun Admin, UMKM Garam Majungan, UMKM Rengginang Ikan Branta, Pimpinan).
  - `PamekasanRegionSeeder.php` (Kecamatan Galis, Pademawu, Tlanakan beserta desa pesisir).
  - `DemoUmkmAndGisSeeder.php` (data koordinat demo UMKM dan poligon tambak yang ditandai eksplisit `is_demo = true`).
- Service & Policy:
  - `UmkmPolicy.php` (menjamin UMKM A tidak dapat melihat/mengubah data privat UMKM B).
  - `GisService.php` (format FeatureCollection GeoJSON untuk titik UMKM dan poligon tambak).
- Frontend (Vue 3 + TypeScript + Tailwind CSS):
  - `AppLayout.vue` dan navigasi sidebar dengan 16 menu standar ERP/EIS.
  - `Gis/Index.vue` & `LeafletMap.vue` (Peta interaktif Leaflet, filter kecamatan/desa/kategori, marker cluster, polygon tambak).
  - `Dashboard/Index.vue` (Dashboard EIS dengan metrik produksi, penjualan, dan ringkasan geografis).
  - `Auth/Login.vue` (Form login dengan pemilihan role demo).
  - `Umkm/Index.vue` (Katalog UMKM dengan filter sektor garam dan olahan laut).
- Dokumentasi SQA Pekan 1:
  - `docs/architecture/SYSTEM_ARCHITECTURE.md`
  - `docs/requirements/SOFTWARE_REQUIREMENTS_SPECIFICATION.md`
  - `docs/sqa/SOFTWARE_QUALITY_ASSURANCE_PLAN.md`
  - `docs/sqa/V_MODEL_VERIFICATION_VALIDATION.md`
  - `docs/test-plan/INITIAL_TEST_STRATEGY.md`
  - `docs/test-plan/INITIAL_RISK_REGISTER.md`
  - `docs/test-cases/PEKAN_1_SMOKE_TEST_CASES.md`
  - `docs/test-results/PEKAN_1_TEST_EXECUTION_REPORT.md`
- Test Suites:
  - Unit Test koordinat spasial & isolasi data UMKM.
  - Feature Test otorisasi RBAC & endpoint GeoJSON GIS.

