<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __invoke($any = null)
    {
        if ($any) {
            return redirect()->route('home');
        }
        return view('admin');
    }
}
