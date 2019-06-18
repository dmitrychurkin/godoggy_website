<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Foundation\Auth\ResetsPasswords;

class AdminController extends Controller
{
    use AuthenticatesUsers, SendsPasswordResetEmails, ResetsPasswords {
        AuthenticatesUsers::credentials insteadof ResetsPasswords;
        AuthenticatesUsers::guard insteadof ResetsPasswords;
        AuthenticatesUsers::redirectPath insteadof ResetsPasswords;
        ResetsPasswords::broker insteadof SendsPasswordResetEmails;
    }

    // public function __invoke()
    // {
    //     return view('admin');
    // }

    public function login(Request $request)
    {
        // user already registered
        $guard = $this->guard();
        if ($guard->check()) {
            return response()->json([
                'success' => true,
                'user' => $guard->user()
            ]);
        }
        return $this->login($request);
    }

    protected function authenticated(Request $request, $user)
    {
        return response()->json([
            'success' => true,
            'user' => [
                'name' => $user->name,
                'email' => $user->email
            ]
        ]);
    }

    public function showResetForm(Request $request, $token = null)
    {
        return view('admin')->with(
            ['token' => $token, 'email' => $request->email]
        );
    }

    public function sendPasswordReset(Request $request)
    {
        // user already registered
        $guard = $this->guard();
        if ($guard->check()) {
            return response()->json([
                'success' => true,
                'user' => $guard->user()
            ]);
        }
        return $this->sendResetLinkEmail($request);
    }

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
