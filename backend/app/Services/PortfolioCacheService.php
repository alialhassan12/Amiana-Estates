<?php

namespace App\Services;

use App\Models\Company;
use App\Models\DesignPhilosophy;
use App\Models\Difference;
use App\Models\Estate;
use App\Models\EstateExperience;
use App\Models\Penthouse;
use App\Models\Property;
use App\Models\PropertyType;
use App\Models\Residence;
use Illuminate\Support\Facades\Cache;

class PortfolioCacheService
{
    // hero cache
    public function getHero()
    {
        return Cache::remember(
            'portfolio.hero',
            now()->addMinutes(30),
            function () {
                $company = Company::first();
                return $company ? $company->toArray() : null;
            }
        );
    }
    public function forgetHero()
    {
        Cache::forget('portfolio.hero');
    }

    // the estate cache
    public function getEstate(){
        return Cache::remember(
            'portfolio.estate',
            now()->addMinutes(30),
            function(){
                $estate=Estate::first();
                $levelOfArchitecture=Company::first('number_of_floors');
                $totalResidences=Property::count();
                $propertyType=PropertyType::where('is_penthouse',true)->first();
                $propertyTypeArea=$propertyType?->area.' '.$propertyType?->area_unit;
                return [
                    'estate'=>$estate?$estate->toArray():null,
                    'levelOfArchitecture'=>$levelOfArchitecture->number_of_floors,
                    'totalResidences'=>$totalResidences,
                    'propertyTypeArea'=>$propertyTypeArea
                ];
            }
        );
    }
    public function forgetEstate(){
        Cache::forget('portfolio.estate');
    }

    // residences cache
    public function getResidences(){
        return Cache::remember(
            'portfolio.residences',
            now()->addMinutes(30),
            function(){
                $residence=Residence::first();
                $propertyTypes=PropertyType::with('features')->orderBy('display_order','asc')->get();
                
                // get only first 3 features for each property type
                $propertyTypes->each(function($propertyTypes){
                    $propertyTypes->setRelation(
                        'features',
                        $propertyTypes->features->take(3)
                    );
                });

                $featuredProperty=$propertyTypes->where('is_penthouse',true)->first();
                $propertyTypes=$propertyTypes->where('is_penthouse',false)->values();

                return [
                    'residence'=>$residence?->toArray(),
                    'featuredProperty'=>$featuredProperty?->toArray(),
                    'propertyTypes'=>$propertyTypes?->toArray()
                ];
            }
        );
    }
    public function forgetResidences(){
        Cache::forget('portfolio.residences');
    }

    // penthouse cache
    public function getPenthouse(){
        return Cache::remember(
            'portfolio.penthouse',
            now()->addMinutes(30),
            function (){
                $penthouse=Penthouse::with(['penthouseMedia'])->first();

                // features from penthouse
                $penthouse_property_type=PropertyType::where('is_penthouse',true)
                        ->with('features')
                        ->first();

                $features=$penthouse_property_type->features;
                $features=$features->take(5);

                return [
                    'penthouse'=>$penthouse?->toArray(),
                    'features'=>$features?->toArray(),
                ];
            }
        );
    }

    public function forgetPenthouse(){
        Cache::forget('portfolio.penthouse');
    }

    // estate experience cache
    public function getEstateExperience(){
        return Cache::remember(
            'portfolio.estate-experience',
            now()->addMinutes(30),
            function(){
                $estateExperience=EstateExperience::with('specifications')->first();

                return $estateExperience?->toArray();
            }
        );
    }
    public function forgetEstateExperience(){
        Cache::forget('portfolio.estate-experience');
    }
    
    // amiana philosophy cache
    public function getDesignPhilosophy(){
        return Cache::remember(
            'portfolio.philosophy',
            now()->addMinutes(30),
            function(){
                $designPhilosophy=DesignPhilosophy::with('design_philosophy_principles')->firstOrFail();

                return $designPhilosophy?->toArray();
            }
        );
    }
    public function forgetDesignPhilosophy(){
        Cache::forget('portfolio.philosophy');
    }

    // difference cache
    public function getDifference(){
        return Cache::remember(
            'portfolio.difference',
            now()->addMinutes(30),
            function(){
                $difference=Difference::first();

                return $difference?->toArray();
            }
        );
    }

    public function forgetDifference(){
        Cache::forget('portfolio.difference');
    }

}
