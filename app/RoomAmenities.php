<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomAmenities extends Model
{
  public $timestamps = false;
  protected $attributes = [
    'bathPersonalCare' => [],
    'officeEquipmentStationery' => [],
    'mediaEntertainment' => [],
    'refreshments' => [],
    'other' => []
  ];
  public function locale()
  {
    return $this->hasOne('App\Locale');
  }
}
