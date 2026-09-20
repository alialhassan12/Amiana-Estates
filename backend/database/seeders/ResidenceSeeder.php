<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResidenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $residences = [
            [
                'id' => 1,
                'title' => 'Curated Living',
                'subTitle' => 'NINE RESIDENCES. ONE EXCEPTIONAL STANDARD.',
                'description' => null,
                'created_at' => '2026-09-11 09:36:16',
                'updated_at' => '2026-09-18 10:54:53',
            ],
        ];

        foreach ($residences as $residence) {
            DB::table('residences')->updateOrInsert(
                ['id' => $residence['id']],
                $residence
            );
        }
    }
}
