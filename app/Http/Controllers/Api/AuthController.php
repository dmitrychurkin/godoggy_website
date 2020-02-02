<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\User as UserResource;
use Exception;

class AuthController extends Controller
{
  /**
   * Create a new AuthController instance.
   *
   * @return void
   */
  public function __construct()
  {
    // $this->middleware('jwt.auth')->except('login');
  }

  /**
   * Get a JWT via given credentials.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'bail|required|email',
      'password' => 'required|between:8,255'
    ]);
    $errors = [
      'errors' => [
        [
          'status' => '422',
          'detail' => trans('auth.failed')
        ]
      ]
    ];
    if ($validator->fails()) {
      return response()->json($errors, 422);
    }
    $credentials = $request->only(['email', 'password']);
    $remember_me = $request->input('remember', false);
    $jwt = $remember_me ?
      auth('api')->claims(['r' => true])->setTTL(525960) : auth('api');
    if (!$token = $jwt->attempt($credentials)) {
      return response()->json($errors, 422);
    }
    $min = $remember_me ? 525960 : config('jwt.ttl');
    return (new UserResource(auth('api')->user()))
      ->response()
      ->cookie('token', $token, $min, null, null, false, true);
  }

  /**
   * Log the user out (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout()
  {
    try {
      auth('api')->logout(true);
    } catch (Exception $e) {
    }

    return response(null, 204)
      ->withCookie(Cookie::forget('token'));
  }

  public function validateToken()
  {
    try {
      $user = auth('api')->userOrFail();
      $payload = auth('api')->payload();
      $token = isset($payload['r']) && ($payload['r'] === true) ?
        auth('api')->setTTL(525960)->refresh(true) :
        auth('api')->refresh(true);
      $cookie = $token ?
        cookie('token', $token, $payload['r'] ? 525960 : config('jwt.ttl'), null, null, false, true) :
        Cookie::forget('token');
      return (new UserResource($user))
        ->response()
        ->withCookie($cookie);
    } catch (Exception $e) {
      return response(null, 204)
        ->withCookie(Cookie::forget('token'));
    }
  }
}
