<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Regencies / Kabupaten
        Schema::create('regencies', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Kabupaten Pamekasan
            $table->string('code', 10)->unique(); // 35.28
            $table->decimal('latitude', 10, 7)->default(-7.1614000);
            $table->decimal('longitude', 10, 7)->default(113.4828000);
            $table->timestamps();
        });

        // Districts / Kecamatan
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('regency_id')->constrained('regencies')->cascadeOnDelete();
            $table->string('name'); // Galis, Pademawu, Tlanakan
            $table->string('code', 15)->unique(); // 35.28.01, etc.
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->timestamps();
        });

        // Villages / Desa / Kelurahan
        Schema::create('villages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('district_id')->constrained('districts')->cascadeOnDelete();
            $table->string('name');
            $table->string('code', 20)->unique();
            $table->boolean('is_coastal')->default(false); // Sentra pesisir tambak/ikan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('villages');
        Schema::dropIfExists('districts');
        Schema::dropIfExists('regencies');
    }
};

