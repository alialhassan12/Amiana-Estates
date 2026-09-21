<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'hero_media'=>['required','file','mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm','max:80000'],
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

    public function update(Request $request){
        $validated=$request->validate([
            'id'=>['required'],
            'hero_title'=>['required','string'],
            'hero_description'=>['required','string'],
            'hero_cta1_text'=>['required','string'],
            'hero_cta1_url'=>['required','string'],
            'hero_cta2_text'=>['required','string'],
            'hero_cta2_url'=>['required','string'],
            'hero_media'=>['nullable','file','mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm','max:80000'],
            'hero_media_type'=>['required','string'],
        ]);

        $company=Company::findOrFail($validated['id']);

        if($request->hasFile('hero_media')){
            // delete old file
            if(isset($company->hero_media)){
                Storage::disk('public')->delete($company->hero_media);
            }

            // store new file
            $heroMedia = $request->file('hero_media')->store('companies','public');
            if( $heroMedia === false ){
                return response()->json([
                    'message' => 'Failed to store hero media.'
                ], 500);
            }

            $validated['hero_media'] = $heroMedia;
        }

        $company->update([
            'hero_title'=>$validated['hero_title'],
            'hero_description'=>$validated['hero_description'],
            'hero_cta1_text'=>$validated['hero_cta1_text'],
            'hero_cta1_url'=>$validated['hero_cta1_url'],
            'hero_cta2_text'=>$validated['hero_cta2_text'],
            'hero_cta2_url'=>$validated['hero_cta2_url'],
            'hero_media_type'=>$validated['hero_media_type'],
            'hero_media'=>$validated['hero_media'] ?? $company->hero_media
        ]);

        return response()->json([
            'message'=>"Company updated successfully!",
            'company'=>$company
        ],200);
    }
}
