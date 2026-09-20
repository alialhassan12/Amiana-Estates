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
])]

class DesignPhilosophy extends Model
{
    protected $appends = ['image_url'];

    protected function getImageUrlAttribute(){
        if($this->image){
            return Storage::url($this->image);
        }
        return null;
    }

    public function design_philosophy_principles()
    {
        return $this->hasMany(DesignPhilosophyPrinciple::class);
    }
}
