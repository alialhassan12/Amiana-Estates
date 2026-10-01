<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Penthouse;

class PenthouseObserver
{
    /**
     * Handle the Penthouse "created" event.
     */
    public function created(Penthouse $penthouse): void
    {
        //
    }

    /**
     * Handle the Penthouse "updated" event.
     */
    public function updated(Penthouse $penthouse): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'Penthouse',
            'entity_id' => $penthouse->id,
            'description' => "The Penthouse section was updated.",
        ]);
    }

    /**
     * Handle the Penthouse "deleted" event.
     */
    public function deleted(Penthouse $penthouse): void
    {
        //
    }

    /**
     * Handle the Penthouse "restored" event.
     */
    public function restored(Penthouse $penthouse): void
    {
        //
    }

    /**
     * Handle the Penthouse "force deleted" event.
     */
    public function forceDeleted(Penthouse $penthouse): void
    {
        //
    }
}
