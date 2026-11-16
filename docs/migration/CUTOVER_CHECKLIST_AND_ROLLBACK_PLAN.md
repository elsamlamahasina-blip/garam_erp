# CHECKLIST CUTOVER & PROSEDUR ROLLBACK SISTEM (PEKAN 13)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: IEEE 15288 Transition Process & RPS MKB020204 (Sub-CPMK 12)  
**Versi**: 1.0 — Prosedur Transisi Produksi & Penanggulangan Darurat  

---

## 1. Daftar Periksa Cutover Menuju Produksi (Cutover Checklist)

| Tahap | Aktivitas Cutover | Penanggung Jawab | Kriteria Kelulusan (Gate Check) | Status |
|:---:|---|:---:|---|:---:|
| **T-24 Jam** | Pembekuan Pembaruan Kode (*Code Freeze*) | Lead Architect | Git branch `main` terkunci dari commit baru | **READY** |
| **T-12 Jam** | Pencadangan Basis Data Legacy (*Backup State*) | Database Engineer | Backup dump `.sql` / `.json` tersimpan aman di direktori terpisah | **READY** |
| **T-6 Jam** | Eksekusi Skrip Pembersih Data (ETL Dry-Run) | Data Engineer | Validasi deduplikasi, normalisasi telepon, dan penolakan koordinat invalid | **PASSED** |
| **T-2 Jam** | Migrasi Data Produksi (*Data Load*) | Data Engineer | Rekonsiliasi record 100% cocok antara source dan destination | **READY** |
| **T-0 (Go)** | Pengalihan DNS / Port Layanan Web | DevOps Specialist | Server SIGARA merespon pada port produksi 8080 | **ACTIVE** |
| **T+1 Jam** | Smoke Testing Pasca-Rilis (*Post-Cutover Smoke*) | SQA Lead | Seluruh endpoint publik & autentikasi login berfungsi tanpa error | **PASSED** |

---

## 2. Prosedur Pemulihan Darurat (Rollback Plan Procedure)

Jika terjadi anomali kritis pasca-cutover (seperti korupsi basis data, kegagalan otorisasi privasi data UMKM, atau downtime layanan melebihi 15 menit), ikuti 5 langkah rollback terstandar berikut:

```
[INSIDEN KRITIS TERDETEKSI]
         │
         ▼
 1. ABORT CUTOVER & DECLARE ROLLBACK
         │
         ▼
 2. ISOLASI LALU LINTAS (Bypass / Maintenance Page)
         │
         ▼
 3. RESTORE DATABASE STATE (Dari Snapshot Pra-Migrasi)
         │
         ▼
 4. REVERT GIT COMMIT (git reset --hard <TAG_PRE_MIGRATION>)
         │
         ▼
 5. VERIFIKASI PEMULIHAN SISTEM & LAPORAN POST-MORTEM
```

### Skrip Otomasi Rollback Cepat:
```bash
# 1. Pulihkan file database dari cadangan
cp database/umkm_store.json.backup database/umkm_store.json

# 2. Kembalikan kode aplikasi ke tag stabil sebelumnya
git reset --hard HEAD~1

# 3. Restart server aplikasi
node server.js
```

