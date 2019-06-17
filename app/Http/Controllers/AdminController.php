<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AdminController extends Controller
{
    use AuthenticatesUsers;

    public function __invoke($any = null)
    {
        if ($any) {
            return redirect()->route('home');
        }
        return view('admin');
    }

    public function signin(Request $request)
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
}
