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
        Schema::create('salt_ponds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('umkm_id')->constrained('umkms')->cascadeOnDelete();
            $table->string('code', 30)->unique(); // E.g. TBK-PAD-001
            $table->decimal('area_sqm', 12, 2); // Luas tambak dalam m2
            $table->foreignId('district_id')->constrained('districts');
            $table->foreignId('village_id')->constrained('villages');
            $table->string('production_season')->default('Musim Kemarau 2026');
            $table->json('polygon_json'); // Coordinates array for GeoJSON Polygon
            $table->decimal('center_lat', 10, 7)->nullable();
            $table->decimal('center_lng', 10, 7)->nullable();
            $table->boolean('is_demo')->default(true); // Explicit DEMO marker
            $table->timestamps();

            $table->index('district_id');
        });

        // Add PostGIS Polygon geometry column if PostGIS extension exists
        try {
            DB::statement('ALTER TABLE salt_ponds ADD COLUMN IF NOT EXISTS geom geometry(Polygon, 4326)');
            DB::statement('CREATE INDEX IF NOT EXISTS salt_ponds_geom_idx ON salt_ponds USING GIST (geom)');
        } catch (\Throwable $e) {
            // Ignored if PostGIS is not available or during SQLite tests
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salt_ponds');
    }
};

