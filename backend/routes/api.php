<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DesignPhilosophyController;
use App\Http\Controllers\Api\DesignPhilosophyPrincipleController;
use App\Http\Controllers\Api\EstateController;
use App\Http\Controllers\Api\EstateExperienceController;
use App\Http\Controllers\Api\ExperienceSpecificationController;
use App\Http\Controllers\Api\HeroController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\PenthouseMediaController;
use App\Http\Controllers\Api\PenthousesController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\PropertyFeaturesController;
use App\Http\Controllers\Api\PropertyTypesController;
use App\Http\Controllers\Api\ResidencesController;
use App\Http\Controllers\Api\SocialController;
use Illuminate\Support\Facades\Route;

// public routes
Route::post('/login',[AuthController::class,'login'])->name('login');
// Route::post('/register',[AuthController::class,'register'])->name('register');
// hero
Route::get('/hero',[HeroController::class,'getHero'])->name('hero.get');
// estate
Route::get('/estate',[EstateController::class,'getEstate'])->name('estate.get');
// residences 
Route::get('/residences',[ResidencesController::class,'getResidences'])->name('residence.get');
// Penthouses
Route::get('/penthouse',[PenthousesController::class,'getPenthouse'])->name('penthouse.get');
// Estate Experience
Route::get('/estate-experience',[EstateExperienceController::class,'getEstateExperience'])->name('estate.experience.get');
// design philosophy
Route::get('/design-philosophy',[DesignPhilosophyController::class,'getDesignPhilosophy'])->name('design.philosophy.get');
// location
Route::get('/location',[LocationController::class,'getLocation'])->name('location.get');
// socials
Route::get('/socials',[SocialController::class,'getSocials'])->name('socials.get');


// protected routes
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout'])->name('logout');
    Route::get('/auth/check',[AuthController::class,'checkAuth'])->name('check.auth');
    
    // dashboard
    Route::get('/dashboard',[DashboardController::class,'getDashboardStats'])->name('dashboard.stats');
    
    // hero
    Route::post('/hero/create',[HeroController::class,'insert'])->name('hero.create');
    Route::put('/hero/update',[HeroController::class,'update'])->name('hero.update');
    
    //estate 
    Route::post('/estate/create',[EstateController::class,'insert'])->name('estate.create');
    Route::put('/estate/update',[EstateController::class,'updateEstate'])->name('estate.update');
    
    // property types
    Route::post('/property/types/create',[PropertyTypesController::class,'insert'])->name('property.types.create');
    Route::get('/property/types',[PropertyTypesController::class,'getPropertyTypes'])->name('property.types.get');
    Route::put('/property/types/edit',[PropertyTypesController::class,'editPropertyType'])->name('property.types.edit');
    Route::delete('/property/types/delete/{id}',[PropertyTypesController::class,'deletePropertyType'])->name('property.types.delete');
    
    // property
    Route::post('/property/create',[PropertyController::class,'insert'])->name('property.create');

    // property features
    Route::post('/property/features/create',[PropertyFeaturesController::class,'insert'])->name('property.features.create');
    
    // residences
    Route::post('/residences/create',[ResidencesController::class,'insert'])->name('residence.create');
    Route::put('/residences/update',[ResidencesController::class,'updateResidences'])->name('residences.update');

    // penthouse
    Route::post('/penthouse/create',[PenthousesController::class,'insert'])->name('penthouse.create');
    Route::put('/penthouse/edit',[PenthousesController::class,'updatePenthouse'])->name('penthouse.edit');
    // penthouse media
    Route::post('/penthouse/media/insert',[PenthouseMediaController::class,'insertPenthouseMedia'])->name('penthouse.media.insert');
    Route::post('/penthouse/media/delete/{id}',[PenthouseMediaController::class,'deletePenthouseMedia'])->name('penthouse.media.delete');
    
    // estate experience
    Route::post('/estate-experience/create',[EstateExperienceController::class,'insert'])->name('estate.experience.create');
    
    // Estate Experience Specifications
    Route::post('/estate-experience-specification/create',[ExperienceSpecificationController::class,'insert'])->name('estate.experience.specification.create');

    // design philosophy
    Route::post('/design-philosophy/create',[DesignPhilosophyController::class,'insert'])->name('design.philosophy.create');

    // design philosophy principles
    Route::post('/design-philosophy-principles/create',[DesignPhilosophyPrincipleController::class,'insert'])->name('design.philosophy.principles.create');

    // location
    Route::post('/location/update',[LocationController::class,'updateOrInsertLocation'])->name('location.update-or-insert');

    //property features
    Route::get('/property/types/features',[PropertyTypesController::class,'getPropertyTypesForFeatures'])->name('property.types.features.get');
    Route::post('/property/features/create',[PropertyFeaturesController::class,'insert'])->name('property.features.create');
    Route::get('/property/features',[PropertyFeaturesController::class,'getPropertyFeatures'])->name('property.features.get');
    Route::delete('/property/feature/delete/{id}',[PropertyFeaturesController::class,'deletePropertyFeature'])->name('property.feature.delete');
    Route::put('/property/feature/edit',[PropertyFeaturesController::class,'editPropertyFeature'])->name('property.feature.edit');
});
