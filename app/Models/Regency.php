<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Regency extends Model
{
    protected $fillable = ['name', 'code', 'latitude', 'longitude'];

    public function districts()
    {
        return $this->hasMany(District::class);
    }
}

