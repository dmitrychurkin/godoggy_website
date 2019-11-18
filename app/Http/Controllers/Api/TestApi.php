<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TestApi extends Controller
{
    public function badRequest(Request $request)
    {
        // if (rand(1, 5) < 3) {
        //     return response(null, 400);
        // }
        // return response('');
        return response(null, 400);
    }
}
