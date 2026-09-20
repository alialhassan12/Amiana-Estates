<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DesignPhilosophySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $philosophies = [
            [
                'id' => 1,
                'title' => 'The Amiana Philosophy',
                'subTitle' => 'Designed Around the Way You Live',
                'description' => 'Amiana Estates follows a minimalist luxury philosophy focused on clean architecture, open spaces, natural light, modern elegance, and comfort-driven layouts.',
                'image' => 'design_philosophy/h5Z4KvIuFCQQW0azSdUaLyKIZaBfBJXAlkh45wu3.jpg',
                'created_at' => '2026-09-19 15:05:46',
                'updated_at' => '2026-09-19 15:05:46',
            ],
        ];

        foreach ($philosophies as $philosophy) {
            DB::table('design_philosophies')->updateOrInsert(
                ['id' => $philosophy['id']],
                $philosophy
            );
        }
    }
}
