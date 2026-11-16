/**
 * MADURA ERP/EIS — Master Runner Evaluasi Akhir Proyek (Pekan 16 / UAS - Bobot 20%)
 * Standard: ISO/IEC/IEEE 29119-2, ISO/IEC/IEEE 29119-3, ISO/IEC/IEEE 29119-4
 * Target: Regresi Penuh Seluruh Suite Pengujian Pekan 1 s/d Pekan 16
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
console.log('   MADURA ERP/EIS — EVALUASI AKHIR PROYEK CAPSTONE (PEKAN 16 / UAS)');
console.log('   Bobot Evaluasi: 20% | Total Akumulasi Nilai: 100%');
console.log('   Standar: ISO/IEC/IEEE 29119 | Kurikulum OBE RPS MKB020204');
console.log('====================================================================\n');

const testSuites = [
  { file: 'tests/smoke-test.js', label: 'Pekan 1: Smoke Test & Architecture Verification' },
  { file: 'tests/pekan-2-test-plan.js', label: 'Pekan 2: Master Test Plan ISO 29119-3 & Risk Analysis' },
  { file: 'tests/pekan-3-blackbox-ep-bva.js', label: 'Pekan 3: Black-Box Testing (EP & BVA) Boundary Validation' },
  { file: 'tests/pekan-4-decision-table-state.js', label: 'Pekan 4: Decision Table SNI & State Transition Testing' },
  { file: 'tests/pekan-5-whitebox-cfg.js', label: 'Pekan 5: White-Box Structural Testing (CFG & HPP V(G)=9)' },
  { file: 'tests/pekan-6-api-newman.js', label: 'Pekan 6: REST API Testing & Integration (Newman Runner)' },
  { file: 'tests/E2E/sigara-e2e-suite.js', label: 'Pekan 7: Automated End-to-End Testing (Playwright)' },
  { file: 'tests/pekan-8-uts-audit.js', label: 'Pekan 8: Evaluasi Tengah Semester (UTS Audit Phase 1)' },
  { file: 'tests/pekan-9-load-test.js', label: 'Pekan 9: Non-Functional Performance & Load Testing (500 reqs)' },
  { file: 'tests/pekan-10-security-owasp.js', label: 'Pekan 10: Security Vulnerability Testing (OWASP Top 10)' },
  { file: 'tests/pekan-11-uat-verification.js', label: 'Pekan 11: User Acceptance Testing (UAT) & Sign-Off Matrix' },
  { file: 'tests/pekan-12-implementation-strategy.js', label: 'Pekan 12: Implementation Strategy & Change Management' },
  { file: 'tests/pekan-13-etl-migration.js', label: 'Pekan 13: Data Migration ETL & Live Emergency Rollback' },
  { file: 'tests/pekan-14-cicd-pipeline.js', label: 'Pekan 14: CI/CD GitHub Actions & Docker Staging Deployment' },
  { file: 'tests/pekan-15-pir-maintenance.js', label: 'Pekan 15: Post-Implementation Review (PIR) & Budgeting' }
];

testSuites.forEach((suite, idx) => {
  const fullPath = path.join(process.cwd(), suite.file);
  if (!fs.existsSync(fullPath)) {
    assert(false, `TC-UAS-${String(idx + 1).padStart(2, '0')}`, `Berkas ${suite.file} tidak ditemukan`);
    return;
  }

  try {
    execSync(`node "${fullPath}"`, {
      stdio: 'pipe',
      env: { ...process.env, TEST_PORT: '8080' }
    });
    assert(true, `TC-UAS-${String(idx + 1).padStart(2, '0')}`, `Regresi Penuh ${suite.label}: 100% PASS`);
  } catch (err) {
    assert(false, `TC-UAS-${String(idx + 1).padStart(2, '0')}`, `Regresi Penuh ${suite.label}: GAGAL`, err.message);
  }
});

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL SUITE CAPSTONE UAS: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🏆 SELURUH PENGUJIAN 16 PEKAN RPS TELAH LULUS 100% DENGAN NILAI MAKSIMAL (SANGAT BAIK: 100)!');
}
