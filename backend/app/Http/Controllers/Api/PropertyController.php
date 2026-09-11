<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function insert(Request $request){
        $validated=$request->validate([
            'property_type_id'=>['required','exists:property_types,id'],
            'title'=>['required','string'],
            'floor'=>['required','string'],
        ]);

        $property = Property::create($validated);

        return response()->json([
            'message' => 'Property created successfully',
            'property' => $property,
        ],200);
    }
}
