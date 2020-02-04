<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Traits\RefreshCookie;

class ResetPasswordController extends Controller
{

  use ResetsPasswords, RefreshCookie;

  public function reset(Request $request)
  {
    /* if (auth('api')->user()) {
      $user = $this->broker()->getUser($this->credentials($request));
      $this->broker()->deleteToken($user);
      return response(null, 403);
    } */
    $user = auth('api')->user();
    if ($user) {
      $cookie = null;
      try {
        $cookie = $this->getRefreshedCookie();
      } catch (Exception $e) {
        $token = auth('api')->login($user);
        $cookie = cookie('token', $token, config('jwt.ttl'), null, null, false, true);
      } finally {
        $this->broker()->deleteToken(
          $this->broker()->getUser($this->credentials($request))
        );
        return (new UserResource($user))
          ->response()
          ->withCookie($cookie);
      }
    }

    $validator = Validator::make($request->all(), [
      'token' => 'bail|required',
      'email' => 'bail|required|email',
      'password' => 'bail|required|confirmed|min:8',
    ]);
    if ($validator->fails()) {
      return response()
        ->json([
          'errors' => array_map(function ($error) {
            return [
              'status' => '422',
              'detail' => $error
            ];
          }, $validator->errors()->all())
        ], 422);
    }

    // $request->validate($this->rules(), $this->validationErrorMessages());

    $token = null;
    $authenticatedUser = null;
    // Here we will attempt to reset the user's password. If it is successful we
    // will update the password on an actual user model and persist it to the
    // database. Otherwise we will parse the error and return the response.
    $response = $this->broker()->reset(
      $this->credentials($request),
      function ($user, $password) use (&$token, &$authenticatedUser) {
        $this->resetPassword($user, $password);
        $token = auth('api')->login($user);
        $authenticatedUser = $user;
      }
    );

    // If the password was successfully reset, we will redirect the user back to
    // the application's home authenticated view. If there is an error we can
    // redirect them back to where they came from with their error message.
    return $response == Password::PASSWORD_RESET
      ? $this->sendResetResponse($request, $response, $token, $authenticatedUser)
      : $this->sendResetFailedResponse($request, $response);
  }

  private function sendResetResponse(Request $request, $response, $token, $authenticatedUser)
  {
    /* return response()
      ->json([
        'status' => trans($response)
      ])
      ->withHeaders($token ? [
        'Authorization' => 'Bearer ' . $token,
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
        'Pragma' => 'no-cache',
        'Expires' => '0'
      ] : []);*/
    return (new UserResource($authenticatedUser))
      ->additional([
        'meta' => [
          'messages' => [
            trans($response)
          ]
        ]
      ])
      ->response()
      ->cookie('token', $token, config('jwt.ttl'), null, null, false, true);
  }

  private function sendResetFailedResponse(Request $request, $response)
  {
    return response()->json([
      'errors' => [
        [
          'status' => '400',
          'detail' => trans($response)
        ]
      ]
    ], 400);
  }

  private function resetPassword(Authenticatable $user, $password)
  {
    $user->password = Hash::make($password);

    $user->setRememberToken(Str::random(60));

    $user->save();

    event(new PasswordReset($user));
  }
}
