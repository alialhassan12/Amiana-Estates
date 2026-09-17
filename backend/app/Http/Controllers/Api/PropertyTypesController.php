<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PropertyType;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class PropertyTypesController extends Controller
{
    public function insert(Request $request){
        $validated=$request->validate([
            'title'=>['required','string'],
            'subTitle'=>['nullable','string'],
            'description'=>['required','string'],
            'image'=>['required','file','mimetypes:image/jpeg,image/png,image/webp','max:2048'],
            'area'=>['required','integer'],
            'area_unit'=>['required','string'],
            'display_order'=>['required','integer','min:1'],
            'is_penthouse'=>['nullable','boolean']
        ]);

        if($request->hasFile('image')){
            $file_name = Str::uuid() . '.' . $request->file('image')->getClientOriginalExtension();
            $image_path = $request->file('image')->storeAs('property_types', $file_name, 'public');
            if($image_path === false){
                return response()->json([
                    'message' => 'Failed to store image.'
                ], 500);
            }
            $validated['image'] = $image_path;
        }

        $propertyType = PropertyType::create($validated);

        return response()->json([
            'message' => 'Property Type created successfully',
            'propertyType' => $propertyType,
        ],200);
    }
}
