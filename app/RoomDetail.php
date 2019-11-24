<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoomDetail extends Model
{
  public $timestamps = false;
  protected $attributes = [
    'description' => '',
    'bed' => ['KING', 'TWIN'],
    'meals' => ['BB', 'HB', 'FB'],
    'roomView' => [],
    'bathroom' => '',
    'view' => '',
    'features' => []
  ];
  public function locale()
  {
    return $this->hasOne('App\Locale');
  }
}
