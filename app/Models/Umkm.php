<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Umkm extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'owner_name',
        'sector',
        'category',
        'address',
        'district_id',
        'village_id',
        'phone',
        'latitude',
        'longitude',
        'established_year',
        'production_capacity',
        'employee_count',
        'status',
        'is_demo',
        'notes',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'established_year' => 'integer',
        'employee_count' => 'integer',
        'is_demo' => 'boolean',
    ];

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function village()
    {
        return $this->belongsTo(Village::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function saltPonds()
    {
        return $this->hasMany(SaltPond::class);
    }

    public function getCategoryLabelAttribute(): string
    {
        return match ($this->category) {
            'petambak_garam' => 'Petambak Garam Rakyat',
            'pengolahan_garam' => 'Pengolahan Garam',
            'garam_konsumsi' => 'Garam Konsumsi Beriodium',
            'rengginang_ikan' => 'Rengginang Ikan Madura',
            'kerupuk_ikan' => 'Kerupuk Ikan Pesisir',
            'olahan_ikan' => 'Olahan Ikan & Hasil Laut',
            'olahan_udang' => 'Olahan Udang',
            'terasi_dan_hasil_laut' => 'Terasi & Hasil Laut Lainnya',
            default => 'UMKM Potensi',
        };
    }

    public function toGeoJsonFeature(): array
    {
        return [
            'type' => 'Feature',
            'geometry' => [
                'type' => 'Point',
                'coordinates' => [$this->longitude, $this->latitude],
            ],
            'properties' => [
                'id' => $this->id,
                'code' => $this->code,
                'name' => $this->name,
                'owner_name' => $this->owner_name,
                'sector' => $this->sector,
                'category' => $this->category,
                'category_label' => $this->category_label,
                'address' => $this->address,
                'district_name' => $this->district->name ?? '',
                'village_name' => $this->village->name ?? '',
                'phone' => $this->phone,
                'production_capacity' => $this->production_capacity,
                'employee_count' => $this->employee_count,
                'status' => $this->status,
                'is_demo' => $this->is_demo,
            ],
        ];
    }
}

