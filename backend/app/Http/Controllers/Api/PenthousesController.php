<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penthouse;
use App\Models\PenthouseMedia;
use App\Models\PropertyType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PenthousesController extends Controller
{
    public function insert(Request $request){
        $validated=$request->validate([
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'description'=>['required','string'],
        ]);

        $penthouse=Penthouse::create($validated);

        return response()->json([
            'message'=>'Penthouse created successfully',
            'penthouse'=>$penthouse
        ]);
    }

    public function insertPenthouseMedia(Request $request){
        $validated=$request->validate([
            'penthouse_id'=>['required','exists:penthouses,id'],
            'media'=>['required','array'],
            'media.*.file'=>['required','image','max:2048'],
            'media.*.title'=>['nullable','string'],
            'media.*.description'=>['nullable','string'],
        ]);

        foreach($validated['media'] as $media){
            $path=$media['file']->store('penthouse-media','public');
            PenthouseMedia::create([
                'penthouse_id'=>$request->penthouse_id,
                'media_path'=>$path,
                'title'=>$media['title']?? null,
                'description'=>$media['description']?? null,
            ]);
        }

        return response()->json([
            'message'=>'Penthouse media inserted successfully'
        ]);
    }

    public function getPenthouse(){
        $penthouse=Penthouse::with(['penthouseMedia'])->first();

        // features from penthouse
        $penthouse_property_type=PropertyType::where('is_penthouse',true)
                ->with('features')
                ->first();

        $features=$penthouse_property_type->features;
        $features=$features->take(5);

        return response()->json([
            'message'=>'Penthouse fetched successfully',
            'penthouse'=>$penthouse,
            'features'=>$features,
        ]);
    }

    public function updatePenthouse(Request $request){
        $validated=$request->validate([
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'description'=>['required','string'],
        ]);

        $penthouse=Penthouse::firstOrFail();
        $penthouse->update($validated);

        return response()->json([
            'message'=>'Penthouse updated successfully',
            'penthouse'=>$penthouse
        ]);
    }
}
