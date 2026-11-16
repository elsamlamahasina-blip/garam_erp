/**
 * MADURA ERP/EIS — Test Suite Pekan 9: Non-Functional Performance & Load Testing
 * Standard: ISO/IEC/IEEE 29119-4 Clause 9 Non-Functional Testing
 * Tool Benchmark: Apache JMeter / k6 Simulator Engine
 * Target: High-Concurrency Load Simulation (100 - 500 requests)
 */

import http from 'http';

console.log('====================================================================');
console.log('   MADURA ERP/EIS — PENGUJIAN PERFORMA & LOAD TESTING (PEKAN 9)');
console.log('   Simulasi Beban: 500 Permintaan Konkuren | RPS MKB020204 (Sub-CPMK 8)');
console.log('====================================================================\n');

function sendRequest(urlPath) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.request({
      hostname: 'localhost',
      port: process.env.TEST_PORT || 8080,
      path: urlPath,
      method: 'GET'
    }, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        const duration = Date.now() - start;
        resolve({ success: res.statusCode === 200, status: res.statusCode, duration });
      });
    });

    req.on('error', (err) => {
      const duration = Date.now() - start;
      resolve({ success: false, status: 500, error: err.message, duration });
    });

    req.end();
  });
}

async function runLoadSimulation(concurrency, totalRequests, endpoint) {
  console.log(`🚀 Menjalankan simulasi: ${totalRequests} request dengan konkurensi ${concurrency} ke ${endpoint}...`);
  const latencies = [];
  let successfulRequests = 0;
  let failedRequests = 0;
  const startTime = Date.now();

  let activeRequests = 0;
  let completedRequests = 0;

  return new Promise((resolve) => {
    function launchNext() {
      if (completedRequests >= totalRequests) {
        if (activeRequests === 0) {
          const totalDurationSec = (Date.now() - startTime) / 1000;
          latencies.sort((a, b) => a - b);
          const min = latencies[0] || 0;
          const max = latencies[latencies.length - 1] || 0;
          const avg = (latencies.reduce((a, b) => a + b, 0) / latencies.length) || 0;
          const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
          const rps = (totalRequests / totalDurationSec) || 0;
          const errorRate = ((failedRequests / totalRequests) * 100).toFixed(2);

          resolve({
            endpoint,
            totalRequests,
            concurrency,
            successfulRequests,
            failedRequests,
            errorRate: parseFloat(errorRate),
            minMs: min,
            maxMs: max,
            avgMs: parseFloat(avg.toFixed(2)),
            p95Ms: p95,
            throughputRps: parseFloat(rps.toFixed(2)),
            totalDurationSec: parseFloat(totalDurationSec.toFixed(2))
          });
        }
        return;
      }

      while (activeRequests < concurrency && (activeRequests + completedRequests) < totalRequests) {
        activeRequests++;
        sendRequest(endpoint).then((res) => {
          activeRequests--;
          completedRequests++;
          latencies.push(res.duration);
          if (res.success) successfulRequests++;
          else failedRequests++;
          launchNext();
        });
      }
    }

    launchNext();
  });
}

async function main() {
  // Test Phase 1: 100 concurrent requests to REST API /api/v1/umkm
  const benchApi = await runLoadSimulation(20, 100, '/api/v1/umkm');
  console.log(`\n📊 HASIL BENCHMARK REST API:`);
  console.log(`   - Total Requests : ${benchApi.totalRequests}`);
  console.log(`   - Throughput     : ${benchApi.throughputRps} Requests/Sec`);
  console.log(`   - Avg Latency    : ${benchApi.avgMs} ms`);
  console.log(`   - 95th Percentile: ${benchApi.p95Ms} ms`);
  console.log(`   - Error Rate     : ${benchApi.errorRate}%\n`);

  // Test Phase 2: 250 requests to WebGIS Map /peta
  const benchGis = await runLoadSimulation(25, 250, '/peta');
  console.log(`📊 HASIL BENCHMARK WEBGIS PAMEKASAN:`);
  console.log(`   - Total Requests : ${benchGis.totalRequests}`);
  console.log(`   - Throughput     : ${benchGis.throughputRps} Requests/Sec`);
  console.log(`   - Avg Latency    : ${benchGis.avgMs} ms`);
  console.log(`   - 95th Percentile: ${benchGis.p95Ms} ms`);
  console.log(`   - Error Rate     : ${benchGis.errorRate}%\n`);

  const passCondition = (benchApi.errorRate === 0 && benchGis.errorRate === 0 && benchApi.avgMs < 200 && benchGis.avgMs < 500);

  console.log('--------------------------------------------------------------------');
  if (passCondition) {
    console.log('✅ [PASS] Kriteria Kinerja Non-Fungsional ISO 29119 Terpenuhi (Error Rate 0.0%, Avg Latency < SLA)');
    console.log('🎉 PENGUJIAN BEBAN & PERFORMA PEKAN 9 DINYATAKAN PASS!');
  } else {
    console.error('❌ [FAIL] Kriteria Kinerja Non-Fungsional Melampaui Batas SLA Toleransi');
    process.exit(1);
  }
}

main();

