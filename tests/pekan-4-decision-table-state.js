/**
 * MADURA ERP/EIS — Test Suite Pekan 4: Decision Table & State Transition Testing
 * Standard: ISO/IEC/IEEE 29119-4 (Clause 7.4 Decision Table & Clause 7.5 State Transition)
 * Business Domain: Grading Garam Rakyat & Batch Produksi Olahan Laut
 */

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
console.log('   MADURA ERP/EIS — SUITE PENGUJIAN PEKAN 4: DECISION TABLE & STATE');
console.log('   Standar: ISO/IEC/IEEE 29119-4 | RPS MKB020204 (Sub-CPMK 4)');
console.log('====================================================================\n');

// ---------------------------------------------------------------------------
// 1. Logika Bisnis: Decision Table - Grading Garam Rakyat Pamekasan
// ---------------------------------------------------------------------------
function evaluateSaltGrade(naclPercent, moisturePercent, isBrightWhite) {
  const isHighNacl = naclPercent >= 94.7;
  const isLowMoisture = moisturePercent <= 7.0;

  if (isHighNacl && isLowMoisture && isBrightWhite) {
    return { grade: 'K1', usage: 'Garam Konsumsi Premium & Farmasi', sniCompliant: true };
  } else if (isHighNacl && (!isLowMoisture || !isBrightWhite)) {
    return { grade: 'K2', usage: 'Garam Pengolahan Ikan & Pindang', sniCompliant: false };
  } else {
    return { grade: 'K3', usage: 'Garam Kasar Industri & Penyamakan', sniCompliant: false };
  }
}

// DT-01: Rule 1 (High NaCl, Low Moisture, Bright White) -> Grade K1 & SNI Compliant
const dt1 = evaluateSaltGrade(96.5, 4.2, true);
assert(dt1.grade === 'K1' && dt1.sniCompliant === true, 'TC-DT-001', 'Rule 1: NaCl 96.5%, Lembab 4.2%, Putih Cerah -> Grade K1 (SNI Lolos)');

// DT-02: Rule 2 (High NaCl, Low Moisture, But NOT Bright White) -> Grade K2
const dt2 = evaluateSaltGrade(95.0, 5.0, false);
assert(dt2.grade === 'K2' && dt2.sniCompliant === false, 'TC-DT-002', 'Rule 2: NaCl 95.0%, Lembab 5.0%, Warna Kusam -> Grade K2 (Garam Pengolahan Ikan)');

// DT-03: Rule 3 (High NaCl, High Moisture > 7%) -> Grade K2
const dt3 = evaluateSaltGrade(95.2, 8.5, true);
assert(dt3.grade === 'K2', 'TC-DT-003', 'Rule 3: NaCl 95.2%, Lembab Tinggi 8.5% -> Grade K2');

// DT-04: Rule 4 (Low NaCl < 94.7%, Low Moisture) -> Grade K3
const dt4 = evaluateSaltGrade(91.0, 5.5, true);
assert(dt4.grade === 'K3' && dt4.sniCompliant === false, 'TC-DT-004', 'Rule 4: NaCl Rendah 91.0% -> Grade K3 (Garam Kasar Non-Konsumsi)');

// DT-05: Rule 5 (Low NaCl < 94.7%, High Moisture > 7%) -> Grade K3
const dt5 = evaluateSaltGrade(88.4, 9.2, false);
assert(dt5.grade === 'K3', 'TC-DT-005', 'Rule 5: NaCl Sangat Rendah 88.4% & Lembab 9.2% -> Grade K3');

// ---------------------------------------------------------------------------
// 2. Logika Bisnis: State Machine - Siklus Hidup Batch Produksi
// ---------------------------------------------------------------------------
class BatchProductionStateMachine {
  constructor(batchCode) {
    this.batchCode = batchCode;
    this.currentState = 'DRAFT';
    this.history = ['DRAFT'];
  }

