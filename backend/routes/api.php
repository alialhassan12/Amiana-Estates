<?php

use App\Http\Controllers\Api\EstateController;
use App\Http\Controllers\Api\HeroController;
use App\Http\Controllers\Api\PenthousesController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\PropertyFeaturesController;
use App\Http\Controllers\Api\PropertyTypesController;
use App\Http\Controllers\Api\ResidencesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/hero/create',[HeroController::class,'insert'])->name('hero.create');
Route::get('/hero',[HeroController::class,'getHero'])->name('hero.get');

Route::post('/estate/create',[EstateController::class,'insert'])->name('estate.create');
Route::get('/estate',[EstateController::class,'getEstate'])->name('estate.get');

Route::post('/property/types/create',[PropertyTypesController::class,'insert'])->name('property.types.create');
Route::post('/property/create',[PropertyController::class,'insert'])->name('property.create');

Route::post('/property/features/create',[PropertyFeaturesController::class,'insert'])->name('property.features.create');

Route::post('/residences/create',[ResidencesController::class,'insert'])->name('residence.create');
Route::get('/residences',[ResidencesController::class,'getResidences'])->name('residence.get');

// Penthouses
Route::post('/penthouse/create',[PenthousesController::class,'insert'])->name('penthouse.create');
Route::post('/penthouse/media/insert',[PenthousesController::class,'insertPenthouseMedia'])->name('penthouse.media.insert');
Route::get('/penthouse',[PenthousesController::class,'getPenthouse'])->name('penthouse.get');
