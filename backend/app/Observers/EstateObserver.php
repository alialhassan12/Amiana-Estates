<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Estate;

class EstateObserver
{
    /**
     * Handle the Estate "created" event.
     */
    public function created(Estate $estate): void
    {
        //
    }

    /**
     * Handle the Estate "updated" event.
     */
    public function updated(Estate $estate): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'Estate',
            'entity_id' => $estate->id,
            'description' => "The Estate section was updated.",
        ]);
    }

    /**
     * Handle the Estate "deleted" event.
     */
    public function deleted(Estate $estate): void
    {
        //
    }

    /**
     * Handle the Estate "restored" event.
     */
    public function restored(Estate $estate): void
    {
        //
    }

    /**
     * Handle the Estate "force deleted" event.
     */
    public function forceDeleted(Estate $estate): void
    {
        //
    }
}
