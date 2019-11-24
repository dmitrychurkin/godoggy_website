<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Middleware\AuthenticateJWT;
use Illuminate\Http\Request;
use App\Locale;
use App\Room;
use App;

class RoomController extends Controller
{
  public function __construct()
  {
    $this->middleware(AuthenticateJWT::class);
  }
  public function getAccommodation()
  {
    $currentLocale = App::getLocale();
    $queryCallback = function ($query) use (&$currentLocale) {
      $query->where('locale.code', $currentLocale);
    };
    $rooms = Room::all();
    $rooms->load([
      'details' => $queryCallback,
      'amenities' => $queryCallback
    ]);
    return response()->json([
      'locales' => Locale::all()->toArray(),
      'rooms' => $rooms->toArray(),
      'currentLocale' => $currentLocale
    ]);
  }
}
