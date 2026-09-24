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
        ]);

        //auto insert display order value of property feature
        $propertyFeatureCount = PropertyFeature::where('property_type_id',$validated['property_type_id'])->count();
        $validated['display_order']=$propertyFeatureCount+1;

        $propertyFeature = PropertyFeature::create($validated);

        return response()->json([
            'message' => 'Property Feature created successfully',
            'propertyFeature' => $propertyFeature,
        ],200);
    }

    public function getPropertyFeatures(Request $request){
        $searchQuery=$request->query('search');
        $type=$request->query('type');

        $hasSearch=!empty($searchQuery) && !in_array($searchQuery, ['null', 'undefined'],true);
        $hasType=!empty($type) && !in_array($type, ['null', 'undefined'],true);
        

        $propertyFeatures=PropertyFeature::with('propertyType:id,title')
            ->orderBy('display_order','asc');

        if($hasSearch){
            $propertyFeatures->where(function($query) use ($searchQuery){
                $query->where('title', 'like', "%{$searchQuery}%")
                ->orWhere('value', 'like', "%{$searchQuery}%")
                ->orWhereHas('propertyType',function($query) use ($searchQuery){
                    $query->where('title', 'like', "%{$searchQuery}%");
                });
            });
        }

        if($hasType){
            $propertyFeatures->where('property_type_id', $type);
        }

        $propertyFeatures=$propertyFeatures->paginate(5);

        return response()->json([
            'propertyFeatures' => $propertyFeatures,
        ],200);
    }

    public function deletePropertyFeature(int $id){
        $propertyFeature=PropertyFeature::findOrFail($id);

        //auto update display order value of property feature
        PropertyFeature::where('property_type_id', $propertyFeature->property_type_id)
        ->where('display_order', '>', $propertyFeature->display_order)
        ->decrement('display_order');

        $propertyFeature->delete();

        return response()->json([
            'message' => 'Property Feature deleted successfully',
        ],200);
    }


    public function editPropertyFeature(Request $request){
        $validated=$request->validate([
            'id'=>['required','exists:property_features,id'],
            'property_type_id'=>['required','exists:property_types,id'],
            'title'=>['required','string'],
            'value'=>['required','string'],
        ]);

        $propertyFeature=PropertyFeature::findOrFail($validated['id']);
        if($propertyFeature->property_type_id !== $validated['property_type_id']){
            //auto update display order value of property feature
            
            // decrement the value of property feature in the old property type 
            PropertyFeature::where('property_type_id', $propertyFeature->property_type_id)
            ->where('display_order', '>', $propertyFeature->display_order)
            ->decrement('display_order');

            //change the value of property feature in the new property type to the last value
            $validated['display_order']=PropertyFeature::where('property_type_id', $validated['property_type_id'])->count()+1;
        }

        $propertyFeature->update($validated);

        return response()->json([
            'message' => 'Property Feature updated successfully',
            'propertyFeature' => $propertyFeature,
        ],200);
    }


}
