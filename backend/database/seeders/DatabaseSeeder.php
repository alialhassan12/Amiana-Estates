<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->syncMediaAssets();

        $this->call([
            UserSeeder::class,
            CompanySeeder::class,
            EstateSeeder::class,
            PropertyTypeSeeder::class,
            PropertySeeder::class,
            PropertyFeatureSeeder::class,
            ResidenceSeeder::class,
            PenthouseSeeder::class,
            PenthouseMediaSeeder::class,
            EstateExperienceSeeder::class,
            ExperienceSpecificationSeeder::class,
            DesignPhilosophySeeder::class,
            DesignPhilosophyPrincipleSeeder::class,
            LocationSeeder::class,
        ]);
    }

    /**
     * Sync seed media assets to storage/app/public if missing on a new machine.
     */
    private function syncMediaAssets(): void
    {
        $sourceBase = database_path('seeders/assets');
        $targetBase = storage_path('app/public');

        if (!is_dir($sourceBase)) {
            return;
        }

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($sourceBase, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );

        foreach ($iterator as $item) {
            $subPath = substr($item->getPathname(), strlen($sourceBase) + 1);
            $targetPath = $targetBase . DIRECTORY_SEPARATOR . $subPath;

            if ($item->isDir()) {
                if (!is_dir($targetPath)) {
                    @mkdir($targetPath, 0777, true);
                }
            } else {
                $dir = dirname($targetPath);
                if (!is_dir($dir)) {
                    @mkdir($dir, 0777, true);
                }
                if (!file_exists($targetPath)) {
                    @copy($item->getPathname(), $targetPath);
                }
            }
        }
    }
}
