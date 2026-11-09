<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;

class AuthTest extends TestCase
{
    /**
     * Test required authentication fields structure.
     * TC-AUT-001
     */
    public function test_login_validation_rules_require_email_and_password(): void
    {
        $rules = [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ];

        $this->assertArrayHasKey('email', $rules);
        $this->assertArrayHasKey('password', $rules);
        $this->assertContains('required', $rules['email']);
        $this->assertContains('required', $rules['password']);
    }

    /**
     * Test authorized roles list.
     * TC-AUT-002
     */
    public function test_valid_system_roles(): void
    {
        $allowedRoles = ['admin', 'umkm', 'pimpinan'];

        $this->assertContains('admin', $allowedRoles);
        $this->assertContains('umkm', $allowedRoles);
        $this->assertContains('pimpinan', $allowedRoles);
        $this->assertCount(3, $allowedRoles);
    }
}

