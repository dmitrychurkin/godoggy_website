<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\User;

class AuthController extends Controller
{
    protected function register(Request $request)
    {
        $input = $request->input();

        $validator = Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);

        // $success['token'] = $user->createToken('Personal Access Token')->accessToken;
        $tokenResult = $user->createToken('Personal Access Token');
        return response()->json(['success' => true, 'tokenResult' => $tokenResult]);
    }
}

/*
php artisan passport:install
Encryption keys generated successfully.
Personal access client created successfully.
Client ID: 1
Client secret: ehawEW3yfZBehgDkqPYDbY9zfRUtvxjs3B06BZBk
Password grant client created successfully.
Client ID: 2
Client secret: Xf5UVULN046fV4wGQTITqTZXyb4p6fU41Pf9Unn2
 */
