<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Social;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    public function getSocials(){
        $socials = Social::all();
        
        return response()->json([
            'socials'=>$socials,
        ],200);
    }
}
