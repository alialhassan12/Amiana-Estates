<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DesignPhilosophy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DesignPhilosophyController extends Controller 
{
    public function insert(Request $request){
        $validated=$request->validate([
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'description'=>['required','string'],
            'image'=>['required','image','max:2048'],
        ]);
        
        if($request->hasFile('image')){
            $path=$request->file('image')->store('design_philosophy','public');

            if( $path === false ){
                return response()->json([
                    'message' => 'Failed to store image.'
                ], 500);
            }

            $validated['image']=$path;
        }

        $designPhilosophy=DesignPhilosophy::create($validated);

        return response()->json([
            'message'=>'Design philosophy created successfully',
            'design_philosophy'=>$designPhilosophy
        ],201);
    }

    public function getDesignPhilosophy(){

        $designPhilosophy=DesignPhilosophy::with('design_philosophy_principles')->firstOrFail();

        return response()->json([
            'design_philosophy'=>$designPhilosophy
        ],200);
    }

    public function updateDesignphilosophy(request $request){
        $validated=$request->validate([
            'id'=>['required','exists:design_philosophies,id'],
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'description'=>['required','string'],
            'image'=>['nullable','image','max:2048'],
        ]);

        $designPhilosophy=DesignPhilosophy::findOrFail($validated['id']);

        if($request->hasFile('image')){
            Storage::disk('public')->delete($designPhilosophy->image);

            $path=$request->file('image')->store('design_philosophy','public');

            if( $path === false ){
                return response()->json([
                    'message' => 'Failed to store image.'
                ], 500);
            }

            $validated['image']=$path;
        }

        $designPhilosophy->update($validated);

        return response()->json([
            'message'=>'Design philosophy updated successfully',
            'design_philosophy'=>$designPhilosophy
        ],200);
    }

}
