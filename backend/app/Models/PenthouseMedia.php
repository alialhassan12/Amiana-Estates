<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'penthouse_id',
    'media_path',
    'title',
    'description',
])]
class PenthouseMedia extends Model
{
    protected $appends=['media_url'];
    protected function getMediaUrlAttribute(){
        if($this->media_path){
            return Storage::url($this->media_path);
        }
        return null;
    }

    public function penthouse()
    {
        return $this->belongsTo(Penthouse::class);
    }
}
