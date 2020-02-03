<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
// use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Closure;
use Illuminate\Support\Facades\Cookie;
use App\Traits\RefreshCookie;

class AuthenticateJWT extends BaseMiddleware
{
  use RefreshCookie;
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
      $cookie = $this->getRefreshedCookie();
    } catch (UnauthorizedHttpException $e) {
      return response(null, 401)->withCookie(Cookie::forget('token'));
    }

    Cookie::queue($cookie);
    return $next($request);
  }
}
