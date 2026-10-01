<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DesignPhilosophyController;
use App\Http\Controllers\Api\DesignPhilosophyPrincipleController;
use App\Http\Controllers\Api\DifferenceController;
use App\Http\Controllers\Api\EnquiryController;
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
Route::post('/login',[AuthController::class,'login'])->middleware('throttle:login')->name('login');

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
// difference
Route::get('/difference',[DifferenceController::class,'getDifference'])->name('difference.get');

// enquiries
Route::post('/enquiries/submit',[EnquiryController::class,'submitEnquiry'])->middleware('throttle:login')->name('submit.enquiry');

// protected routes
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout'])->name('logout');
    Route::get('/auth/check',[AuthController::class,'checkAuth'])->name('check.auth');
    
    // dashboard
    Route::get('/dashboard',[DashboardController::class,'getDashboardStats'])->name('dashboard.stats');
    Route::get('/dashboard/logs',[DashboardController::class,'getDashboardLogs'])->name('dashboard.logs');
    
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
    Route::get('/property/types/features',[PropertyTypesController::class,'getPropertyTypesForFeatures'])->name('property.types.features.get');
    Route::post('/property/features/create',[PropertyFeaturesController::class,'insert'])->name('property.features.create');
    Route::get('/property/features',[PropertyFeaturesController::class,'getPropertyFeatures'])->name('property.features.get');
    Route::delete('/property/feature/delete/{id}',[PropertyFeaturesController::class,'deletePropertyFeature'])->name('property.feature.delete');
    Route::put('/property/feature/edit',[PropertyFeaturesController::class,'editPropertyFeature'])->name('property.feature.edit');
    
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
    Route::put('/estate-experience/update',[EstateExperienceController::class,'updateEstateExperience'])->name('estate.experience.update');
    
    // Estate Experience Specifications
    Route::post('/estate-experience-specifications/create',[ExperienceSpecificationController::class,'insert'])->name('estate.experience.specification.create');
    Route::get('/estate-experience-specifications',[ExperienceSpecificationController::class,'getExperienceSpecifications'])->name('estate.experience.specification.get');
    Route::delete('/estate-experience-specifications/delete/{id}',[ExperienceSpecificationController::class,'delete'])->name('estate.experience.specification.delete');
    Route::put('/estate-experience-specifications/update',[ExperienceSpecificationController::class,'edit'])->name('estate.experience.specification.edit');
    

    // design philosophy
    Route::post('/design-philosophy/create',[DesignPhilosophyController::class,'insert'])->name('design.philosophy.create');
    Route::put('/design-philosophy/update',[DesignPhilosophyController::class,'updateDesignphilosophy'])->name('design.philosophy.update');

    // design philosophy principles
    Route::post('/design-philosophy/principles/create',[DesignPhilosophyPrincipleController::class,'insert'])->name('design.philosophy.principles.create');
    Route::put('/design-philosophy/principles/update',[DesignPhilosophyPrincipleController::class,'update'])->name('design.philosophy.principles.update');
    Route::delete('/design-philosophy/principles/delete/{id}',[DesignPhilosophyPrincipleController::class,'delete'])->name('design.philosophy.principles.delete');
    
    // difference
    Route::put('/difference/update',[DifferenceController::class,'update'])->name('difference.update');

    // settings
    Route::get('/settings/company',[CompanyController::class,'getCompanyInfo'])->name('settings.company.get');
    Route::put('/settings/company/update',[CompanyController::class,'updateCompanyInfo'])->name('settings.company.update');
    Route::put('/settings/company/update/contact',[CompanyController::class,'updateContactInfo'])->name('settings.company.contact.update');

    Route::get('/settings/socials',[SocialController::class,'getSocials'])->name('settings.socials.get');
    Route::post('/settings/socials/create',[SocialController::class,'addSocial'])->name('settings.socials.add');
    Route::put('/settings/socials/update',[SocialController::class,'updateSocial'])->name('settings.socials.update');
    Route::delete('/settings/socials/delete/{id}',[SocialController::class,'deleteSocial'])->name('settings.socials.delete');
    
    Route::put('/settings/location/update',[LocationController::class,'updateLocation'])->name('settings.location.update');

    Route::put('/settings/password/update',[AuthController::class,'updatePassword'])->name('settings.password.update');

    // enquiries
    Route::get('/enquiries',[EnquiryController::class,'getEnquiries'])->name('get.enquiries');

});
