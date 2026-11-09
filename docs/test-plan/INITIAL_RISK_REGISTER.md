# REGISTER RISIKO AWAL (INITIAL RISK REGISTER)
### MADURA ERP/EIS — Analisis Risiko Pengujian & Pengembangan
**Pembaruan**: Pekan 1  

---

| ID Risiko | Deskripsi Risiko | Kategori | Dampak | Probabilitas | RPN | Rencana Mitigasi & Pengujian |
|---|---|---|---|---|---|---|
| **RSK-01** | Kebocoran data transaksi antar-pelaku UMKM (*Broken Access Control*). | Keamanan | Kritis (5) | Sedang (3) | 15 | Menerapkan `UmkmPolicy.php` dan global scope pada query Eloquent. Uji otomatis via unit test otorisasi setiap pekan. |
| **RSK-02** | Penggunaan koordinat fiktif yang dianggap data riil di lapangan. | Data / Integritas | Tinggi (4) | Tinggi (4) | 16 | Menandai seluruh data pengujian dengan flag `is_demo: true` dan label visual *DEMO DATA*. Koordinat demo merujuk batas administratif nyata Galis, Pademawu, Tlanakan. |
| **RSK-03** | Anomali stok negatif atau *race condition* saat transaksi produksi & penjualan serentak. | Integritas ERP | Kritis (5) | Rendah (2) | 10 | Menerapkan `DB::transaction()` dengan pesimistic/optimistic locking (`lockForUpdate`) pada setiap mutasi stok. |
| **RSK-04** | Inkonsistensi perhitungan HPP akibat resep kaku (*hardcoded*). | Bisnis ERP | Tinggi (4) | Sedang (3) | 12 | Membangun skema Bill of Materials (BOM) multi-bahan dinamis yang fleksibel untuk garam olahan maupun aneka olahan laut. |
| **RSK-05** | Inkonsistensi dependensi PHP / PostGIS pada sistem host pengembang. | Lingkungan / DevOps | Sedang (3) | Tinggi (4) | 12 | Menyediakan `docker-compose.yml` terstandar dengan image `postgis/postgis:16-3.4` dan `php:8.2-fpm` siap pakai. |

