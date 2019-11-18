<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Password;
use Hash;
use DB;

class AdminController extends Controller
{
    public function __invoke()
    {
        return view('admin');
    }

    public function showResetFormOrFail(Request $request, $resetToken = null)
    {
        $email = $request->query('email', null);
        /* if ($resetToken && !$email) {
            return abort(404);
        }
        if (!$resetToken) {
            return view('admin');
        } */
        if (!$resetToken || !$email) {
            return abort(404);
        }
        $validator = Validator::make(['email' => $email], [
            'email' => 'required|email'
        ]);
        if ($validator->fails()) {
            return abort(404);
        }

        // retrieve user
        if (is_null($user = Password::broker()->getUser(['email' => $email]))) {
            return abort(404);
        }

        ['table' => $table, 'expire' => $expire] = config('auth.passwords.users');
        $expires = $expire * 60;

        $record = (array) DB::table($table)->where(
            'email',
            $user->getEmailForPasswordReset()
        )->first();

        $isTokenValid = $record &&
            !Carbon::parse($record['created_at'])->addSeconds($expires)->isPast() &&
            Hash::check($resetToken, $record['token']);

        // remove expired tokens
        $expiredAt = Carbon::now()->subSeconds($expires);
        DB::table($table)->where('created_at', '<', $expiredAt)->delete();

        return $isTokenValid ? view('admin') : abort(404);
    }
}
