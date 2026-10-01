<?php

namespace App\Providers;

use App\Models\Company;
use App\Models\DesignPhilosophy;
use App\Models\Difference;
use App\Models\Estate;
use App\Models\EstateExperience;
use App\Models\ExperienceSpecification;
use App\Models\Location;
use App\Models\Penthouse;
use App\Models\PenthouseMedia;
use App\Models\PropertyFeature;
use App\Models\PropertyType;
use App\Models\Residence;
use App\Models\Social;
use App\Observers\CompanyObserver;
use App\Observers\DesignPhilosophyObserver;
use App\Observers\DifferenceObserver;
use App\Observers\EstateExperienceObserver;
use App\Observers\EstateObserver;
use App\Observers\ExperienceSpecificationObserver;
use App\Observers\LocationObserver;
use App\Observers\PenthouseMediaObserver;
use App\Observers\PenthouseObserver;
use App\Observers\PropertyFeatureObserver;
use App\Observers\PropertyTypeObserver;
use App\Observers\ResidenceObserver;
use App\Observers\SocialObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('login',function(Request $request){
            return Limit::perMinute(5)->by($request->ip());
        });

        // Register Observers for Activity Logs
        Estate::observe(EstateObserver::class);
        Residence::observe(ResidenceObserver::class);
        Penthouse::observe(PenthouseObserver::class);
        PenthouseMedia::observe(PenthouseMediaObserver::class);
        EstateExperience::observe(EstateExperienceObserver::class);
        ExperienceSpecification::observe(ExperienceSpecificationObserver::class);
        DesignPhilosophy::observe(DesignPhilosophyObserver::class);
        Difference::observe(DifferenceObserver::class);
        PropertyType::observe(PropertyTypeObserver::class);
        PropertyFeature::observe(PropertyFeatureObserver::class);
        Company::observe(CompanyObserver::class);
        Social::observe(SocialObserver::class);
        Location::observe(LocationObserver::class);
    }
}
