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
        Schema::create('houses', function (Blueprint $table) {
            $table->ulid('idHouse')->primary();
            $table->string('title');
            $table->string('description');
            $table->string('rooms');
            $table->string('value');
            $table->string('address');
            $table->index('user_id');
            $table->foreignUlid('user_id')->constrained("users", 'idUser')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('houses');
    }
};
