<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\District;
use App\Models\Village;
use App\Models\Umkm;
use App\Models\SaltPond;

class DemoUmkmAndGisSeeder extends Seeder
{
    public function run(): void
    {
        $pademawu = District::where('name', 'Pademawu')->first();
        $galis = District::where('name', 'Galis')->first();
        $tlanakan = District::where('name', 'Tlanakan')->first();

        $majungan = Village::where('name', 'Majungan')->first();
        $bunder = Village::where('name', 'Bunder')->first();
        $padelegan = Village::where('name', 'Padelegan')->first();
        $pagagan = Village::where('name', 'Pagagan')->first();
        $polagan = Village::where('name', 'Polagan')->first();
        $galisDesa = Village::where('name', 'Galis')->first();
        $brantaPesisir = Village::where('name', 'Branta Pesisir')->first();
        $kramat = Village::where('name', 'Kramat')->first();

        // 8 Sample Demo UMKM across all required categories
        $umkmsData = [
            [
                'code' => 'UMK-GRM-001',
                'name' => 'Kelompok Petambak Garam Majungan Makmur',
                'owner_name' => 'H. Achmad Syafi\'i',
                'sector' => 'garam',
                'category' => 'petambak_garam',
                'address' => 'Jl. Pesisir Tambak Selatan No. 12',
                'district_id' => $pademawu->id,
                'village_id' => $majungan->id,
                'phone' => '081234567801',
                'latitude' => -7.2150000,
                'longitude' => 113.5280000,
                'established_year' => 2014,
                'production_capacity' => '350 Ton/musim kemarau',
                'employee_count' => 12,
                'status' => 'aktif',
                'is_demo' => true,
                'notes' => 'Tambak garam kristalisasi meja geomembran',
            ],
            [
                'code' => 'UMK-GRM-002',
                'name' => 'UD Pengolahan Garam Bunder Barokah',
                'owner_name' => 'Mahrus Ali',
                'sector' => 'garam',
                'category' => 'pengolahan_garam',
                'address' => 'Dusun Bunder Barat RT 02/RW 01',
                'district_id' => $pademawu->id,
                'village_id' => $bunder->id,
                'phone' => '081234567802',
                'latitude' => -7.2025000,
                'longitude' => 113.5180000,
                'established_year' => 2018,
                'production_capacity' => '15 Ton/minggu',
                'employee_count' => 8,
                'status' => 'aktif',
                'is_demo' => true,
                'notes' => 'Pencucian, pengeringan, dan iodisasi garam kasar',
            ],
            [
                'code' => 'UMK-GRM-003',
                'name' => 'Koperasi Garam Konsumsi Galis Mandiri',
                'owner_name' => 'Hj. Fatimah Zahra',
                'sector' => 'garam',
                'category' => 'garam_konsumsi',
                'address' => 'Jl. Raya Galis Sentra Garam',
                'district_id' => $galis->id,
                'village_id' => $galisDesa->id,
                'phone' => '081234567803',
                'latitude' => -7.1850000,
                'longitude' => 113.5650000,
                'established_year' => 2019,
                'production_capacity' => '8 Ton/bulan',
                'employee_count' => 6,
                'status' => 'aktif',
                'is_demo' => true,
                'notes' => 'Produksi garam konsumsi kemasan 250gr & 500gr beriodium SNI',
            ],
            [
                'code' => 'UMK-OLH-001',
                'name' => 'UMKM Rengginang Ikan & Lorjuk Bu Siti',
                'owner_name' => 'Siti Rohani',
                'sector' => 'olahan_laut',
                'category' => 'rengginang_ikan',
                'address' => 'Pesisir Dermaga Branta No. 45',
                'district_id' => $tlanakan->id,
                'village_id' => $brantaPesisir->id,
                'phone' => '081234567804',
                'latitude' => -7.2280000,
                'longitude' => 113.4580000,
                'established_year' => 2016,
                'production_capacity' => '250 Kg/hari',
                'employee_count' => 10,
                'status' => 'aktif',
                'is_demo' => true,
                'notes' => 'Rengginang ketan premium campuran kaldu ikan tongkol & lorjuk',
            ],
            [
                'code' => 'UMK-OLH-002',
                'name' => 'Sentra Kerupuk Ikan Tenggiri Padelegan',
                'owner_name' => 'Bambang Irawan',
                'sector' => 'olahan_laut',
                'category' => 'kerupuk_ikan',
                'address' => 'Dusun Pesisir Indah RT 03',
                'district_id' => $pademawu->id,
                'village_id' => $padelegan->id,
                'phone' => '081234567805',
                'latitude' => -7.2210000,
                'longitude' => 113.5420000,
                'established_year' => 2021,
                'production_capacity' => '400 Kg/minggu',
                'employee_count' => 7,
                'status' => 'aktif',
                'is_demo' => true,
                'notes' => 'Kerupuk ikan tenggiri oven higienis',
            ],
            [
                'code' => 'UMK-OLH-003',
                'name' => 'Olahan Abon Ikan Tuna Kramat',
                'owner_name' => 'Nurul Hidayah',
                'sector' => 'olahan_laut',
                'category' => 'olahan_ikan',
                'address' => 'Jl. Pelabuhan Rakyat Kramat',
                'district_id' => $tlanakan->id,
                'village_id' => $kramat->id,
                'phone' => '081234567806',
                'latitude' => -7.2150000,
                'longitude' => 113.4720000,
                'established_year' => 2022,
                'production_capacity' => '100 Kg/minggu',
                'employee_count' => 5,
                'status' => 'aktif',
                'is_demo' => true,
                'notes' => 'Abon ikan tuna dan olahan nugget ikan',
            ],
            [
                'code' => 'UMK-OLH-004',
                'name' => 'Petis & Kerupuk Udang Polagan Jaya',
                'owner_name' => 'Drs. Subhan',
                'sector' => 'olahan_laut',
                'category' => 'olahan_udang',
                'address' => 'Sentra Pesisir Polagan',
                'district_id' => $galis->id,
                'village_id' => $polagan->id,
                'phone' => '081234567807',
                'latitude' => -7.2050000,
                'longitude' => 113.5820000,
                'established_year' => 2017,
                'production_capacity' => '600 Botol Petis/minggu',
                'employee_count' => 9,
                'status' => 'aktif',
                'is_demo' => true,
                'notes' => 'Petis udang manis khas Madura dan kerupuk udang',
            ],
            [
                'code' => 'UMK-OLH-005',
                'name' => 'Terasi Udang Rebon Asli Pagagan',
                'owner_name' => 'Ibu Halimah',
                'sector' => 'olahan_laut',
                'category' => 'terasi_dan_hasil_laut',
                'address' => 'Dusun Karang Pagagan RT 01',
                'district_id' => $pademawu->id,
                'village_id' => $pagagan->id,
                'phone' => '081234567808',
                'latitude' => -7.2180000,
                'longitude' => 113.5350000,
                'established_year' => 2015,
                'production_capacity' => '1.5 Ton/bulan',
                'employee_count' => 11,
                'status' => 'aktif',
                'is_demo' => true,
                'notes' => 'Terasi fermentasi udang rebon tanpa pewarna buatan',
            ],
        ];

        $createdUmkms = [];
        foreach ($umkmsData as $item) {
            $createdUmkms[] = Umkm::firstOrCreate(['code' => $item['code']], $item);
        }

        // Salt Pond Polygons (GeoJSON Coordinates Ring [lng, lat])
        $ponds = [
            [
                'umkm_id' => $createdUmkms[0]->id, // Kelompok Petambak Majungan
                'code' => 'TBK-MJG-A1',
                'area_sqm' => 45000.00, // 4.5 Hektar
                'district_id' => $pademawu->id,
                'village_id' => $majungan->id,
                'production_season' => 'Musim Kemarau 2026',
                'center_lat' => -7.2160000,
                'center_lng' => 113.5290000,
                'is_demo' => true,
                'polygon_json' => [
                    [
                        [113.5265, -7.2145],
                        [113.5315, -7.2145],
                        [113.5315, -7.2175],
                        [113.5265, -7.2175],
                        [113.5265, -7.2145],
                    ]
                ],
            ],
            [
                'umkm_id' => $createdUmkms[0]->id,
                'code' => 'TBK-MJG-A2',
                'area_sqm' => 32000.00, // 3.2 Hektar
                'district_id' => $pademawu->id,
                'village_id' => $majungan->id,
                'production_season' => 'Musim Kemarau 2026',
                'center_lat' => -7.2190000,
                'center_lng' => 113.5300000,
                'is_demo' => true,
                'polygon_json' => [
                    [
                        [113.5270, -7.2180],
                        [113.5320, -7.2180],
                        [113.5320, -7.2210],
                        [113.5270, -7.2210],
                        [113.5270, -7.2180],
                    ]
                ],
            ],
            [
                'umkm_id' => $createdUmkms[6]->id, // Polagan
                'code' => 'TBK-PLG-01',
                'area_sqm' => 28000.00, // 2.8 Hektar
                'district_id' => $galis->id,
                'village_id' => $polagan->id,
                'production_season' => 'Musim Kemarau 2026',
                'center_lat' => -7.2060000,
                'center_lng' => 113.5830000,
                'is_demo' => true,
                'polygon_json' => [
                    [
                        [113.5800, -7.2040],
                        [113.5850, -7.2040],
                        [113.5850, -7.2070],
                        [113.5800, -7.2070],
                        [113.5800, -7.2040],
                    ]
                ],
            ],
        ];

        foreach ($ponds as $p) {
            SaltPond::firstOrCreate(['code' => $p['code']], $p);
        }
    }
}

