<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DesignPhilosophy;
use App\Models\DesignPhilosophyPrinciple;
use Illuminate\Http\Request;

class DesignPhilosophyPrincipleController extends Controller
{
    public function insert(Request $request){
        $validated=$request->validate([
            'design_philosophy_id'=>['required'],
            'title'=>['required','string'],
            'description'=>['nullable','string'],
        ]);

        $designPhilosophy = DesignPhilosophy::findOrFail($validated['design_philosophy_id']);

        $designPhilosophyPrinciple = DesignPhilosophyPrinciple::create([
            'design_philosophy_id'=>$validated['design_philosophy_id'],
            'title'=>$validated['title'],
            'description'=>$validated['description']
        ]);

        return response()->json([
            'message'=>'Design philosophy principle created successfully',
            'design_philosophy_principle'=>$designPhilosophyPrinciple
        ],201);
    }
}
