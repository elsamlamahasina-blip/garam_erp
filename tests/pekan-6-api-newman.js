/**
 * MADURA ERP/EIS — Test Suite Pekan 6: REST API Testing & Integration (Newman Runner)
 * Standard: ISO/IEC/IEEE 29119-4 | RPS MKB020204 (Sub-CPMK 6)
 * Target: Postman Collection API Endpoints
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

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

function request(options, postData = null) {
  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });

    req.on('error', (e) => resolve({ status: 500, error: e.message }));

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

console.log('====================================================================');
console.log('   MADURA ERP/EIS — SUITE PENGUJIAN PEKAN 6: REST API & INTEGRATION');
console.log('   Standar: ISO/IEC/IEEE 29119-4 | Postman / Newman CLI Runner');
console.log('====================================================================\n');

async function runApiTests() {
  const port = process.env.TEST_PORT || 8080;

  // 1. Verifikasi Keberadaan Koleksi Postman
  const colPath = path.join(process.cwd(), 'tests', 'API', 'MADURA_ERP_POSTMAN_COLLECTION.json');
  assert(fs.existsSync(colPath), 'TC-API-001', 'Koleksi resmi Postman v2.1.0 tersedia di tests/API/');

  // 2. Test API 1: Login Gmail Pribadi
  const resLogin = await request({
    hostname: 'localhost',
    port,
    path: '/api/v1/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'elsamlamahasina@gmail.com', name: 'Elsa Mahasina' });

  assert(
    resLogin.status === 200 && resLogin.body.success && resLogin.body.user.email === 'elsamlamahasina@gmail.com',
    'TC-API-002',
    'POST /api/v1/login: Autentikasi akun Gmail berhasil (Status 200 OK & user profil valid)'
  );

  // 3. Test API 2: Get Direktori UMKM
  const resGetUmkm = await request({
    hostname: 'localhost',
    port,
    path: '/api/v1/umkm',
    method: 'GET'
  });

  assert(
    resGetUmkm.status === 200 && resGetUmkm.body.success && Array.isArray(resGetUmkm.body.data) && resGetUmkm.body.count > 0,
    'TC-API-003',
    `GET /api/v1/umkm: Mengembalikan seluruh data UMKM (Status 200 OK, terhitung ${resGetUmkm.body?.count} unit)`
  );

  // 4. Test API 3: Post Tambah UMKM Valid
  const resPostValid = await request({
    hostname: 'localhost',
    port,
    path: '/api/v1/umkm',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'UD. Hasil Laut Segar Newman',
    owner_name: 'Bapak Subhan',
    category: 'kerupuk_ikan',
    products: 'Kerupuk Ikan Tenggiri Khas Pademawu',
    scale: 'Kecil',
    address: 'Desa Majungan',
    district_name: 'Pademawu',
    village_name: 'Majungan',
    phone: '081234567890',
    latitude: -7.2150,
    longitude: 113.5280,
    capacity: '500 Kg/bulan'
  });

  assert(
    resPostValid.status === 201 && resPostValid.body.success && resPostValid.body.data.code.startsWith('UMK-'),
    'TC-API-004',
    `POST /api/v1/umkm: Berhasil mendaftarkan usaha baru (Status 201 Created, Kode: ${resPostValid.body?.data?.code})`
  );

  // 5. Test API 4: Post Tambah UMKM Ditolak (Batas Koordinat BVA Melanggar)
  const resPostInvalid = await request({
    hostname: 'localhost',
    port,
    path: '/api/v1/umkm',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Toko Bodong Jakarta',
    owner_name: 'Anonim',
    category: 'olahan_ikan',
    phone: '081234567890',
    latitude: -6.2000, // Jakarta
    longitude: 106.8166
  });

  assert(
    resPostInvalid.status === 422 && resPostInvalid.body.success === false && resPostInvalid.body.errors.length > 0,
    'TC-API-005',
    'POST /api/v1/umkm: Penolakan koordinat luar Pamekasan berhasil (Status 422 Unprocessable Entity)'
  );

  // 6. Test API 5: Logout
  const resLogout = await request({
    hostname: 'localhost',
    port,
    path: '/api/v1/logout',
    method: 'POST'
  });

  assert(
    resLogout.status === 200 && resLogout.body.success,
    'TC-API-006',
    'POST /api/v1/logout: Sesi berhasil ditutup (Status 200 OK & Cookie direset)'
  );

  // 7. Test Integrasi Halaman WebGIS Spasial
  const resGisHtml = await request({
    hostname: 'localhost',
    port,
    path: '/peta',
    method: 'GET'
  });

  assert(
    resGisHtml.status === 200 && typeof resGisHtml.body === 'string' && resGisHtml.body.includes('leaflet'),
    'TC-API-007',
    'GET /peta: Halaman interaktif WebGIS termuat dengan library Leaflet Engine (Status 200 OK)'
  );

  // 8. Test Integrasi Halaman EIS Dashboard
  const resEisHtml = await request({
    hostname: 'localhost',
    port,
    path: '/statistik',
    method: 'GET'
  });

  assert(
    resEisHtml.status === 200 && typeof resEisHtml.body === 'string' && resEisHtml.body.includes('Chart'),
    'TC-API-008',
    'GET /statistik: Halaman EIS Dashboard termuat dengan modul Chart.js (Status 200 OK)'
  );

  console.log('\n--------------------------------------------------------------------');
  console.log(`TOTAL PENGUJIAN: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
  console.log('--------------------------------------------------------------------\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('🎉 SELURUH PENGUJIAN PEKAN 6 (REST API & INTEGRATION NEWMAN) DINYATAKAN PASS!');
  }
}

runApiTests();

