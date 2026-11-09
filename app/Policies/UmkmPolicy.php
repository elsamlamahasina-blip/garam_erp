<?php

namespace App\Policies;

use App\Models\Umkm;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UmkmPolicy
{
    use HandlesAuthorization;

    /**
     * Admin can view all UMKM details.
     * Pimpinan can view all UMKM details for EIS reporting.
     * UMKM role can only view their own UMKM details.
     */
    public function view(User $user, Umkm $umkm): bool
    {
        if ($user->isAdmin() || $user->isPimpinan()) {
            return true;
        }

        return $user->isUmkm() && $user->umkm_id === $umkm->id;
    }

    /**
     * Only Admin or the owner UMKM can update the profile.
     */
    public function update(User $user, Umkm $umkm): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->isUmkm() && $user->umkm_id === $umkm->id;
    }

    /**
     * Only Admin can delete UMKM records.
     */
    public function delete(User $user, Umkm $umkm): bool
    {
        return $user->isAdmin();
    }
}

