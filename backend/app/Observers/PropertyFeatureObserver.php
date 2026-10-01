<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\PropertyFeature;

class PropertyFeatureObserver
{
    /**
     * Handle the PropertyFeature "created" event.
     */
    public function created(PropertyFeature $propertyFeature): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'created',
            'entity_type' => 'PropertyFeature',
            'entity_id' => $propertyFeature->id,
            'description' => "A new property feature was added.",
        ]);
    }

    /**
     * Handle the PropertyFeature "updated" event.
     */
    public function updated(PropertyFeature $propertyFeature): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'PropertyFeature',
            'entity_id' => $propertyFeature->id,
            'description' => "A property feature was updated.",
        ]);
    }

    /**
     * Handle the PropertyFeature "deleted" event.
     */
    public function deleted(PropertyFeature $propertyFeature): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'deleted',
            'entity_type' => 'PropertyFeature',
            'entity_id' => $propertyFeature->id,
            'description' => "A property feature was deleted.",
        ]);
    }

    /**
     * Handle the PropertyFeature "restored" event.
     */
    public function restored(PropertyFeature $propertyFeature): void
    {
        //
    }

    /**
     * Handle the PropertyFeature "force deleted" event.
     */
    public function forceDeleted(PropertyFeature $propertyFeature): void
    {
        //
    }
}