  transition(event) {
    const validTransitions = {
      'DRAFT': { 'ALOKASI_BAHAN': 'BAHAN_TERALOKASI' },
      'BAHAN_TERALOKASI': { 'MULAI_PRODUKSI': 'PROSES_PRODUKSI' },
      'PROSES_PRODUKSI': { 'SELESAI_PENGOLAHAN': 'QUALITY_CHECK' },
      'QUALITY_CHECK': { 
        'MUTU_LOLOS': 'SELESAI_PACKING',
        'MUTU_GAGAL': 'BATAL_REJECTED'
      },
      'SELESAI_PACKING': {},
      'BATAL_REJECTED': {}
    };

    const allowedEvents = validTransitions[this.currentState] || {};
    const nextState = allowedEvents[event];

    if (!nextState) {
      return { success: false, error: `Transisi ilegal: Dari state ${this.currentState} dengan event ${event} ditolak` };
    }

    this.currentState = nextState;
    this.history.push(nextState);
    return { success: true, newState: nextState };
  }
}

// ST-01: Valid Happy Path (DRAFT -> BAHAN_TERALOKASI -> PROSES_PRODUKSI -> QUALITY_CHECK -> SELESAI_PACKING)
const batch1 = new BatchProductionStateMachine('BATCH-RNG-001');
const t1 = batch1.transition('ALOKASI_BAHAN');
const t2 = batch1.transition('MULAI_PRODUKSI');
const t3 = batch1.transition('SELESAI_PENGOLAHAN');
const t4 = batch1.transition('MUTU_LOLOS');

assert(
  t1.success && t2.success && t3.success && t4.success && batch1.currentState === 'SELESAI_PACKING',
  'TC-ST-001',
  'Alur normal (Happy Path) siklus batch olahan rengginang ikan sukses hingga SELESAI_PACKING'
);

// ST-02: Quality Check Reject Path (QUALITY_CHECK -> BATAL_REJECTED)
const batch2 = new BatchProductionStateMachine('BATCH-TERASI-002');
batch2.transition('ALOKASI_BAHAN');
batch2.transition('MULAI_PRODUKSI');
batch2.transition('SELESAI_PENGOLAHAN');
const tReject = batch2.transition('MUTU_GAGAL');

assert(
  tReject.success && batch2.currentState === 'BATAL_REJECTED',
  'TC-ST-002',
  'Alur penolakan mutu (Reject Path) memindahkan batch rusak ke BATAL_REJECTED'
);

// ST-03: Illegal Jump (DRAFT -> SELESAI_PACKING) Ditolak
const batch3 = new BatchProductionStateMachine('BATCH-ILLEGAL-003');
const tIllegal1 = batch3.transition('SELESAI_PACKING');
assert(!tIllegal1.success, 'TC-ST-003', 'Transisi ilegal melompati produksi langsung ke SELESAI_PACKING berhasil DITOLAK');

// ST-04: Illegal Backward (PROSES_PRODUKSI -> DRAFT) Ditolak
const batch4 = new BatchProductionStateMachine('BATCH-ILLEGAL-004');
batch4.transition('ALOKASI_BAHAN');
batch4.transition('MULAI_PRODUKSI');
const tBackward = batch4.transition('ALOKASI_BAHAN');
assert(!tBackward.success, 'TC-ST-004', 'Transisi mundur ilegal dari PROSES_PRODUKSI kembali ke alokasi berhasil DITOLAK');

// ST-05: Illegal Transition from Terminal State (BATAL_REJECTED -> SELESAI_PACKING) Ditolak
const tFromTerminal = batch2.transition('MUTU_LOLOS');
assert(!tFromTerminal.success, 'TC-ST-005', 'Transisi dari state terminal BATAL_REJECTED berhasil DITOLAK demi integritas stok');

console.log('\n--------------------------------------------------------------------');
console.log(`TOTAL PENGUJIAN: ${passCount + failCount} | PASS: ${passCount} | FAIL: ${failCount}`);
console.log('--------------------------------------------------------------------\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 SELURUH PENGUJIAN PEKAN 4 (DECISION TABLE & STATE TRANSITION) DINYATAKAN PASS!');
}

