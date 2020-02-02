<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Closure;
use Exception;
use Illuminate\Support\Facades\Cookie;

class AuthenticateJWT extends BaseMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next)
  {
    $cookie = null;
    try {
      $this->authenticate($request);
      $payload = auth('api')->payload();
      $token = isset($payload['r']) && ($payload['r'] === true) ?
        auth('api')->setTTL(525960)->refresh(true) :
        auth('api')->refresh(true);
      $cookie = $token ?
        cookie('token', $token, $payload['r'] ? 525960 : config('jwt.ttl'), null, null, false, true) :
        Cookie::forget('token');
    } catch (UnauthorizedHttpException $e) {
      $cookie = Cookie::forget('token');
    } finally {
      return response(null, 401)->withCookie($cookie);
    }

    Cookie::queue($cookie);
    return $next($request);
  }
}
