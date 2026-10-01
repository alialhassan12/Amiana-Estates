<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\PenthouseMedia;

class PenthouseMediaObserver
{
    /**
     * Handle the PenthouseMedia "created" event.
     */
    public function created(PenthouseMedia $penthouseMedia): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'created',
            'entity_type' => 'PenthouseMedia',
            'entity_id' => $penthouseMedia->id,
            'description' => "Image was added to The Penthouse Gallery.",
        ]);
    }

    /**
     * Handle the PenthouseMedia "updated" event.
     */
    public function updated(PenthouseMedia $penthouseMedia): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'PenthouseMedia',
            'entity_id' => $penthouseMedia->id,
            'description' => "The Penthouse image was updated.",
        ]);
    }

    /**
     * Handle the PenthouseMedia "deleted" event.
     */
    public function deleted(PenthouseMedia $penthouseMedia): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'deleted',
            'entity_type' => 'PenthouseMedia',
            'entity_id' => $penthouseMedia->id,
            'description' => "Image was deleted from The Penthouse Gallery.",
        ]);
    }

    /**
     * Handle the PenthouseMedia "restored" event.
     */
    public function restored(PenthouseMedia $penthouseMedia): void
    {
        //
    }

    /**
     * Handle the PenthouseMedia "force deleted" event.
     */
    public function forceDeleted(PenthouseMedia $penthouseMedia): void
    {
        //
    }
}
