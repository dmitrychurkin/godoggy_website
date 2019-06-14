<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([
    'prefix' => 'admin',
    'name' => 'admin.'
], function () {
    Route::get('{any?}', 'AdminController')->where('any', '.*')->name('home');
    Route::post('signin', 'AdminController@signin');
});

Route::get('/', 'Landing');
