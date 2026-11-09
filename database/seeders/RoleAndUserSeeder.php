<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Umkm;

class RoleAndUserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('Password123!');

        $garamUmkm = Umkm::where('code', 'UMK-GRM-001')->first();
        $rengginangUmkm = Umkm::where('code', 'UMK-OLH-001')->first();

        // 1. Administrator
        User::firstOrCreate(
            ['email' => 'admin@madura-erp.id'],
            [
                'name' => 'Administrator MADURA ERP',
                'password' => $password,
                'role' => 'admin',
                'phone' => '081200000001',
            ]
        );

        // 2. Pelaku UMKM Garam Majungan
        User::firstOrCreate(
            ['email' => 'garam@majungan.id'],
            [
                'name' => 'H. Achmad Syafi\'i (Petambak Garam)',
                'password' => $password,
                'role' => 'umkm',
                'umkm_id' => $garamUmkm?->id,
                'phone' => '081200000002',
            ]
        );

        // 3. Pelaku UMKM Rengginang Ikan Branta
        User::firstOrCreate(
            ['email' => 'rengginang@branta.id'],
            [
                'name' => 'Siti Rohani (UMKM Rengginang Ikan)',
                'password' => $password,
                'role' => 'umkm',
                'umkm_id' => $rengginangUmkm?->id,
                'phone' => '081200000003',
            ]
        );

        // 4. Pimpinan / Bappeda / Dinas Perikanan Pamekasan
        User::firstOrCreate(
            ['email' => 'pimpinan@pamekasan.go.id'],
            [
                'name' => 'Drs. Pimpinan Eksekutif Kab. Pamekasan',
                'password' => $password,
                'role' => 'pimpinan',
                'phone' => '081200000004',
            ]
        );
    }
}

