<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $properties = [
            [
                'id' => 1,
                'property_type_id' => 1,
                'title' => 'Residence 1',
                'floor' => 'level 1 & 2',
                'created_at' => '2026-09-11 09:05:50',
                'updated_at' => '2026-09-11 09:05:50',
            ],
            [
                'id' => 2,
                'property_type_id' => 2,
                'title' => 'Residence 2',
                'floor' => 'middle tiers',
                'created_at' => '2026-09-11 09:06:35',
                'updated_at' => '2026-09-11 09:06:35',
            ],
            [
                'id' => 3,
                'property_type_id' => 2,
                'title' => 'Residence 3',
                'floor' => 'middle tiers',
                'created_at' => '2026-09-11 09:06:40',
                'updated_at' => '2026-09-11 09:06:40',
            ],
            [
                'id' => 4,
                'property_type_id' => 2,
                'title' => 'Residence 4',
                'floor' => 'middle tiers',
                'created_at' => '2026-09-11 09:06:43',
                'updated_at' => '2026-09-11 09:06:43',
            ],
            [
                'id' => 5,
                'property_type_id' => 2,
                'title' => 'Residence 5',
                'floor' => 'middle tiers',
                'created_at' => '2026-09-11 09:06:47',
                'updated_at' => '2026-09-11 09:06:47',
            ],
            [
                'id' => 10,
                'property_type_id' => 3,
                'title' => 'Residence 9',
                'floor' => 'top two levels',
                'created_at' => '2026-09-17 11:07:18',
                'updated_at' => '2026-09-17 11:07:18',
            ],
            [
                'id' => 11,
                'property_type_id' => 1,
                'title' => 'Residence 6',
                'floor' => 'level 1 & 2',
                'created_at' => '2026-09-17 11:09:33',
                'updated_at' => '2026-09-17 11:09:33',
            ],
            [
                'id' => 12,
                'property_type_id' => 1,
                'title' => 'Residence 7',
                'floor' => 'level 1 & 2',
                'created_at' => '2026-09-17 11:09:35',
                'updated_at' => '2026-09-17 11:09:35',
            ],
            [
                'id' => 13,
                'property_type_id' => 1,
                'title' => 'Residence 8',
                'floor' => 'level 1 & 2',
                'created_at' => '2026-09-17 11:09:39',
                'updated_at' => '2026-09-17 11:09:39',
            ],
        ];

        foreach ($properties as $property) {
            DB::table('properties')->updateOrInsert(
                ['id' => $property['id']],
                $property
            );
        }
    }
}
