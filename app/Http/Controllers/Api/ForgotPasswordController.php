<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
  use SendsPasswordResetEmails;

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
