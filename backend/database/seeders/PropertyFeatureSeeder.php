<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertyFeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            [
                'id' => 4,
                'property_type_id' => 2,
                'title' => 'Views',
                'value' => 'Sea view and street view options',
                'display_order' => 1,
                'created_at' => '2026-09-11 10:19:55',
                'updated_at' => '2026-09-11 10:19:55',
            ],
            [
                'id' => 5,
                'property_type_id' => 2,
                'title' => 'Terrace',
                'value' => 'Large glass-railing balconies',
                'display_order' => 2,
                'created_at' => '2026-09-11 10:21:43',
                'updated_at' => '2026-09-11 10:21:43',
            ],
            [
                'id' => 6,
                'property_type_id' => 2,
                'title' => 'Kitchen',
                'value' => 'Modern open kitchen',
                'display_order' => 3,
                'created_at' => '2026-09-11 10:23:04',
                'updated_at' => '2026-09-11 10:23:04',
            ],
            [
                'id' => 7,
                'property_type_id' => 1,
                'title' => 'Views',
                'value' => 'Sea view options',
                'display_order' => 1,
                'created_at' => '2026-09-11 10:23:54',
                'updated_at' => '2026-09-11 10:23:54',
            ],
            [
                'id' => 8,
                'property_type_id' => 1,
                'title' => 'Kitchen',
                'value' => 'Open kitchen design',
                'display_order' => 2,
                'created_at' => '2026-09-11 10:24:09',
                'updated_at' => '2026-09-11 10:24:09',
            ],
            [
                'id' => 9,
                'property_type_id' => 1,
                'title' => 'Terrace',
                'value' => 'Private balcony',
                'display_order' => 3,
                'created_at' => '2026-09-11 10:24:32',
                'updated_at' => '2026-09-11 10:24:32',
            ],
            [
                'id' => 13,
                'property_type_id' => 3,
                'title' => 'Bedrooms',
                'value' => '3 State-of-the-art bedrooms',
                'display_order' => 1,
                'created_at' => '2026-09-18 10:11:51',
                'updated_at' => '2026-09-18 10:11:51',
            ],
            [
                'id' => 14,
                'property_type_id' => 3,
                'title' => 'Outdoor Area',
                'value' => 'Private rooftop jacuzzi for up to 10 people',
                'display_order' => 2,
                'created_at' => '2026-09-18 10:14:46',
                'updated_at' => '2026-09-18 10:14:46',
            ],
            [
                'id' => 15,
                'property_type_id' => 3,
                'title' => 'Ceiling Height',
                'value' => 'Double-height luxury ceilings',
                'display_order' => 3,
                'created_at' => '2026-09-18 10:15:20',
                'updated_at' => '2026-09-18 10:15:20',
            ],
            [
                'id' => 16,
                'property_type_id' => 3,
                'title' => 'Views',
                'value' => 'Full city and beach views',
                'display_order' => 4,
                'created_at' => '2026-09-18 10:16:09',
                'updated_at' => '2026-09-18 10:16:09',
            ],
            [
                'id' => 17,
                'property_type_id' => 3,
                'title' => 'Kitchen',
                'value' => 'Massive open-concept kitchen',
                'display_order' => 5,
                'created_at' => '2026-09-18 10:16:53',
                'updated_at' => '2026-09-18 10:16:53',
            ],
            [
                'id' => 18,
                'property_type_id' => 3,
                'title' => 'Living Rooms',
                'value' => 'Two luxury living rooms',
                'display_order' => 6,
                'created_at' => '2026-09-18 10:18:15',
                'updated_at' => '2026-09-18 10:18:15',
            ],
        ];

        foreach ($features as $feature) {
            DB::table('property_features')->updateOrInsert(
                ['id' => $feature['id']],
                $feature
            );
        }
    }
}
