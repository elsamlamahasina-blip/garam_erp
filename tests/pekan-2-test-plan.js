/**
 * MADURA ERP/EIS — Verification Suite Pekan 2: Test Planning & Risk Analysis
 * Standard: ISO/IEC/IEEE 29119-3 Test Documentation
 */

import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;
const results = [];

function assert(condition, testCaseId, description) {
  if (condition) {
    passCount++;
    results.push({ id: testCaseId, desc: description, status: 'PASS' });
    console.log(`✅ [PASS] ${testCaseId}: ${description}`);
  } else {
    failCount++;
    results.push({ id: testCaseId, desc: description, status: 'FAIL' });
    console.error(`❌ [FAIL] ${testCaseId}: ${description}`);
  }
}

console.log('====================================================================');
console.log('   MADURA ERP/EIS — SUITE PENGUJIAN PEKAN 2: TEST PLANNING & RISKS');
console.log('   Standar: ISO/IEC/IEEE 29119-3 | RPS MKB020204');
console.log('====================================================================\n');

// 1. Verifikasi Keberadaan Dokumen Master Test Plan
const testPlanPath = path.join(process.cwd(), 'docs', 'test-plan', 'ISO_29119_MASTER_TEST_PLAN.md');
assert(fs.existsSync(testPlanPath), 'TC-PLAN-001', 'Dokumen ISO_29119_MASTER_TEST_PLAN.md tersedia di docs/test-plan/');

const content = fs.existsSync(testPlanPath) ? fs.readFileSync(testPlanPath, 'utf-8') : '';

// 2. Verifikasi Komponen Wajib ISO/IEC/IEEE 29119-3
assert(content.includes('ISO/IEC/IEEE 29119-3'), 'TC-PLAN-002', 'Dokumen mengadopsi standar formal ISO/IEC/IEEE 29119-3');
assert(content.includes('Ruang Lingkup (In-Scope)'), 'TC-PLAN-003', 'Tersedia pendefinisian ruang lingkup pengujian (In-Scope)');
assert(content.toLowerCase().includes('out-of-scope'), 'TC-PLAN-004', 'Tersedia batasan pengujian (Out-of-Scope)');
assert(content.includes('Kriteria Masuk') && content.includes('Entry Criteria'), 'TC-PLAN-005', 'Tersedia kriteria masuk (Entry Criteria)');
assert(content.includes('Kriteria Keluar') && content.includes('Exit Criteria'), 'TC-PLAN-006', 'Tersedia kriteria keluar (Exit Criteria)');
assert(content.includes('Suspension Criteria') && content.includes('Resumption Criteria'), 'TC-PLAN-007', 'Tersedia kriteria penundaan dan pemulihan pengujian');
assert(content.includes('Estimasi Sumber Daya') || content.includes('Resource Needs'), 'TC-PLAN-008', 'Tersedia estimasi sumber daya perangkat keras, lunak, dan tim SQA');
assert(content.includes('Analisis Risiko Pengujian') && content.includes('RPN'), 'TC-PLAN-009', 'Tersedia analisis risiko pengujian dengan kalkulasi Risk Priority Number (RPN)');
assert(content.includes('V-Model Development Lifecycle'), 'TC-PLAN-010', 'Pengujian dipetakan ke siklus hidup V-Model');

// 3. Verifikasi Konsistensi RPN Risiko (Probabilitas x Dampak)
const riskRegex = /\| \*\*R-\d+\*\* \| [^|]+ \| (\d+) \| (\d+) \| \*\*(\d+)\*\* \|/g;
let match;
let verifiedRisks = 0;
while ((match = riskRegex.exec(content)) !== null) {
  const prob = parseInt(match[1], 10);
  const impact = parseInt(match[2], 10);
  const rpn = parseInt(match[3], 10);
  const isValid = (prob * impact === rpn);
  assert(isValid, `TC-RISK-${String(verifiedRisks + 1).padStart(3, '0')}`, `Kalkulasi matematis RPN (${prob} x ${impact} = ${rpn}) terverifikasi presisi`);
  verifiedRisks++;
}

assert(verifiedRisks >= 5, 'TC-RISK-COV', `Cakupan analisis risiko mencakup minimal 5 risiko operasional & teknis (Terdeteksi: ${verifiedRisks})`);

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL PENGUJIAN: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 SELURUH PENGUJIAN PEKAN 2 (TEST PLANNING & RISK ANALYSIS) DINYATAKAN PASS!');
}
