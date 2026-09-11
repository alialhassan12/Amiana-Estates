<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'title',
    'subTitle',
    'description',
    'media',
])]

class Estate extends Model
{
    protected $appends=[
        'media_url',
    ];
    protected function getMediaUrlAttribute(){
        if($this->media){
            return Storage::url($this->media);
        }
        return null;
    }

}
