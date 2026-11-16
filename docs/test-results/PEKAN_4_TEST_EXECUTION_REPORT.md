# LAPORAN EKSEKUSI PENGUJIAN PEKAN 4 (TEST EXECUTION REPORT)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-3 & ISO/IEC/IEEE 29119-4  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Advanced Black-Box: Decision Table & State Transition Testing (Sub-CPMK 4)  
**Tanggal Eksekusi**: 16 November 2026  
**Status**: 100% PASS  

---

## 1. Ringkasan Eksekusi
Pengujian Pekan 4 memverifikasi logika bisnis penentuan grade kualitas garam rakyat (SNI 3556:2016) menggunakan metode **Decision Table Testing** dan siklus hidup produksi pengolahan hasil laut menggunakan **State Transition Testing**.

| Metrik | Nilai |
|---|---|
| Total Kasus Uji | 10 |
| Jumlah Lolos (PASS) | 10 (100%) |
| Jumlah Gagal (FAIL) | 0 (0%) |
| Defect Ditemukan | 0 Unresolved |
| Waktu Eksekusi | 0.8 detik |

---

## 2. Rincian Hasil Pengujian
1. **TC-DT-001**: Rule 1 (NaCl 96.5%, Lembab 4.2%, Putih Cerah) $\to$ **Grade K1 & SNI Lolos** — **PASS**
2. **TC-DT-002**: Rule 2 (NaCl 95.0%, Lembab 5.0%, Warna Kusam) $\to$ **Grade K2** — **PASS**
3. **TC-DT-003**: Rule 3 (NaCl 95.2%, Lembab Tinggi 8.5%) $\to$ **Grade K2** — **PASS**
4. **TC-DT-004**: Rule 4 (NaCl Rendah 91.0%) $\to$ **Grade K3** — **PASS**
5. **TC-DT-005**: Rule 5 (NaCl Sangat Rendah 88.4% & Lembab 9.2%) $\to$ **Grade K3** — **PASS**
6. **TC-ST-001**: Happy Path siklus batch pengolahan rengginang $\to$ **SELESAI_PACKING** — **PASS**
7. **TC-ST-002**: Penolakan mutu $\to$ **BATAL_REJECTED** — **PASS**
8. **TC-ST-003**: Transisi ilegal melompati produksi langsung ke selesai $\to$ **DITOLAK** — **PASS**
9. **TC-ST-004**: Transisi mundur ilegal dari produksi ke alokasi $\to$ **DITOLAK** — **PASS**
10. **TC-ST-005**: Transisi ilegal dari state terminal $\to$ **DITOLAK** — **PASS**

