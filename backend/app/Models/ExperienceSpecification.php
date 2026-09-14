<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'estate_experience_id',
    'title',
    'short_description',
    'icon'
])]
class ExperienceSpecification extends Model
{
    public function estateExperience(){
        return $this->belongsTo(EstateExperience::class);
    }
}
