# LAPORAN EKSEKUSI PENGUJIAN PEKAN 5 (TEST EXECUTION REPORT)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-3 & ISO/IEC/IEEE 29119-4  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Structural Testing: Control Flow Graph (CFG) & Cyclomatic Complexity Algoritma HPP (Sub-CPMK 5)  
**Tanggal Eksekusi**: 16 November 2026  
**Status**: 100% PASS (100% Basis Path Coverage)  

---

## 1. Ringkasan Eksekusi
Pengujian struktural Pekan 5 mengevaluasi kompleksitas alur kendali logika program (*Control Flow Graph*) dan ketercakupan jalur dasar (*Basis Path Coverage*) pada algoritma perhitungan HPP dan penentuan harga jual dinamis produk UMKM garam dan olahan hasil laut di Pamekasan.

Berdasarkan analisis graf:
- Predikat Keputusan ($D$) = 8 simpul
- Kompleksitas Siklomatis McCabe: $V(G) = D + 1 = 9$
- Seluruh 9 jalur independen berhasil dieksekusi dengan tingkat keberhasilan **100% PASS**.

| Metrik | Nilai |
|---|---|
| Total Kasus Uji Basis Path | 9 |
| Jumlah Lolos (PASS) | 9 (100%) |
| Jumlah Gagal (FAIL) | 0 (0%) |
| Branch Coverage | 100% |
| Waktu Eksekusi | 0.7 detik |

---

## 2. Rincian Eksekusi 9 Basis Paths
1. **TC-CFG-PATH-01**: Path 1: Validasi Masukan Dasar ($D_1$ True) $\to$ **PASS**
2. **TC-CFG-PATH-02**: Path 2: Garam Musim Hujan Skala Mikro (Susut 15%, Margin 25%) $\to$ **PASS**
3. **TC-CFG-PATH-03**: Path 3: Garam Musim Kemarau Skala Mikro (Susut 5%, Margin 25%) $\to$ **PASS**
4. **TC-CFG-PATH-04**: Path 4: Rengginang Ikan Lorjuk Skala Kecil (Susut 8%, Margin 20%) $\to$ **PASS**
5. **TC-CFG-PATH-05**: Path 5: Kerupuk Ikan Pesisir Skala Kecil (Susut 8%, Margin 20%) $\to$ **PASS**
6. **TC-CFG-PATH-06**: Path 6: Terasi Udang Rebon Skala Menengah (Susut 3%, Margin 15%) $\to$ **PASS**
7. **TC-CFG-PATH-07**: Path 7: Olahan Udang Crispy Skala Mikro (Susut 3%, Margin 25%) $\to$ **PASS**
8. **TC-CFG-PATH-08**: Path 8: Garam Beryodium Industri Menengah (Susut 5%, Margin 15%) $\to$ **PASS**
9. **TC-CFG-PATH-09**: Path 9: Iterasi Akumulasi Loop BOM Multi-Bahan Baku $\to$ **PASS**

