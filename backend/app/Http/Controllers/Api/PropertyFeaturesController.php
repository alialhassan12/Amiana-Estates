<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PropertyFeature;
use Illuminate\Http\Request;

class PropertyFeaturesController extends Controller
{
    public function insert(Request $request){
        $validated=$request->validate([
            'property_type_id'=>['required','exists:property_types,id'],
            'title'=>['required','string'],
            'value'=>['required','string'],
            'display_order'=>['required','integer','min:1']
        ]);

        $propertyFeature = PropertyFeature::create($validated);

        return response()->json([
            'message' => 'Property Feature created successfully',
            'propertyFeature' => $propertyFeature,
        ],200);
    }
}
