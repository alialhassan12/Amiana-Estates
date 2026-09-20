<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyTypes = [
            [
                'id' => 1,
                'title' => '2-Bedroom residences',
                'subTitle' => null,
                'description' => 'Artfully proportioned modern sanctuaries. Designed for discerning executives, diplomats, or couples prioritizing spatial fluidity, privacy, and architectural purity.',
                'image' => 'property_types/1aae5c61-6d1b-416a-b8fc-0e584aaf7cdc.jpeg',
                'area' => 180,
                'area_unit' => 'm²',
                'display_order' => 3,
                'is_penthouse' => 0,
                'created_at' => '2026-09-11 08:47:53',
                'updated_at' => '2026-09-11 08:47:53',
            ],
            [
                'id' => 2,
                'title' => '3-Bedroom residences',
                'subTitle' => null,
                'description' => 'Expansive family floor plans engineered for effortless entertaining. Open culinary kitchen, master suite sanctuary, and dual orientation capturing sea and city lights.',
                'image' => 'property_types/487d75a3-129b-494c-a977-2ccd254c1d1a.jpeg',
                'area' => 200,
                'area_unit' => 'm²',
                'display_order' => 2,
                'is_penthouse' => 0,
                'created_at' => '2026-09-11 08:48:29',
                'updated_at' => '2026-09-11 08:48:29',
            ],
            [
                'id' => 3,
                'title' => 'THE PENTHOUSE',
                'subTitle' => null,
                'description' => 'Occupying the pinnacle two levels, featuring a 360° wraparound terrace, private rooftop jacuzzi, double-height great room, and uninterrupted oceanic horizons.',
                'image' => 'property_types/7ce2db19-0bb1-497c-b727-6d9700f23d98.jpeg',
                'area' => 900,
                'area_unit' => 'm²',
                'display_order' => 1,
                'is_penthouse' => 1,
                'created_at' => '2026-09-17 11:03:16',
                'updated_at' => '2026-09-17 11:03:16',
            ],
        ];

        foreach ($propertyTypes as $type) {
            DB::table('property_types')->updateOrInsert(
                ['id' => $type['id']],
                $type
            );
        }
    }
}
