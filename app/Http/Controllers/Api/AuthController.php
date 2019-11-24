<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth')->except('login');
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        $remember_me = $request->input('remember', false);
        // $ttl = $remember_me ? 525960 : config('jwt.ttl');
        $jwt = $remember_me ?
            auth('api')->claims(['r' => true])->setTTL(525960) : auth('api');
        if (!$token = $jwt->attempt($credentials)) {
            throw ValidationException::withMessages([
                'status' => [trans('auth.failed')],
            ]);
        }
        return response(null, 204)
            ->withHeaders($this->headers(['Authorization' => 'Bearer ' . $token]));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout(true);
        return response(null, 204)
            ->withHeaders($this->headers());
    }

    public function validateToken()
    {
        return response(null, 204)
            ->withHeaders($this->headers());
    }

    private function headers($array = [])
    {
        return array_merge($array, [
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0'
        ]);
    }
}
