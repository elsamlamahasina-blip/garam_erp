/**
 * MADURA ERP/EIS — Test Suite Pekan 5: Structural White-Box Testing
 * Standard: ISO/IEC/IEEE 29119-4 (Clause 8 Structural Techniques)
 * Target: Control Flow Graph (CFG) & Cyclomatic Complexity V(G) Algoritma HPP
 */

let passCount = 0;
let failCount = 0;
const results = [];

function assert(condition, tcId, description, detail = '') {
  if (condition) {
    passCount++;
    results.push({ id: tcId, desc: description, status: 'PASS', detail });
    console.log(`✅ [PASS] ${tcId}: ${description}`);
  } else {
    failCount++;
    results.push({ id: tcId, desc: description, status: 'FAIL', detail });
    console.error(`❌ [FAIL] ${tcId}: ${description} -> ${detail}`);
  }
}

console.log('====================================================================');
console.log('   MADURA ERP/EIS — SUITE PENGUJIAN PEKAN 5: WHITE-BOX (CFG & HPP)');
console.log('   Standar: ISO/IEC/IEEE 29119-4 | RPS MKB020204 (Sub-CPMK 5)');
console.log('====================================================================\n');

// Implementasi Algoritma HPP & Pricing Sesuai CFG
function calculateHppAndPrice(materials, laborCost, overheadCost, outputQty, sector, seasonOrType, scale) {
  if (!materials || materials.length === 0 || outputQty <= 0) {
    return { error: 'Input tidak valid' };
  }

  let rawCost = 0;
  for (let item of materials) {
    rawCost += item.qty * item.unitPrice;
  }

  let wasteFactor = 0.05;
  if (sector === 'garam') {
    if (seasonOrType === 'hujan') {
      wasteFactor = 0.15;
    } else {
      wasteFactor = 0.05;
    }
  } else {
    if (seasonOrType === 'rengginang' || seasonOrType === 'kerupuk') {
      wasteFactor = 0.08;
    } else {
      wasteFactor = 0.03;
    }
  }

  const totalProductionCost = (rawCost * (1 + wasteFactor)) + laborCost + overheadCost;
  const hppPerUnit = totalProductionCost / outputQty;

  let margin = 0.20; // Default Kecil
  if (scale === 'Mikro') {
    margin = 0.25;
  } else if (scale === 'Menengah') {
    margin = 0.15;
  }

  const recommendedPrice = Math.round(hppPerUnit * (1 + margin));
  return { hppPerUnit, recommendedPrice, margin, wasteFactor, totalProductionCost };
}

// ---------------------------------------------------------------------------
// Eksekusi 9 Basis Paths Sesuai Cyclomatic Complexity V(G) = 9
// ---------------------------------------------------------------------------

// Path 1: Input tidak valid (materials kosong atau output <= 0)
const p1 = calculateHppAndPrice([], 50000, 10000, 0, 'garam', 'kemarau', 'Kecil');
assert(p1.error === 'Input tidak valid', 'TC-CFG-PATH-01', 'Path 1: Validasi masukan dasar (D1 = True) mengembalikan pesan error');

// Path 2: Garam, Musim Hujan, Skala Mikro (Susut 15%, Margin 25%)
// Bahan: Air Tua / Garam Mentah 1000kg x Rp 800 = Rp 800.000. Labor: Rp 200.000. Overhead: Rp 50.000. Output: 800kg.
const p2 = calculateHppAndPrice(
  [{ name: 'Air Tua Garam', qty: 1000, unitPrice: 800 }],
  200000, 50000, 800,
  'garam', 'hujan', 'Mikro'
);
assert(
  p2.wasteFactor === 0.15 && p2.margin === 0.25 && p2.hppPerUnit === 1462.5,
  'TC-CFG-PATH-02',
  'Path 2: Garam musim hujan skala Mikro (Susut 15%, Margin 25%, HPP Rp 1.462,5/kg)'
);

// Path 3: Garam, Musim Kemarau, Skala Mikro (Susut 5%, Margin 25%)
const p3 = calculateHppAndPrice(
  [{ name: 'Air Tua Garam', qty: 1000, unitPrice: 800 }],
  200000, 50000, 1000,
  'garam', 'kemarau', 'Mikro'
);
assert(
  p3.wasteFactor === 0.05 && p3.margin === 0.25,
  'TC-CFG-PATH-03',
  'Path 3: Garam musim kemarau skala Mikro (Susut 5%, Margin 25%)'
);

