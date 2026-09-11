<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'property_type_id',
    'title',
    'floor',
])]
class Property extends Model
{
    
    public function propertyType(){
        return $this->belongsTo(PropertyType::class);
    }
}
