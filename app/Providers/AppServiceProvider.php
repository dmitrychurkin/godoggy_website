<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::include('includes.styles', 'styles');
        Blade::include('includes.scripts', 'scripts');
        Blade::component('components.navbar', 'navbar');
        Blade::component('components.logo', 'logo');
        Blade::component('components.footer', 'footer');
    }
}
