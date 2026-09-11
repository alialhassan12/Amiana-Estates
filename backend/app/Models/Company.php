<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'name',
    'logo_path',
    'hero_title',
    'hero_description',
    'hero_cta1_text',
    'hero_cta1_url',
    'hero_cta2_text',
    'hero_cta2_url',
    'hero_media',
    'hero_media_type',
    'number_of_floors',
])]

class Company extends Model
{
    protected $appends = [
        'hero_media_url',
        'logo_url'
    ];

    protected function getHeroMediaUrlAttribute(){
        if($this->hero_media){
            return Storage::url($this->hero_media);
        }
        return null;
    }

    protected function getLogoUrlAttribute(){
        if($this->logo_path){
            return Storage::url($this->logo_path);
        }
        return null;
    }
}
