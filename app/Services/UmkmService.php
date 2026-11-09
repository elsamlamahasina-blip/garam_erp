<?php

namespace App\Services;

use App\Models\Umkm;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UmkmService
{
    /**
     * Get accessible UMKMs based on User role.
     * Admin & Pimpinan can see all.
     * UMKM role can only see their own company data.
     */
    public function getAccessibleUmkms(User $user, array $filters = []): Collection
    {
        $query = Umkm::with(['district', 'village']);

        if ($user->isUmkm()) {
            $query->where('id', $user->umkm_id);
        }

        if (!empty($filters['district']) && $filters['district'] !== 'all') {
            $query->whereHas('district', function ($q) use ($filters) {
                $q->where('name', $filters['district']);
            });
        }

        if (!empty($filters['sector']) && $filters['sector'] !== 'all') {
            $query->where('sector', $filters['sector']);
        }

        return $query->orderBy('name')->get();
    }
}

