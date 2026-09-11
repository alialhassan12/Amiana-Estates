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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo_path')->nullable();
            $table->string('hero_title');
            $table->text('hero_description');
            $table->string('hero_cta1_text');
            $table->string('hero_cta1_url');
            $table->string('hero_cta2_text');
            $table->string('hero_cta2_url');
            $table->string('hero_media');
            $table->string('hero_media_type'); 
            $table->integer('number_of_floors')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
