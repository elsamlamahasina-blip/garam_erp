<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\EisDashboardService;
use App\Models\Umkm;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected EisDashboardService $eisService
    ) {}

    public function index(): Response
    {
        $stats = $this->eisService->getExecutiveStats();
        
        $recentUmkms = Umkm::with(['district', 'village'])
            ->latest()
            ->take(6)
            ->get()
            ->map(fn($u) => [
                'id' => $u->id,
                'code' => $u->code,
                'name' => $u->name,
                'owner_name' => $u->owner_name,
                'sector' => $u->sector,
                'category' => $u->category,
                'category_label' => $u->category_label,
                'district_name' => $u->district->name ?? '',
                'village_name' => $u->village->name ?? '',
                'production_capacity' => $u->production_capacity,
                'status' => $u->status,
                'is_demo' => $u->is_demo,
            ]);

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recentUmkms' => $recentUmkms,
        ]);
    }
}

