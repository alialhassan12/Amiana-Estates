<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExperienceSpecificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $specifications = [
            [
                'id' => 1,
                'estate_experience_id' => 1,
                'title' => 'Secure Private Parking',
                'short_description' => 'Allocated access-controlled subterranean & grade bays',
                'icon' => 'CircleParking',
                'created_at' => '2026-09-14 10:29:37',
                'updated_at' => '2026-09-14 10:29:37',
            ],
            [
                'id' => 2,
                'estate_experience_id' => 1,
                'title' => '24/7 Security with G4S Personnel',
                'short_description' => 'Trained security operative guard post & perimeter patrols',
                'icon' => 'Shield',
                'created_at' => '2026-09-14 10:30:28',
                'updated_at' => '2026-09-14 10:30:28',
            ],
            [
                'id' => 3,
                'estate_experience_id' => 1,
                'title' => 'CCTV Surveillance Systems',
                'short_description' => 'Continuous multi-angle high-resolution biometric telemetry',
                'icon' => 'Video',
                'created_at' => '2026-09-14 10:31:09',
                'updated_at' => '2026-09-14 10:31:09',
            ],
            [
                'id' => 4,
                'estate_experience_id' => 1,
                'title' => 'Elevator Access',
                'short_description' => 'Whisper-quiet high-capacity lifts servicing all five levels',
                'icon' => 'ArrowUpDown',
                'created_at' => '2026-09-14 10:32:27',
                'updated_at' => '2026-09-14 10:32:27',
            ],
            [
                'id' => 5,
                'estate_experience_id' => 1,
                'title' => 'Intercom Systems',
                'short_description' => 'Direct resident-to-concierge video authentication',
                'icon' => 'PhoneCall',
                'created_at' => '2026-09-14 10:36:03',
                'updated_at' => '2026-09-14 10:36:03',
            ],
            [
                'id' => 6,
                'estate_experience_id' => 1,
                'title' => 'Backup Generator Service',
                'short_description' => 'Uninterrupted redundant synchronous diesel generators',
                'icon' => 'Zap',
                'created_at' => '2026-09-14 10:36:33',
                'updated_at' => '2026-09-14 10:36:33',
            ],
            [
                'id' => 7,
                'estate_experience_id' => 1,
                'title' => 'Reliable Water Supply',
                'short_description' => 'Integrated multi-stage filtration reservoirs & pressure mains',
                'icon' => 'Droplet',
                'created_at' => '2026-09-14 10:37:23',
                'updated_at' => '2026-09-14 10:37:23',
            ],
            [
                'id' => 8,
                'estate_experience_id' => 1,
                'title' => 'High-Speed Fiber Internet',
                'short_description' => 'Gigabit subterranean optical cabling throughout all apartments',
                'icon' => 'Wifi',
                'created_at' => '2026-09-14 10:38:07',
                'updated_at' => '2026-09-14 10:38:07',
            ],
            [
                'id' => 9,
                'estate_experience_id' => 1,
                'title' => 'Street and Beach View Options',
                'short_description' => 'Dual-aspect floorplates catching sea breezes and coastal vistas',
                'icon' => 'Eye',
                'created_at' => '2026-09-14 10:39:13',
                'updated_at' => '2026-09-14 10:39:13',
            ],
            [
                'id' => 10,
                'estate_experience_id' => 1,
                'title' => 'Nearby Supermarkets & Premium Services',
                'short_description' => 'Walking perimeter to Aberdeen diplomatic & gourmet hubs',
                'icon' => 'Store',
                'created_at' => '2026-09-14 10:39:44',
                'updated_at' => '2026-09-14 10:39:44',
            ],
        ];

        foreach ($specifications as $spec) {
            DB::table('experience_specifications')->updateOrInsert(
                ['id' => $spec['id']],
                $spec
            );
        }
    }
}
