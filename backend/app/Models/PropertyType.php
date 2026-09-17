<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'title',
    'subTitle',
    'description',
    'image',
    'area',
    'area_unit',
    'display_order',
    'is_penthouse'
])]
class PropertyType extends Model
{
    protected $appends=[
        'image_url',
    ];
    protected function getImageUrlAttribute(){
        if($this->image){
            return Storage::url($this->image);
        }
        return null;
    }

    public function properties(){
        return $this->hasMany(Property::class);
    }

    public function features(){
        return $this->hasMany(PropertyFeature::class);
    }
}
