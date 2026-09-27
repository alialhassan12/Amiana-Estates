<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Estate;
use App\Models\Property;
use App\Models\PropertyType;
use App\Services\PortfolioCacheService;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EstateController extends Controller
{
    public function __construct(
        private PortfolioCacheService $portfolioCache
    )
    {
    }

    public function insert(Request $request){
        $validated= $request->validate([
            'title' => ['required','string','max:100'],
            'subTitle' => ['required','string','max:100'],
            'description' => ['required','string'],
            'media' => ['required','file','mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm','max:5120'],
        ]);

        if($request->hasFile('media')){
            $file_name = Str::uuid() . '.' . $request->file('media')->getClientOriginalExtension();
            $media_path = $request->file('media')->storeAs('estates', $file_name, 'public');
            if($media_path === false){
                return response()->json([
                    'message' => 'Failed to store media.'
                ], 500);
            }
            $validated['media'] = $media_path;
        }

        $estate = Estate::create($validated);

        $this->portfolioCache->forgetEstate();

        return response()->json([
            'message' => 'Estate created successfully',
            'estate' => $estate,
        ],200);
    }

    public function getEstate(){
        $data=$this->portfolioCache->getEstate();

        return response()->json([
            'message'=>'Estate data fetched successfully',
            'data'=>$data
        ],200);
    }

    public function updateEstate(Request $request){
        $validated=$request->validate([
            'id'=>['required'],
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'description'=>['required','string'],
            'media'=>['nullable','file','mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm','max:5120'],
        ]);

        $estate=Estate::where('id',$validated['id'])->firstOrFail();

        if( $request->hasFile('media') ){
            if(isset($estate->media)){
                Storage::disk('public')->delete($estate->media);
            }
            
            $media = $request->file('media')->store('estates','public');
            if( $media === false ){
                return response()->json([
                    'message' => 'Failed to store media.'
                ], 500);
            }

            $validated['media'] = $media;
        }

        $estate->update($validated);
        
        $this->portfolioCache->forgetEstate();

        return response()->json([
            'message'=>'Estate updated successfully',
            'estate'=>$estate
        ],200);
    }
}