// Path 4: Olahan Laut, Rengginang Ikan, Skala Kecil (Susut 8%, Margin 20%)
// Bahan: Beras Ketan 50kg x Rp 15.000 = Rp 750.000, Ikan Lorjuk 10kg x Rp 60.000 = Rp 600.000, Bumbu Rp 150.000. Total Raw: Rp 1.500.000
const p4 = calculateHppAndPrice(
  [
    { name: 'Beras Ketan', qty: 50, unitPrice: 15000 },
    { name: 'Ikan Lorjuk', qty: 10, unitPrice: 60000 },
    { name: 'Bumbu Rempah', qty: 1, unitPrice: 150000 }
  ],
  300000, 100000, 300,
  'olahan_laut', 'rengginang', 'Kecil'
);
assert(
  p4.wasteFactor === 0.08 && p4.margin === 0.20,
  'TC-CFG-PATH-04',
  'Path 4: Rengginang Ikan Lorjuk skala Kecil (Susut 8%, Margin 20%)'
);

// Path 5: Olahan Laut, Kerupuk Ikan, Skala Kecil (Susut 8%, Margin 20%)
const p5 = calculateHppAndPrice(
  [{ name: 'Ikan Tongkol & Tapioka', qty: 100, unitPrice: 20000 }],
  400000, 100000, 500,
  'olahan_laut', 'kerupuk', 'Kecil'
);
assert(
  p5.wasteFactor === 0.08 && p5.margin === 0.20,
  'TC-CFG-PATH-05',
  'Path 5: Kerupuk Ikan Pesisir skala Kecil (Susut 8%, Margin 20%)'
);

// Path 6: Olahan Laut, Terasi / Ikan Asin, Skala Menengah (Susut 3%, Margin 15%)
const p6 = calculateHppAndPrice(
  [{ name: 'Udang Rebon Segar', qty: 200, unitPrice: 35000 }],
  1000000, 200000, 250,
  'olahan_laut', 'terasi', 'Menengah'
);
assert(
  p6.wasteFactor === 0.03 && p6.margin === 0.15,
  'TC-CFG-PATH-06',
  'Path 6: Terasi Udang Rebon skala Menengah (Susut 3%, Margin 15%)'
);

// Path 7: Olahan Laut, Olahan Udang Crispy, Skala Mikro (Susut 3%, Margin 25%)
const p7 = calculateHppAndPrice(
  [{ name: 'Udang Vaname', qty: 20, unitPrice: 70000 }],
  150000, 50000, 40,
  'olahan_laut', 'udang', 'Mikro'
);
assert(
  p7.wasteFactor === 0.03 && p7.margin === 0.25,
  'TC-CFG-PATH-07',
  'Path 7: Olahan Udang Crispy skala Mikro (Susut 3%, Margin 25%)'
);

// Path 8: Garam Konsumsi Beryodium, Kemarau, Skala Menengah (Susut 5%, Margin 15%)
const p8 = calculateHppAndPrice(
  [
    { name: 'Garam Bahan Baku', qty: 5000, unitPrice: 1000 },
    { name: 'KIO3 (Iodium)', qty: 2, unitPrice: 250000 }
  ],
  2000000, 500000, 4800,
  'garam', 'kemarau', 'Menengah'
);
assert(
  p8.wasteFactor === 0.05 && p8.margin === 0.15,
  'TC-CFG-PATH-08',
  'Path 8: Garam Beryodium Industri Menengah (Susut 5%, Margin 15%)'
);

// Path 9: Multi-Item BOM Loop Verification (Iterasi Akurat)
const multiBom = [
  { name: 'Bahan A', qty: 10, unitPrice: 5000 },  // 50.000
  { name: 'Bahan B', qty: 20, unitPrice: 2500 },  // 50.000
  { name: 'Bahan C', qty: 5,  unitPrice: 10000 }  // 50.000 -> Total Raw = 150.000
];
const p9 = calculateHppAndPrice(multiBom, 50000, 0, 100, 'garam', 'kemarau', 'Kecil');
// Total Raw: 150.000 * 1.05 = 157.500 + 50.000 = 207.500 / 100 = 2.075
assert(
  p9.hppPerUnit === 2075,
  'TC-CFG-PATH-09',
  'Path 9: Akurasi akumulasi loop BOM multi-bahan baku (Raw Cost = Rp 150.000 -> HPP = Rp 2.075)'
);

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL PENGUJIAN: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 SELURUH PENGUJIAN PEKAN 5 (WHITE-BOX CFG & CYCLOMATIC COMPLEXITY) DINYATAKAN PASS!');
}

