<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function updateOrInsertLocation(Request $request){
        $validated=$request->validate([
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'description'=>['nullable','string'],
            'address'=>['required','string'],
            'latitude'=>['required','string'],
            'longitude'=>['required','string'],
            'map_zoom'=>['required','integer'],
        ]);

        $location = Location::first();
        if($location){
            $location->update($validated);
        }else{
            $location = Location::create($validated);
        }

        return response()->json([
            'message'=>'Location updated successfully',
            'location'=>$location
        ],200);
    }

    public function getLocation(){
        $location = Location::firstOrFail();
        return response()->json([
            'location'=>$location
        ],200);
    }
}
