<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\DesignPhilosophy;

class DesignPhilosophyObserver
{
    /**
     * Handle the DesignPhilosophy "created" event.
     */
    public function created(DesignPhilosophy $designPhilosophy): void
    {
        //
    }

    /**
     * Handle the DesignPhilosophy "updated" event.
     */
    public function updated(DesignPhilosophy $designPhilosophy): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'DesignPhilosophy',
            'entity_id' => $designPhilosophy->id,
            'description' => "The Design Philosophy section was updated.",
        ]);
    }

    /**
     * Handle the DesignPhilosophy "deleted" event.
     */
    public function deleted(DesignPhilosophy $designPhilosophy): void
    {
        //
    }

    /**
     * Handle the DesignPhilosophy "restored" event.
     */
    public function restored(DesignPhilosophy $designPhilosophy): void
    {
        //
    }

    /**
     * Handle the DesignPhilosophy "force deleted" event.
     */
    public function forceDeleted(DesignPhilosophy $designPhilosophy): void
    {
        //
    }
}
