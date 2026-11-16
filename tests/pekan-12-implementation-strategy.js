/**
 * MADURA ERP/EIS — Verification Suite Pekan 12: Implementation & Change Management
 * Standard: IEEE 15288 Implementation & ADKAR Framework | RPS MKB020204 (Sub-CPMK 11)
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
console.log('   MADURA ERP/EIS — STRATEGI IMPLEMENTASI & ADKAR (PEKAN 12)');
console.log('   Standar: IEEE 15288 | RPS MKB020204 (Sub-CPMK 11)');
console.log('====================================================================\n');

const docPath = path.join(process.cwd(), 'docs', 'architecture', 'IMPLEMENTATION_AND_CHANGE_MANAGEMENT.md');
assert(fs.existsSync(docPath), 'TC-IMP-001', 'Dokumen Strategi Implementasi & Change Management tersedia');

const content = fs.existsSync(docPath) ? fs.readFileSync(docPath, 'utf-8') : '';

assert(content.includes('Phased Pilot Conversion') && content.includes('DISETUJUI'), 'TC-IMP-002', 'Strategi transisi Phased Pilot Conversion disetujui');
assert(content.includes('Direct Conversion') && content.includes('DITOLAK'), 'TC-IMP-003', 'Strategi Big Bang ditolak karena risiko tinggi pada UMKM mikro');
assert(content.includes('ADKAR') && content.includes('Awareness') && content.includes('Reinforcement'), 'TC-IMP-004', 'Framework manajemen perubahan ADKAR terdefinisi lengkap');
assert(content.includes('Pademawu') && content.includes('Tlanakan'), 'TC-IMP-005', 'Lokasi pilot project mencakup sentra pesisir Pademawu & Tlanakan');

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL IMPLEMENTATION CHECKS: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) process.exit(1);
else console.log('🎉 VERIFIKASI STRATEGI IMPLEMENTASI PEKAN 12 DINYATAKAN PASS!');
