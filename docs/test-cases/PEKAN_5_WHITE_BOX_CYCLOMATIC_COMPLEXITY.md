# ANALISIS PENGUJIAN STRUKTURAL WHITE-BOX (PEKAN 5)
### MADURA ERP/EIS — SISTEM INFORMASI GARAM & UMKM OLAHAN LAUT KABUPATEN PAMEKASAN
**Standar**: ISO/IEC/IEEE 29119-4 Test Techniques (Clause 8 Structural Test Techniques)  
**Mata Kuliah**: Manajemen dan Proyek Sistem Informasi (MKB020204) — Semester Ganjil 2026/2027  
**Fokus**: Control Flow Graph (CFG), Basis Path Testing, & Cyclomatic Complexity Algoritma HPP (Sub-CPMK 5)  

---

## 1. Pseudocode Algoritma Kalkulasi HPP & Rekomendasi Harga Jual UMKM

```javascript
1: function calculateHppAndPrice(materials, laborCost, overheadCost, outputQty, sector, seasonOrType, scale) {
2:   if (!materials || materials.length === 0 || outputQty <= 0) {
3:     return { error: 'Input tidak valid' };
4:   }
5:   let rawCost = 0;
6:   for (let item of materials) {
7:     rawCost += item.qty * item.unitPrice;
8:   }
9:   let wasteFactor = 0.05;
10:  if (sector === 'garam') {
11:    if (seasonOrType === 'hujan') {
12:      wasteFactor = 0.15;
13:    } else {
14:      wasteFactor = 0.05;
15:    }
16:  } else {
17:    if (seasonOrType === 'rengginang' || seasonOrType === 'kerupuk') {
18:      wasteFactor = 0.08;
19:    } else {
20:      wasteFactor = 0.03;
21:    }
22:  }
23:  let totalProductionCost = (rawCost * (1 + wasteFactor)) + laborCost + overheadCost;
24:  let hppPerUnit = totalProductionCost / outputQty;
25:  let margin = 0.20;
26:  if (scale === 'Mikro') {
27:    margin = 0.25;
28:  } else if (scale === 'Menengah') {
29:    margin = 0.15;
30:  }
31:  let recommendedPrice = Math.round(hppPerUnit * (1 + margin));
32:  return { hppPerUnit, recommendedPrice, margin, wasteFactor };
33: }
```

---

## 2. Pemodelan Control Flow Graph (CFG) & Simpul Predikat

### Simpul Predikat Keputusan (Decision Predicates / $D$):
1. **$D_1$ (Baris 2)**: `!materials || materials.length === 0 || outputQty <= 0`
2. **$D_2$ (Baris 6)**: `for item of materials` (loop condition)
3. **$D_3$ (Baris 10)**: `sector === 'garam'`
4. **$D_4$ (Baris 11)**: `seasonOrType === 'hujan'`
5. **$D_5$ (Baris 17a)**: `seasonOrType === 'rengginang'`
6. **$D_6$ (Baris 17b)**: `seasonOrType === 'kerupuk'`
7. **$D_7$ (Baris 26)**: `scale === 'Mikro'`
8. **$D_8$ (Baris 28)**: `scale === 'Menengah'`

### Kalkulasi Kompleksitas Siklomatis (Cyclomatic Complexity):
Berdasarkan rumus McCabe:
$$V(G) = D + 1 = 8 + 1 = 9$$
Atau berdasarkan Graph Theory:
- Jumlah Edges ($E$) = 21
- Jumlah Nodes ($N$) = 14
- Jumlah Connected Components ($P$) = 1
$$V(G) = E - N + 2P = 21 - 14 + 2(1) = 9$$

Artinya, terdapat **9 Jalur Independen (Basis Paths)** yang wajib diuji untuk mencapai **100% Basis Path Coverage**.

---

## 3. Matriks 9 Jalur Independen (Basis Path Matrix)

| Jalur | Skenario Sektor & Kondisi Input | Cabang / Branch | Hasil Expected |
|:---:|---|---|---|
| **Path 1** | Input Kosong / Output $\le 0$ | $D_1$ = True | Return `{ error: 'Input tidak valid' }` |
| **Path 2** | Garam, Musim Hujan, Skala Mikro | $D_1$(F) $\to D_3$(T) $\to D_4$(T) $\to D_7$(T) | Susut 15%, Margin 25% |
| **Path 3** | Garam, Musim Kemarau, Skala Mikro | $D_1$(F) $\to D_3$(T) $\to D_4$(F) $\to D_7$(T) | Susut 5%, Margin 25% |
| **Path 4** | Olahan Laut, Rengginang, Skala Kecil | $D_1$(F) $\to D_3$(F) $\to D_5$(T) $\to D_7$(F) $\to D_8$(F) | Susut 8%, Margin 20% |
| **Path 5** | Olahan Laut, Kerupuk Ikan, Skala Kecil | $D_1$(F) $\to D_3$(F) $\to D_5$(F) $\to D_6$(T) $\to D_7$(F) $\to D_8$(F) | Susut 8%, Margin 20% |
| **Path 6** | Olahan Laut, Terasi/Ikan Asin, Skala Menengah | $D_1$(F) $\to D_3$(F) $\to D_5$(F) $\to D_6$(F) $\to D_8$(T) | Susut 3%, Margin 15% |
| **Path 7** | Olahan Laut, Olahan Udang, Skala Mikro | $D_1$(F) $\to D_3$(F) $\to D_5$(F) $\to D_6$(F) $\to D_7$(T) | Susut 3%, Margin 25% |
| **Path 8** | Garam, Musim Kemarau, Skala Menengah | $D_1$(F) $\to D_3$(T) $\to D_4$(F) $\to D_8$(T) | Susut 5%, Margin 15% |
| **Path 9** | Loop kosong / 1 item BOM bahan baku | $D_2$ (Iterasi bahan baku BOM) | Kalkulasi total raw cost akurat |
