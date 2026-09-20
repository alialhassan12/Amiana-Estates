<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenthouseMediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mediaItems = [
            [
                'id' => 1,
                'penthouse_id' => 1,
                'media_path' => 'penthouse-media/Z63GgIAPQLpYYADgGJi4kC6X1WeA9qXQFRyPBXtE.jpg',
                'title' => null,
                'description' => null,
                'created_at' => '2026-09-14 10:22:18',
                'updated_at' => '2026-09-14 10:22:18',
            ],
            [
                'id' => 2,
                'penthouse_id' => 1,
                'media_path' => 'penthouse-media/RPk5nfJV0ROCvY3gIuOoxdwKpj9OzyVtd1iSmSeo.jpg',
                'title' => null,
                'description' => null,
                'created_at' => '2026-09-14 10:22:18',
                'updated_at' => '2026-09-14 10:22:18',
            ],
            [
                'id' => 3,
                'penthouse_id' => 1,
                'media_path' => 'penthouse-media/S6UVHwvOJSaSykJnrnW5E76JjqPUcrTQSZ8cjj4D.jpg',
                'title' => null,
                'description' => null,
                'created_at' => '2026-09-14 10:22:18',
                'updated_at' => '2026-09-14 10:22:18',
            ],
            [
                'id' => 4,
                'penthouse_id' => 1,
                'media_path' => 'penthouse-media/UOxyQtFkbalAJWsSiQlLrIl0f3tbhXH1YwhxyF1G.jpg',
                'title' => null,
                'description' => null,
                'created_at' => '2026-09-14 10:22:18',
                'updated_at' => '2026-09-14 10:22:18',
            ],
            [
                'id' => 5,
                'penthouse_id' => 1,
                'media_path' => 'penthouse-media/eimBaITPTPfhECw5YsPRg4VPl6zSOKocO5kz1FsS.jpg',
                'title' => null,
                'description' => null,
                'created_at' => '2026-09-14 10:22:18',
                'updated_at' => '2026-09-14 10:22:18',
            ],
            [
                'id' => 6,
                'penthouse_id' => 1,
                'media_path' => 'penthouse-media/9atlTHtCzsbx7K8huQRG2jAUacwMkJ43PsGj2RGb.jpg',
                'title' => null,
                'description' => null,
                'created_at' => '2026-09-14 10:22:18',
                'updated_at' => '2026-09-14 10:22:18',
            ],
            [
                'id' => 7,
                'penthouse_id' => 1,
                'media_path' => 'penthouse-media/GdQbYsiSHtQYUptQJn68tnZ6dLGnXDWKKeXlJVUG.jpg',
                'title' => null,
                'description' => null,
                'created_at' => '2026-09-14 10:22:18',
                'updated_at' => '2026-09-14 10:22:18',
            ],
        ];

        foreach ($mediaItems as $media) {
            DB::table('penthouse_media')->updateOrInsert(
                ['id' => $media['id']],
                $media
            );
        }
    }
}
