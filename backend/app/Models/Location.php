<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title',
    'subTitle',
    'description',
    'address',
    'latitude',
    'longitude',
    'map_zoom',
])]
class Location extends Model
{
    //
}
