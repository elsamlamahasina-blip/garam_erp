/**
 * MADURA ERP/EIS — Test Suite Pekan 3: Black-Box Testing (EP & BVA)
 * Standard: ISO/IEC/IEEE 29119-4 Test Techniques (Clause 7.2 & 7.3)
 * Target: Modul Form Daftarkan Usaha & Transaksi (POST /api/v1/umkm)
 */

import http from 'http';

let passCount = 0;
let failCount = 0;
const results = [];

function sendPostRequest(payload) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: 'localhost',
      port: process.env.TEST_PORT || 8080,
      path: '/api/v1/umkm',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ status: 500, error: err.message });
    });

    req.write(data);
    req.end();
  });
}

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
console.log('   MADURA ERP/EIS — SUITE PENGUJIAN PEKAN 3: BLACK-BOX (EP & BVA)');
console.log('   Standar: ISO/IEC/IEEE 29119-4 | RPS MKB020204 (Sub-CPMK 3)');
console.log('====================================================================\n');

async function runTests() {
  const baseValidPayload = {
    name: 'UD. Hasil Laut Barokah',
    owner_name: 'Hj. Aminah',
    category: 'rengginang_ikan',
    products: 'Rengginang Ikan Tenggiri, Terasi Udang Rebon',
    scale: 'Kecil',
    address: 'Jl. Raya Tlanakan No. 45',
    district_name: 'Tlanakan',
    village_name: 'Branta Tinggi',
    phone: '081234567890',
    latitude: -7.2285,
    longitude: 113.4580,
    capacity: '250 Kg/bulan'
  };

  // -------------------------------------------------------------------------
  // 1. Boundary Value Analysis (BVA) — Koordinat Geografis Kabupaten Pamekasan
  // Batas: Latitude [-7.35 s/d -6.95], Longitude [113.30 s/d 113.65]
  // -------------------------------------------------------------------------

  // BVA-01: Batas minimum Latitude valid (-7.3500)
  const res1 = await sendPostRequest({ ...baseValidPayload, latitude: -7.3500 });
  assert(res1.status === 201 && res1.body.success, 'TC-BVA-001', 'BVA Lat: Batas bawah koordinat Latitude valid (-7.3500) diterima');

  // BVA-02: Batas maksimum Latitude valid (-6.9500)
  const res2 = await sendPostRequest({ ...baseValidPayload, latitude: -6.9500 });
  assert(res2.status === 201 && res2.body.success, 'TC-BVA-002', 'BVA Lat: Batas atas koordinat Latitude valid (-6.9500) diterima');

  // BVA-03: Just below minimum Latitude invalid (-7.3501 -> di luar batas selatan Pamekasan)
  const res3 = await sendPostRequest({ ...baseValidPayload, latitude: -7.3501 });
  assert(res3.status === 422 || res3.status === 400, 'TC-BVA-003', 'BVA Lat: Batas luar selatan (-7.3501) WAJIB ditolak oleh sistem', `Received status: ${res3.status}`);

  // BVA-04: Just above maximum Latitude invalid (-6.9499 -> di luar batas utara Pamekasan)
  const res4 = await sendPostRequest({ ...baseValidPayload, latitude: -6.9499 });
  assert(res4.status === 422 || res4.status === 400, 'TC-BVA-004', 'BVA Lat: Batas luar utara (-6.9499) WAJIB ditolak oleh sistem', `Received status: ${res4.status}`);

  // BVA-05: Batas minimum Longitude valid (113.3000)
  const res5 = await sendPostRequest({ ...baseValidPayload, longitude: 113.3000 });
  assert(res5.status === 201 && res5.body.success, 'TC-BVA-005', 'BVA Lng: Batas bawah Longitude valid (113.3000) diterima');

  // BVA-06: Batas maksimum Longitude valid (113.6500)
  const res6 = await sendPostRequest({ ...baseValidPayload, longitude: 113.6500 });
  assert(res6.status === 201 && res6.body.success, 'TC-BVA-006', 'BVA Lng: Batas atas Longitude valid (113.6500) diterima');

  // BVA-07: Just below minimum Longitude invalid (113.2999 -> di luar batas barat Pamekasan)
  const res7 = await sendPostRequest({ ...baseValidPayload, longitude: 113.2999 });
  assert(res7.status === 422 || res7.status === 400, 'TC-BVA-007', 'BVA Lng: Batas luar barat (113.2999) WAJIB ditolak oleh sistem', `Received status: ${res7.status}`);

  // BVA-08: Just above maximum Longitude invalid (113.6501 -> di luar batas timur Pamekasan)
  const res8 = await sendPostRequest({ ...baseValidPayload, longitude: 113.6501 });
  assert(res8.status === 422 || res8.status === 400, 'TC-BVA-008', 'BVA Lng: Batas luar timur (113.6501) WAJIB ditolak oleh sistem', `Received status: ${res8.status}`);

  // -------------------------------------------------------------------------
  // 2. Equivalence Partitioning (EP) — Partisi Validitas Formulir & Aturan Nilai
  // -------------------------------------------------------------------------

  // EP-01: Nama Usaha Kosong String (Invalid Partition)
  const res9 = await sendPostRequest({ ...baseValidPayload, name: '' });
  assert(res9.status === 422 || res9.status === 400, 'TC-EP-001', 'EP Input: Nama usaha kosong WAJIB ditolak', `Received status: ${res9.status}`);

  // EP-02: Nama Pemilik Kosong String (Invalid Partition)
  const res10 = await sendPostRequest({ ...baseValidPayload, owner_name: '' });
  assert(res10.status === 422 || res10.status === 400, 'TC-EP-002', 'EP Input: Nama pemilik kosong WAJIB ditolak', `Received status: ${res10.status}`);

  // EP-03: Kategori Usaha Tidak Terdaftar / Fiktif (Invalid Partition)
  const res11 = await sendPostRequest({ ...baseValidPayload, category: 'kategori_fiktif_palsu' });
  assert(res11.status === 422 || res11.status === 400, 'TC-EP-003', 'EP Enum: Kategori usaha tidak terdaftar WAJIB ditolak', `Received status: ${res11.status}`);

  // EP-04: Nomor Telepon Tidak Valid - Terlalu Pendek (Invalid Partition)
  const res12 = await sendPostRequest({ ...baseValidPayload, phone: '0812' });
  assert(res12.status === 422 || res12.status === 400, 'TC-EP-004', 'EP Phone: Nomor telepon terlalu pendek (< 10 digit) WAJIB ditolak', `Received status: ${res12.status}`);

  // EP-05: Nomor Telepon Tidak Valid - Mengandung Karakter Huruf (Invalid Partition)
  const res13 = await sendPostRequest({ ...baseValidPayload, phone: '0812-ABC-7890' });
  assert(res13.status === 422 || res13.status === 400, 'TC-EP-005', 'EP Phone: Nomor telepon dengan karakter alfabet WAJIB ditolak', `Received status: ${res13.status}`);

  // EP-06: Nominal Valid Payload (Valid Partition)
  const res14 = await sendPostRequest(baseValidPayload);
  assert(res14.status === 201 && res14.body.success, 'TC-EP-006', 'EP Valid: Data input lengkap dan sah berhasil disimpan dengan kode identitas UMKM');

  console.log('\n--------------------------------------------------------------------');
  console.log(`TOTAL PENGUJIAN: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
  console.log('--------------------------------------------------------------------\n');

  if (failCount > 0) {
    console.warn(`⚠️ DITEMUKAN ${failCount} DEFECT PADA VALIDASI BACKEND (BUKAN REKAYASA/FIKTIF)`);
    console.warn(`Defect teridentifikasi harus dicatat ke DEFECT_LOG.md dan diperbaiki!`);
  }
}

runTests();
