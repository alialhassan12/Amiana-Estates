<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run():void
    {
        $socials=[
            [
                'id'=>'1',
                'label'=>'Instagram',
                'url'=>'https://www.instagram.com/',
                'created_at'=>'2026-09-10 11:34:04',
                'updated_at'=>'2026-09-10 11:34:04',
            ],
            [
                'id'=>'2',
                'label'=>'LinkedIn',
                'url'=>'https://www.linkedin.com/',
                'created_at'=>'2026-09-10 11:34:04',
                'updated_at'=>'2026-09-10 11:34:04',
            ],
        ];

        foreach($socials as $social)
        {
            DB::table('socials')->updateOrInsert($social);
        }
    }
}