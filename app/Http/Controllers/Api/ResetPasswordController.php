<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Hash;
use Str;

class ResetPasswordController extends Controller
{

  use ResetsPasswords;

  public function reset(Request $request)
  {
    if (auth('api')->user()) {
      $user = $this->broker()->getUser($this->credentials($request));
      $this->broker()->deleteToken($user);
      return response(null, 403);
    }
    $request->validate($this->rules(), $this->validationErrorMessages());

    $token = null;
    // Here we will attempt to reset the user's password. If it is successful we
    // will update the password on an actual user model and persist it to the
    // database. Otherwise we will parse the error and return the response.
    $response = $this->broker()->reset(
      $this->credentials($request),
      function ($user, $password) use (&$token) {
        $this->resetPassword($user, $password);
        $token = auth('api')->login($user);
      }
    );

    // If the password was successfully reset, we will redirect the user back to
    // the application's home authenticated view. If there is an error we can
    // redirect them back to where they came from with their error message.
    return $response == Password::PASSWORD_RESET
      ? $this->sendResetResponse($request, $response, $token)
      : $this->sendResetFailedResponse($request, $response);
  }

  private function sendResetResponse(Request $request, $response, $token)
  {
    return response()
      ->json([
        'status' => trans($response)
      ])
      ->withHeaders($token ? [
        'Authorization' => 'Bearer ' . $token,
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
        'Pragma' => 'no-cache',
        'Expires' => '0'
      ] : []);
  }

  private function sendResetFailedResponse(Request $request, $response)
  {
    return response()->json([
      'status' => trans($response)
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
