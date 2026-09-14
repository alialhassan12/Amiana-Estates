<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EstateExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class EstateExperienceController extends Controller
{
    public function insert(Request $request){
        $validated=$request->validate([
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'card_1_image'=>['required','image','max:2048'],
            'card_1_image_heading'=>['required','string'],
            'card_1_title'=>['required','string'],
            'card_1_quote'=>['required','string'],
            'card_1_description'=>['required','string'],
            'card_2_title'=>['required','string'],
            'card_2_image'=>['required','image','max:2048'],
            'card_2_description'=>['required','string'],
            'closing_title'=>['required','string'],
            'closing_statement'=>['required','string'],
        ]);


        if($request->hasFile('card_1_image')){
            $file_name = Str::uuid() . '.' . $request->file('card_1_image')->getClientOriginalExtension();
            $media_path = $request->file('card_1_image')->storeAs('estate-experience', $file_name, 'public');
            if($media_path === false){
                return response()->json([
                    'message' => 'Failed to store media.'
                ], 500);
            }
            $validated['card_1_image']=$media_path;
        }

        if($request->hasFile('card_2_image')){
            $file_name = Str::uuid() . '.' . $request->file('card_2_image')->getClientOriginalExtension();
            $media_path = $request->file('card_2_image')->storeAs('estate-experience', $file_name, 'public');
            if($media_path === false){
                return response()->json([
                    'message' => 'Failed to store media.'
                ], 500);
            }
            $validated['card_2_image']=$media_path;
        }

        $estateExperience=EstateExperience::create($validated);

        return response()->json([
            'message'=>'Estate Experience created successfully',
            'estateExperience'=>$estateExperience
        ]);
    }

    public function getEstateExperience(){
        $estateExperience=EstateExperience::with('specifications')->first();
        
        if(!$estateExperience){
            return response()->json([
                'message'=>'Estate Experience not found',
                'estateExperience'=>null
            ],404);
        }
        
        return response()->json([
            'message'=>'Estate Experience fetched successfully',
            'estateExperience'=>$estateExperience
        ]);
    }
}
