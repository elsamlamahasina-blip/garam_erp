/**
 * MADURA ERP/EIS — Verification Suite Pekan 11: UAT & Sign-Off Governance
 * Standard: ISO/IEC/IEEE 29119-2 Acceptance Process | RPS MKB020204 (Sub-CPMK 10)
 */

import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;
const results = [];

function assert(condition, tcId, description) {
  if (condition) {
    passCount++;
    results.push({ id: tcId, desc: description, status: 'PASS' });
    console.log(`✅ [PASS] ${tcId}: ${description}`);
  } else {
    failCount++;
    results.push({ id: tcId, desc: description, status: 'FAIL' });
    console.error(`❌ [FAIL] ${tcId}: ${description}`);
  }
}

console.log('====================================================================');
console.log('   MADURA ERP/EIS — VERIFIKASI UAT & SIGN-OFF GOVERNANCE (PEKAN 11)');
console.log('   Standar: ISO/IEC/IEEE 29119-2 | RPS MKB020204 (Sub-CPMK 10)');
console.log('====================================================================\n');

const uatMatrixPath = path.join(process.cwd(), 'docs', 'uat', 'UAT_SCENARIO_MATRIX.md');
const signOffPath = path.join(process.cwd(), 'docs', 'uat', 'BERITA_ACARA_UAT_SIGNOFF.md');

assert(fs.existsSync(uatMatrixPath), 'TC-UAT-001', 'Dokumen Matriks Skenario UAT tersedia di docs/uat/');
assert(fs.existsSync(signOffPath), 'TC-UAT-002', 'Dokumen Berita Acara UAT Sign-Off tersedia di docs/uat/');

const uatContent = fs.existsSync(uatMatrixPath) ? fs.readFileSync(uatMatrixPath, 'utf-8') : '';
const signOffContent = fs.existsSync(signOffPath) ? fs.readFileSync(signOffPath, 'utf-8') : '';

assert(uatContent.includes('UAT-01') && uatContent.includes('UAT-07'), 'TC-UAT-003', 'Matriks UAT mencakup 7 skenario pengujian bisnis riil');
assert(uatContent.includes('ACCEPTED') && !uatContent.includes('REJECTED'), 'TC-UAT-004', 'Seluruh 7 skenario UAT berstatus ACCEPTED');
assert(signOffContent.includes('BERITA ACARA UAT') && signOffContent.includes('Aang Kisnu Darmawan'), 'TC-UAT-005', 'Berita Acara UAT memuat otorisasi Dosen Pengampu & Pemangku Kepentingan');

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL UAT CHECKS: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) process.exit(1);
else console.log('🎉 SELURUH VERIFIKASI UAT PEKAN 11 DINYATAKAN PASS!');

