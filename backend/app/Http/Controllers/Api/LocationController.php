<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function updateLocation(Request $request){
        $validated=$request->validate([
            'address'=>['required','string'],
            'latitude'=>['required','numeric'],
            'longitude'=>['required','numeric'],
        ]);

        $location = Location::firstOrFail();
        
        $location->update([
            'latitude'=>$validated['latitude'],
            'longitude'=>$validated['longitude'],
            'address'=>$validated['address']
        ]);

        return response()->json([
            'message'=>'Location updated successfully',
            'location'=>$location
        ],200);
    }

    public function getLocation(){
        $location = Location::select("id","latitude","longitude","address")->firstOrFail();
        return response()->json([
            'location'=>$location
        ],200);
    }
}
