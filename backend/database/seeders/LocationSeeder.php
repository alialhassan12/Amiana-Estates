<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                'id' => 1,
                'title' => 'LOCATION',
                'subTitle' => 'Live where everything feels within reach',
                'description' => null,
                'address' => 'Aberdeen, Siera leone',
                'latitude' => '8.494234062590738',
                'longitude' => '-13.29495438512819',
                'map_zoom' => 15,
                'created_at' => '2026-09-20 09:10:16',
                'updated_at' => '2026-09-20 10:40:15',
            ],
        ];

        foreach ($locations as $location) {
            DB::table('locations')->updateOrInsert(
                ['id' => $location['id']],
                $location
            );
        }
    }
}
