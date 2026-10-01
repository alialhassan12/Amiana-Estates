<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DifferenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $difference=[
            [
                'id'=>1,
                'title'=>'The Amiana Difference',
                'subTitle'=>'Luxury, thoughtfully redefined.',
                'description'=>'Amiana Estates brings together refined architecture, spacious living, premium amenities, security, panoramic views, and a carefully considered atmosphere to create a modern residential experience inspired by international luxury standards.',
                'image'=>'differences/dGQpPrqZoSzES7415oEa545AFdJJqNDcdSWFIkBl.jpg',
                'created_at' => '2026-09-19 15:05:46',
                'updated_at' => '2026-09-19 15:05:46',
            ]
        ];
        foreach ($difference as $difference) {
            DB::table('differences')->updateOrInsert(
                ['id' => $difference['id']],
                $difference
            );
        }
    }
}
