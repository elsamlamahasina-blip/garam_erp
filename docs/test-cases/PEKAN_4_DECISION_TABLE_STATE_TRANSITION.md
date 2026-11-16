# DESAIN PENGUJIAN BLACK-BOX TINGKAT LANJUT (PEKAN 4)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-4 Test Techniques (Clause 7.4 Decision Table & Clause 7.5 State Transition Testing)  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Pemodelan Aturan Bisnis ERP/EIS Komoditas Garam & Olahan Laut (Sub-CPMK 4)  

---

## 1. Tabel Keputusan (Decision Table Testing) — Penentuan Grade Kualitas Garam
Aturan bisnis klasifikasi kualitas garam tambak rakyat Pamekasan:

| Kondisi / Masukan | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 |
|---|:---:|:---:|:---:|:---:|:---:|
| **C1: Kadar NaCl $\ge 94.7\%$** | YA | YA | YA | TIDAK | TIDAK |
| **C2: Kadar Air / Kelembaban $\le 7.0\%$** | YA | YA | TIDAK | YA | TIDAK |
| **C3: Warna Putih Cerah Bersih** | YA | TIDAK | - | - | - |
| **A1: Klasifikasi Grade K1 (Premium Konsumsi/Industri)** | **X** |  |  |  |  |
| **A2: Klasifikasi Grade K2 (Garam Pengolahan Ikan/Pindang)** |  | **X** | **X** |  |  |
| **A3: Klasifikasi Grade K3 (Garam Kasar Industri/Limbah)** |  |  |  | **X** | **X** |
| **A4: Kelayakan Izin Edar Beryodium (SNI 3556)** | **X** |  |  |  |  |

---

## 2. Pengujian Transisi Status (State Transition Testing) — Siklus Hidup Batch Produksi
Siklus hidup pemrosesan produk olahan laut (Rengginang Ikan, Kerupuk Ikan, Olahan Udang):

```
[DRAFT] 
   │ (Alokasi Bahan)
   ▼
[BAHAN_TERALOKASI]
   │ (Mulai Olah & Jemur)
   ▼
[PROSES_PRODUKSI]
   │ (Selesai Pengolahan)
   ▼
[QUALITY_CHECK] ──(Mutu Gagal / Rusak)──> [BATAL_REJECTED]
   │ (Lolos Uji Mutu)
   ▼
[SELESAI_PACKING] ──> Masuk Stok Barang Jadi
```

### Matriks Transisi Status (State Transition Matrix):
| State Awal | Event / Transisi | State Akhir Diharapkan | Status Validitas |
|---|---|---|:---:|
| `DRAFT` | `ALOKASI_BAHAN` | `BAHAN_TERALOKASI` | **Valid (Legal)** |
| `BAHAN_TERALOKASI` | `MULAI_PRODUKSI` | `PROSES_PRODUKSI` | **Valid (Legal)** |
| `PROSES_PRODUKSI` | `SELESAI_PENGOLAHAN`| `QUALITY_CHECK` | **Valid (Legal)** |
| `QUALITY_CHECK` | `MUTU_LOLOS` | `SELESAI_PACKING` | **Valid (Legal)** |
| `QUALITY_CHECK` | `MUTU_GAGAL` | `BATAL_REJECTED` | **Valid (Legal)** |
| `DRAFT` | `LANGSUNG_PACKING` | N/A (Ditolak) | **Invalid (Illegal)** |
| `PROSES_PRODUKSI` | `KEMBALI_DRAFT` | N/A (Ditolak) | **Invalid (Illegal)** |
| `SELESAI_PACKING` | `ULANG_PRODUKSI` | N/A (Ditolak) | **Invalid (Illegal)** |
| `BATAL_REJECTED` | `PAKSA_JUAL` | N/A (Ditolak) | **Invalid (Illegal)** |
