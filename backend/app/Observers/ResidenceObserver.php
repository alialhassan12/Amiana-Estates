<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Residence;

class ResidenceObserver
{
    /**
     * Handle the Residence "created" event.
     */
    public function created(Residence $residence): void
    {
        //
    }

    /**
     * Handle the Residence "updated" event.
     */
    public function updated(Residence $residence): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'Residence',
            'entity_id' => $residence->id,
            'description' => "Residences section was updated.",
        ]);
    }

    /**
     * Handle the Residence "deleted" event.
     */
    public function deleted(Residence $residence): void
    {
        //
    }

    /**
     * Handle the Residence "restored" event.
     */
    public function restored(Residence $residence): void
    {
        //
    }

    /**
     * Handle the Residence "force deleted" event.
     */
    public function forceDeleted(Residence $residence): void
    {
        //
    }
}
