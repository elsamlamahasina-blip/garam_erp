<?php

namespace App\Services;

use App\Models\Umkm;
use App\Models\SaltPond;
use App\Models\District;

class EisDashboardService
{
    public function getExecutiveStats(): array
    {
        $totalUmkm = Umkm::count();
        $totalUmkmGaram = Umkm::where('sector', 'garam')->count();
        $totalUmkmOlahan = Umkm::where('sector', 'olahan_laut')->count();

        $districtsSummary = District::withCount('umkms')
            ->with(['saltPonds'])
            ->get()
            ->map(function ($d) {
                $totalAreaM2 = $d->saltPonds->sum('area_sqm');
                return [
                    'district_name' => $d->name,
                    'umkm_count' => $d->umkms_count,
                    'salt_ponds_area_ha' => round($totalAreaM2 / 10000, 2),
                ];
            })
            ->toArray();

        return [
            'total_umkm' => $totalUmkm,
            'total_umkm_garam' => $totalUmkmGaram,
            'total_umkm_olahan_laut' => $totalUmkmOlahan,
            'total_salt_harvest_ton' => 1420, // Agregat demo Pekan 1
            'total_seafood_output_ton' => 380, // Agregat demo Pekan 1
            'total_revenue_idr' => 2850000000, // Rp 2.85 Miliar demo ERP
            'districts_summary' => $districtsSummary,
        ];
    }
}

