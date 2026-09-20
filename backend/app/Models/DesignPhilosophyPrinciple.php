<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'design_philosophy_id',
    'title',
    'description',
])]

class DesignPhilosophyPrinciple extends Model
{

    public function DesignPhilosophy(){
        return $this->belongsTo(DesignPhilosophy::class);
    }
}
