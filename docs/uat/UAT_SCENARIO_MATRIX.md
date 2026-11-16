# MATRIKS SKENARIO USER ACCEPTANCE TESTING (UAT)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-2 Acceptance Testing & RPS MKB020204 (Sub-CPMK 10)  
**Tanggal Pelaksanaan**: Pekan 11 — 16 November 2026  
**Lokasi Uji**: Sentra Pesisir Pamekasan (Pademawu, Tlanakan, Galis) & Laboratorium Komputer UIM  

---

## 1. Profil Pengguna Penguji UAT (User Acceptance Testers)
1. **Tester 1 (Admin Dinas)**: Ibu Rahmawati, S.Pi (Dinas Kelautan & Perikanan Kab. Pamekasan)
2. **Tester 2 (Petambak Garam)**: Bapak H. Syaiful Anwar (Ketua Kelompok Petambak Garam Pademawu)
3. **Tester 3 (Pelaku UMKM Olahan Ikan)**: Ibu Siti Rohani (Pemilik UMKM Rengginang Ikan & Lorjuk Tlanakan)
4. **Tester 4 (Pimpinan / Eksekutif)**: Bapak Dr. Ir. Hozairi, MT (Pemantau Kebijakan Komoditas Lokal)

---

## 2. Matriks Kasus Uji Penerimaan Pengguna (UAT Cases)

| ID UAT | Peran Penguji | Skenario Alur Pengujian | Kriteria Penerimaan (Acceptance Criteria) | Hasil Uji | Status |
|:---:|---|---|---|:---:|:---:|
| **UAT-01** | Semua Pengguna | Login cepat menggunakan akun Google pribadi di smartphone | Pengguna berhasil masuk ke beranda tanpa input password manual rumit | Berhasil login dalam < 3 detik | **ACCEPTED** |
| **UAT-02** | Petambak Garam | Melihat sebaran tambak garam di Kecamatan Pademawu pada WebGIS | Poligon tambak muncul dengan warna biru laut transparan dan luas hektar akurat | Poligon Majungan muncul jelas | **ACCEPTED** |
| **UAT-03** | Pelaku UMKM | Mendaftarkan UMKM olahan laut baru dengan tombol "Gunakan Lokasi GPS Saya" | Titik koordinat GPS otomatis terisi dan titik toko muncul di peta | Lokasi terpasang presisi | **ACCEPTED** |
| **UAT-04** | Pelaku UMKM | Memasukkan resep adonan Rengginang Ikan Lorjuk dan menghitung HPP | Sistem otomatis menghitung biaya bahan, susut penjemuran 8%, dan harga jual | HPP terhitung otomatis | **ACCEPTED** |
| **UAT-05** | Admin Dinas | Memfilter UMKM berdasarkan kecamatan (Tlanakan, Pademawu, Galis) | Peta dan tabel direktori menyaring data sesuai kecamatan terpilih | Filter responsif real-time | **ACCEPTED** |
| **UAT-06** | Pimpinan | Memantau grafik perbandingan sektor olahan laut vs garam pada EIS | Diagram donat dan bar chart interaktif menyajikan total unit usaha valid | Grafik visual sangat informatif | **ACCEPTED** |
| **UAT-07** | Pelaku UMKM | Membuka portal SIGARA melalui smartphone via jaringan Wi-Fi lokal | Tata letak UI rapi, mobile-friendly, tombol navigasi bawah mudah ditekan | Tampilan responsif di HP | **ACCEPTED** |

