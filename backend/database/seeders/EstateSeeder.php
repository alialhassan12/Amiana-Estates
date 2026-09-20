<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $estates = [
            [
                'id' => 1,
                'title' => 'The Estate',
                'subTitle' => 'DESIGNED FOR A LIFE BEYOND ORDINARY.',
                'description' => "Conceived as an intimate coastal sanctuary, Amiana balances the vibrant energy of Freetown's diplomatic quarter with discreet, walled seclusion.",
                'media' => 'estates/F34vSzD7AlSy2jL6JkquPlsit1LrqudU7fHfBwv1.jpg',
                'created_at' => '2026-09-11 08:15:20',
                'updated_at' => '2026-09-18 12:59:22',
            ],
            [
                'id' => 2,
                'title' => 'The Estate',
                'subTitle' => 'DESIGNED FOR A LIFE BEYOND ORDINARY.',
                'description' => "Conceived as an intimate coastal sanctuary, Amiana balances the vibrant energy of Freetown's diplomatic quarter with discreet, walled seclusion.",
                'media' => 'estates/5a63af86-badd-46a3-8ad7-23af900d76b3.jpeg',
                'created_at' => '2026-09-11 08:28:26',
                'updated_at' => '2026-09-11 08:28:26',
            ],
            [
                'id' => 3,
                'title' => 'The Estate',
                'subTitle' => 'DESIGNED FOR A LIFE BEYOND ORDINARY.',
                'description' => "Conceived as an intimate coastal sanctuary, Amiana balances the vibrant energy of Freetown's diplomatic quarter with discreet, walled seclusion.",
                'media' => 'estates/182c6c79-2f6a-4d4d-b6ef-e276df15ce47.jpeg',
                'created_at' => '2026-09-11 08:29:34',
                'updated_at' => '2026-09-11 08:29:34',
            ],
            [
                'id' => 4,
                'title' => 'The Estate',
                'subTitle' => 'DESIGNED FOR A LIFE BEYOND ORDINARY.',
                'description' => "Conceived as an intimate coastal sanctuary, Amiana balances the vibrant energy of Freetown's diplomatic quarter with discreet, walled seclusion.",
                'media' => 'estates/05a263e8-26a1-470c-ab0f-07277f8d2f3b.jpeg',
                'created_at' => '2026-09-11 08:46:36',
                'updated_at' => '2026-09-11 08:46:36',
            ],
            [
                'id' => 5,
                'title' => 'The Estate',
                'subTitle' => 'DESIGNED FOR A LIFE BEYOND ORDINARY.',
                'description' => "Conceived as an intimate coastal sanctuary, Amiana balances the vibrant energy of Freetown's diplomatic quarter with discreet, walled seclusion.",
                'media' => 'estates/4f4ee57a-3b8e-4a48-9106-e91245d23c81.jpeg',
                'created_at' => '2026-09-11 08:47:49',
                'updated_at' => '2026-09-11 08:47:49',
            ],
        ];

        foreach ($estates as $estate) {
            DB::table('estates')->updateOrInsert(
                ['id' => $estate['id']],
                $estate
            );
        }
    }
}
