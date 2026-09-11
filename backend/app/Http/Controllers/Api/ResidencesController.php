<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PropertyType;
use App\Models\Residence;
use Illuminate\Http\Request;

class ResidencesController extends Controller
{
    public function insert(Request $request){
        $validated=$request->validate([
            'title'=>['required','string','max:100'],
            'subTitle'=>['required','string','max:100'],
            'description'=>['nullable','string'],
        ]);

        $residence=Residence::create($validated);

        return response()->json([
            'message'=>'Residence created successfully',
            'residence'=>$residence,
        ],200);
    }

    public function getResidences(){
        $residence=Residence::first();

        $propertyTypes=PropertyType::with('features')->orderBy('display_order','asc')->get();
        
        // get only first 3 features for each property type
        $propertyTypes->each(function($propertyTypes){
            $propertyTypes->setRelation(
                'features',
                $propertyTypes->features->take(3)
            );
        });

        $featuredProperty=$propertyTypes->first();
        $propertyTypes=$propertyTypes->skip(1)->values();

        return response()->json([
            'message'=>'Residences data fetched successfully',
            'data'=>[
                'residence'=>$residence,
                'propertyTypes'=>$propertyTypes,
                'featuredProperty'=>$featuredProperty,
            ]
        ],200);
    }
}
