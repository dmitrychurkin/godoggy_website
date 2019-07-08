<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
  use SendsPasswordResetEmails;

  // public function sendPasswordReset(Request $request)
  // {
  //  user already registered
  // $guard = $this->guard();
  // $user = $guard->user();
  // if ($guard->check()) {
  //   return response()->json([
  //     'success' => true,
  //     'user' => [
  //       'name' => $user->name,
  //       'email' => $user->email
  //     ]
  //   ]);
  // }
  // return $this->sendResetLinkEmail($request);
  // }

  protected function sendResetLinkResponse(Request $request, $response)
  {
    return response()->json([
      'success' => true,
      'status' => trans($response)
    ]);
  }

  protected function sendResetLinkFailedResponse(Request $request, $response)
  {
    return response()->json([
      'success' => false,
      'status' => trans($response)
    ]);
  }
}
