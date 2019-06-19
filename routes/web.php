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
    Route::view('{any?}', 'admin')->where('any', '.*');
    Route::post('login', 'AdminController@login');
    Route::post('reset-password', 'AdminController@sendPasswordReset');
    Route::view('password/reset/{token}', 'admin')->name('password.reset');
    Route::post('password/reset', 'AdminController@passwordReset');
});

Route::get('/', 'Landing');
