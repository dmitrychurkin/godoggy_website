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
                <div class="offer__title hide">45% Off for HSBC Cardholders</div>
                <p class="offer__desc hide">Book with your HSBC Credit Cards and get 45% off on Accommodation on Half Board & Full Board basis!</p>
                <img src="/images/offer1.jpg">
            </a>
            <a class="carousel-item">
                <div class="offer__title hide">Summer Escapes</div>
                <p class="offer__desc hide">Escape to Pasikuda this summer and enjoy exclusive discounts at Uga Bay by Uga Escapes!</p>
                <img src="/images/offer2.jpg">
            </a>
            <a class="carousel-item">
                <div class="offer__title hide">Rush to Book</div>
                <p class="offer__desc hide">Take advantage of a Special Discounts up to 40% Off on Accommodation. Offer valid till 30 November 2019!</p>
                <img src="/images/offer3.jpg">
            </a>
            <a class="carousel-item">
                <div class="offer__title hide">Super Last Minute Flash Deal</div>
                <p class="offer__desc hide">Book within 3 Days to arrival and take advantage of a Special 60% Off on Accommodation!</p>
                <img src="/images/offer4.jpg">
            </a>
            <a class="carousel-item">
                <div class="offer__title hide">Last Minute Offer</div>
                <p class="offer__desc hide">Book within 30 Days to arrival and take advantage of a Special 50% Off on Accommodation!</p>
                <img src="/images/offer5.jpg">
            </a>
        </div>
        <div id="offers__desc" class="col s12 offers__desc">
            <div class="col">
                <div id="offers-card" class="card white">
                    <div class="card-content center-align">
                        <span class="card-title"></span>
                        <p class="card-text"></p>
                    </div>
                    <div class="card-action">
                        <a class="waves-effect waves-light grey darken-4 btn-large static btn-flat">learn more</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div id="service-wrapper" class="service-wrapper">
        <section class="at-resort section">
            <div class="section-title">AT THE RESORT</div>
            <div class="section-pattern">
                <i class="material-icons medium blue-text text-lighten-1">accessibility_new</i>
            </div>

            <div class="card-area card">
                <div class="at-resort__left">
                    <div class="card-image"></div>
                    <div class="card-content">
                        <div class="card-title"><i class="material-icons large">spa</i><span>spa</span></div>
                        <p>Ease into a world of pleasure at our divine spa.</p>
                    </div>
                    <div class="card-action center-align">
                        <a class="waves-effect waves-light grey darken-4 btn btn-flat">learn more</a>
                    </div>
                </div>
                <div class="at-resort__right">
                    <div class="at-resort__obj">
                        <div class="card-image"></div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <div class="card-title"><i class="material-icons large">local_dining</i><span>dinning</span></div>
                                <p>Well stocked with international and local choices to delight you.</p>
                            </div>
                            <div class="card-action right-align">
                                <a class="waves-effect waves-light grey darken-4 btn btn-flat">learn more</a>
                            </div>
                        </div>
                    </div>
                    <div class="at-resort__obj">
                        <div class="card-image"></div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <div class="card-title"><i class="material-icons large">cake</i><span>event</span></div>
                                <p>Sri Lanka’s most inspirational venue for weddings, meetings and conferences</p>
                            </div>
                            <div class="card-action left-align">
                                <a class="waves-effect waves-light grey darken-4 btn btn-flat">learn more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="map">
            <div id="map__t" class="map__t">
                <div class="logo">
                    <span>peace heaven</span>
                    <span>sri lanka</span>
                </div>
                <div class="map__c">
                    <b>Peace Heaven Sri Lanka</b>
                    Kotugoda Road, Raddolugamma, Sri Lanka<br>
                    <b>
                        Tel : <a href='tel:+94771234567'>+94771234567</a><br>
                        Fax : +94771234567<br>
                        <a href='mailto:test@test.com'>test@test.com</a>
                    </b>
                </div>
            </div>
            <div class="map__direction card">
                <div class="card-content">
                    <span class="card-title">ADDRESS</span>
                    <p class="blue-text text-lighten-1">Peace Heaven Sri Lanka</p>
                    <p>Kotugoda Road,</p>
                    <p>Raddolugamma,</p>
                    <p>Sri Lanka</p>
                    <div class="divider"></div>
                    <span class="card-title">HOTEL</span>
                    <a href="tel:+94771234567">+94 77 1234567</a>
                    <div class="divider"></div>
                    <span class="card-title">RESERVATIONS</span>
                    <a href="tel:+94115671000">+94 11 5671000</a>
                    <div class="divider"></div>
                    <span class="card-title">FAX</span>
                    <p>+94 11 5671000</p>
                    <div class="divider"></div>
                    <span class="card-title">EMAIL</span>
                    <a href="mailto:test@test.com">test@test.com</a>
                </div>
                <div class="card-action">
                    <a class="waves-effect waves-light grey darken-4 btn btn-flat" href="//www.google.com/maps/dir/?api=1&destination=47.109426,37.648601" target="_blank">
                        get directions
                        <i class="material-icons right">directions</i>
                    </a>
                </div>
            </div>
            <div id="map"></div>
        </section>
        <section class="benefits section">
            <div class="section-title">BENEFITS OF BOOKING WITH US</div>
            <div class="section-pattern">
                <i class="material-icons medium blue-text text-lighten-1">card_giftcard</i>
            </div>
            <div class="benefits__sub">
                When you book your stay directly through our official website you will receive:
            </div>
            <ul class="benefits__list">
                <li>
                    <i class="material-icons">done</i>
                    <span>Flexible cancellation on all offers.</span>
                </li>
                <li>
                    <i class="material-icons">done</i>
                    <span>Private offers when signed up.</span>
                </li>
                <li>
                    <i class="material-icons">done</i>
                    <span>Honeymoon package.</span>
                </li>
                <li>
                    <i class="material-icons">done</i>
                    <span>Room upgrades subject to availability.</span>
                </li>
            </ul>
        </section>
        <div class="card-panel blue lighten-1 white-text">
            <ul class="benefits__items">
                <li>
                    <i class="material-icons medium">thumb_up</i>
                    <span>BEST RATE GUARANTEE</span>
                </li>
                <li>
                    <i class="material-icons medium">wifi</i>
                    <span>FREE WI-FI</span>
                </li>
                <li>
                    <i class="material-icons medium">loyalty</i>
                    <span>EXCLUSIVE OFFERS UP TO 50% OFF</span>
                </li>
                <li>
                    <i class="material-icons medium">cancel_presentation</i>
                    <span>FREE CANCELLATION</span>
                </li>
            </ul>
        </div>
        <section class="review section">
            <div class="section-title">CERTIFICATIONS & REVIEWS</div>
            <div class="section-pattern">
                <i class="material-icons medium blue-text text-lighten-1">local_activity</i>
            </div>
            <div class="cert">
                <img src="/images/award_2018.png">
                <img src="/images/award_2019.png">
                <img src="/images/certificate_of_exelence_2019.png">
            </div>
        </section>
        <section class="signature section center-align">
            <div class="signature__t  blue-text text-accent-4">PEACE HEAVEN HOTEL IN SRI LANKA</div>
            <p class="signature__w brown-text text-lighten-3">Welcome to Peace Heaven Hotel where personalized pampering meets exotic island living! Our distinctive hotels in Badulla, Sri Lanka offer new discoveries & authentic experiences in this slice of pure paradise, with holidays that are tailor made just for YOU.</p>
        </section>
        @footer
        @endfooter
    </div>
    <!-- <div class="box">
        <div id="TA_selfserveprop436" class="TA_selfserveprop">
            <ul id="A1xLfDuxixLA" class="TA_links wRQpZbJp">
                <li id="jCUcOB" class="KdgL77wUX9Yp"><a target="_blank" href="https://www.tripadvisor.com/"><img src="https://www.tripadvisor.com/img/cdsi/img2/branding/150_logo-11900-2.png" alt="TripAdvisor" /></a></li>
            </ul>
        </div>
        <script src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=436&amp;locationId=3682420&amp;lang=en_US&amp;rating=true&amp;nreviews=0&amp;writereviewlink=false&amp;popIdx=true&amp;iswide=false&amp;border=false&amp;display_version=2"></script>
    </div>
    <script>
        // var displaycount = 2
    </script> -->

    <!-- 
        TODO: 
        1. add section experience and leisure (ugabay)
        2. other projects -> example design https://www.oakrayhotels.com/ (OAK RAY HOTELS IN SRI LANKA section) https://colorlib.com/preview/theme/charilife/index.html
        3. gallery (instagram feed?)
    -->

    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ce96d260379de23"></script>
    <script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyDOyCTE3idYqwiofr2B-_C0A1y6KXEUOac&amp;callback=initMap"></script>
</body>

</html>