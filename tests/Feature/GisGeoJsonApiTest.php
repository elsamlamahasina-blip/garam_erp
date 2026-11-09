<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;
use App\Models\Umkm;
use App\Models\SaltPond;

class GisGeoJsonApiTest extends TestCase
{
    /**
     * Test GeoJSON Feature structure conformance for UMKM Point.
     * TC-API-001
     */
    public function test_umkm_point_feature_structure(): void
    {
        $umkm = new Umkm([
            'id' => 1,
            'code' => 'UMK-TEST-001',
            'name' => 'Demo Test Garam',
            'owner_name' => 'Test Owner',
            'sector' => 'garam',
            'category' => 'petambak_garam',
            'address' => 'Pademawu',
            'phone' => '08123456789',
            'latitude' => -7.2150,
            'longitude' => 113.5280,
            'established_year' => 2020,
            'production_capacity' => '100 Ton',
            'employee_count' => 5,
            'status' => 'aktif',
            'is_demo' => true,
        ]);

        $feature = $umkm->toGeoJsonFeature();

        $this->assertEquals('Feature', $feature['type']);
        $this->assertEquals('Point', $feature['geometry']['type']);
        $this->assertEquals([113.5280, -7.2150], $feature['geometry']['coordinates']); // [lng, lat]
        $this->assertTrue($feature['properties']['is_demo']);
    }

    /**
     * Test GeoJSON Polygon structure conformance for Salt Pond.
     * TC-API-002
     */
    public function test_salt_pond_polygon_feature_structure(): void
    {
        $ring = [
            [
                [113.5265, -7.2145],
                [113.5315, -7.2145],
                [113.5315, -7.2175],
                [113.5265, -7.2175],
                [113.5265, -7.2145],
            ]
        ];

        $pond = new SaltPond([
            'id' => 1,
            'umkm_id' => 1,
            'code' => 'TBK-001',
            'area_sqm' => 45000,
            'production_season' => '2026',
            'polygon_json' => $ring,
            'is_demo' => true,
        ]);

        $feature = $pond->toGeoJsonFeature();

        $this->assertEquals('Feature', $feature['type']);
        $this->assertEquals('Polygon', $feature['geometry']['type']);
        $this->assertEquals($ring, $feature['geometry']['coordinates']);
        $this->assertEquals(4.5, $feature['properties']['area_ha']); // 45,000 / 10,000
    }
}

