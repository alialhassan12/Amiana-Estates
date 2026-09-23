<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PenthouseMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PenthouseMediaController extends Controller
{
    public function insertPenthouseMedia(Request $request){
        $validated=$request->validate([
            'penthouse_id'=>['required','exists:penthouses,id'],
            'title'=>['nullable','string'],
            'description'=>['nullable','string'],
            'file'=>['required','image','max:2048'],
        ]);

        $path=$request->file('file')->store('penthouse-media','public');
        $media=PenthouseMedia::create([
            'penthouse_id'=>$request->penthouse_id,
            'media_path'=>$path,
            'title'=>$request->title?? null,
            'description'=>$request->description?? null,
        ]);

        return response()->json([
            "message"=>"media inserted successfully",
            "media_path"=>$media->media_path,
        ]);
    }

    public function deletePenthouseMedia(int $id){

        $media=PenthouseMedia::findOrFail($id);

        if($media->media_path){
            Storage::delete($media->media_path);
        }
        
        $media->delete();

        return response()->json([
            "message"=>"media deleted successfully",
        ]);
    }
}
