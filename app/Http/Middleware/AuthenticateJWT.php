<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Closure;
use Exception;

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
    $token = null;
    $this->authenticate($request);
    $payload = auth('api')->payload()->toArray();
    if (isset($payload['r']) && ($payload['r'] === true)) {
      $token = auth('api')->setTTL(525960)->refresh(true);
    }
    return $this->setAuthenticationHeader($next($request), $token);
  }
}
