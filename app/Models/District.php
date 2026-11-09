<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $fillable = ['regency_id', 'name', 'code', 'latitude', 'longitude'];

    public function regency()
    {
        return $this->belongsTo(Regency::class);
    }

    public function villages()
    {
        return $this->hasMany(Village::class);
    }

    public function umkms()
    {
        return $this->hasMany(Umkm::class);
    }

    public function saltPonds()
    {
        return $this->hasMany(SaltPond::class);
    }
}

