@styles
@scripts
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Hotels in Sri Lanka | Peace Heaven Hotel Sri Lanka Official Site</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Marcellus+SC&display=swap|Lora|Varela+Round" rel="stylesheet">
    @stack('styles')
    @stack('scripts')
</head>

<body>
    @navbar(['navbar' => $navbar])
    @endnavbar
</body>

</html>