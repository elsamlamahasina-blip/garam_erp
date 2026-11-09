<?php

namespace App\Http\Controllers\Gis;

use App\Http\Controllers\Controller;
use App\Services\GisService;
use App\Models\District;
use App\Models\Umkm;
use App\Models\SaltPond;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class GisController extends Controller
{
    public function __construct(
        protected GisService $gisService
    ) {}

    public function index(): Response
    {
        $districts = District::with('villages')->get();
        $umkms = Umkm::with(['district', 'village'])->get()->map(function ($u) {
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
            ];
        });

        $saltPonds = SaltPond::with(['umkm', 'district', 'village'])->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'umkm_id' => $p->umkm_id,
                'umkm_name' => $p->umkm->name ?? 'Tambak Garam',
                'code' => $p->code,
                'area_sqm' => (float)$p->area_sqm,
                'district_name' => $p->district->name ?? '',
                'village_name' => $p->village->name ?? '',
                'production_season' => $p->production_season,
                'coordinates' => $p->polygon_json,
                'is_demo' => $p->is_demo,
            ];
        });

        return Inertia::render('Gis/Index', [
            'districts' => $districts,
            'umkms' => $umkms,
            'saltPonds' => $saltPonds,
        ]);
    }

    /**
     * REST API endpoint delivering GeoJSON FeatureCollection
     */
    public function geojson(Request $request): JsonResponse
    {
        $type = $request->query('type', 'umkm'); // umkm or salt_pond
        $filters = [
            'district' => $request->query('district'),
            'sector' => $request->query('sector'),
            'category' => $request->query('category'),
        ];

        if ($type === 'salt_pond') {
            $data = $this->gisService->getSaltPondsGeoJson($filters);
        } else {
            $data = $this->gisService->getUmkmGeoJson($filters);
        }

        return response()->json($data);
    }
}

