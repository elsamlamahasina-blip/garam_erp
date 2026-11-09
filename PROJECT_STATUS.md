# STATUS PROYEK — MADURA ERP/EIS
**Pembaruan Terakhir**: Pekan 1 (Fondasi Proyek, SQA, dan V-Model)  
**Status Keseluruhan**: On Track — Fondasi Pekan 1 Selesai Dibangun

---

## 1. Ringkasan Status Modul

| Modul | Status Implementasi | Status Pengujian | Keterangan |
|---|---|---|---|
| **Modul 1: Autentikasi & Otorisasi RBAC** | ✅ Fondasi Selesai | ✅ Smoke Test & Unit | Role Admin, UMKM, Pimpinan, Middleware & Policy |
| **Modul 2: WebGIS Pamekasan** | ✅ Fondasi Selesai | ✅ Smoke Test | Leaflet, OSM, GeoJSON Layer, DEMO data POINT & POLYGON |
| **Modul 3: Manajemen UMKM** | ✅ Fondasi Selesai | ✅ Unit/Feature | Data 8 kategori UMKM Kab. Pamekasan, isolasi data UMKM |
| **Modul 4: Manajemen Bahan Baku** | ⏳ Terjadwal Pekan 3-4 | ⏳ Terjadwal | Skema tabel dirancang di SRS |
| **Modul 5: Produk & Resep/BOM** | ⏳ Terjadwal Pekan 3-4 | ⏳ Terjadwal | Spesifikasi BOM fleksibel disiapkan di SRS |
| **Modul 6: Produksi Garam** | ⏳ Terjadwal Pekan 4-5 | ⏳ Terjadwal | Model tambak dan musim garam disiapkan |
| **Modul 7: Produksi Olahan Laut** | ⏳ Terjadwal Pekan 4-5 | ⏳ Terjadwal | Alur batch rengginang ikan disiapkan di SRS |
| **Modul 8: Inventory / Persediaan** | ⏳ Terjadwal Pekan 4-5 | ⏳ Terjadwal | Stock movement transaction disiapkan di SRS |
| **Modul 9: Purchasing / Pembelian** | ⏳ Terjadwal Pekan 4-6 | ⏳ Terjadwal | PO & supplier workflow disiapkan |
| **Modul 10: Sales / Penjualan** | ⏳ Terjadwal Pekan 4-6 | ⏳ Terjadwal | State transition DRAFT -> COMPLETED disiapkan |
| **Modul 11: HPP & Biaya Produksi** | ⏳ Terjadwal Pekan 5 | ⏳ Terjadwal | Rumus HPP aktual dirancang di SRS |
| **Modul 12: Distribusi** | ⏳ Terjadwal Pekan 6-7 | ⏳ Terjadwal | Tracking pengiriman |
| **Modul 13: Dashboard EIS Pimpinan** | ✅ Fondasi Selesai | ✅ Smoke Test | KPI Card, ringkasan produksi, peta persebaran |
| **Modul 14: SQA & V-Model Docs** | ✅ Dokumen Pekan 1 Selesai | ✅ Review SQA | SQA Plan, SRS, V-Model, Test Strategy, Risk Register |

---

## 2. Kesiapan Lingkungan (Environment Readiness)

| Komponen | Status di Sistem | Tindakan / Solusi |
|---|---|---|
| **OS** | Windows 11 / x64 | Terdeteksi aktif |
| **Node.js** | ✅ v24.20.0 | Terinstal di host |
| **npm** | ✅ 11.19.0 | Berjalan melalui `cmd /c npm` |
| **PHP & Composer** | ⚠️ Belum di PATH Host | Disediakan panduan instalasi via winget / portable / Docker |
| **PostgreSQL + PostGIS** | ⚠️ Belum di PATH Host | Disediakan `docker-compose.yml` (PostgreSQL 16 + PostGIS 3.4) & konfigurasi `.env` |
| **Frontend Stack** | ✅ Struktur Lengkap | Vue 3 + TypeScript + Inertia + Tailwind CSS + Leaflet |
| **Git Repository** | ⚠️ Perlu Inisialisasi Lokal | Skrip `.gitignore` dan repository init disiapkan |

---

## 3. Catatan Integritas Data & SQA
- Data spasial UMKM dan Tambak Garam pada Pekan 1 berstatus **DEMO DATA** yang ditandai secara eksplisit (`is_demo: true`).
- Koordinat riil merujuk pada batas wilayah administratif Kecamatan Galis, Pademawu, dan Tlanakan di Kabupaten Pamekasan, Jawa Timur.
- Standar SQA mengacu pada **ISO/IEC/IEEE 29119** dan kerangka kerja **V-Model**.

