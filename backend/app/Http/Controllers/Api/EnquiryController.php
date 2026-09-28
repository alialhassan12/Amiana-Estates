<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\PropertyType;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function submitEnquiry(Request $request){
        $validated=$request->validate([
            'name'=>['required','string'],
            'phone'=>['required','string'],
            'email'=>['required','email'],
            'interest'=>['required','string'],
            'message'=>['required','string']
        ]);

        $propertyTypes=PropertyType::select('id','title')->get();
        $types=$propertyTypes->pluck('title')->toArray();

        if(!in_array($validated['interest'],$types)){
            return response()->json([
                "message"=>"Select an existing Residence"
            ],404);
        }

        $enquiry=Enquiry::create([
            'name'=>$validated['name'],
            'email'=>$validated['email'],
            'phone'=>$validated['phone'],
            'interest'=>$validated['interest'],
            'message'=>$validated['message'],
        ]);
        return response()->json([
            "message"=>"Enquiry submitted successfully",
            "enquiry"=>$enquiry
        ],201);
    }

    public function getEnquiries(Request $request){
        
        $enquiries=Enquiry::query();
        
        if($request->filled('search')){
            $search=$request->query('search');
            $enquiries->where('name','like',"%{$search}%");
        }

        $enquiries=$enquiries->paginate(5);

        return response()->json([
            'message'=>'Enquiries fetched successfully',
            'enquiries'=>$enquiries
        ],200);
    }
}
