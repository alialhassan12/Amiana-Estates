<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = [
            [
                'id' => 1,
                'name' => 'amiana estates',
                'logo_path' => null,
                'hero_title' => 'MODERN LUXURY LIVING IN ABERDEEN',
                'hero_description' => 'A new standard of modern luxury, comfort and exclusivity in Sierra Leone. Nine sculpted residences overlooking the Atlantic horizon.',
                'hero_cta1_text' => 'Explore residences',
                'hero_cta1_url' => '/',
                'hero_cta2_text' => 'discover amiana',
                'hero_cta2_url' => '/',
                'hero_media' => 'companies/ONwhXRLl73kCFFiGDB66jnb4fopMMqrmQSAp5I9E.jpg',
                'hero_media_type' => 'image',
                'number_of_floors' => 5,
                'contact_email' => 'amiana_estates@gmail.com',
                'contact_phone' => '+232 77046046',
                'created_at' => '2026-09-10 11:34:04',
                'updated_at' => '2026-09-18 11:15:28',
            ],
        ];

        foreach ($companies as $company) {
            DB::table('companies')->updateOrInsert(
                ['id' => $company['id']],
                $company
            );
        }
    }
}
