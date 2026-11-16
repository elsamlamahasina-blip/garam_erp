/**
 * MADURA ERP/EIS — Verification Suite Pekan 15: PIR & Maintenance Planning
 * Standard: IEEE 15288 Maintenance | RPS MKB020204 (Sub-CPMK 14)
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
console.log('   MADURA ERP/EIS — VERIFIKASI PIR & RENCANA PEMELIHARAAN (PEKAN 15)');
console.log('   Standar: IEEE 15288 | RPS MKB020204 (Sub-CPMK 14)');
console.log('====================================================================\n');

const pirPath = path.join(process.cwd(), 'docs', 'pir', 'POST_IMPLEMENTATION_REVIEW.md');
assert(fs.existsSync(pirPath), 'TC-PIR-001', 'Dokumen Post-Implementation Review (PIR) tersedia di docs/pir/');

const content = fs.existsSync(pirPath) ? fs.readFileSync(pirPath, 'utf-8') : '';

assert(content.includes('Corrective Maintenance') && content.includes('Adaptive Maintenance'), 'TC-PIR-002', 'Mencakup pemeliharaan Korektif dan Adaptif');
assert(content.includes('Perfective Maintenance') && content.includes('Preventive Maintenance'), 'TC-PIR-003', 'Mencakup pemeliharaan Perfektif dan Preventif');
assert(content.includes('Lessons Learned') && content.includes('DEF-001'), 'TC-PIR-004', 'Memuat analisis pelajaran yang dipetik (Lessons Learned) terhubung ke Defect Log');
assert(content.includes('Estimasi Biaya Pemeliharaan') && content.includes('Rp 10.000.000'), 'TC-PIR-005', 'Tersedia matriks estimasi anggaran pemeliharaan sistem terpadu');

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL PIR CHECKS: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) process.exit(1);
else console.log('🎉 VERIFIKASI DOKUMEN PIR & PEMELIHARAAN PEKAN 15 DINYATAKAN PASS!');

