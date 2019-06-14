<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

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

    public function signin(Request $request) {
        // user already registered
        if ($this->guard()->check()) {
            return response()->json([
                'success' => true,
                'user' => Auth::user()
            ]);
        }
        $this->login($request);
        return response()->json([
            'success' => true,
            'user' => Auth::user()
        ]);
    }

    protected function authenticated(Request $request, $user){
        return true;
    }
}
