<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
        $validated=$request->validate([
            'email'=>['required','email'],
            'password'=>['required','string','min:8']
        ]);

        $user=User::where('email',$validated['email'])->first();

        if(!$user || Hash::check($validated['password'],$user->password)){
            return response()->json([
                'message'=>'Invalid Credentials'
            ],401);
        }

        $token=$user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message'=>'Login successful',
            'token'=>$token,
            'user'=>$user
        ]);
    }

    public function register(Request $request){
        $validated=$request->validate([
            'name'=>['required','string'],
            'email'=>['required','email'],
            'password'=>['required','string','min:8']
        ]);

        $existUser=User::where('email',$validated['email'])->first();
        if($existUser){
            return response()->json([
                'message'=>'User already exists'
            ],400);
        }

        $user=User::create($validated);
        // $token=$user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message'=>'User registered successfully',
            'user'=>$user
        ]);
    }

    public function logout(Request $request){
        $user=$request->user();

        if(!$user){
            return response()->json([
                "message"=>"Unauthenticated.",
            ],401);
        }

        $user->currentAccessToken()->delete();

        return response()->json([
            "message"=>"Logout successfull.",
        ]);
    }

    public function checkAuth(Request $request){
        $user=$request->user();

        if(!$user){
            return response()->json([
                "message"=>"Unauthenticated.",
            ],401);
        }

        return response()->json([
            "message"=>"Authenticated",
            "user"=>$user
        ]);
    }
}
