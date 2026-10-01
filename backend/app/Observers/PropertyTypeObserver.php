<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\PropertyType;

class PropertyTypeObserver
{
    /**
     * Handle the PropertyType "created" event.
     */
    public function created(PropertyType $propertyType): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'created',
            'entity_type' => 'PropertyType',
            'entity_id' => $propertyType->id,
            'description' => "A new property type was added '{$propertyType->title}'.",
        ]);
    }

    /**
     * Handle the PropertyType "updated" event.
     */
    public function updated(PropertyType $propertyType): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'updated',
            'entity_type' => 'PropertyType',
            'entity_id' => $propertyType->id,
            'description' => "A property type was updated '{$propertyType->title}'.",
        ]);
    }

    /**
     * Handle the PropertyType "deleted" event.
     */
    public function deleted(PropertyType $propertyType): void
    {
        ActivityLog::create([
            'user_id' => auth('sanctum')->id(),
            'action' => 'deleted',
            'entity_type' => 'PropertyType',
            'entity_id' => $propertyType->id,
            'description' => "A property type was deleted '{$propertyType->title}'.",
        ]);
    }

    /**
     * Handle the PropertyType "restored" event.
     */
    public function restored(PropertyType $propertyType): void
    {
        //
    }

    /**
     * Handle the PropertyType "force deleted" event.
     */
    public function forceDeleted(PropertyType $propertyType): void
    {
        //
    }
}
