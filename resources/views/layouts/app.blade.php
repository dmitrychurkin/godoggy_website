<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} | Management panel</title>

    <!-- Scripts -->
    <script src="{{ asset('js/admin.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <!-- <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <!-- Styles -->
    <!-- <link href="{{ asset('css/admin.css') }}" rel="stylesheet"> -->
    @php
        $AppState__tvar = [
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
                'E-Mail Address' => __('E-Mail Address'),
                'Password' => __('Password'),
                'Remember Me' => __('Remember Me'),
                'Forgot Your Password?' => __('Forgot Your Password?'),
                
            ],
            'user' => Auth::user() ? [
                'name' => Auth::user()->name
            ] : null
        ]
    @endphp
    <script>
        var AppState = @json($AppState__tvar);
    </script>
</head>

<body>
    @yield('content')
</body>

</html>