<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\EstateExperience;

class EstateExperienceObserver
{
    /**
     * Handle the EstateExperience "created" event.
     */
    public function created(EstateExperience $estateExperience): void
    {
        //
    }

    /**
     * Handle the EstateExperience "updated" event.
     */
    public function updated(EstateExperience $estateExperience): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'EstateExperience',
            'entity_id' => $estateExperience->id,
            'description' => "The Estate Experience section was updated.",
        ]);
    }

    /**
     * Handle the EstateExperience "deleted" event.
     */
    public function deleted(EstateExperience $estateExperience): void
    {
        //
    }

    /**
     * Handle the EstateExperience "restored" event.
     */
    public function restored(EstateExperience $estateExperience): void
    {
        //
    }

    /**
     * Handle the EstateExperience "force deleted" event.
     */
    public function forceDeleted(EstateExperience $estateExperience): void
    {
        //
    }
}
