<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DesignPhilosophyPrincipleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $principles = [
            [
                'id' => 1,
                'design_philosophy_id' => 1,
                'title' => 'Clean architecture',
                'description' => null,
                'created_at' => '2026-09-19 15:12:22',
                'updated_at' => '2026-09-19 15:12:22',
            ],
            [
                'id' => 2,
                'design_philosophy_id' => 1,
                'title' => 'Open spaces',
                'description' => null,
                'created_at' => '2026-09-19 15:12:32',
                'updated_at' => '2026-09-19 15:12:32',
            ],
            [
                'id' => 3,
                'design_philosophy_id' => 1,
                'title' => 'Natural light',
                'description' => null,
                'created_at' => '2026-09-19 15:12:43',
                'updated_at' => '2026-09-19 15:12:43',
            ],
            [
                'id' => 4,
                'design_philosophy_id' => 1,
                'title' => 'Modern elegance',
                'description' => null,
                'created_at' => '2026-09-19 15:12:53',
                'updated_at' => '2026-09-19 15:12:53',
            ],
            [
                'id' => 5,
                'design_philosophy_id' => 1,
                'title' => 'Comfort-driven layouts',
                'description' => null,
                'created_at' => '2026-09-19 15:13:03',
                'updated_at' => '2026-09-19 15:13:03',
            ],
            [
                'id' => 6,
                'design_philosophy_id' => 1,
                'title' => 'International luxury standards',
                'description' => null,
                'created_at' => '2026-09-19 15:13:15',
                'updated_at' => '2026-09-19 15:13:15',
            ],
        ];

        foreach ($principles as $principle) {
            DB::table('design_philosophy_principles')->updateOrInsert(
                ['id' => $principle['id']],
                $principle
            );
        }
    }
}
