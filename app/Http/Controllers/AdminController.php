<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Foundation\Auth\ResetsPasswords;

class AdminController extends Controller
{
    use AuthenticatesUsers, SendsPasswordResetEmails, ResetsPasswords {
    ResetsPasswords::credentials insteadof AuthenticatesUsers;
    AuthenticatesUsers::guard insteadof ResetsPasswords;
    AuthenticatesUsers::redirectPath insteadof ResetsPasswords;
    ResetsPasswords::broker insteadof SendsPasswordResetEmails;
    }

    public function signin(Request $request)
    {
        // user already registered
        $guard = $this->guard();
        $user = $guard->user();
        if ($guard->check()) {
            return response()->json([
                'success' => true,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email
                ]
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

    public function sendPasswordReset(Request $request)
    {
        // user already registered
        $guard = $this->guard();
        $user = $guard->user();
        if ($guard->check()) {
            return response()->json([
                'success' => true,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email
                ]
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

    public function passwordReset(Request $request)
    {
        // user already registered
        $guard = $this->guard();
        $user = $guard->user();
        if ($guard->check()) {
            return response()->json([
                'success' => true,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email
                ]
            ]);
        }
        return $this->reset($request);
    }

    protected function sendResetResponse(Request $request, $response)
    {
        $user = $this->guard()->user();
        return response()->json([
            'success' => true,
            'status' => trans($response),
            'user' => [
                'name' => $user->name,
                'email' => $user->email
            ]
        ]);
    }

    protected function sendResetFailedResponse(Request $request, $response)
    {
        return $this->sendResetLinkFailedResponse($request, $response);
    }

    protected function loggedOut(Request $request)
    {
        return response()->json([
            'success' => true
        ]);
    }
}
