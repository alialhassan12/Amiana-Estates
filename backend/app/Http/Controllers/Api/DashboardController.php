<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExperienceSpecification;
use App\Models\Penthouse;
use App\Models\Property;
use App\Models\PropertyType;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboardStats(){
        $totalProperties=Property::count();

        $totalPropertyTypes=PropertyType::count();

        $totalPenthouses=Penthouse::count();

        $experienceSpecification=ExperienceSpecification::count();

        return response()->json([
            'totalProperties'=>$totalProperties,
            'totalPropertyTypes'=>$totalPropertyTypes,
            'totalPenthouses'=>$totalPenthouses,
            'totalExperienceSpecifications'=>$experienceSpecification
        ]);
    }
}
