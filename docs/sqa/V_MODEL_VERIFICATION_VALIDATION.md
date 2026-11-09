# KERANGKA KERJA V-MODEL: VERIFICATION & VALIDATION
### MADURA ERP/EIS Kabupaten Pamekasan
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204)  
**Tahun Akademik**: Semester Ganjil 2026/2027  

---

## 1. Konsep Verification vs Validation
- **Verification ("Are we building the product right?")**: Memastikan bahwa artefak perangkat lunak yang dibangun di setiap fase sesuai dengan spesifikasi teknis dan standar arsitektur yang telah ditetapkan sebelumnya.
- **Validation ("Are we building the right product?")**: Memastikan bahwa perangkat lunak yang telah selesai dibangun benar-benar memenuhi kebutuhan operasional nyata petambak garam, pelaku UMKM olahan laut, dan pimpinan daerah di Kabupaten Pamekasan.

---

## 2. Diagram V-Model MADURA ERP/EIS

```
  VERIFIKASI (Spesifikasi & Desain)                          VALIDASI (Pengujian & Penerimaan)
  =================================                          =================================

  Analisis Kebutuhan Bisnis (SRS) <------------------------> User Acceptance Testing (UAT - Pekan 11)
       (Karakteristik UMKM Pamekasan)                             (Validasi Alur Rengginang & Garam)
             |                                                               ^
             v                                                               |
  Spesifikasi Arsitektur Sistem   <------------------------> System & Security Testing (Pekan 9 & 10)
       (Modular Monolith, PostGIS, EIS)                           (JMeter Load Test & OWASP ZAP)
             |                                                               ^
             v                                                               |
  Desain Detail Modul & Integrasi <------------------------> Integration & API Testing (Pekan 6 & 7)
       (Service, Policy, REST API GeoJSON)                        (Postman, Newman, Playwright E2E)
             |                                                               ^
             v                                                               |
  Desain Algoritma & Komponen     <------------------------> Unit & Black-Box/White-Box (Pekan 3 - 5)
       (Rumus HPP, Boundary Spasial, BOM)                         (EP, BVA, Decision Table, CFG)
             |                                                               ^
             +--------------------> PENGEMBANGAN KODE <----------------------+
                                   (Laravel 11, Vue 3, TS,
                                   PostGIS, Leaflet, Tailwind)
```

---

## 3. Matriks Hubungan Fase V-Model dengan Roadmap 16 Pekan

| Fase Verifikasi | Dokumen Acuan | Fase Validasi Terkait | Pekan Eksekusi |
|---|---|---|:---:|
| **Kebutuhan Sistem (SRS)** | `SOFTWARE_REQUIREMENTS_SPECIFICATION.md` | User Acceptance Testing (UAT) | Pekan 11 |
| **Arsitektur Modular & GIS** | `SYSTEM_ARCHITECTURE.md` | System, Performance & Security Testing | Pekan 9 - 10 |
| **Spesifikasi Modul ERP & API**| `INITIAL_TEST_STRATEGY.md` | Integration & API Testing (Postman/Newman) | Pekan 6 - 7 |
| **Logika Bisnis & Perhitungan** | Desain BOM, HPP, State Machine | Unit, EP, BVA, Decision Table, White-box | Pekan 3 - 5 |
| **Fondasi & Setup Stack** | Project Charter & Coding Standard | Smoke Testing & Base Verification | Pekan 1 |

