<?php

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

Route::get('/', 'Landing');

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');

Route::middleware('auth')->get('/api/user', function(Request $request) {
    return $request->user();
});
