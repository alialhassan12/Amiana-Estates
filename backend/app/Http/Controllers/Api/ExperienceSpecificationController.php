<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExperienceSpecification;
use App\Services\PortfolioCacheService;
use Illuminate\Http\Request;

class ExperienceSpecificationController extends Controller
{
    public function __construct(
        private PortfolioCacheService $portfolioCache
    ){}

    public function getExperienceSpecifications(Request $request){
        $query=ExperienceSpecification::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('short_description', 'like', "%{$search}%");
        }

        $experienceSpecifications=$query->paginate(5);

        return response()->json([
            'message' => 'Experience Specifications fetched successfully',
            'experienceSpecifications' => $experienceSpecifications,
        ], 200);
    }

    public function insert(Request $request){

        $validated = $request->validate([
            'estate_experience_id' => ['required', 'exists:estate_experiences,id'],
            'title' => ['required', 'string', 'max:255'],
            'short_description' => ['required', 'string', 'max:500'],
            'icon' => ['required', 'string'],
        ]);

        $experienceSpecification = ExperienceSpecification::create($validated);

        $this->portfolioCache->forgetEstateExperience();

        return response()->json([
            'message' => 'Experience Specification created successfully',
            'experienceSpecification' => $experienceSpecification,
        ], 200);
    }

    public function delete(int $id){
        $experienceSpecification = ExperienceSpecification::findOrFail($id);
        
        $experienceSpecification->delete();

        $this->portfolioCache->forgetEstateExperience();

        return response()->json([
            'message' => 'Experience Specification deleted successfully',
        ], 200);
    }

    public function edit(Request $request){
        $validated=$request->validate([
            'id'=>['required','exists:experience_specifications,id'],
            'estate_experience_id' => ['required', 'exists:estate_experiences,id'],
            'title' => ['required', 'string', 'max:255'],
            'short_description' => ['required', 'string', 'max:500'],
            'icon' => ['required', 'string'],
        ]);

        $experienceSpecification=ExperienceSpecification::findOrFail($request->id);
        $experienceSpecification->update($validated);

        $this->portfolioCache->forgetEstateExperience();

        return response()->json([
            'message' => 'Experience Specification updated successfully',
            'experienceSpecification' => $experienceSpecification,
        ], 200);
    }
}
