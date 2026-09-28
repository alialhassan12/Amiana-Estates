<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Services\PortfolioCacheService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    public function __construct(
        private PortfolioCacheService $portfolioCacheService
    )
    {
    }

    public function  getCompanyInfo(){
        $company=Company::select('id','name','logo_path','contact_email','contact_phone')->first();
        return response()->json([
            'message'=>'Company information fetched successfully',
            'company'=>$company,
        ],200);
    }

    public function updateCompanyInfo(Request $request){
        $validated=$request->validate([
            'name'=>['required','string'],
            'logo'=>['sometimes','nullable','image','max:1024']
        ]);

        $company=Company::first();

        if($request->hasFile('logo')){
            if($company->logo_path){
                Storage::disk('public')->delete($company->logo_path);
            }
            $path = $request->file('logo')->store('company','public');
            $validated['logo']=$path;
        }

        $company->update([
            'name'=>$validated['name'],
            'logo_path'=>$validated['logo']?? $company->logo_path
        ]);

        $this->portfolioCacheService->forgetHero();

        return response()->json([
            'message'=>'Company information updated successfully',
            'company'=>$company,
        ],200);
    }

    public function updateContactInfo(Request $request){
        $validated=$request->validate([
            'contact_email'=>['required','email'],
            'contact_phone'=>['required','string']
        ]);

        $company=Company::first();
        $company->update([
            'contact_email'=>$validated['contact_email'],
            'contact_phone'=>$validated['contact_phone']
        ]);

        $this->portfolioCacheService->forgetHero();

        return response()->json([
            'message'=>'Contact information updated successfully',
            'company'=>$company,
        ],200);
    }
}
