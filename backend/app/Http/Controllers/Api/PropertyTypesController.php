<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PropertyType;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function getPropertyTypes(Request $request){
        $searchQuery=$request->query('search');
        $propertyTypes=PropertyType::when($searchQuery, function($query) use ($searchQuery){
            $query->where('title','like','%'.$searchQuery.'%');
        })->orderBy('is_penthouse','desc')->paginate(5);

        return response()->json([
            'message'=>'Property types fetched successfully',
            'propertyTypes'=>$propertyTypes,
        ],200);
    }

    public function getPropertyTypesForFeatures(){
        $propertyTypes=PropertyType::select('id','title')->get();
        return response()->json([
            'message'=>'Property types fetched successfully',
            'propertyTypes'=>$propertyTypes,
        ],200);
    }

    public function editPropertyType(Request $request){
        $validated=$request->validate([
            'id'=>['required','exists:property_types,id'],
            'title'=>['required','string'],
            'description'=>['required','string'],
            'image'=>['nullable','image','max:2048'],
            'area'=>['required','integer'],
            'is_penthouse'=>['required','boolean']
        ]);

        $propertyType =PropertyType::findOrFail($validated['id']);
        
        if($request->hasfile('image')){
            if(isset($propertyType->image)){
                Storage::disk('public')->delete($propertyType->image);
            }
            $file_name = Str::uuid() . '.' . $request->file('image')->getClientOriginalExtension();
            $path=$request->file('image')->storeAs('property_types',$file_name,'public');

            if($path===false){
                return response()->json([
                    'message'=>'Failed to store image.'
                ],500);
            }
            $validated['image']=$path;
        }

        
        

        $propertyType->update([
            'title'=>$validated['title'],
            'description'=>$validated['description'],
            'image'=>$validated['image']??$propertyType->image,
            'area'=>$validated['area'],
            'is_penthouse'=>$validated['is_penthouse'],
        ]);

        return response()->json([
            'message'=>'Property Type updated successfully',
            'propertyType'=>$propertyType,
        ],200);
    }

    public function deletePropertyType(int $id){
        $propertyType=PropertyType::with('properties')->findOrFail($id);
        
        if($propertyType->properties->count()>0){
            return response()->json([
                'message'=>'Property Type has properties associated with it',
            ],400);
        }

        if(isset($propertyType->image)){
            Storage::disk('public')->delete($propertyType->image);
        }

        $propertyType->delete();

        return response()->json([
            'message'=>'Property Type deleted successfully',
        ],200);
    }
}
