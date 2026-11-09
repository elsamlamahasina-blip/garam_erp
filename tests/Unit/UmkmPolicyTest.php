<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Policies\UmkmPolicy;
use App\Models\User;
use App\Models\Umkm;

class UmkmPolicyTest extends TestCase
{
    protected UmkmPolicy $policy;

    protected function setUp(): void
    {
        parent::setUp();
        $this->policy = new UmkmPolicy();
    }

    /**
     * Test admin can view any UMKM.
     * TC-SEC-001
     */
    public function test_admin_can_view_any_umkm(): void
    {
        $admin = new User(['id' => 1, 'role' => 'admin']);
        $umkm = new Umkm(['id' => 10, 'name' => 'UMKM Garam Majungan']);

        $this->assertTrue($this->policy->view($admin, $umkm));
    }

    /**
     * Test UMKM user CANNOT view other UMKM's private data.
     * TC-SEC-002 (Enforces Section F Modul 1 requirement)
     */
    public function test_umkm_cannot_view_other_umkm_data(): void
    {
        $userUmkmA = new User(['id' => 2, 'role' => 'umkm', 'umkm_id' => 10]);
        $umkmB = new Umkm(['id' => 20, 'name' => 'UMKM Rengginang Branta']);

        $this->assertFalse(
            $this->policy->view($userUmkmA, $umkmB),
            "Pelaku UMKM A tidak boleh memiliki akses melihat data privat UMKM B."
        );
    }

    /**
     * Test UMKM user CAN view their own UMKM data.
     * TC-SEC-003
     */
    public function test_umkm_can_view_own_umkm_data(): void
    {
        $userUmkmA = new User(['id' => 2, 'role' => 'umkm', 'umkm_id' => 10]);
        $umkmA = new Umkm(['id' => 10, 'name' => 'UMKM Garam Majungan']);

        $this->assertTrue($this->policy->view($userUmkmA, $umkmA));
    }
}

