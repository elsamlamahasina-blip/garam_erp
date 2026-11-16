/**
 * MADURA ERP/EIS — Verification Suite Pekan 13: ETL Migration & Rollback Simulation
 * Standard: ISO/IEC/IEEE 29119-4 | RPS MKB020204 (Sub-CPMK 12)
 */

import fs from 'fs';
import path from 'path';
import { runEtl } from '../scripts/etl/etl_pipeline.js';

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
console.log('   MADURA ERP/EIS — VERIFIKASI ETL DATA MIGRATION & ROLLBACK (PEKAN 13)');
console.log('   Standar: IEEE 15288 | RPS MKB020204 (Sub-CPMK 12)');
console.log('====================================================================\n');

const csvFile = path.join(process.cwd(), 'scripts', 'etl', 'dirty_legacy_umkm_data.csv');
const cutoverDoc = path.join(process.cwd(), 'docs', 'migration', 'CUTOVER_CHECKLIST_AND_ROLLBACK_PLAN.md');

assert(fs.existsSync(csvFile), 'TC-ETL-001', 'Berkas legacy CSV kotor (dirty_legacy_umkm_data.csv) tersedia');
assert(fs.existsSync(cutoverDoc), 'TC-ETL-002', 'Dokumen Cutover Checklist & Rollback Plan tersedia');

// Jalankan ETL Pipeline
const etlRes = runEtl(csvFile, true);

assert(etlRes.extractedCount === 6, 'TC-ETL-003', `Extract: Berhasil membaca ${etlRes.extractedCount} record mentah dari legacy CSV`);
assert(etlRes.deduplicatedCount === 1, 'TC-ETL-004', 'Transform: Berhasil mendeteksi dan mengeliminasi 1 data duplikat kotor');
assert(etlRes.rejectedCount === 1, 'TC-ETL-005', 'Transform: Berhasil menolak 1 baris di luar batas wilayah Pamekasan (Jakarta)');

// Verifikasi Coordinate Swap Healing pada 'rengginang bu siti lorjuk'
const sitiRecord = etlRes.validEntities.find(e => e.name.includes('Siti'));
assert(
  sitiRecord && sitiRecord.latitude === -7.2260 && sitiRecord.longitude === 113.4540,
  'TC-ETL-006',
  'Transform Healing: Berhasil membalik koordinat tertukar (Lat: -7.226, Lng: 113.454)'
);

// Verifikasi Standarisasi Telepon (+62 -> 08xxx)
const syaifulRecord = etlRes.validEntities.find(e => e.owner_name.includes('Syaiful'));
assert(
  syaifulRecord && syaifulRecord.phone === '081234567890',
  'TC-ETL-007',
  'Transform Cleaning: Format telepon +62 distandardisasi menjadi 081234567890'
);

assert(etlRes.cleanedCount === 4, 'TC-ETL-008', `Load Ready: Terdapat 4 record bersih yang siap di-load ke database produksi`);

// Simulasi Prosedur Rollback State
const testStorePath = path.join(process.cwd(), 'database', 'umkm_store.json');
const backupPath = `${testStorePath}.backup_test`;

fs.copyFileSync(testStorePath, backupPath);
assert(fs.existsSync(backupPath), 'TC-ROLLBACK-001', 'Simulasi Rollback: Snapshot backup basis data berhasil dibuat');

// Modifikasi data uji
const rawData = JSON.parse(fs.readFileSync(testStorePath, 'utf-8'));
const modifiedData = [...rawData, { id: 9999, name: 'Data Uji Rusak Rollback' }];
fs.writeFileSync(testStorePath, JSON.stringify(modifiedData), 'utf-8');

// Pulihkan (Restore Rollback)
fs.copyFileSync(backupPath, testStorePath);
fs.unlinkSync(backupPath);
const restoredData = JSON.parse(fs.readFileSync(testStorePath, 'utf-8'));

assert(
  !restoredData.some(d => d.id === 9999),
  'TC-ROLLBACK-002',
  'Simulasi Rollback: Pemulihan data dari cadangan darurat (Emergency Restore) berhasil 100%'
);

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL ETL & ROLLBACK CHECKS: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) process.exit(1);
else console.log('🎉 VERIFIKASI ETL MIGRATION & ROLLBACK PEKAN 13 DINYATAKAN PASS!');
