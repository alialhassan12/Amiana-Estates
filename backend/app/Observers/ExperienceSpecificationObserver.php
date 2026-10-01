<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\ExperienceSpecification;

class ExperienceSpecificationObserver
{
    /**
     * Handle the ExperienceSpecification "created" event.
     */
    public function created(ExperienceSpecification $experienceSpecification): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'created',
            'entity_type' => 'ExperienceSpecification',
            'entity_id' => $experienceSpecification->id,
            'description' => "A new experience specification was added {$experienceSpecification->title}.",
        ]);
    }

    /**
     * Handle the ExperienceSpecification "updated" event.
     */
    public function updated(ExperienceSpecification $experienceSpecification): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'ExperienceSpecification',
            'entity_id' => $experienceSpecification->id,
            'description' => "An experience specification was updated {$experienceSpecification->title}.",
        ]);
    }

    /**
     * Handle the ExperienceSpecification "deleted" event.
     */
    public function deleted(ExperienceSpecification $experienceSpecification): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'deleted',
            'entity_type' => 'ExperienceSpecification',
            'entity_id' => $experienceSpecification->id,
            'description' => "An experience specification was deleted {$experienceSpecification->title}.",
        ]);
    }

    /**
     * Handle the ExperienceSpecification "restored" event.
     */
    public function restored(ExperienceSpecification $experienceSpecification): void
    {
        //
    }

    /**
     * Handle the ExperienceSpecification "force deleted" event.
     */
    public function forceDeleted(ExperienceSpecification $experienceSpecification): void
    {
        //
    }
}
