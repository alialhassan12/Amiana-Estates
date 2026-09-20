<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'id' => 1,
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => null,
                'password' => '$2y$12$egm2lvGY2c4oB.DmTiflSOqD/e0VbCCO1dZtYZgZziDj1iDjftLuq',
                'remember_token' => null,
                'created_at' => '2026-09-17 08:38:49',
                'updated_at' => '2026-09-17 08:38:49',
            ],
        ];

        foreach ($users as $user) {
            DB::table('users')->updateOrInsert(
                ['id' => $user['id']],
                $user
            );
        }
    }
}
