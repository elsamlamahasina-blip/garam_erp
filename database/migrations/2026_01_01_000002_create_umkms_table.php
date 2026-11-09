<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Try enabling PostGIS extension if PostgreSQL is active
        try {
            DB::statement('CREATE EXTENSION IF NOT EXISTS postgis');
        } catch (\Throwable $e) {
            // PostGIS not supported or driver is SQLite during lightweight unit testing
        }

        Schema::create('umkms', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique(); // E.g. UMK-GRM-001
            $table->string('name');
            $table->string('owner_name');
            $table->enum('sector', ['garam', 'olahan_laut']);
            $table->enum('category', [
                'petambak_garam',
                'pengolahan_garam',
                'garam_konsumsi',
                'rengginang_ikan',
                'kerupuk_ikan',
                'olahan_ikan',
                'olahan_udang',
                'terasi_dan_hasil_laut',
            ]);
            $table->text('address');
            $table->foreignId('district_id')->constrained('districts');
            $table->foreignId('village_id')->constrained('villages');
            $table->string('phone', 20);
            
            // Decimal Lat/Lng coordinates for standard querying and PostGIS point mapping
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);

            $table->year('established_year')->default(2020);
            $table->string('production_capacity')->nullable(); // e.g. "50 Ton/musim" atau "500 Kg/hari"
            $table->integer('employee_count')->default(2);
            $table->enum('status', ['aktif', 'musiman', 'nonaktif'])->default('aktif');
            $table->boolean('is_demo')->default(true); // Explicit DEMO marker
            $table->text('notes')->nullable();
            $table->timestamps();

            // Indexing for high-performance WebGIS spatial and district filtering
            $table->index(['district_id', 'sector']);
            $table->index(['latitude', 'longitude']);
        });

        // Add PostGIS Point geometry column if PostGIS extension exists
        try {
            DB::statement('ALTER TABLE umkms ADD COLUMN IF NOT EXISTS geom geometry(Point, 4326)');
            DB::statement('CREATE INDEX IF NOT EXISTS umkms_geom_idx ON umkms USING GIST (geom)');
        } catch (\Throwable $e) {
            // Ignored if PostGIS is not available or during SQLite tests
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umkms');
    }
};

