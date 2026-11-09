# SOFTWARE QUALITY ASSURANCE PLAN (SQAP)
### MADURA ERP/EIS — UMKM Garam & Olahan Laut Kabupaten Pamekasan
**Standar Acuan**: ISO/IEC/IEEE 29119 Software and Systems Engineering — Software Testing  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204), Universitas Islam Madura  
**Versi**: 1.0.0 (Pekan 1)  

---

## 1. Tujuan Penjaminan Mutu
Software Quality Assurance Plan (SQAP) ini disusun untuk memastikan bahwa pengembangan aplikasi MADURA ERP/EIS berlangsung secara terencana, konsisten, terdokumentasi, dan memenuhi spesifikasi fungsional maupun non-fungsional selama 16 pekan masa perkuliahan.

---

## 2. Sasaran Mutu Perangkat Lunak (Quality Goals)
1. **Functional Correctness**: Seluruh kebutuhan fungsional (FR-01 hingga FR-14) memiliki keterlacakan (*traceability*) ke test case spesifik.
2. **Security & Data Isolation**: Mencegah kebocoran data antar-UMKM (*Broken Access Control* dicegah 100% pada level policy).
3. **Spatial Integrity**: Koordinat titik lokasi (*Point*) dan poligon lahan (*Polygon*) sesuai dengan batasan wilayah Kabupaten Pamekasan (Kecamatan Galis, Pademawu, Tlanakan) dan mematuhi format standar RFC 7946 GeoJSON.
4. **Transaction Integrity**: Konsistensi persediaan dan HPP dijamin melalui database ACID transaction tanpa anomali stok negatif.
5. **Transparency**: Data demo ditandai secara jujur dan transparan tanpa manipulasi hasil pengujian.

---

## 3. Tingkatan Pengujian (Test Levels)
Mengacu pada siklus V-Model:
- **Unit Testing**: Menguji logika perhitungan mandiri (validasi koordinat spasial, bounding box, formula HPP, otorisasi policy).
- **Feature / Integration Testing**: Menguji kolaborasi antar-komponen (Controller -> Service -> Database -> GeoJSON output).
- **API Testing**: Pengujian endpoint REST API menggunakan Postman/Newman dengan validasi HTTP status, JSON schema, dan otentikasi.
- **System / E2E Testing**: Pengujian skenario ujung-ke-ujung menggunakan Playwright pada peramban nyata.
- **Performance Testing**: Pengujian beban respons sistem menggunakan Apache JMeter (100 - 500 pengguna simultan).
- **Security Testing**: Pemindaian kerentanan menggunakan OWASP ZAP (SQLi, XSS, CSRF, IDOR).
- **User Acceptance Testing (UAT)**: Validasi alur operasional oleh persona pelaku UMKM dan pimpinan.

---

## 4. Kriteria Kelayakan (Entry & Exit Criteria)
### Entry Criteria:
- Kode telah dikompilasi tanpa syntax error.
- Skema migrasi database berhasil dieksekusi.
- Data awal (seeders) telah diinjeksi dengan status DEMO teridentifikasi.

### Exit Criteria:
- 100% test case pada pekan berjalan berstatus `PASS`.
- Tidak ada defect dengan tingkat keparahan *Critical* atau *High* yang belum terselesaikan.
- Bukti pengujian (log output, screenshot, atau laporan otomatis) terdokumentasi lengkap.

