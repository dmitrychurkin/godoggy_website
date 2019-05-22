@styles
@scripts
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Hotels in Sri Lanka | Peace Heaven Hotel Sri Lanka Official Site</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Marcellus+SC|Lora|Varela+Round" rel="stylesheet">
    @stack('styles')
    @stack('scripts')
</head>

<body style="height: 2000px">
    @navbar(['navbar' => $navbar])
    @endnavbar
    <div class="slider">
        <div class="intro center-align">
            <h1>Enjoy your stay with us!</h2>
                <h3>Get maximum out of vacation</h3>
                <a class="waves-effect waves-light btn-large blue lighten-1">overview</a>
        </div>
        <ul class="slides">
            <li>
                <img src="/images/slider1.jpg">
            </li>
            <li>
                <img src="/images/slider2.jpg">
            </li>
            <li>
                <img src="/images/slider3.jpg">
            </li>
            <li>
                <img src="/images/slider4.jpg">
            </li>
            <li>
                <img src="/images/slider5.jpg">
            </li>
        </ul>
    </div>
    <div class="swipe-hint swipe-horizontal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <path class="hand-x" d="M139.93,113.56l-41.12-6.93V76.08a9.25,9.25,0,0,0-9.25-9.25h0a9.25,9.25,0,0,0-9.25,9.25v57.36L71,122.65c-3.61-3.61-8.44-3.89-13.08,0,0,0-7.24,5.84-3.83,9.25l34,34h42.63a9.25,9.25,0,0,0,9.07-7.43l6.82-34.09A9.28,9.28,0,0,0,139.93,113.56Z"/>
        </svg>
    </div>
</body>

</html>