/**
 * MADURA ERP/EIS — ETL Data Migration Pipeline (Extract, Transform, Load)
 * Standard: ISO/IEC/IEEE 29119-4 | RPS MKB020204 (Sub-CPMK 12)
 * Input: Dirty Legacy CSV -> Output: Validated PostGIS/ERP Entities
 */

import fs from 'fs';
import path from 'path';

export function runEtl(inputCsvPath, dryRun = true) {
  const content = fs.readFileSync(inputCsvPath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  const header = lines[0].split(',');

  const rawRows = lines.slice(1);
  const extractedCount = rawRows.length;
  let cleanedCount = 0;
  let rejectedCount = 0;
  let deduplicatedCount = 0;

  const seenKeys = new Set();
  const validEntities = [];
  const rejectedRows = [];

  for (const rawLine of rawRows) {
    // Regex parsing for CSV handling quotes
    const cols = rawLine.match(/(?:\"[^\"]*\"|[^,])+/g) || [];
    if (cols.length < 10) continue;

    const rawName = cols[0].replace(/\"/g, '').trim();
    const rawOwner = cols[1].replace(/\"/g, '').trim();
    const rawCategory = cols[2].replace(/\"/g, '').trim();
    const rawProducts = cols[3].replace(/\"/g, '').trim();
    const rawAddress = cols[4].replace(/\"/g, '').trim();
    const rawDistrict = cols[5].replace(/\"/g, '').trim();
    const rawVillage = cols[6].replace(/\"/g, '').trim();
    const rawPhone = cols[7].replace(/\"/g, '').trim();
    let lat = parseFloat(cols[8].replace(/\"/g, '').replace(',', '.'));
    let lng = parseFloat(cols[9].replace(/\"/g, '').replace(',', '.'));

    // TRANSFORM 1: Coordinate Swap Healing
    // Latitude Pamekasan adalah negatif (~ -7.x), Longitude positif (~ 113.x)
    if (lat > 0 && lng < 0) {
      const temp = lat;
      lat = lng;
      lng = temp;
    }

    // TRANSFORM 2: Bounding Box Validation (Pamekasan: Lat [-7.35, -6.95], Lng [113.30, 113.65])
    if (lat < -7.3500 || lat > -6.9500 || lng < 113.3000 || lng > 113.6500) {
      rejectedCount++;
      rejectedRows.push({ name: rawName, reason: `Koordinat di luar batas Kabupaten Pamekasan (${lat}, ${lng})` });
      continue;
    }

    // TRANSFORM 3: Phone Number Standardization (+62 xxx / 0812.xxx -> 08xxx)
    let cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('62')) {
      cleanPhone = '0' + cleanPhone.slice(2);
    }
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      rejectedCount++;
      rejectedRows.push({ name: rawName, reason: 'Nomor telepon tidak valid' });
      continue;
    }

    // TRANSFORM 4: Title Case Normalization
    const titleCaseName = rawName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    const titleCaseOwner = rawOwner.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

    // TRANSFORM 5: Deduplication by Business Name & Owner
    const dedupKey = `${titleCaseName.toLowerCase()}_${titleCaseOwner.toLowerCase()}`;
    if (seenKeys.has(dedupKey)) {
      deduplicatedCount++;
      continue;
    }
    seenKeys.add(dedupKey);

    const isSalt = rawCategory.includes('garam');
    const entity = {
      name: titleCaseName,
      owner_name: titleCaseOwner,
      category: rawCategory,
      sector: isSalt ? 'garam' : 'olahan_laut',
      products: rawProducts,
      address: rawAddress,
      district_name: rawDistrict,
      village_name: rawVillage,
      phone: cleanPhone,
      latitude: lat,
      longitude: lng,
      scale: 'Kecil',
      source: 'MIGRATED_LEGACY_ETL'
    };

    validEntities.push(entity);
    cleanedCount++;
  }

  return {
    extractedCount,
    cleanedCount,
    rejectedCount,
    deduplicatedCount,
    validEntities,
    rejectedRows
  };
}

// Test runner jika dijalankan langsung
if (process.argv[1].endsWith('etl_pipeline.js')) {
  const csvFile = path.join(process.cwd(), 'scripts', 'etl', 'dirty_legacy_umkm_data.csv');
  const result = runEtl(csvFile);
  console.log('HASIL ETL MIGRATION:', result);
}
