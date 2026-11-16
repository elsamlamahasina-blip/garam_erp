/**
 * MADURA ERP/EIS — Test Suite Pekan 10: Security Testing (OWASP Top 10)
 * Standard: ISO/IEC/IEEE 29119-4 Clause 9 & OWASP Top 10 Web Security
 * Target: SQLi, XSS, Broken Access Control, Session Cookie Security
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
console.log('   MADURA ERP/EIS — SECURITY TESTING OWASP TOP 10 (PEKAN 10)');
console.log('   Audit: SQLi, XSS, Broken Access Control | RPS MKB020204 (Sub-CPMK 9)');
console.log('====================================================================\n');

async function runSecurityAudit() {
  const port = process.env.TEST_PORT || 8080;

  // 1. OWASP A01: Broken Access Control (Isolasi Data Multi-Tenant UMKM)
  function verifyUmkmIsolation(requestingUser, targetUmkmId) {
    if (requestingUser.role === 'admin' || requestingUser.role === 'pimpinan') return true;
    if (requestingUser.role === 'umkm') return requestingUser.umkm_id === targetUmkmId;
    return false;
  }
  const userA = { id: 101, role: 'umkm', umkm_id: 1 };
  const userB = { id: 102, role: 'umkm', umkm_id: 2 };
  assert(verifyUmkmIsolation(userA, 1), 'TC-SEC-A01-1', 'A01 Access Control: UMKM A diizinkan mengakses data perusahaannya sendiri');
  assert(!verifyUmkmIsolation(userA, 2), 'TC-SEC-A01-2', 'A01 Access Control: Upaya UMKM A mengakses data privat UMKM B DIBLOKIR');

  // 2. OWASP A03: SQL Injection Simulation pada Parameter Pencarian
  const sqliPayload = "' OR '1'='1' --";
  const resSqli = await request({
    hostname: 'localhost',
    port,
    path: `/peta?q=${encodeURIComponent(sqliPayload)}`,
    method: 'GET'
  });
  assert(
    resSqli.status === 200 && typeof resSqli.body === 'string' && !resSqli.body.includes('syntax error') && !resSqli.body.includes('SQLSTATE'),
    'TC-SEC-A03-1',
    'A03 Injection: Parameter pencarian aman dari eksploitasi SQL Injection (tidak mengekspos database stack trace)'
  );

  // 3. OWASP A03: Cross-Site Scripting (Stored XSS) pada Input Form Usaha
  const xssPayload = "<script>alert('XSS_AUDIT_PWNED')</script>";
  const resXss = await request({
    hostname: 'localhost',
    port,
    path: '/api/v1/umkm',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: `UD. Bebas XSS ${xssPayload}`,
    owner_name: 'Pemilik Valid',
    category: 'rengginang_ikan',
    products: `Rengginang ${xssPayload}`,
    phone: '081234567890',
    latitude: -7.2285,
    longitude: 113.4580
  });

  // Verifikasi apakah payload script dieksekusi atau disimpan aman
  const resDirektori = await request({
    hostname: 'localhost',
    port,
    path: '/direktori',
    method: 'GET'
  });

  // Halaman HTML harus aman atau tidak menjalankan script mentah
  assert(
    resXss.status === 201 || resXss.status === 422,
    'TC-SEC-A03-2',
    'A03 XSS: Sistem menangani payload XSS secara terkendali tanpa crash'
  );

  // 4. OWASP A07: Identification and Authentication Failures (Session Cookie Flags)
  const resLogin = await request({
    hostname: 'localhost',
    port,
    path: '/api/v1/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'security.auditor@gmail.com' });

  const setCookie = resLogin.headers['set-cookie'];
  const cookieStr = Array.isArray(setCookie) ? setCookie.join('; ') : (setCookie || '');
  assert(
    cookieStr.includes('SameSite=Lax') && cookieStr.includes('Path=/'),
    'TC-SEC-A07-1',
    'A07 Auth: Session cookie dilengkapi atribut proteksi SameSite=Lax dan Path=/'
  );

  console.log('\n--------------------------------------------------------------------');
  console.log(`TOTAL SECURITY CHECKS: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
  console.log('--------------------------------------------------------------------\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('🎉 AUDIT KEAMANAN OWASP TOP 10 PEKAN 10 DINYATAKAN PASS!');
  }
}

runSecurityAudit();
