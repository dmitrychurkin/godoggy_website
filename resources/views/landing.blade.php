@styles
@scripts
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Hotels in Sri Lanka | Peace Heaven Hotel Sri Lanka Official Site</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Marcellus+SC|Varela+Round" rel="stylesheet">
    @stack('styles')
    @stack('scripts')
</head>

<body>
    @navbar(['navbar' => $navbar])
    @endnavbar
    <div id="main-slider" class="slider">
        <div class="intro center-align">
            <h1>Enjoy your stay with us!</h2>
                <h3>Get maximum out of vacation</h3>
                <a class="waves-effect waves-light btn blue lighten-1">overview</a>
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
    <div id="swipe-hint" class="swipe-hint">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <path class="hand-x" d="M139.93,113.56l-41.12-6.93V76.08a9.25,9.25,0,0,0-9.25-9.25h0a9.25,9.25,0,0,0-9.25,9.25v57.36L71,122.65c-3.61-3.61-8.44-3.89-13.08,0,0,0-7.24,5.84-3.83,9.25l34,34h42.63a9.25,9.25,0,0,0,9.07-7.43l6.82-34.09A9.28,9.28,0,0,0,139.93,113.56Z" />
        </svg>
    </div>
    <div id="tap-target" class="tap-target blue lighten-1" data-target="swipe-hint">
        <div class="tap-target-content">
            <h5 class="white-text">Swipe from left edge to open navbar :)</h5>
        </div>
    </div>
    <section class="info section">
        <div class="section-title">PEACE HEAVEN, LUXURY BADULLA HOTEL IN SRI LANKA</div>
        <div class="section-pattern">
            <i class="material-icons medium blue-text text-lighten-1">local_florist</i>
        </div>
        <p class="center-align">Peace Heaven is a luxury resort situated on one of Sri Lanka’s most celebrated beach stretches – Pasikuda. Brimming with coastal charm, our property’s stunning architectural design incorporates Mediterranean elegance and tropical simplicity, making it stand out amongst the Pasikuda hotels.</p>
        <ul class="info__list browser-default left-align">
            <li>274 rooms, including 21 suites</li>
            <li>4 restaurants and bars</li>
            <li>Sri Lanka’s only 18-hole golf resort course</li>
        </ul>
        <div class="addthis_inline_share_toolbox"></div>
        <div class="margin-top">
            <a class="waves-effect waves-light grey darken-4 btn btn-flat">learn more</a>
        </div>
    </section>
    <section class="accommodation section row">
        <div class="section-title col s12">ACCOMMODATION</div>
        <div class="section-pattern col s12">
            <i class="material-icons medium blue-text text-lighten-1">meeting_room</i>
        </div>
        <div class="col s12">
            <p class="center-align">All 300 luxury rooms and suites offer magnificent views of the golf course, the resort’s tropical gardens or the calm waves of the Indian Ocean. Indigenous materials and contemporary style seamlessly blend with the luxurious interior comforts to create an elegant and private resort haven.</p>
        </div>
        <div class="tabs__container col s12">
            <ul id="room-types" class="tabs">
                <li class="tab col s2"><a href="#beach-studio">beach studio</a></li>
                <li class="tab col s2"><a href="#ocean-studio">ocean studio</a></li>
                <li class="tab col s2"><a href="#bay-suite">bay suite</a></li>
                <li class="tab col s2"><a href="#beach-villa">beach villa</a></li>
            </ul>
        </div>

        <div id="beach-studio"></div>
        <div id="ocean-studio"></div>
        <div id="bay-suite"></div>
        <div id="beach-villa"></div>
        <div class="divider"></div>
        <div class="card grey darken-4">
            <div class="card-action">
                <a id="accommodation-link" class="waves-effect grey darken-4 waves-light btn-large static btn-flat">learn more</a>
                <a class="waves-effect grey darken-4 waves-light btn-large static btn-flat">book now</a>
            </div>
        </div>
    </section>
    <section class="offers section row">
        <div class="section-title col s12">SPECIAL OFFERS</div>
        <div class="section-pattern col s12">
            <i class="material-icons medium blue-text text-lighten-1">local_offer</i>
        </div>
        <div id="offers-carousel" class="carousel col s12">
            <a class="carousel-item">
                <img src="/images/offer1.jpg">
            </a>
            <a class="carousel-item">
                <img src="/images/offer2.jpg">
            </a>
            <a class="carousel-item">
                <img src="/images/offer3.jpg">
            </a>
            <a class="carousel-item">
                <img src="/images/offer4.jpg">
            </a>
            <a class="carousel-item">
                <img src="/images/offer5.jpg">
            </a>
        </div>
    </section>
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ce96d260379de23"></script>
</body>

</html>