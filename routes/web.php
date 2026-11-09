<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Gis\GisController;
use App\Http\Controllers\Umkm\UmkmController;

// Authentication Routes
Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Protected Routes (Session & Role Protected)
Route::middleware(['web'])->group(function () {
    // Dashboard EIS & Operasional
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // WebGIS Pamekasan
    Route::get('/gis', [GisController::class, 'index'])->name('gis.index');

    // Manajemen UMKM
    Route::get('/umkm', [UmkmController::class, 'index'])->name('umkm.index');
    Route::get('/umkm/{umkm}', [UmkmController::class, 'show'])->name('umkm.show');

    // Placeholder ERP Modules for 16-Week Roadmap (Active Navigation Links)
    Route::get('/salt-ponds', [GisController::class, 'index'])->name('salt-ponds.index');
    Route::get('/materials', [DashboardController::class, 'index'])->name('materials.index');
    Route::get('/recipes', [DashboardController::class, 'index'])->name('recipes.index');
    Route::get('/production', [DashboardController::class, 'index'])->name('production.index');
    Route::get('/inventory', [DashboardController::class, 'index'])->name('inventory.index');
    Route::get('/purchasing', [DashboardController::class, 'index'])->name('purchasing.index');
    Route::get('/sales', [DashboardController::class, 'index'])->name('sales.index');
    Route::get('/costing', [DashboardController::class, 'index'])->name('costing.index');
    Route::get('/distribution', [DashboardController::class, 'index'])->name('distribution.index');
    Route::get('/reports', [DashboardController::class, 'index'])->name('reports.index');
    Route::get('/sqa', [DashboardController::class, 'index'])->name('sqa.index');
    Route::get('/implementation', [DashboardController::class, 'index'])->name('implementation.index');
    Route::get('/settings', [DashboardController::class, 'index'])->name('settings.index');
});

