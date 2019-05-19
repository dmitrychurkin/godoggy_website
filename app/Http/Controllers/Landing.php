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
                    'name' => 'Overview',
                    'link' => '/'
                ]
            ],
            [
                'main' => [
                    'name' => 'Accommodation',
                    'link' => '/accommodation'
                ],
                'sub' => [
                    [
                        'name' => 'Beach Studio',
                        'link' => '/accommodation/beach-studio'
                    ],
                    [
                        'name' => 'Ocean Studio',
                        'link' => '/accommodation/ocean-studio'
                    ],
                    [
                        'name' => 'Bay Suite',
                        'link' => '/accommodation/bay-suite'
                    ],
                    [
                        'name' => 'Beach Villa',
                        'link' => '/accommodation/beach-villa'
                    ]
                ]
            ],
            [
                'main' => [
                    'name' => 'Dining',
                    'link' => '/dining'
                ],
                'sub' => [
                    [
                        'name' => 'Restaurant',
                        'link' => '/dining/restaurant'
                    ],
                    [
                        'name' => 'Private Dining',
                        'link' => '/dining/private-dining'
                    ]
                ]
            ]
        ];
        return view('landing')->with('navbar', $navbar);
    }
}
