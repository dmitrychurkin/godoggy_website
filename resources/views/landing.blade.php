@styles
@scripts
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>GoDoggy | Charitable donations</title>

    <!-- Fonts -->
    <link href="//fonts.googleapis.com/css?family=Lora|Varela+Round" rel="stylesheet" />

    <!-- Styles -->
    @stack('styles')
    @stack('scripts')
</head>

<body>
    @navbar(['navbar' => $navbar])
    @endnavbar
</body>

</html>