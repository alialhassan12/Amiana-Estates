<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Difference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DifferenceController extends Controller
{
    public function getDifference(){
        $difference=Difference::first();

        return response()->json([
            'message'=>'Difference fetched successfully',
            'difference'=>$difference
        ],200);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'id' => ['required','exists:differences,id'],
            'title' => ['required', 'string', 'max:100'],
            'subTitle' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        $diff = Difference::findOrFail($validated['id']);

        if ($request->hasFile('image')) {

            if (isset($diff->image)) {
                Storage::disk('public')->delete($diff->image);
            }

            $path = $request->file('image')->store('differences', 'public');
            if ($path === false) {
                return response()->json([
                    'message' => 'Failed to upload image',
                ], 500);
            }

            $validated['image'] = $path;
        }

        $diff->update($validated);

        return response()->json([
            'message' => 'Difference updated successfully',
            'difference' => $diff,
        ], 200);
    }
}
