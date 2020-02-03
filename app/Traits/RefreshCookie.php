<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cookie;

trait RefreshCookie
{
  private function getRefreshedCookie()
  {
    $payload = auth('api')->payload();
    $token = isset($payload['r']) && ($payload['r'] === true) ?
      auth('api')->setTTL(525960)->refresh(true) :
      auth('api')->refresh(true);
    return $token ?
      cookie('token', $token, $payload['r'] ? 525960 : config('jwt.ttl'), null, null, false, true) :
      Cookie::forget('token');
  }
}
