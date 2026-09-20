<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstateExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $experiences = [
            [
                'id' => 1,
                'title' => 'RESIDENTIAL AMENITIES & LIFESTYLE',
                'subTitle' => 'THE ESTATE EXPERIENCE',
                'card_1_image' => 'estate-experience/314bbab6-93a3-4179-a2cf-a77896ab11ea.jpeg',
                'card_1_image_heading' => 'FIVE-STOREY OCEANFRONT MONOLITH',
                'card_1_title' => 'Architectural Premise',
                'card_1_quote' => 'Amiana Estates is a five-floor residential tower designed around peaceful, exclusive, and elite living.',
                'card_1_description' => 'Positioned delicately at the headland of the Aberdeen Peninsula, this structural statement unites Atlantic ocean horizons with world-class engineering. Every facet of the development has been tailored for international permanence, privacy, and serene domestic composure.',
                'card_2_title' => 'Sierra Leone’s Foremost Wellness Retreat',
                'card_2_image' => 'estate-experience/fb4cffb1-8374-44e4-9a39-3fa65e22a7d9.jpeg',
                'card_2_description' => 'A major highlight of the development is the inclusion of what is planned to become one of the largest spa facilities in Sierra Leone, bringing wellness and luxury together within the building itself.',
                'closing_title' => 'RESIDENTIAL PROFILE & TENANCY',
                'closing_statement' => 'Designed for professionals, families, diaspora residents, executives, investors, and individuals seeking a modern long-term rental lifestyle with international standards of comfort.',
                'created_at' => '2026-09-14 10:22:22',
                'updated_at' => '2026-09-14 10:22:22',
            ],
        ];

        foreach ($experiences as $experience) {
            DB::table('estate_experiences')->updateOrInsert(
                ['id' => $experience['id']],
                $experience
            );
        }
    }
}
