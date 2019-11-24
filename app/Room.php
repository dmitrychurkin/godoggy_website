<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
  protected $attributes = [
    'size' => 0,
    'unsignedTinyInteger' => 1,
    'count' => 1,
    'extraBed' => true,
    'occupancy' => 3,
    'roomType' => 0,
    'wifi' => true,
    'minibar' => true,
    'safe' => true,
    'phone' => true,
    'balcony' => false,
    'jacuzzi' => false,
    'satellite' => true
  ];
  public function details()
  {
    return $this->hasMany('App\RoomDetail');
  }
  public function amenities()
  {
    return $this->hasMany('App\RoomAmenities');
  }
}
