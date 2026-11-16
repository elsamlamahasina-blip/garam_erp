# LAPORAN EKSEKUSI PENGUJIAN PEKAN 3 (TEST EXECUTION REPORT)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-3 Test Documentation & ISO/IEC/IEEE 29119-4 Test Techniques  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Black-Box Testing (Equivalence Partitioning & Boundary Value Analysis) Form & Transaksi (Sub-CPMK 3)  
**Tanggal Eksekusi**: 16 November 2026  
**Status**: 100% PASS (Pasca Resolusi Defect DEF-001 s/d DEF-003)  

---

## 1. Ringkasan Eksekusi (Executive Summary)
Pengujian Black-Box Pekan 3 difokuskan pada pengujian batas nilai (*Boundary Value Analysis*) dan partisi ekuivalensi (*Equivalence Partitioning*) pada formulir pendaftaran UMKM dan transaksi komoditas garam serta olahan hasil laut (`POST /api/v1/umkm`).

Pengujian awal mengungkap 3 cacat (*defects*) nyata pada backend:
1. Koordinat di luar batas Kabupaten Pamekasan diterima (BVA Lat & Lng bocor).
2. Field wajib nama usaha dan pemilik menerima string kosong (EP partisi invalid lolos).
3. Format nomor telepon non-numerik dan kategori fiktif diterima tanpa validasi enum.

Setelah dilakukan perbaikan validasi pada backend dan pemindahan port ke 8080 guna menghindari tabrakan port dengan proyek lain, seluruh 14 kasus uji dieksekusi ulang (*retest*) dan dinyatakan **100% PASS**.

| Metrik | Putaran 1 (Sebelum Perbaikan) | Putaran 2 (Retest Pasca Perbaikan) |
|---|---|---|
| Total Kasus Uji | 14 | 14 |
| Jumlah Lolos (PASS) | 5 (35.7%) | **14 (100%)** |
| Jumlah Gagal (FAIL) | 9 (64.3%) | **0 (0%)** |
| Defect Ditemukan | 4 (DEF-001 s/d DEF-004) | 0 Unresolved |
| Status Akhir | Memerlukan Perbaikan | **Lolos Verifikasi Penuh** |

---

## 2. Rincian Kasus Uji & Hasil Retest
| ID Kasus Uji | Teknik | Deskripsi Skenario Uji | Nilai Input / Parameter | Hasil Diharapkan | Status |
|:---:|:---:|---|---|:---:|:---:|
| **TC-BVA-001** | BVA | Batas minimum Latitude valid Pamekasan | `latitude: -7.3500` | HTTP 201 Created | **PASS** |
| **TC-BVA-002** | BVA | Batas maksimum Latitude valid Pamekasan | `latitude: -6.9500` | HTTP 201 Created | **PASS** |
| **TC-BVA-003** | BVA | Batas luar selatan Pamekasan (Invalid) | `latitude: -7.3501` | HTTP 422 Unprocessable | **PASS** |
| **TC-BVA-004** | BVA | Batas luar utara Pamekasan (Invalid) | `latitude: -6.9499` | HTTP 422 Unprocessable | **PASS** |
| **TC-BVA-005** | BVA | Batas minimum Longitude valid Pamekasan | `longitude: 113.3000` | HTTP 201 Created | **PASS** |
| **TC-BVA-006** | BVA | Batas maksimum Longitude valid Pamekasan | `longitude: 113.6500` | HTTP 201 Created | **PASS** |
| **TC-BVA-007** | BVA | Batas luar barat Pamekasan (Invalid) | `longitude: 113.2999` | HTTP 422 Unprocessable | **PASS** |
| **TC-BVA-008** | BVA | Batas luar timur Pamekasan (Invalid) | `longitude: 113.6501` | HTTP 422 Unprocessable | **PASS** |
| **TC-EP-001** | EP | Partisi invalid: Nama usaha kosong | `name: ""` | HTTP 422 Unprocessable | **PASS** |
| **TC-EP-002** | EP | Partisi invalid: Nama pemilik kosong | `owner_name: ""` | HTTP 422 Unprocessable | **PASS** |
| **TC-EP-003** | EP | Partisi invalid: Kategori tidak terdaftar | `category: "kategori_fiktif_palsu"` | HTTP 422 Unprocessable | **PASS** |
| **TC-EP-004** | EP & BVA | Partisi invalid: Telepon terlalu pendek | `phone: "0812"` | HTTP 422 Unprocessable | **PASS** |
| **TC-EP-005** | EP | Partisi invalid: Telepon mengandung huruf | `phone: "0812-ABC-7890"` | HTTP 422 Unprocessable | **PASS** |
| **TC-EP-006** | EP | Partisi valid: Seluruh data lengkap & sah | Nominal lengkap | HTTP 201 Created | **PASS** |

---

## 3. Catatan Defect & Rekomendasi
Seluruh defect yang terdeteksi telah didokumentasikan pada `DEFECT_LOG.md` (DEF-001 s/d DEF-004) dan telah diverifikasi tuntas. Modul pendaftaran dan transaksi kini siap diintegrasikan dengan modul **Pekan 4: Advanced Black-Box (Decision Table & State Transition Testing)**.
