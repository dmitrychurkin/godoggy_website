<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} | Management panel</title>

    <!-- Scripts -->
    <script src="{{ asset('js/admin.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <!-- <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"> -->
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
    @php
        $LayoutState__tvar = [
            'appName' => config('app.name', 'Laravel'),
            'locale' => app()->getLocale(),
            'authenticated' => Auth::check(),
            'guest' => !Auth::check(),
            'routes' => [
                'root' => url('/'),
            ],
            'i18n' => [
                'Toggle navigation' => __('Toggle navigation'),
                'Login' => __('Login'),
                'Register' => Route::has('register') ? __('Register') : '',
            ],
            'user' => Auth::user() ? [
                'name' => Auth::user()->name
            ] : null
        ]
    @endphp
    <script>
        var AppState = @json($LayoutState__tvar);
    </script>
</head>

<body>
    @yield('content')
</body>

</html>