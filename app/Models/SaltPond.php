<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaltPond extends Model
{
    use HasFactory;

    protected $fillable = [
        'umkm_id',
        'code',
        'area_sqm',
        'district_id',
        'village_id',
        'production_season',
        'polygon_json',
        'center_lat',
        'center_lng',
        'is_demo',
    ];

    protected $casts = [
        'area_sqm' => 'float',
        'polygon_json' => 'array',
        'center_lat' => 'float',
        'center_lng' => 'float',
        'is_demo' => 'boolean',
    ];

    public function umkm()
    {
        return $this->belongsTo(Umkm::class);
    }

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function village()
    {
        return $this->belongsTo(Village::class);
    }

    public function toGeoJsonFeature(): array
    {
        return [
            'type' => 'Feature',
            'geometry' => [
                'type' => 'Polygon',
                'coordinates' => $this->polygon_json,
            ],
            'properties' => [
                'id' => $this->id,
                'umkm_id' => $this->umkm_id,
                'umkm_name' => $this->umkm->name ?? 'Tambak Garam',
                'code' => $this->code,
                'area_sqm' => $this->area_sqm,
                'area_ha' => round($this->area_sqm / 10000, 2),
                'district_name' => $this->district->name ?? '',
                'village_name' => $this->village->name ?? '',
                'production_season' => $this->production_season,
                'is_demo' => $this->is_demo,
            ],
        ];
    }
}

