# DOKUMEN ARSITEKTUR SISTEM (SYSTEM ARCHITECTURE DOCUMENT)
**Proyek**: MADURA ERP/EIS — Sistem Informasi Terintegrasi UMKM Garam & Olahan Laut Pamekasan  
**Versi**: 1.0.0 (Pekan 1)  
**Tanggal**: 2026-11-04  
**Standar**: ISO/IEC/IEEE 42010 Architecture Description  

---

## 1. Ikhtisar Arsitektur
MADURA ERP/EIS dibangun dengan pola arsitektur **Modular Monolith**. Arsitektur ini menggabungkan kemudahan deployment dan integritas transaksi ACID dalam satu basis kode monolitik, namun tetap mempertahankan pemisahan domain bisnis yang tegas (*bounded contexts*).

### Komponen Inti:
1. **Core ERP Engine**: Mengelola siklus pengadaan (*purchasing*), resep fleksibel (*Bill of Materials*), produksi *batch-tracked*, mutasi persediaan ganda (*materials* & *finished goods*), penghitungan HPP aktual, serta pesanan penjualan (*sales*).
2. **WebGIS Subsystem**: Mengelola pemetaan spasial geospasial Kabupaten Pamekasan menggunakan PostGIS di tingkat database, Leaflet di peramban, serta GeoJSON sebagai protokol transmisi data spasial.
3. **EIS Analytical Engine**: Mengonsolidasikan data operasional menjadi KPI eksekutif, grafik tren, dan perbandingan produktivitas wilayah tanpa melakukan *hardcoding* data.
4. **SQA Verification Layer**: Lapisan pengujian otomatis dan dokumentasi terstruktur untuk menjamin keandalan sistem setiap pekan perkuliahan.

```
+-------------------------------------------------------------------------------+
|                             MADURA ERP/EIS FRONTEND                           |
|       Vue 3 (Composition API) + TypeScript + Inertia.js + Tailwind CSS        |
|  [ Dashboard EIS ]   [ WebGIS Pamekasan ]   [ ERP Management ]   [ SQA Log ]  |
+---------------------------------------+---------------------------------------+
                                        | (Inertia HTTP / JSON Protocol)
+---------------------------------------v---------------------------------------+
|                             LARAVEL BACKEND APPLICATION                       |
|                                                                               |
|  [ Auth & RBAC ]        [ UmkmPolicy ]           [ RoleMiddleware ]           |
|                                                                               |
|  +------------------------+  +------------------------+  +-----------------+  |
|  |     Modul WebGIS       |  |       Modul ERP        |  |    Modul EIS    |  |
|  | - Leaflet GeoJSON      |  | - Bahan & BOM / Resep  |  | - Kinerja Bisnis|  |
|  | - Point UMKM Spasial   |  | - Produksi Batch Garam |  | - Metrik Wilayah|  |
|  | - Poligon Tambak PostGIS| | - Produksi Olahan Laut |  | - Agregat Panen |  |
|  | - Filter Wilayah & Desa|  | - Persediaan & HPP     |  |                 |  |
|  +------------------------+  +------------------------+  +-----------------+  |
+---------------------------------------+---------------------------------------+
                                        | (PDO Database Transactions)
+---------------------------------------v---------------------------------------+
|                       POSTGRESQL 16 + POSTGIS 3.4 DATABASE                    |
|                                                                               |
|  [ users ]       [ regencies / districts / villages ]      [ umkms (POINT) ]  |
|  [ salt_ponds (POLYGON) ]   [ materials ]   [ recipes ]   [ production_logs ] |
+-------------------------------------------------------------------------------+
```

---

## 2. Struktur Modul & Pemisahan Domain
Kode bisnis ditempatkan pada direktori domain terisolasi:
- `app/Modules/Gis/`: Layanan geospasial, query spasial PostGIS, bounding box validation.
- `app/Modules/Umkm/`: Manajemen profil dan klasifikasi 8 kategori usaha.
- `app/Modules/SaltProduction/`: Manajemen tambak, musim garam, dan kristalisasi.
- `app/Modules/SeafoodProcessing/`: Rantai produksi rengginang, kerupuk, terasi.
- `app/Modules/Materials/`: Katalog bahan baku dan satuan terstandar.
- `app/Modules/Recipes/`: Formulasi Bill of Materials fleksibel.
- `app/Modules/Inventory/`: Mutasi stok double-entry dengan database transaction.
- `app/Modules/Purchasing/`: Pengadaan bahan baku dan penerimaan barang.
- `app/Modules/Sales/`: State machine transaksi pesanan dan faktur.
- `app/Modules/Finance/`: Perhitungan HPP aktual dan laba kotor.
- `app/Modules/Analytics/`: Konsolidasi metrik dashboard EIS.

---

## 3. Isolasi Keamanan Multi-Tenant UMKM
Aturan bisnis mendasar sistem: **Pelaku UMKM A tidak diperbolehkan melihat atau mengubah data privat milik Pelaku UMKM B**.
Penerapan arsitektural:
1. Setiap entitas data operasional memiliki foreign key `umkm_id`.
2. Diatur pada tingkat backend melalui `UmkmPolicy.php` dan `UmkmService.php`.
3. Query database secara otomatis di-*scope* berdasarkan `user()->umkm_id` ketika pengguna terautentikasi memiliki peran `umkm`.
4. Role `admin` memiliki akses sistemik penuh untuk audit, sedangkan `pimpinan` memiliki akses read-only agregat untuk pelaporan EIS.

