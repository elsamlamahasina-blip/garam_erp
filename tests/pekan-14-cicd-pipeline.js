/**
 * MADURA ERP/EIS — Verification Suite Pekan 14: CI/CD Pipeline & Docker Deployment
 * Standard: IEEE 15288 Deployment Automation | RPS MKB020204 (Sub-CPMK 13)
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
console.log('   MADURA ERP/EIS — VERIFIKASI CI/CD & DOCKER DEPLOYMENT (PEKAN 14)');
console.log('   Standar: IEEE 15288 | GitHub Actions & VPS Staging');
console.log('====================================================================\n');

// 1. Verifikasi File Pipeline GitHub Actions
const workflowPath = path.join(process.cwd(), '.github', 'workflows', 'ci-cd.yml');
assert(fs.existsSync(workflowPath), 'TC-CICD-001', 'File konfigurasi workflow GitHub Actions (.github/workflows/ci-cd.yml) tersedia');

const workflowContent = fs.existsSync(workflowPath) ? fs.readFileSync(workflowPath, 'utf-8') : '';

assert(workflowContent.includes('push:') && workflowContent.includes('branches: [ main ]'), 'TC-CICD-002', 'Pipeline terpicu otomatis pada event push ke branch main');
assert(workflowContent.includes('Automated SQA Testing Suite'), 'TC-CICD-003', 'Tahap testing otomatis terintegrasi penuh');
assert(workflowContent.includes('docker compose build'), 'TC-CICD-004', 'Tahap build container Docker terintegrasi');
assert(workflowContent.includes('Deploy to Staging'), 'TC-CICD-005', 'Tahap otomatisasi deployment ke server staging terintegrasi');

// 2. Verifikasi File Docker & Nginx Reverse Proxy
const dockerComposePath = path.join(process.cwd(), 'docker-compose.yml');
const nginxConfPath = path.join(process.cwd(), 'docker', 'nginx', 'nginx.conf');

assert(fs.existsSync(dockerComposePath), 'TC-DOCKER-001', 'File orkestrasi container docker-compose.yml tersedia');
assert(fs.existsSync(nginxConfPath), 'TC-DOCKER-002', 'File konfigurasi reverse proxy Nginx (docker/nginx/nginx.conf) tersedia');

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL CI/CD CHECKS: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) process.exit(1);
else console.log('🎉 VERIFIKASI PIPELINE CI/CD & DOCKER PEKAN 14 DINYATAKAN PASS!');
