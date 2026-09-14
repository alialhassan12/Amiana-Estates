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
        Schema::create('estate_experiences', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subTitle');
            $table->string("card_1_image");
            $table->string("card_1_image_heading");
            $table->string("card_1_title");
            $table->string("card_1_quote");
            $table->text("card_1_description");
            $table->string("card_2_title");
            $table->string("card_2_image");
            $table->text("card_2_description");
            $table->string("closing_title");
            $table->string("closing_statement");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estate_experiences');
    }
};
