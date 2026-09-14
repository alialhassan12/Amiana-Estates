<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExperienceSpecification;
use Illuminate\Http\Request;

class ExperienceSpecificationController extends Controller
{
    public function insert(Request $request){

        $validated = $request->validate([
            'estate_experience_id' => ['required', 'exists:estate_experiences,id'],
            'title' => ['required', 'string', 'max:255'],
            'short_description' => ['required', 'string', 'max:500'],
            'icon' => ['required', 'string'],
        ]);

        $experienceSpecification = ExperienceSpecification::create($validated);

        return response()->json([
            'message' => 'Experience Specification created successfully',
            'experienceSpecification' => $experienceSpecification,
        ], 200);
    }
}
