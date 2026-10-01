<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Difference;

class DifferenceObserver
{
    /**
     * Handle the Difference "created" event.
     */
    public function created(Difference $difference): void
    {
        //
    }

    /**
     * Handle the Difference "updated" event.
     */
    public function updated(Difference $difference): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'Difference',
            'entity_id' => $difference->id,
            'description' => "The Difference section was updated.",
        ]);
    }

    /**
     * Handle the Difference "deleted" event.
     */
    public function deleted(Difference $difference): void
    {
        //
    }

    /**
     * Handle the Difference "restored" event.
     */
    public function restored(Difference $difference): void
    {
        //
    }

    /**
     * Handle the Difference "force deleted" event.
     */
    public function forceDeleted(Difference $difference): void
    {
        //
    }
}
