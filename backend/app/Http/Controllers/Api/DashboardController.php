<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ExperienceSpecification;
use App\Models\Penthouse;
use App\Models\Property;
use App\Models\PropertyType;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboardStats(){
        
        $propertyTypes=PropertyType::select('id','total_properties')->get();

        $totalProperties=$propertyTypes->sum('total_properties');
        
        $totalPropertyTypes=$propertyTypes->count();

        $totalPenthouses=Penthouse::count();

        $experienceSpecification=ExperienceSpecification::count();

        return response()->json([
            'totalProperties'=>$totalProperties,
            'totalPropertyTypes'=>$totalPropertyTypes,
            'totalPenthouses'=>$totalPenthouses,
            'totalExperienceSpecifications'=>$experienceSpecification
        ]);
    }

    public function getDashboardLogs(){
        $activityLogs=ActivityLog::with('user')->latest()->limit(10)->get();

        return response()->json([
            'message'=>'Dashboard Logs Fetched Successfully',
            'activityLogs'=>$activityLogs
        ]);
    }
}
