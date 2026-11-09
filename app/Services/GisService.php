<?php

namespace App\Services;

use App\Models\Umkm;
use App\Models\SaltPond;

class GisService
{
    // Bounding box approximate limits for Kabupaten Pamekasan
    const PAMEKASAN_MIN_LAT = -7.35;
    const PAMEKASAN_MAX_LAT = -6.95;
    const PAMEKASAN_MIN_LNG = 113.30;
    const PAMEKASAN_MAX_LNG = 113.65;

    public function validateCoordinates(float $lat, float $lng): bool
    {
        return ($lat >= self::PAMEKASAN_MIN_LAT && $lat <= self::PAMEKASAN_MAX_LAT) &&
               ($lng >= self::PAMEKASAN_MIN_LNG && $lng <= self::PAMEKASAN_MAX_LNG);
    }

    public function getUmkmGeoJson(array $filters = []): array
    {
        $query = Umkm::with(['district', 'village']);

        if (!empty($filters['district'])) {
            $query->whereHas('district', function ($q) use ($filters) {
                $q->where('name', $filters['district']);
            });
        }

        if (!empty($filters['sector']) && $filters['sector'] !== 'all') {
            $query->where('sector', $filters['sector']);
        }

        if (!empty($filters['category']) && $filters['category'] !== 'all') {
            $query->where('category', $filters['category']);
        }

        $umkms = $query->get();

        $features = $umkms->map(function ($umkm) {
            return $umkm->toGeoJsonFeature();
        })->toArray();

        return [
            'type' => 'FeatureCollection',
            'features' => $features,
        ];
    }

    public function getSaltPondsGeoJson(array $filters = []): array
    {
        $query = SaltPond::with(['umkm', 'district', 'village']);

        if (!empty($filters['district'])) {
            $query->whereHas('district', function ($q) use ($filters) {
                $q->where('name', $filters['district']);
            });
        }

        $ponds = $query->get();

        $features = $ponds->map(function ($pond) {
            return $pond->toGeoJsonFeature();
        })->toArray();

        return [
            'type' => 'FeatureCollection',
            'features' => $features,
        ];
    }
}

