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
        Schema::create('experience_specifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estate_experience_id')->constrained('estate_experiences')->cascadeOnDelete();
            $table->string('title');
            $table->text('short_description');
            $table->string('icon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experience_specifications');
    }
};
