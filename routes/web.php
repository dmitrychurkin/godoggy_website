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

Route::get('admin', 'AdminController')->name('admin');
Route::group([
    'prefix' => 'admin',
    'name' => 'admin.'
], function () {
    Route::get('login', 'AdminController')->name('login');
    Route::get('dashboard', 'AdminController')->name('dashboard');
    Route::get('password/reset/{token?}', 'AdminController@showResetFormOrFail')->name('password.reset');
    /*Route::view('{any?}', 'admin')->where('any', '.*');
    Route::post('login', 'AdminController@signin');
    Route::post('reset-password', 'AdminController@sendPasswordReset');
    Route::view('password/reset/{token}', 'admin')->name('password.reset');
    Route::post('password/reset', 'AdminController@passwordReset');
    Route::post('logout', 'AdminController@logout');*/
});

Route::get('/', 'Landing');
