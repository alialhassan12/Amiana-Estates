<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Location;

class LocationObserver
{
    /**
     * Handle the Location "created" event.
     */
    public function created(Location $location): void
    {
        //
    }

    /**
     * Handle the Location "updated" event.
     */
    public function updated(Location $location): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'Location',
            'entity_id' => $location->id,
            'description' => 'Updated Location',
        ]);
    }

    /**
     * Handle the Location "deleted" event.
     */
    public function deleted(Location $location): void
    {
        //
    }

    /**
     * Handle the Location "restored" event.
     */
    public function restored(Location $location): void
    {
        //
    }

    /**
     * Handle the Location "force deleted" event.
     */
    public function forceDeleted(Location $location): void
    {
        //
    }
}
