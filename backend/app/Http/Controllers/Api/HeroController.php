<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    public function insert(Request $request){
        $validated=$request->validate([
            'name'=>['required','string'],
            'logo'=>['nullable','image','max:2048'],
            'hero_title'=>['required','string'],
            'hero_description'=>['required','string'],
            'hero_cta1_text'=>['required','string'],
            'hero_cta1_url'=>['required','string'],
            'hero_cta2_text'=>['required','string'],
            'hero_cta2_url'=>['required','string'],
            'hero_media'=>['required','file','mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm','max:5120'],
            'hero_media_type'=>['required','string'],
            'number_of_floors'=>['required','integer','min:1'],
        ]);

        if($request->hasFile('logo')){
            $logoPath = $request->file('logo')->store('companies','public');
            if( $logoPath === false ){
                return response()->json([
                    'message' => 'Failed to store logo.'
                ], 500);
            }
            $validated['logo_path'] = $logoPath;
        }

        if($request->hasFile('hero_media')){
            $heroMedia = $request->file('hero_media')->store('companies','public');
            if( $heroMedia === false ){
                return response()->json([
                    'message' => 'Failed to store hero media.'
                ], 500);
            }
            $validated['hero_media'] = $heroMedia;
        }

        $company = Company::create($validated);

        return response()->json([
            'message'=>"Company created successfully!",
            'company'=>$company
        ]);
    }

    public function getHero(){
        $company= Company::first();
        return response()->json([
            'hero'=>$company
        ]);
    }
}
