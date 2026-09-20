<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenthouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $penthouses = [
            [
                'id' => 1,
                'title' => 'The Crown Jewel',
                'subTitle' => 'The Amiana Penthouse',
                'description' => 'Approximately 900m² across two levels, the penthouse offers an unmatched residential experience featuring massive glass views, oversized living spaces, and exceptional entertainment areas.',
                'created_at' => '2026-09-14 10:22:13',
                'updated_at' => '2026-09-14 10:22:13',
            ],
        ];

        foreach ($penthouses as $penthouse) {
            DB::table('penthouses')->updateOrInsert(
                ['id' => $penthouse['id']],
                $penthouse
            );
        }
    }
}
