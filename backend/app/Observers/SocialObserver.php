<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Social;

class SocialObserver
{
    /**
     * Handle the Social "created" event.
     */
    public function created(Social $social): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'created',
            'entity_type' => 'Social',
            'entity_id' => $social->id,
            'description' => 'Added Social Media Link',
        ]);
    }

    /**
     * Handle the Social "updated" event.
     */
    public function updated(Social $social): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'Social',
            'entity_id' => $social->id,
            'description' => 'Updated Social Media Link',
        ]);
    }

    /**
     * Handle the Social "deleted" event.
     */
    public function deleted(Social $social): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'deleted',
            'entity_type' => 'Social',
            'entity_id' => $social->id,
            'description' => 'Deleted Social Media Link',
        ]);
    }

    /**
     * Handle the Social "restored" event.
     */
    public function restored(Social $social): void
    {
        //
    }

    /**
     * Handle the Social "force deleted" event.
     */
    public function forceDeleted(Social $social): void
    {
        //
    }
}
