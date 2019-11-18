<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />

    <!-- CSRF Token -->
    <!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->

    <title>{{ config('app.name', 'Laravel') }} | Management panel</title>

    <!-- Scripts -->
    <script src="{{ asset('js/admin.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <!-- <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"> -->
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> -->
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <!-- Styles -->
    <!-- <link href="{{ asset('css/admin.css') }}" rel="stylesheet"> -->
    @php
        $user__tvar = Auth::user();
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
                'Reset Password' => __('Reset Password'),
                'Send Password Reset Link' => __('Send Password Reset Link'),
                'Confirm Password' => __('Confirm Password')
            ],
            'user' => $user__tvar ? [
                'name' => $user__tvar->name,
                'email' => $user__tvar->email
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