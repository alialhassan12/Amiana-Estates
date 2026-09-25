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
        Schema::table('estate_experiences', function (Blueprint $table) {
            $table->string('specifications_title');
            $table->string('specifications_subTitle');
            $table->text('specifications_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('estate_experiences', function (Blueprint $table) {
            $table->dropColumn('specifications_title');
            $table->dropColumn('specifications_subTitle');
            $table->dropColumn('specifications_description');
        });
    }
};
