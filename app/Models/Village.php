<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Village extends Model
{
    protected $fillable = ['district_id', 'name', 'code', 'is_coastal'];

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function umkms()
    {
        return $this->hasMany(Umkm::class);
    }
}

