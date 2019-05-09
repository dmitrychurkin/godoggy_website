<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Landing extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $navbar = [
            [
                'main' => [
                    'name' => 'How we help',
                    'link' => '/how-we-help'
                ],
                'sub' => [
                    [
                        'name' => 'Rehoming',
                        'link' => '/rehome-pet'
                    ]
                ]
            ]
        ];
        return view('landing')->with('navbar', $navbar);
    }
}
