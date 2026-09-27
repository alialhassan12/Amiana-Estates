<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PropertyType;
use App\Models\Residence;
use App\Services\PortfolioCacheService;
use Illuminate\Http\Request;

class ResidencesController extends Controller
{

    public function __construct(
        private PortfolioCacheService $portfolioCache
    )
    {
    }

    public function insert(Request $request){
        $validated=$request->validate([
            'title'=>['required','string','max:100'],
            'subTitle'=>['required','string','max:100'],
            'description'=>['nullable','string'],
        ]);

        $residence=Residence::create($validated);

        $this->portfolioCache->forgetResidences();

        return response()->json([
            'message'=>'Residence created successfully',
            'residence'=>$residence,
        ],200);
    }

    public function getResidences(){
        $data = $this->portfolioCache->getResidences();

        return response()->json([
            'message'=>'Residences data fetched successfully',
            'data'=>$data
        ],200);
    }

    public function updateResidences(Request $request){
        $validated=$request->validate([
            'id'=>['required'],
            'title'=>['required','string','max:100'],
            'subTitle'=>['required','string','max:100'],
        ]);

        $residence=Residence::where('id',$validated['id'])->firstOrFail();
        
        $residence->update($validated);

        $this->portfolioCache->forgetResidences();

        return response()->json([
            'message'=>'Residences data updated successfully',
            'residence'=>$residence,
        ],200);
    }
}
