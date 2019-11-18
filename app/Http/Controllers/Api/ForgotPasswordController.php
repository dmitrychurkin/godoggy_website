<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
  use SendsPasswordResetEmails;

  public function sendResetLinkEmail(Request $request)
  {
    if (auth('api')->user()) {
      return response(null, 403);
    }
    $TIME_FRAME = 15;
    $table = config('auth.passwords.users.table');
    $email = $request->only('email');
    $record = (array) DB::table($table)->where('email', $email)->select('created_at')->first();
    if ($record) {
      $timeDiffMinutes = Carbon::parse($record['created_at'])->diffInMinutes(Carbon::now());
      if ($timeDiffMinutes < $TIME_FRAME) {
        $minutes = $TIME_FRAME - $timeDiffMinutes;
        return response()->json([
          'status' => trans_choice('passwords.alreadySent', $minutes, ['min' => $minutes])
        ], 409);
      }
    }

    $this->validateEmail($request);

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
      'status' => trans($response)
    ]);
  }

  private function sendResetLinkFailedResponse(Request $request, $response)
  {
    return response()->json([
      'status' => trans($response)
    ], 400);
  }
}
