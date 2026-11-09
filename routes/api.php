<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Gis\GisController;
use App\Models\Umkm;
use App\Models\District;

Route::prefix('v1')->group(function () {
    // WebGIS GeoJSON Data
    Route::get('/gis/geojson', [GisController::class, 'geojson'])->name('api.gis.geojson');

    // Master Wilayah
    Route::get('/regions/districts', function () {
        return response()->json([
            'success' => true,
            'data' => District::with('villages')->get(),
        ]);
    })->name('api.regions.districts');

    // Direktori UMKM
    Route::get('/umkm', function () {
        $umkms = Umkm::with(['district', 'village'])->get();
        return response()->json([
            'success' => true,
            'total' => $umkms->count(),
            'data' => $umkms,
        ]);
    })->name('api.umkm.list');

    Route::get('/umkm/{umkm}', function (Umkm $umkm) {
        return response()->json([
            'success' => true,
            'data' => $umkm->load(['district', 'village', 'saltPonds']),
        ]);
    })->name('api.umkm.detail');
});

