<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\RefreshCookie;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Password;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Validator;
use Exception;

class ForgotPasswordController extends Controller
{
  use SendsPasswordResetEmails, RefreshCookie;

  // throttle resend email for 15min
  const TIME_FRAME = 15;

  public function sendResetLinkEmail(Request $request)
  {
    $user = auth('api')->user();
    if ($user) {
      $cookie = null;
      try {
        $cookie = $this->getRefreshedCookie();
      } catch (Exception $e) {
        $token = auth('api')->login($user);
        $cookie = cookie('token', $token, config('jwt.ttl'), null, null, false, true);
      } finally {
        return (new UserResource($user))
          ->response()
          ->withCookie($cookie);
      }
    }

    if (Validator::make($request->all(), [
      'email' => 'required|email'
    ])->fails()) {
      return $this->sendResetLinkFailedResponse($request, Password::INVALID_USER);
    }

    $table = config('auth.passwords.users.table');
    $email = $request->only('email');
    $record = (array) DB::table($table)->where('email', $email)->select('created_at')->first();
    if ($record) {
      $timeDiffMinutes = Carbon::parse($record['created_at'])->diffInMinutes(Carbon::now());
      if ($timeDiffMinutes < self::TIME_FRAME) {
        $minutes = self::TIME_FRAME - $timeDiffMinutes;
        return response()->json([
          'errors' => [
            [
              'status' => '409',
              'detail' => trans_choice('passwords.alreadySent', $minutes, ['min' => $minutes])
            ]
          ]
        ], 409);
      }
    }

    // $this->validateEmail($request);

    // We will send the password reset link to this user. Once we have attempted
    // to send the link, we will examine the response then see the message we
    // need to show to the user. Finally, we'll send out a proper response.
    $response = $this->broker()->sendResetLink(
      $this->credentials($request)
    );

    return $response == Password::RESET_LINK_SENT
      ? $this->sendResetLinkResponse($request, $response)
      : $this->sendResetLinkFailedResponse($request, $response);
  }

  private function sendResetLinkResponse(Request $request, $response)
  {
    return response()->json([
      'meta' => [
        'messages' => [
          trans($response)
        ]
      ]
    ]);
  }

  private function sendResetLinkFailedResponse(Request $request, $response)
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
}
