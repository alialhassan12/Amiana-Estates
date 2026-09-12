<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title',
    'subTitle',
    'description',
])]
class Penthouse extends Model
{
    //

    public function penthouseMedia()
    {
        return $this->hasMany(PenthouseMedia::class);
    }
}
