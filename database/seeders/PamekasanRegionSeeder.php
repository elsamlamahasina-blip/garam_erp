<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Regency;
use App\Models\District;
use App\Models\Village;

class PamekasanRegionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Regency
        $regency = Regency::firstOrCreate(
            ['code' => '35.28'],
            [
                'name' => 'Kabupaten Pamekasan',
                'latitude' => -7.1614000,
                'longitude' => 113.4828000,
            ]
        );

        // 2. Verified Sub-districts (Sentra Garam & Pesisir)
        $districtsData = [
            [
                'name' => 'Pademawu',
                'code' => '35.28.02',
                'latitude' => -7.1950000,
                'longitude' => 113.5250000,
                'villages' => [
                    ['name' => 'Majungan', 'code' => '35.28.02.2001', 'is_coastal' => true],
                    ['name' => 'Bunder', 'code' => '35.28.02.2002', 'is_coastal' => true],
                    ['name' => 'Padelegan', 'code' => '35.28.02.2003', 'is_coastal' => true],
                    ['name' => 'Pagagan', 'code' => '35.28.02.2004', 'is_coastal' => true],
                    ['name' => 'Durbuk', 'code' => '35.28.02.2005', 'is_coastal' => false],
                ],
            ],
            [
                'name' => 'Galis',
                'code' => '35.28.03',
                'latitude' => -7.1820000,
                'longitude' => 113.5700000,
                'villages' => [
                    ['name' => 'Galis', 'code' => '35.28.03.2001', 'is_coastal' => false],
                    ['name' => 'Konang', 'code' => '35.28.03.2002', 'is_coastal' => true],
                    ['name' => 'Polagan', 'code' => '35.28.03.2003', 'is_coastal' => true],
                    ['name' => 'Lembung', 'code' => '35.28.03.2004', 'is_coastal' => true],
                    ['name' => 'Pandan', 'code' => '35.28.03.2005', 'is_coastal' => true],
                ],
            ],
            [
                'name' => 'Tlanakan',
                'code' => '35.28.01',
                'latitude' => -7.2100000,
                'longitude' => 113.4600000,
                'villages' => [
                    ['name' => 'Branta Pesisir', 'code' => '35.28.01.2001', 'is_coastal' => true],
                    ['name' => 'Branta Tinggi', 'code' => '35.28.01.2002', 'is_coastal' => false],
                    ['name' => 'Tlanakan', 'code' => '35.28.01.2003', 'is_coastal' => false],
                    ['name' => 'Kramat', 'code' => '35.28.01.2004', 'is_coastal' => true],
                    ['name' => 'Bandaran', 'code' => '35.28.01.2005', 'is_coastal' => true],
                ],
            ],
        ];

        foreach ($districtsData as $d) {
            $district = District::firstOrCreate(
                ['code' => $d['code']],
                [
                    'regency_id' => $regency->id,
                    'name' => $d['name'],
                    'latitude' => $d['latitude'],
                    'longitude' => $d['longitude'],
                ]
            );

            foreach ($d['villages'] as $v) {
                Village::firstOrCreate(
                    ['code' => $v['code']],
                    [
                        'district_id' => $district->id,
                        'name' => $v['name'],
                        'is_coastal' => $v['is_coastal'],
                    ]
                );
            }
        }
    }
}

