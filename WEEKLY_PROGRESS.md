# WEEKLY PROGRESS TRACKER — MADURA ERP/EIS
**Program**: Project-Based Learning (PjBL) 16 Pekan  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204)  
**Institusi**: Universitas Islam Madura — Semester Ganjil 2026/2027  

---

| Pekan | Topik / Fokus RPS | Status | Tanggal Eksekusi | Deliverables Utama |
|:---:|---|:---:|:---:|---|
| **1** | **Fondasi Proyek, SQA, dan V-Model** | **IN PROGRESS (Tahap Finalisasi)** | 2026-11-04 | Setup Stack, Auth/RBAC, WebGIS Leaflet DEMO, SQA Plan, SRS, V-Model, Initial Test Strategy, Smoke Test |
| **2** | Test Plan dan Analisis Risiko | PLANNED | - | Test Plan terinci, Analisis Risiko Modul ERP & GIS |
| **3** | Black-Box Testing: EP & BVA | PLANNED | - | Validasi Form bahan, BOM, produksi, Test Case Matrix EP/BVA |
| **4** | Decision Table & State Transition | PLANNED | - | Decision table transaksi & status state transition |
| **5** | White-Box Testing, CFG, & CC | PLANNED | - | Control Flow Graph & Cyclomatic Complexity rumus HPP |
| **6** | API Testing & Integration Testing | PLANNED | - | Postman/Newman Collection, REST API Test Suite |
| **7** | Automated E2E Testing & Defect Mgmt | PLANNED | - | Playwright E2E Script, Traceability Matrix, Defect Log |
| **8** | UTS, Audit, dan Peer Review | PLANNED | - | Audit SQA, Perbaikan Defect Prioritas, Demo UTS |
| **9** | Performance Testing (JMeter) | PLANNED | - | Load Testing 100-500 pengguna, Profiling Query WebGIS |
| **10** | Security Testing (OWASP ZAP) | PLANNED | - | Penetration Testing, Remediasi Broken Access Control & XSS |
| **11** | User Acceptance Testing (UAT) | PLANNED | - | UAT Scenario, Berita Acara UAT, User Feedback |
| **12** | Strategi Implementasi Sistem | PLANNED | - | User Manual, Conversion Strategy, Change Management Plan |
| **13** | ETL, Data Migration, Cutover, Rollback | PLANNED | - | Python Pandas ETL Script, Data Reconciliation, Rollback Plan |
| **14** | CI/CD dan Deployment | PLANNED | - | GitHub Actions, Docker Staging Deployment, Nginx |
| **15** | Post-Implementation Review & Maintenance | PLANNED | - | PIR Report, Preventive/Corrective Maintenance Plan |
| **16** | UAS, Final Demo, & Rollback Simulation | PLANNED | - | Final Report, Complete Test Report, Live Demo 2 Alur Bisnis |

---

## Log Aktivitas Pekan 1
- Pemeriksaan lingkungan kerja (Node.js v24.20.0, npm 11.19.0, analisis kebutuhan PHP/Composer/PostgreSQL).
- Pembuatan struktur direktori Modular Monolith (`app/Modules/`, `docs/`, `tests/`, dll.).
- Pembuatan Master Project Prompt, Project Status, Weekly Progress, Changelog, README.
- Pembuatan Skema Database & Migrations: Users (RBAC), Wilayah Pamekasan, Data UMKM (8 kategori), Tambak Garam (PostGIS Geometri).
- Pembuatan Seeders: Akun Admin, UMKM Garam, UMKM Rengginang Ikan, Pimpinan, Data Wilayah Galis, Pademawu, Tlanakan, serta DEMO Spasial UMKM & Tambak.
- Pembuatan Backend Controller, Service, Policy (isolasi data antar-UMKM).
- Pembuatan Frontend Vue 3 + TypeScript + Inertia + Tailwind:
  - Komponen Peta Interaktif Leaflet + OpenStreetMap + GeoJSON
  - Dashboard EIS dengan grafik metrik
  - Halaman Manajemen UMKM
  - Halaman Login / Auth
- Pembuatan Dokumen SQA Pekan 1 (SQA Plan, SRS, V-Model, Test Strategy, Risk Register, Test Cases, dan Execution Report).

