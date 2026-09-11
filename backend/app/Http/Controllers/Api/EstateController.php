<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Estate;
use App\Models\Property;
use App\Models\PropertyType;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class EstateController extends Controller
{
    public function insert(Request $request){
        $validated= $request->validate([
            'title' => ['required','string','max:100'],
            'subTitle' => ['required','string','max:100'],
            'description' => ['required','string'],
            'media' => ['required','file','mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm','max:5120'],
        ]);

        if($request->hasFile('media')){
            $file_name = Str::uuid() . '.' . $request->file('media')->getClientOriginalExtension();
            $media_path = $request->file('media')->storeAs('estates', $file_name, 'public');
            if($media_path === false){
                return response()->json([
                    'message' => 'Failed to store media.'
                ], 500);
            }
            $validated['media'] = $media_path;
        }

        $estate = Estate::create($validated);

        return response()->json([
            'message' => 'Estate created successfully',
            'estate' => $estate,
        ],200);
    }

    public function getEstate(){
        $estate=Estate::first();

        $levelOfArchitecture=Company::first('number_of_floors');
        $totalResidences=Property::count();
        $propertyType=PropertyType::where('display_order',1)->first();
        $propertyTypeArea=$propertyType->area.' '.$propertyType->area_unit;

        return response()->json([
            'message'=>'Estate data fetched successfully',
            'data'=>[
                    'estate'=>$estate,
                    'levelOfArchitecture'=>$levelOfArchitecture->number_of_floors,
                    'totalResidences'=>$totalResidences,
                    'propertyTypeArea'=>$propertyTypeArea
                ]
        ],200);
    }
}
