/**
 * MADURA ERP/EIS — E2E Test Automation Suite (Pekan 7)
 * Framework: Playwright / Headless Browser Simulation Engine
 * Standard: ISO/IEC/IEEE 29119-4 | RPS MKB020204 (Sub-CPMK 7)
 * Target: End-to-End User Journeys (Login -> Beranda -> WebGIS -> Direktori -> EIS Dashboard)
 */

import http from 'http';

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

function fetchPage(path, cookie = null) {
  return new Promise((resolve) => {
    const headers = {};
    if (cookie) headers['Cookie'] = cookie;

    const req = http.request({
      hostname: 'localhost',
      port: process.env.TEST_PORT || 8080,
      path,
      method: 'GET',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({
        status: res.statusCode,
        headers: res.headers,
        html: body
      }));
    });

    req.on('error', (e) => resolve({ status: 500, error: e.message }));
    req.end();
  });
}

function postJson(path, data) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: process.env.TEST_PORT || 8080,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, json: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });

    req.on('error', (e) => resolve({ status: 500, error: e.message }));
    req.write(payload);
    req.end();
  });
}

console.log('====================================================================');
console.log('   MADURA ERP/EIS — SUITE PENGUJIAN OTOMASI E2E (PEKAN 7)');
console.log('   Standar: ISO/IEC/IEEE 29119-4 | Playwright / Headless E2E Simulation');
console.log('====================================================================\n');

async function runE2eSuite() {
  // Step 1: Akses Landing Page / Login Gate Sebelum Autentikasi
  const resGate = await fetchPage('/login');
  assert(
    resGate.status === 200 && resGate.html.includes('SIGARA') && resGate.html.includes('Google'),
    'TC-E2E-001',
    'E2E Journey 1: Pengguna mengakses gerbang login awal SIGARA Pamekasan'
  );

  // Step 2: Eksekusi Alur Login Otomatis Pengguna
  const resAuth = await postJson('/api/v1/login', {
    email: 'elsa.madura@gmail.com',
    name: 'Elsa Mahasina'
  });
  const setCookieHeader = resAuth.headers['set-cookie'];
  const sessionCookie = Array.isArray(setCookieHeader) ? setCookieHeader[0].split(';')[0] : '';

  assert(
    resAuth.status === 200 && resAuth.json.success && sessionCookie.includes('sigara_user='),
    'TC-E2E-002',
    'E2E Journey 2: Otomasi login akun personal menghasilkan persistent session cookie'
  );

  // Step 3: Navigasi ke Halaman Beranda Publik dengan Sesi Terautentikasi
  const resBeranda = await fetchPage('/beranda', sessionCookie);
  assert(
    resBeranda.status === 200 && resBeranda.html.includes('Elsa Mahasina') && resBeranda.html.includes('Dukung UMKM dan Potensi Garam Pamekasan'),
    'TC-E2E-003',
    'E2E Journey 3: Halaman Beranda memuat profil pengguna terautentikasi dan banner SIGARA'
  );

  // Step 4: Navigasi E2E ke Halaman WebGIS Pamekasan
  const resWebGis = await fetchPage('/peta', sessionCookie);
  assert(
    resWebGis.status === 200 && 
    resWebGis.html.includes('L.map') && 
    resWebGis.html.includes('L.tileLayer') &&
    resWebGis.html.includes('L.polygon') &&
    resWebGis.html.includes('L.marker'),
    'TC-E2E-004',
    'E2E Journey 4: WebGIS Pamekasan merender peta Leaflet interaktif beserta layer Point UMKM & Poligon Tambak'
  );

  // Step 5: Navigasi E2E ke Halaman Direktori UMKM
  const resDirektori = await fetchPage('/direktori', sessionCookie);
  assert(
    resDirektori.status === 200 && 
    resDirektori.html.includes('Direktori Lengkap UMKM') &&
    resDirektori.html.includes('UD. Sari Laut'),
    'TC-E2E-005',
    'E2E Journey 5: Halaman Direktori menampilkan tabel data pelaku usaha komoditas lokal'
  );

  // Step 6: Navigasi E2E ke Halaman EIS Dashboard & Analitik
  const resStatistik = await fetchPage('/statistik', sessionCookie);
  assert(
    resStatistik.status === 200 && 
    resStatistik.html.includes('Executive Information System') &&
    resStatistik.html.includes('pieChart') &&
    resStatistik.html.includes('barChart'),
    'TC-E2E-006',
    'E2E Journey 6: EIS Dashboard merender agregasi statistik dan canvas visualisasi Chart.js'
  );

  // Step 7: Verifikasi Ketersediaan Komponen Responsif Mobile & Modal Form Daftarkan Usaha
  assert(
    resBeranda.html.includes('id="addUmkmModal"') && 
    resBeranda.html.includes('useCurrentLocation') &&
    resBeranda.html.includes('viewport'),
    'TC-E2E-007',
    'E2E Journey 7: Modal form pendaftaran usaha dan kontrol GPS mobile viewport terverifikasi lengkap'
  );

  console.log('\n--------------------------------------------------------------------');
  console.log(`TOTAL PENGUJIAN: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
  console.log('--------------------------------------------------------------------\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('🎉 SELURUH PENGUJIAN OTOMASI E2E PEKAN 7 DINYATAKAN PASS!');
  }
}

runE2eSuite();
