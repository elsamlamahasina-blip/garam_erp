<?php

namespace App\Http\Controllers\Umkm;

use App\Http\Controllers\Controller;
use App\Services\UmkmService;
use App\Models\District;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UmkmController extends Controller
{
    public function __construct(
        protected UmkmService $umkmService
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $filters = [
            'district' => $request->query('district'),
            'sector' => $request->query('sector'),
        ];

        $umkms = $this->umkmService->getAccessibleUmkms($user, $filters)->map(function ($u) {
            return [
                'id' => $u->id,
                'code' => $u->code,
                'name' => $u->name,
                'owner_name' => $u->owner_name,
                'sector' => $u->sector,
                'category' => $u->category,
                'category_label' => $u->category_label,
                'address' => $u->address,
                'district_name' => $u->district->name ?? '',
                'village_name' => $u->village->name ?? '',
                'phone' => $u->phone,
                'latitude' => (float)$u->latitude,
                'longitude' => (float)$u->longitude,
                'established_year' => $u->established_year,
                'production_capacity' => $u->production_capacity,
                'employee_count' => $u->employee_count,
                'status' => $u->status,
                'is_demo' => $u->is_demo,
                'notes' => $u->notes,
            ];
        });

        $districts = District::all();

        return Inertia::render('Umkm/Index', [
            'umkms' => $umkms,
            'districts' => $districts,
        ]);
    }

    public function show(Request $request, Umkm $umkm)
    {
        // Enforce Policy
        $this->authorize('view', $umkm);

        return response()->json([
            'umkm' => $umkm->load(['district', 'village', 'saltPonds']),
        ]);
    }
}

