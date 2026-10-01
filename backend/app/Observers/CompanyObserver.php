<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Company;

class CompanyObserver
{
    /**
     * Handle the Company "created" event.
     */
    public function created(Company $company): void
    {
        //
    }

    /**
     * Handle the Company "updated" event.
     */
    public function updated(Company $company): void
    {
        $changes=$company->getChanges();

        $hero_fields=[
            'hero_title',
            'hero_description',
            'hero_cta1_text',
            'hero_cta1_url',
            'hero_cta2_text',
            'hero_cta2_url',
            'hero_media',
            'hero_media_type',
        ];

        $company_fields=[
            'name',
            'logo_path',
            'contact_email',
            'contact_phone',
        ];

        $heroChanges = collect($changes)
            ->only($hero_fields)
            ->toArray();

        $companyChanges = collect($changes)
            ->only($company_fields)
            ->toArray();

        if (!empty($heroChanges)) {
            ActivityLog::create([
                'user_id' => auth('sanctum')->id(),
                'action' => 'updated',
                'entity_type' => 'Hero',
                'entity_id' => $company->id,
                'description' => 'Updated the Hero section',
            ]);
        }

        if (!empty($companyChanges)) {
            ActivityLog::create([
                'user_id' => auth('sanctum')->id(),
                'action' => 'updated',
                'entity_type' => 'Company',
                'entity_id' => $company->id,
                'description' => 'Updated Company Details',
            ]);
        }
    }

    /**
     * Handle the Company "deleted" event.
     */
    public function deleted(Company $company): void
    {
        //
    }

    /**
     * Handle the Company "restored" event.
     */
    public function restored(Company $company): void
    {
        //
    }

    /**
     * Handle the Company "force deleted" event.
     */
    public function forceDeleted(Company $company): void
    {
        //
    }
}
