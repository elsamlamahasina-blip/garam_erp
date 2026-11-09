<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\GisService;

class GisCoordinateValidationTest extends TestCase
{
    protected GisService $gisService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->gisService = new GisService();
    }

    /**
     * Test valid coordinate within Pamekasan bounds (Pademawu/Majungan).
     * TC-GIS-001
     */
    public function test_valid_pamekasan_coordinates_are_accepted(): void
    {
        $lat = -7.2150;
        $lng = 113.5280;

        $isValid = $this->gisService->validateCoordinates($lat, $lng);

        $this->assertTrue($isValid, "Koordinat Majungan Pademawu harus berada dalam batas geografis Pamekasan.");
    }

    /**
     * Test invalid coordinate outside Pamekasan bounds (e.g. Jakarta).
     * TC-GIS-002
     */
    public function test_coordinates_outside_pamekasan_are_rejected(): void
    {
        $jakartaLat = -6.2088;
        $jakartaLng = 106.8456;

        $isValid = $this->gisService->validateCoordinates($jakartaLat, $jakartaLng);

        $this->assertFalse($isValid, "Koordinat luar Pamekasan harus ditolak oleh sistem validasi spasial.");
    }

    /**
     * Test boundary edge value (BVA) for Pamekasan bounding box.
     * TC-GIS-003
     */
    public function test_boundary_values_for_pamekasan_box(): void
    {
        // Min Lat & Min Lng (-7.35, 113.30)
        $this->assertTrue($this->gisService->validateCoordinates(-7.35, 113.30));

        // Just outside Min Lat
        $this->assertFalse($this->gisService->validateCoordinates(-7.36, 113.30));
    }
}

