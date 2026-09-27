<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penthouse;
use App\Models\PenthouseMedia;
use App\Models\PropertyType;
use App\Services\PortfolioCacheService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PenthousesController extends Controller
{
    public function __construct(
        private PortfolioCacheService $portfolioCache
    )
    {
    }

    public function insert(Request $request){
        $validated=$request->validate([
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'description'=>['required','string'],
        ]);

        $penthouse=Penthouse::create($validated);

        $this->portfolioCache->forgetPenthouse();

        return response()->json([
            'message'=>'Penthouse created successfully',
            'penthouse'=>$penthouse
        ]);
    }

    public function getPenthouse(){
        $data=$this->portfolioCache->getPenthouse();

        $penthouse=$data['penthouse'];
        $features=$data['features'];

        return response()->json([
            'message'=>'Penthouse fetched successfully',
            'penthouse'=>$penthouse,
            'features'=>$features,
        ]);
    }

    public function updatePenthouse(Request $request){
        $validated=$request->validate([
            'title'=>['required','string'],
            'subTitle'=>['required','string'],
            'description'=>['required','string'],
        ]);

        $penthouse=Penthouse::firstOrFail();
        $penthouse->update($validated);

        $this->portfolioCache->forgetPenthouse();

        return response()->json([
            'message'=>'Penthouse updated successfully',
            'penthouse'=>$penthouse
        ]);
    }
}
