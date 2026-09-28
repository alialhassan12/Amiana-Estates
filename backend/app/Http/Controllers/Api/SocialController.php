<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Social;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    public function getSocials(){
        $socials = Social::all();
        
        return response()->json([
            'socials'=>$socials,
        ],200);
    }

    public function addSocial(Request $request){
        $validated=$request->validate([
            'label'=>['required','string'],
            'url'=>['required','url'],
        ]);

        $social = Social::where('label',$validated['label'])->first();

        if($social){
            return response()->json([
                'message'=>'Social already exists',
            ],422);
        }

        $social = Social::create($validated);
        
        return response()->json([
            'message'=>'Social added successfully',
            'social'=>$social,
        ],200);
    }

    public function deleteSocial(int $id){

        $social = Social::findOrFail($id);
        $social->delete();
        
        return response()->json([
            'message'=>'Social deleted successfully',
        ],200);
    }

    public function updateSocial(Request $request){
        $validated=$request->validate([
            'id'=>['required','exists:socials,id'],
            'label'=>['required','string'],
            'url'=>['required','url'],
        ]);

        $social = Social::findOrFail($validated['id']);

        $social->update($validated);
        
        return response()->json([
            'message'=>'Social updated successfully',
            'social'=>$social,
        ],200);
    }
}
