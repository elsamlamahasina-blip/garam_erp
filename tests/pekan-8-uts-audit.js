/**
 * MADURA ERP/EIS — Test Suite Pekan 8: Evaluasi Tengah Semester (UTS - Bobot 25%)
 * Audit Dokumen Testing, Peer Review, & Rekonsiliasi Defect Log Phase 1
 * Standard: ISO/IEC/IEEE 29119-2 & ISO/IEC/IEEE 29119-3 | RPS MKB020204 (CPMK 2)
 */

import { execSync } from 'child_process';
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

console.log('====================================================================');
console.log('   MADURA ERP/EIS — AUDIT TESTING & EVALUASI UTS PHASE 1 (PEKAN 8)');
console.log('   Bobot Penilaian: 25% | Standar: ISO/IEC/IEEE 29119-2/3');
console.log('====================================================================\n');

// 1. Audit Kelengkapan Dokumen Pengujian Phase 1 (Pekan 1 - 7)
const requiredDocs = [
  'docs/sqa/SOFTWARE_QUALITY_ASSURANCE_PLAN.md',
  'docs/sqa/V_MODEL_VERIFICATION_VALIDATION.md',
  'docs/test-plan/ISO_29119_MASTER_TEST_PLAN.md',
  'docs/test-cases/PEKAN_1_SMOKE_TEST_CASES.md',
  'docs/test-cases/PEKAN_4_DECISION_TABLE_STATE_TRANSITION.md',
  'docs/test-cases/PEKAN_5_WHITE_BOX_CYCLOMATIC_COMPLEXITY.md',
  'docs/defect-log/DEFECT_LOG.md',
  'docs/defect-log/DEFECT_MANAGEMENT_GUIDE.md',
  'docs/test-results/PEKAN_1_TEST_EXECUTION_REPORT.md',
  'docs/test-results/PEKAN_2_TEST_EXECUTION_REPORT.md',
  'docs/test-results/PEKAN_3_TEST_EXECUTION_REPORT.md',
  'docs/test-results/PEKAN_4_TEST_EXECUTION_REPORT.md',
  'docs/test-results/PEKAN_5_TEST_EXECUTION_REPORT.md',
  'docs/test-results/PEKAN_6_TEST_EXECUTION_REPORT.md',
  'docs/test-results/PEKAN_7_TEST_EXECUTION_REPORT.md'
];

requiredDocs.forEach((doc, idx) => {
  const exists = fs.existsSync(path.join(process.cwd(), doc));
  assert(exists, `TC-AUDIT-DOC-${String(idx + 1).padStart(2, '0')}`, `Artefak audit dokumen ${doc} tersedia`);
});

// 2. Audit Kerapian Defect Log (Zero Unresolved Blocker Defects)
const defectContent = fs.readFileSync(path.join(process.cwd(), 'docs/defect-log/DEFECT_LOG.md'), 'utf-8');
assert(!defectContent.includes('OPEN') && defectContent.includes('CLOSED (Resolved)'), 'TC-AUDIT-DEF-01', 'Seluruh defect Phase 1 (DEF-001 s/d DEF-004) telah berstatus CLOSED');

// 3. Eksekusi Live Test Suite Regression (Pekan 1 s/d 7)
const suites = [
  { file: 'tests/smoke-test.js', label: 'Pekan 1: Smoke Test Suite' },
  { file: 'tests/pekan-2-test-plan.js', label: 'Pekan 2: Master Test Plan Suite' },
  { file: 'tests/pekan-3-blackbox-ep-bva.js', label: 'Pekan 3: Black-Box EP & BVA Suite' },
  { file: 'tests/pekan-4-decision-table-state.js', label: 'Pekan 4: Decision Table & State Suite' },
  { file: 'tests/pekan-5-whitebox-cfg.js', label: 'Pekan 5: White-Box CFG Suite' },
  { file: 'tests/pekan-6-api-newman.js', label: 'Pekan 6: REST API & Integration Suite' },
  { file: 'tests/E2E/sigara-e2e-suite.js', label: 'Pekan 7: Automated E2E Suite' }
];

suites.forEach((suite, idx) => {
  try {
    execSync(`node "${suite.file}"`, { stdio: 'pipe', env: { ...process.env, TEST_PORT: '8080' } });
    assert(true, `TC-AUDIT-SUITE-${idx + 1}`, `Live execution ${suite.label}: 100% PASS`);
  } catch (err) {
    assert(false, `TC-AUDIT-SUITE-${idx + 1}`, `Live execution ${suite.label}: GAGAL`, err.message);
  }
});

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL AUDIT CHECKS: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 SELURUH AUDIT EVALUASI UTS PHASE 1 (PEKAN 8) LOLOS DENGAN SKOR 100%!');
}
