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

    public function delete(int $id){
        $designPhilosophyPrinciple = DesignPhilosophyPrinciple::findOrFail($id);

        $designPhilosophyPrinciple->delete();
        
        return response()->json([
            'message'=>'Design philosophy principle deleted successfully'
        ],200);
    }

    public function update(Request $request){
        $validated=$request->validate([
            'id'=>['required'],
            'design_philosophy_id'=>['required','exists:design_philosophies,id'],
            'title'=>['nullable','string'],
            'description'=>['nullable','string'],
        ]);
        
        $designPhilosophyPrinciple = DesignPhilosophyPrinciple::where('design_philosophy_id',$validated['design_philosophy_id'])
            ->where('id',$validated['id'])
            ->firstOrFail();

        $designPhilosophyPrinciple->update([
            'title'=>$validated['title'],
            'description'=>$validated['description']
        ]);

        return response()->json([
            'message'=>'Design philosophy principle updated successfully',
            'design_philosophy_principle'=>$designPhilosophyPrinciple
        ],200);
    }
}
