<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'title',
    'subTitle',
    'card_1_image',
    'card_1_image_heading',
    'card_1_title',
    'card_1_quote',
    'card_1_description',
    'specifications_title',
    'specifications_subTitle',
    'specifications_description',
    'card_2_title',
    'card_2_image',
    'card_2_description',
    'closing_title',
    'closing_statement',
])]
class EstateExperience extends Model
{
    protected $appends=[
        'card_1_image_url',
        'card_2_image_url',
    ];

    protected function getCard1ImageUrlAttribute(){
        if($this->card_1_image){
            return Storage::url($this->card_1_image);
        }
        return null;
    }

    protected function getCard2ImageUrlAttribute(){
        if($this->card_2_image){
            return Storage::url($this->card_2_image);
        }
        return null;
    }

    public function specifications(){
        return $this->hasMany(ExperienceSpecification::class);
    }
}
