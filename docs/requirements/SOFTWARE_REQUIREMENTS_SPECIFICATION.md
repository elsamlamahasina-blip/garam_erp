# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
### MADURA ERP/EIS — UMKM Garam & Olahan Laut Kabupaten Pamekasan
**Standar Acuan**: ISO/IEC/IEEE 29148:2018 Systems and software engineering — Life cycle processes — Requirements engineering  
**Versi**: 1.0.0 (Pekan 1)  
**Status**: Disetujui untuk Fondasi Arsitektur  

---

## 1. Pendahuluan
Dokumen ini mendefinisikan spesifikasi kebutuhan perangkat lunak MADURA ERP/EIS untuk memfasilitasi operasional rantai pasok garam rakyat dan pengolahan hasil laut di Kabupaten Pamekasan, visualisasi geospasial tambak dan UMKM, pelaporan eksekutif EIS, serta jaminan mutu perangkat lunak berstandar ISO 29119.

---

## 2. Deskripsi Pengguna & Hak Akses
1. **Administrator (Admin)**: Bertanggung jawab atas pengelolaan konfigurasi sistem, data wilayah administratif Kabupaten Pamekasan, klasifikasi jenis usaha, audit log, serta pemeliharaan sistem.
2. **Pelaku UMKM / Petambak (UMKM)**: Pengelola entitas bisnis individu (petambak garam atau pengrajin olahan laut seperti rengginang, kerupuk, terasi). Mengelola bahan baku, formulasi resep, batch produksi, kartu stok, transaksi pembelian, dan penjualan.
3. **Pimpinan / Pengambil Kebijakan (Pimpinan)**: Pejabat dinas atau eksekutif asosiasi yang memerlukan informasi makro melalui dashboard EIS dan peta sebaran potensi untuk perumusan kebijakan.

---

## 3. Kebutuhan Fungsional (Functional Requirements)

| Kode Kebutuhan | Nama Kebutuhan | Deskripsi & Aturan Bisnis | Prioritas |
|---|---|---|---|
| **FR-01** | Autentikasi & RBAC | Sistem menyediakan mekanisme login, logout, dan otorisasi ketat berbasis peran (*Admin*, *UMKM*, *Pimpinan*). | P0 (Kritis) |
| **FR-02** | Isolasi Data Multi-Tenant | Pengguna UMKM dilarang melihat atau memanipulasi data privat milik UMKM lain. Validasi wajib di backend policy. | P0 (Kritis) |
| **FR-03** | Peta Interaktif WebGIS | Sistem menampilkan peta Kabupaten Pamekasan berbasis Leaflet dan OpenStreetMap dengan kontrol layer responsif. | P0 (Kritis) |
| **FR-04** | Pemetaan Titik (Point) & Poligon | Menampilkan marker lokasi UMKM (*Point*) dan batas hamparan tambak garam (*Polygon*) dari database PostGIS. | P0 (Kritis) |
| **FR-05** | Filter Spasial Bertingkat | Menyediakan filter berdasarkan Kecamatan (Galis, Pademawu, Tlanakan), Desa pesisir, Sektor, dan 8 Kategori UMKM. | P1 (Tinggi) |
| **FR-06** | Manajemen Profil UMKM | Mencatat profil lengkap UMKM: kode, nama, pemilik, kapasitas produksi, jumlah tenaga kerja, koordinat, dan status. | P0 (Kritis) |
| **FR-07** | Inventarisasi Tambak Garam | Mencatat luas tambak ($m^2$/Ha), musim produksi, status kepemilikan, dan geometri poligon lahan. | P1 (Tinggi) |
| **FR-08** | Manajemen Bahan Baku | Mengelola katalog bahan baku (garam, ikan, udang, ketan, bumbu, kemasan) dengan satuan baku terstandar. | P1 (Tinggi) |
| **FR-09** | Resep / Bill of Materials (BOM) | Menyediakan formula resep fleksibel per produk untuk kalkulasi kebutuhan bahan baku dan HPP. | P1 (Tinggi) |
| **FR-10** | Perintah Produksi Batch | Mencatat siklus produksi berbasis batch, pemakaian bahan aktual, hasil jadi, dan susut/reject. | P1 (Tinggi) |
| **FR-11** | Kartu Persediaan & Mutasi | Setiap perubahan stok wajib menghasilkan mutasi persediaan dengan *database transaction* guna mencegah inkonsistensi. | P0 (Kritis) |
| **FR-12** | Pembelian & Penjualan | Mengelola alur PO pembelian bahan dan siklus pesanan penjualan dengan state transition yang valid. | P1 (Tinggi) |
| **FR-13** | Kalkulasi HPP Aktual | Menghitung HPP per unit berdasarkan biaya bahan baku riil, tenaga kerja, dan overhead per batch. | P1 (Tinggi) |
| **FR-14** | Dashboard Analitik EIS | Menyajikan KPI eksekutif (total UMKM, panen garam, output olahan, estimasi omzet, grafik kecamatan) secara dinamis. | P1 (Tinggi) |

---

## 4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Kode Kebutuhan | Kategori | Spesifikasi & Metrik Keberhasilan |
|---|---|---|
| **NFR-01** | Keamanan | Backend authorization menggunakan Laravel Policies & Middleware. Password di-hash menggunakan algoritma Bcrypt/Argon2. CSRF token aktif pada seluruh mutasi data. |
| **NFR-02** | Performa | Waktu muat peta WebGIS dan respons API GeoJSON tidak melebihi 2.0 detik pada koneksi standar. |
| **NFR-03** | Integritas Data | Transaksi keuangan dan mutasi stok wajib dibungkus dalam *Database Transaction* (ACID). Foreign key dan constraint aktif. |
| **NFR-04** | Integritas Ilmiah | Data spasial lapangan yang belum diverifikasi secara faktual wajib ditandai secara visual dan struktural sebagai `DEMO DATA`. |
| **NFR-05** | Portabilitas | Aplikasi dapat dijalankan melalui Docker Compose (PHP 8.2, Nginx, PostgreSQL 16 + PostGIS 3.4) maupun lingkungan host lokal. |
| **NFR-06** | Penjaminan Mutu | Seluruh fungsi terikat pada matriks pengujian ISO/IEC/IEEE 29119 dengan bukti hasil aktual setiap pekan perkuliahan. |

