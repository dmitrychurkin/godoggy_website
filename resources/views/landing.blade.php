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
    <section class="facilities section">
        <div class="section-title">HOTEL FACILITIES</div>
        <div class="section-pattern">
            <i class="material-icons medium blue-text text-lighten-1">stars</i>
        </div>
        <p class="center-align">Although far from the hustle of modernity, every up-to-date convenience is yours at hand. Cable TV, internet and IDD phones and of course business services if you wish to keep in touch with the corporate world.</p>
    </section>
    <div class="card-panel blue lighten-1 white-text">
        <ul class="benefits__items">
            <li>
                <i class="material-icons medium">wifi</i>
                <span>FREE WI-FI</span>
            </li>
            <li>
                <i class="material-icons medium">tv</i>
                <span>CABLE TV</span>
            </li>
            <li>
                <i class="material-icons medium">fastfood</i>
                <span>FOOD & BEVERAGES</span>
            </li>
            <li>
                <i class="material-icons medium">pool</i>
                <span>SWIMMING POOL</span>
            </li>
            <li>
                <i class="material-icons medium">fitness_center</i>
                <span>FITNESS CENTER</span>
            </li>
            <li>
                <i class="material-icons medium">queue_music</i>
                <span>ENTERTAINTMENTS</span>
            </li>
            <li>
                <i class="material-icons medium">directions_bike</i>
                <span>SPORTS & RECREATIONS</span>
            </li>
            <li>
                <i class="material-icons medium">spa</i>
                <span>SPA</span>
            </li>
        </ul>
    </div>
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
        <section class="leisure section">
            <div class="section-title">EXPERIENCE & LEISURE</div>
            <div class="section-pattern">
                <i class="material-icons medium blue-text text-lighten-1">category</i>
            </div>
            <p class="center-align">Uga Bay is surrounded by history and culture, with quaint fishing villages, bustling local markets, and famous Hindu temples waiting to be explored. Grab a bike from the hotel and make your way to some of the east coast’s most memorable attractions. The charming town of Batticaloa, the remains of an early 18th Century Dutch Fort, and the celebrated archaeological sites of Polonnaruwa are all close by.</p>
            <ul class="collapsible popout">
                <li>
                    <div class="collapsible-header"><i class="material-icons">terrain</i>TOURS & ATTRACTIONS</div>
                    <div class="collapsible-body">
                        <a class="chip" href="/leisure/passikuda-bay">
                            <img src="images/experience1.jpg" alt="Passikuda Bay">
                            Passikuda Bay
                        </a>
                        <a class="chip" href="/leisure/batticloa-tour">
                            <img src="images/experience2.jpg" alt="Batticloa Tour">
                            Batticloa Tour
                        </a>
                        <a class="chip" href="/leisure/minneria-tour">
                            <img src="images/experience4.jpg" alt="Minneria Tour">
                            Minneria Tour
                        </a>
                        <a class="chip" href="/leisure/snorkelling">
                            <img src="images/experience5.jpg" alt="Snorkelling">
                            Snorkelling
                        </a>
                        <a class="chip" href="/leisure/cook-like-a-local">
                            <img src="images/experience6.jpg" alt="Cook Like a Local">
                            Cook Like a Local
                        </a>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">child_care</i>FOR KIDS</div>
                    <div class="collapsible-body">
                        <a class="chip" href="/leisure/cool-zone-kids-club">
                            <img src="images/experience3.jpg" alt="Cool Zone Kids Club">
                            Cool Zone Kids Club
                        </a>
                        <a class="chip" href="/leisure/aqua-zone-waterpark">
                            <img src="images/experience7.jpg" alt="Aqua Zone Waterpark">
                            Aqua Zone Waterpark
                        </a>
                        <a class="chip" href="/leisure/outdoor-activities">
                            <img src="images/experience8.jpg" alt="Outdoor Activities">
                            Outdoor Activities
                        </a>
                    </div>
                </li>
            </ul>
        </section>
        <section class="other section">
            <div class="section-title">OTHER PROJECTS</div>
            <div class="section-pattern">
                <i class="material-icons medium blue-text text-lighten-1">layers</i>
            </div>
            <div class="card sticky-action">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="/images/godoggy-poster2.png">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Sri Lankan first pet's orphanage<i class="material-icons right">expand_more</i></span>
                    <p><a href="/other-projects/godoggy">Find out more</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Go Doggy<i class="material-icons right">close</i></span>
                    <p><b>Go Doggy</b> is the fist unique facility for street animals in Sri Lanka. We have a beautiful, free-roaming sanctuary for dogs and secure sanctuary for cats in the south of Sri Lanka ...</p>
                </div>
            </div>
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
        <section id="gallery" class="gallery section">
            <div class="swiper-container">
                <div class="swiper-wrapper"></div>
            </div>
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </section>
        <section class="signature section center-align">
            <div class="signature__t  blue-text text-accent-4">PEACE HEAVEN HOTEL IN SRI LANKA</div>
            <p class="signature__w brown-text text-lighten-3">Welcome to Peace Heaven Hotel where personalized pampering meets exotic island living! Our distinctive hotels in Badulla, Sri Lanka offer new discoveries & authentic experiences in this slice of pure paradise, with holidays that are tailor made just for YOU.</p>
        </section>
        <section class="extra section">
            <div class="check">
                <div>Check-in / Check-out</div>
                <span>We hope you’ve enjoyed your stay from start to finish.</span><br>
                <span>Please note the check-in / out times below:</span>
                <ul>
                    <li>Check-in: 2pm</li>
                    <li>Check-out: 12noon</li>
                </ul>
            </div>
            <div class="pay">
                <div>Payment Methods</div>
                <span>Payment methods we accept:</span>
                <ul>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.198 6.634">
                            <path d="M21.909 0H32.21v6.634H21.909z" />
                            <path fill="#1c346f" d="M21.958.05h10.201v6.534H21.958z" />
                            <path d="M28.938.573a2.759 2.759 0 0 0-1.992.846l-.026.027a2.2 2.2 0 0 0-.12.136v.001h.559c.077.093.147.191.211.293h-.981a2.48 2.48 0 0 0-.083.141l-.003.006a2.856 2.856 0 0 0-.074.146h1.301c.044.095.083.193.117.293H26.31a2.638 2.638 0 0 0-.08.293h1.697c.012.054.021.108.03.164l.036.011a.788.788 0 0 1 .179-.15c.008-.005.016-.007.023-.011a.605.605 0 0 1 .52-.119l.123.031.073.028-.049.305a.573.573 0 0 0-.269-.076c-.225 0-.382.217-.382.526 0 .213.105.342.28.342a.588.588 0 0 0 .256-.072l-.053.32-.07.017-.012.071a.938.938 0 0 1-.266.041.494.494 0 0 1-.429-.219 3.083 3.083 0 0 1-.072.259H26.31a2.369 2.369 0 0 0 .118.292h1.301a2.678 2.678 0 0 1-.16.293h-.981c.064.103.134.2.21.293h.559a2.88 2.88 0 0 1-.28.294 2.77 2.77 0 0 0 4.631-2.054 2.767 2.767 0 0 0-2.77-2.768zM27.955 3.778z" fill="#e0912f" />
                            <path d="M28.067 2.909l.006-.008a.055.055 0 0 1-.006.008zM28.124 2.837l.006-.007a.043.043 0 0 1-.006.007zM28.092 3.977l-.021-.02.021.02zM28.532 4.088zM28.296 4.08zM28.429 4.096zM28.202 4.049z" fill="#e0912f" />
                            <path d="M28.748 3.734a.588.588 0 0 1-.256.072c-.175 0-.28-.129-.28-.342 0-.31.157-.526.382-.526.083 0 .162.022.269.076l.049-.305a1.77 1.77 0 0 0-.073-.028l-.124-.031a.605.605 0 0 0-.585.18l-.006.007a.78.78 0 0 0-.057.071 1.002 1.002 0 0 0-.164.58c0 .11.02.206.052.289a.509.509 0 0 0 .116.179l.021.02c.014.012.027.024.041.034a.635.635 0 0 0 .068.039l.031.011a.461.461 0 0 0 .063.02l.03.007a.667.667 0 0 0 .205.002.71.71 0 0 0 .093-.017l.07-.017.055-.321z" fill="#fff" />
                            <path d="M27.825 3.36h-.021c-.051-.002-.093 0-.137.042-.039.118-.072.322-.125.668h-.302l.183-1.143h.272l-.027.173c.092-.135.148-.186.247-.186.011 0 .021.001.03.003l.011.002a4.263 4.263 0 0 0-.03-.163H26.23c.021-.1.048-.198.08-.293h1.536a2.794 2.794 0 0 0-.117-.293h-1.301c.023-.05.048-.099.074-.146l.003-.006a2 2 0 0 1 .083-.141h.981a2.792 2.792 0 0 0-.211-.293h-.559l.001-.001c.039-.046.079-.092.12-.136l.026-.027c.043-.044.087-.088.132-.129a2.771 2.771 0 1 0 0 4.108c.1-.091.194-.189.28-.294h-.559a2.646 2.646 0 0 1-.21-.293h.981c.059-.094.112-.192.16-.293h-1.301a2.283 2.283 0 0 1-.062-.143l-.001-.002a2.63 2.63 0 0 1-.055-.148h1.536c.028-.084.052-.171.072-.259a.681.681 0 0 1-.107-.388 1.5 1.5 0 0 1 .013-.219z" fill="#cf4044" />
                            <path d="M0 .04h10.113v6.536H0z" />
                            <path d="M9.964.189v6.238H.149V.189h9.815z" fill="#fff" />
                            <path fill="#2f9c5c" d="M9.557 6.067l-8.39.002-.098-.512 8.488-1.572z" />
                            <path d="M9.551 3.756L9.028.932A.522.522 0 0 0 8.42.514L.927 1.903a.522.522 0 0 0-.418.608l.523 2.824 8.519-1.579z" />
                            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-26.722" y1="2.676" x2="60.708" y2="2.676" gradientTransform="matrix(.0671 -.0126 .0126 .0671 3.195 2.87)">
                                <stop offset="0" stop-color="#c95a2d" />
                                <stop offset=".15" stop-color="#c95a2d" />
                                <stop offset=".182" stop-color="#cb602e" />
                                <stop offset=".229" stop-color="#cf6f2f" />
                                <stop offset=".286" stop-color="#d68630" />
                                <stop offset=".35" stop-color="#e2a732" />
                                <stop offset=".42" stop-color="#f6d330" />
                                <stop offset=".44" stop-color="#f6d330" />
                                <stop offset=".494" stop-color="#edc132" />
                                <stop offset=".608" stop-color="#db9531" />
                                <stop offset=".75" stop-color="#c95a2d" />
                                <stop offset=".978" stop-color="#c95a2d" />
                                <stop offset="1" stop-color="#c95a2d" />
                            </linearGradient>
                            <path d="M1.422 2.711c.383-.051.634.208.702.564.071.374-.067.683-.483.75l-.431.082-.247-1.309.459-.087zm.005 1.121l.169-.032c.261-.05.297-.286.261-.476-.042-.223-.174-.394-.419-.347l-.167.031.156.824z" fill="url(#a)" />
                            <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="-26.722" y1="2.672" x2="60.708" y2="2.672" gradientTransform="matrix(.0671 -.0126 .0126 .0671 3.195 2.87)">
                                <stop offset="0" stop-color="#c95a2d" />
                                <stop offset=".15" stop-color="#c95a2d" />
                                <stop offset=".182" stop-color="#cb602e" />
                                <stop offset=".229" stop-color="#cf6f2f" />
                                <stop offset=".286" stop-color="#d68630" />
                                <stop offset=".35" stop-color="#e2a732" />
                                <stop offset=".42" stop-color="#f6d330" />
                                <stop offset=".44" stop-color="#f6d330" />
                                <stop offset=".494" stop-color="#edc132" />
                                <stop offset=".608" stop-color="#db9531" />
                                <stop offset=".75" stop-color="#c95a2d" />
                                <stop offset=".978" stop-color="#c95a2d" />
                                <stop offset="1" stop-color="#c95a2d" />
                            </linearGradient>
                            <path d="M2.632 3.838l-.259.05-.247-1.308.259-.049.247 1.307z" fill="url(#b)" />
                            <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="-26.722" y1="2.891" x2="60.708" y2="2.891" gradientTransform="matrix(.0671 -.0126 .0126 .0671 3.195 2.87)">
                                <stop offset="0" stop-color="#c95a2d" />
                                <stop offset=".15" stop-color="#c95a2d" />
                                <stop offset=".182" stop-color="#cb602e" />
                                <stop offset=".229" stop-color="#cf6f2f" />
                                <stop offset=".286" stop-color="#d68630" />
                                <stop offset=".35" stop-color="#e2a732" />
                                <stop offset=".42" stop-color="#f6d330" />
                                <stop offset=".44" stop-color="#f6d330" />
                                <stop offset=".494" stop-color="#edc132" />
                                <stop offset=".608" stop-color="#db9531" />
                                <stop offset=".75" stop-color="#c95a2d" />
                                <stop offset=".978" stop-color="#c95a2d" />
                                <stop offset="1" stop-color="#c95a2d" />
                            </linearGradient>
                            <path d="M3.307 2.725c-.166-.056-.263-.071-.351-.055-.093.018-.144.072-.132.136.037.196.556.041.642.495.047.25-.093.426-.325.47-.183.034-.283-.008-.399-.056l-.053-.28c.173.096.272.122.387.101.099-.019.144-.073.129-.149-.04-.213-.554-.035-.643-.502-.042-.224.085-.403.326-.448a.719.719 0 0 1 .371.034l.048.254z" fill="url(#c)" />
                            <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="-26.723" y1="2.876" x2="60.707" y2="2.876" gradientTransform="matrix(.0671 -.0126 .0126 .0671 3.195 2.87)">
                                <stop offset="0" stop-color="#c95a2d" />
                                <stop offset=".15" stop-color="#c95a2d" />
                                <stop offset=".182" stop-color="#cb602e" />
                                <stop offset=".229" stop-color="#cf6f2f" />
                                <stop offset=".286" stop-color="#d68630" />
                                <stop offset=".35" stop-color="#e2a732" />
                                <stop offset=".42" stop-color="#f6d330" />
                                <stop offset=".44" stop-color="#f6d330" />
                                <stop offset=".494" stop-color="#edc132" />
                                <stop offset=".608" stop-color="#db9531" />
                                <stop offset=".75" stop-color="#c95a2d" />
                                <stop offset=".978" stop-color="#c95a2d" />
                                <stop offset="1" stop-color="#c95a2d" />
                            </linearGradient>
                            <path d="M4.584 3.364a.7.7 0 0 1-.384.207c-.404.076-.667-.214-.731-.549-.065-.347.101-.714.499-.789a.632.632 0 0 1 .398.043l.055.29a.632.632 0 0 0-.383-.066c-.222.042-.346.235-.303.466.044.232.229.369.446.328.136-.026.217-.096.35-.214l.053.284z" fill="url(#d)" />
                            <linearGradient id="e" gradientUnits="userSpaceOnUse" x1="-26.722" y1="2.399" x2="60.708" y2="2.399" gradientTransform="matrix(.0671 -.0126 .0126 .0671 3.22 2.883)">
                                <stop offset="0" stop-color="#c95a2d" />
                                <stop offset=".15" stop-color="#c95a2d" />
                                <stop offset=".182" stop-color="#cb602e" />
                                <stop offset=".229" stop-color="#cf6f2f" />
                                <stop offset=".286" stop-color="#d68630" />
                                <stop offset=".35" stop-color="#e2a732" />
                                <stop offset=".42" stop-color="#f6d330" />
                                <stop offset=".44" stop-color="#f6d330" />
                                <stop offset=".494" stop-color="#edc132" />
                                <stop offset=".608" stop-color="#db9531" />
                                <stop offset=".75" stop-color="#c95a2d" />
                                <stop offset=".978" stop-color="#c95a2d" />
                                <stop offset="1" stop-color="#c95a2d" />
                            </linearGradient>
                            <path d="M6.538 3.1l-.113.022-.749-1.205.282-.053.415.689.121-.791.278-.053L6.538 3.1z" fill="url(#e)" />
                            <linearGradient id="f" gradientUnits="userSpaceOnUse" x1="-26.722" y1="2.387" x2="60.708" y2="2.387" gradientTransform="matrix(.0671 -.0126 .0126 .0671 3.17 2.893)">
                                <stop offset="0" stop-color="#c95a2d" />
                                <stop offset=".15" stop-color="#c95a2d" />
                                <stop offset=".182" stop-color="#cb602e" />
                                <stop offset=".229" stop-color="#cf6f2f" />
                                <stop offset=".286" stop-color="#d68630" />
                                <stop offset=".35" stop-color="#e2a732" />
                                <stop offset=".42" stop-color="#f6d330" />
                                <stop offset=".44" stop-color="#f6d330" />
                                <stop offset=".494" stop-color="#edc132" />
                                <stop offset=".608" stop-color="#db9531" />
                                <stop offset=".75" stop-color="#c95a2d" />
                                <stop offset=".978" stop-color="#c95a2d" />
                                <stop offset="1" stop-color="#c95a2d" />
                            </linearGradient>
                            <path d="M7.849 2.852l-.767.145-.246-1.299.756-.143.045.238-.496.094.051.272.474-.089.045.238-.474.089.06.312.507-.096.045.239z" fill="url(#f)" />
                            <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="-26.722" y1="2.376" x2="60.708" y2="2.376" gradientTransform="matrix(.0671 -.0126 .0126 .0671 3.091 2.907)">
                                <stop offset="0" stop-color="#c95a2d" />
                                <stop offset=".15" stop-color="#c95a2d" />
                                <stop offset=".182" stop-color="#cb602e" />
                                <stop offset=".229" stop-color="#cf6f2f" />
                                <stop offset=".286" stop-color="#d68630" />
                                <stop offset=".35" stop-color="#e2a732" />
                                <stop offset=".42" stop-color="#f6d330" />
                                <stop offset=".44" stop-color="#f6d330" />
                                <stop offset=".494" stop-color="#edc132" />
                                <stop offset=".608" stop-color="#db9531" />
                                <stop offset=".75" stop-color="#c95a2d" />
                                <stop offset=".978" stop-color="#c95a2d" />
                                <stop offset="1" stop-color="#c95a2d" />
                            </linearGradient>
                            <path d="M8.165 1.447c.214-.041.374.115.411.309a.351.351 0 0 1-.119.352c.12.046.182.2.4.554l-.285.053c-.164-.257-.252-.499-.393-.472l-.074.014.1.527-.26.05L7.7 1.535l.465-.088zm-.098.6l.138-.026c.071-.014.134-.065.113-.175-.019-.097-.078-.137-.176-.119l-.131.025.056.295z" fill="url(#g)" />
                            <linearGradient id="h" gradientUnits="userSpaceOnUse" x1="-26.722" y1="4.782" x2="60.708" y2="4.782" gradientTransform="rotate(-10.701 16.027 -17.931) scale(.069)">
                                <stop offset="0" stop-color="#c95a2d" />
                                <stop offset=".15" stop-color="#c95a2d" />
                                <stop offset=".182" stop-color="#cb602e" />
                                <stop offset=".229" stop-color="#cf6f2f" />
                                <stop offset=".286" stop-color="#d68630" />
                                <stop offset=".35" stop-color="#e2a732" />
                                <stop offset=".42" stop-color="#f6d330" />
                                <stop offset=".44" stop-color="#f6d330" />
                                <stop offset=".494" stop-color="#edc132" />
                                <stop offset=".608" stop-color="#db9531" />
                                <stop offset=".75" stop-color="#c95a2d" />
                                <stop offset=".978" stop-color="#c95a2d" />
                                <stop offset="1" stop-color="#c95a2d" />
                            </linearGradient>
                            <path d="M5.095 2.033c.424-.08.748.171.815.528.065.346-.136.708-.57.79-.42.08-.744-.181-.81-.529-.067-.356.149-.71.565-.789z" fill="url(#h)" />
                            <path d="M8.763 1.46l.017-.002.052.065.043-.008-.056-.068c.022-.005.039-.02.033-.052-.007-.04-.035-.047-.079-.04l-.065.012.03.172.037-.006-.012-.073zm-.005-.029L8.75 1.39l.026-.005c.014-.002.033-.004.036.014.003.019-.006.023-.022.026l-.032.006zm.189-.017a.156.156 0 0 0-.188-.131.156.156 0 0 0-.132.187.157.157 0 0 0 .188.132c.085-.016.15-.087.132-.188zm-.046.008c.013.074-.03.132-.092.143-.063.011-.123-.029-.136-.103s.03-.131.093-.143c.061-.01.122.03.135.103zM6.219 5.796h-.125l-.33-.45v.45h-.149v-.702h.137l.318.429v-.429h.149v.702zM6.707 5.805c-.258 0-.403-.181-.403-.36 0-.17.138-.36.403-.36s.401.191.401.36c0 .18-.15.36-.401.36zm0-.574c-.134 0-.223.085-.223.214s.089.214.223.214c.133 0 .221-.085.221-.214s-.089-.214-.221-.214zM7.464 5.805h-.065l-.289-.711h.162l.158.401.15-.401h.16l-.276.711zM8.398 5.094v.399c0 .232-.135.312-.299.312-.173 0-.298-.095-.298-.312v-.4h.149v.404c0 .101.062.162.147.162.079 0 .151-.048.151-.174v-.391h.15zM8.927 5.276a.415.415 0 0 0-.189-.063c-.053 0-.087.022-.087.058 0 .106.304.076.304.321 0 .135-.097.213-.229.213-.104 0-.156-.032-.215-.068v-.151c.085.067.138.091.204.091.057 0 .088-.024.088-.065 0-.115-.304-.073-.304-.325 0-.122.089-.202.228-.202a.43.43 0 0 1 .202.055v.136zM9.201 5.289h-.034v-.164h.061c.042 0 .067.012.067.049 0 .03-.018.041-.039.042l.042.071h-.043l-.038-.067h-.016v.069zm.031-.097c.016 0 .025-.003.025-.021 0-.017-.018-.019-.031-.019h-.025v.04h.031zm-.005.167c-.081 0-.153-.056-.153-.151 0-.096.072-.152.153-.152s.152.056.152.152a.147.147 0 0 1-.152.151zm0-.268c-.06 0-.109.046-.109.117 0 .07.049.117.109.116.059 0 .108-.047.108-.117s-.05-.116-.108-.116zM10.999.069h10.122v6.466H10.999V.069z" fill="#fff" />
                            <path d="M10.946.017h10.227v6.57H10.946z" />
                            <path d="M21.069.122v6.361H11.05V.122h10.019z" fill="#fff" />
                            <path fill="#ecb73b" d="M11.466 4.698h9.169v1.351h-9.169V4.698z" />
                            <path fill="#2360a5" d="M11.466.546h9.169v1.361h-9.169V.546zM16.819 2.215c.254.016.366.022.698.194-.003 0-.2.319-.194.318-.39-.252-.809-.163-.83.07-.015.254.708.442.715.831.005.569-.495.771-.962.769-.322.002-.434-.007-.698-.177.001-.004.133-.375.132-.389.088.045.314.209.547.212.296.001.412-.151.407-.265-.001-.252-.729-.369-.715-.839.004-.445.456-.745.9-.724zM13.79 2.287c.004.001.046 1.423.044 1.422.002.001.814-1.421.812-1.422h.469c.007.001-1.274 2.085-1.281 2.084h-.547l-.053-1.758c-.006-.113-.096-.269-.371-.291-.002-.011.003-.034 0-.035h.927zM15.282 2.287h.583l-.654 2.084h-.583l.654-2.084zM19.098 2.622a.165.165 0 0 0 .168-.168.163.163 0 0 0-.168-.167.163.163 0 0 0-.168.167.165.165 0 0 0 .168.168zm0-.036a.126.126 0 0 1-.124-.132c0-.077.051-.13.124-.132.073.002.125.056.124.132a.125.125 0 0 1-.124.132zm.044-.114c.029-.006.047-.019.044-.053.002-.043-.021-.056-.071-.053h-.088v.177h.044v-.071h.026l.044.071h.044l-.043-.071zm-.07-.035v-.045h.035c.02-.001.046-.003.044.018.002.027-.012.032-.035.027h-.044zM20.317 5.943a.171.171 0 0 0 .168-.177.167.167 0 0 0-.168-.167.169.169 0 0 0-.168.167.173.173 0 0 0 .168.177zm0-.044c-.073.001-.124-.053-.124-.133 0-.071.05-.125.124-.123a.117.117 0 0 1 .124.123c.002.08-.051.134-.124.133zm.044-.115c.029-.001.047-.015.044-.053.002-.039-.021-.052-.071-.053h-.088v.186h.044v-.08h.026l.044.08h.044l-.043-.08zm-.07-.027v-.052h.035c.02.003.046.001.044.026.002.022-.012.027-.036.026h-.043zM18.789 2.287c.002.011.181 2.085.177 2.084H18.4l-.036-.459h-.636c-.003 0-.229.46-.229.459h-.477l1.201-2.084h.566zm-.495.582c-.001 0 .056.751.053.751h-.468c.001.001.414-.745.415-.751z" />
                            <path d="M18.789 2.287c.002.011.181 2.085.177 2.084H18.4l-.036-.459h-.636c-.003 0-.229.46-.229.459h-.477l1.201-2.084h.566z" fill="none" />
                            <path d="M18.294 2.869c-.001 0 .056.751.053.751h-.468c.001.001.414-.745.415-.751z" fill="#fff" />
                            <path d="M43.146.028H32.973V6.6h10.225V.028z" />
                            <path d="M43.094.132v6.364H33.077V.132h10.017z" fill="#fff" />
                            <path d="M40.419 3.726c-.02-.194-.149-.309-.38-.309-.211 0-.377.152-.377.397 0 .246.151.399.401.399.2 0 .339-.118.361-.312h-.238c-.009.072-.047.128-.127.128-.126 0-.149-.1-.149-.206 0-.146.052-.22.14-.22.078 0 .127.045.134.124h.235z" />
                            <path d="M41.048 4.212v-.01c-.028-.023-.029-.039-.029-.07v-.257c0-.131-.016-.228-.276-.228-.217 0-.3.068-.3.185h.21c.005-.047.046-.054.077-.054.023 0 .071.005.071.045 0 .103-.392-.011-.392.239 0 .114.092.166.197.166a.278.278 0 0 0 .207-.074l.01.059h.225zm-.343-.108c-.043 0-.069-.019-.069-.046 0-.071.094-.055.166-.089.004.075-.021.135-.097.135zM41.082 4.215h.218v-.19c0-.118.045-.16.135-.16.015 0 .03.004.045.006v-.218l-.028-.003c-.085 0-.139.041-.169.127h-.002v-.112h-.199v.55z" />
                            <path d="M41.779 4.071c-.071 0-.086-.067-.086-.125 0-.061.02-.13.092-.13.073 0 .094.066.094.127-.001.064-.025.128-.1.128zm.31.141v-.755h-.218v.262c-.046-.055-.095-.071-.164-.071-.132 0-.233.118-.233.301 0 .156.084.28.25.28.07 0 .117-.021.169-.089v.073h.196zM42.114 4.028c.012.148.15.187.276.187.201 0 .296-.078.296-.192 0-.206-.348-.154-.348-.23 0-.027.024-.039.062-.039.017 0 .033.004.044.014a.058.058 0 0 1 .021.04h.199c-.013-.146-.153-.173-.273-.173-.114 0-.261.041-.261.182 0 .213.337.143.337.231 0 .039-.036.049-.069.049a.087.087 0 0 1-.054-.017.059.059 0 0 1-.023-.05h-.207z" />
                            <path fill="#00acec" d="M35.304 2.957h-.198V2.52l-.212.438-.114.003-.245-.435v.431l-.333-.001-.114-.177-.295.002-.076.174-.216.001.317-.715h.239l.282.532.002-.532h.278l.217.389.171-.389h.296z" />
                            <path fill="#fff" d="M34.001 2.616h-.156l.078-.177z" />
                            <path d="M36.776 2.37a.227.227 0 0 1-.08.244c.093.062.078.341.078.341h-.201s.017-.217-.035-.24c-.043-.016-.234-.009-.234-.009l-.003.254h-.199l-.003-.719h.506c.049 0 .142.045.171.129z" fill="#00acec" />
                            <path d="M36.572 2.471c0 .021-.021.051-.067.054l-.208-.002.003-.115s.077.002.179.002c.079-.006.092.042.093.061z" fill="#fff" />
                            <path fill="#00acec" d="M35.979 2.243v.179h-.341l-.002.088h.351l-.002.178h-.347l-.004.089h.354v.18l-.571-.003-.003-.711zM38.3 3.851c-.066-.049-.076-.129-.069-.206.003-.062.049-.118.102-.149.051-.026.083-.023.125-.026h.328v.174h-.318c-.033 0-.04.022-.042.039.002.041.032.042.06.045.06 0 .193-.001.242.042.066.049.076.129.069.206a.198.198 0 0 1-.102.15c-.051.026-.083.022-.126.026h-.333v-.175h.315c.036 0 .048-.022.05-.039-.003-.04-.032-.041-.06-.045h-.121a.238.238 0 0 1-.081-.018c.002 0-.026-.013-.039-.024zM38.951 3.852c-.066-.049-.076-.13-.069-.206a.198.198 0 0 1 .102-.15c.051-.026.084-.023.126-.026l.333.002v.172h-.32c-.039.001-.045.028-.045.039.003.041.032.042.061.045.06 0 .193-.001.242.042.066.049.076.129.069.206-.004.062-.049.118-.102.149-.051.026-.083.023-.126.026l-.335-.001-.003-.173h.315c.049 0 .053-.022.055-.039-.003-.041-.032-.042-.061-.044h-.12a.264.264 0 0 1-.081-.018s-.029-.013-.041-.024zM38.144 3.636h-.346v.094l.348-.001-.002.176-.345-.003-.001.084.346.002v.161l-.548.002.002-.686h.547z" />
                            <path d="M39.466 3.355h-.467c-.18.006-.144.116-.149.001-.002-.005-.471-.001-.471-.001-.195.001-.149.107-.155-.001-.003-.006-.732.001-.732.001l.002.063c-.043-.045-.166-.07-.198-.063H36.7v.064s-.075-.062-.123-.064h-.731l-.116.132-.108-.128-.862.003v.905h.861l.109-.132.116.132h.54l.001-.226s.274.016.311-.067l.003.099-.001.195h.401l-.002-.231c.041-.001.097-.009.097.037 0 .052-.005-.101 0 .194h1.475c.026 0 .031.002.054-.004.031-.007.065-.047.086-.076-.001.035.002.083.002.083l.527.001a.158.158 0 0 0 .078-.024c.064-.101.055-.064.049.015V6.08h-5.979V3.072h.299l.072-.171.156-.001.087.172h.527l-.001-.136.079.137h.248l.07-.134.001.133h1.359l.001-.259s.12-.024.101.051v.208h.649l-.002-.077c.001-.007.047.075.167.077.221.002.258-.006.411 0l.093-.163h.179l.082.163.522-.003.004-.182.114.184h.423v-.947l-.402-.001v.165l-.099-.165-.468.001-.001.159-.083-.159h-.68c-.227-.001-.264.114-.264.114l.001-.114h-.344s-.016.022-.007.055c-.027-.028-.055-.059-.137-.055l-1.707-.001s-.088.159-.113.245a3.266 3.266 0 0 1-.112-.243l-.484-.003.003.211c-.025-.056-.109-.209-.109-.209h-.376l-.26.572.002-2.151h5.979v2.81z" fill="#00acec" />
                            <path fill="#00acec" d="M36.87 2.241h.179v.714h-.179zM37.657 2.401s-.277-.026-.304.085c-.033.059-.033.187.021.251.04.036.094.051.147.037l.04-.058.237-.476h.215l.259.55-.002-.55h.276c.009 0 .271.424.271.424l.002-.424h.19l.001.714h-.227l-.313-.452v.452h-.344l-.094-.164-.293-.001-.08.164s-.355.038-.429-.076c-.097-.104-.104-.267-.078-.407a.3.3 0 0 1 .133-.194c.098-.054.368-.037.368-.037l.004.162z" />
                            <path fill="#fff" d="M37.963 2.612h-.156l.079-.177z" />
                            <path d="M35.726 3.653l.16-.188h.654c.077.018.131.089.155.163a.264.264 0 0 1-.084.262c-.022.016-.024.024-.07.029h-.271l-.002.232h-.378l-.169-.188c-.046.047-.174.188-.174.188l-.671.002v-.69c.589.007.676.003.676.003l.174.187z" fill="#00acec" />
                            <path fill="#fff" d="M35.053 3.628v.096h.346l-.001.184h-.345l-.002.091h.347l.164-.185-.167-.189zM36.053 3.999l-.179-.188.179-.178zM36.541 3.696c0 .022-.021.051-.068.054h-.209l.001-.112.183-.003c.078-.006.091.042.093.061z" />
                            <path d="M37.31 3.465h-.489v.69l.194-.004v-.234l.215.002c.064.021.042.235.042.235h.199s.023-.324-.078-.322a.219.219 0 0 0 .078-.237c-.028-.082-.13-.137-.161-.13z" fill="#00acec" />
                            <path d="M37.19 3.627h-.175v.115h.2c.047-.003.068-.033.068-.055-.002-.018-.014-.066-.093-.06z" fill="#fff" />
                            <path d="M39.748 6.092a.17.17 0 1 0 0-.34.17.17 0 0 0 0 .34zm0-.04c-.074 0-.125-.054-.125-.13 0-.076.051-.13.125-.13.073 0 .125.054.125.13.001.076-.052.13-.125.13zm.04-.115c.033-.002.05-.017.05-.05 0-.043-.023-.056-.071-.056h-.088v.184h.038v-.078h.031l.041.078h.045l-.046-.078zm-.072-.028v-.05h.042c.018 0 .044-.002.044.023 0 .023-.015.028-.035.027h-.051z" fill="#00acec" />
                            <path d="M31.339 4.888a.09.09 0 1 1 .179 0 .09.09 0 0 1-.179 0zm.09.069a.067.067 0 1 0 0-.135.067.067 0 0 0-.068.067c0 .037.031.068.068.068zm-.012-.029h-.018v-.079h.033c.007 0 .014 0 .02.004.007.004.01.012.01.02 0 .009-.005.018-.014.021l.015.035h-.021l-.012-.032h-.013v.031zm0-.045h.01c.004 0 .008 0 .011-.002.003-.001.004-.005.004-.009 0-.003-.002-.006-.004-.008-.003-.002-.008-.001-.012-.001h-.01v.02z" fill="#e0912f" />
                            <path d="M31.339 3.987a.09.09 0 1 1 .18 0 .09.09 0 0 1-.18 0zm.09.068c.038 0 .068-.03.068-.068s-.03-.068-.068-.068-.068.031-.068.068.031.068.068.068zm-.012-.029h-.018v-.079h.033c.007 0 .014 0 .02.004.007.004.01.012.01.02a.02.02 0 0 1-.014.02l.015.035h-.021l-.012-.031h-.013v.031zm0-.045h.01l.011-.001c.003-.002.004-.006.004-.009 0-.003-.002-.006-.004-.008-.003-.002-.008-.001-.012-.001h-.01v.019z" fill="#fff" />
                            <path fill="#1b326c" d="M26.137 3.304h.11l.014-.099h-.108zM25.759 3.842c0-.032.003-.066.009-.103l.148-.894h-.062l-.137.819.002.042c0 .07-.011.13-.033.18-.001.014-.004.03-.004.043 0 .163.087.251.228.251.07 0 .134-.011.227-.038l.012-.072a.63.63 0 0 1-.151.021c-.155.002-.239-.087-.239-.249zM26.823 3.16c-.071 0-.127.041-.163.116a.149.149 0 0 1 .086-.027c.078 0 .126.043.137.117h.079l.002-.058c.001-.094-.051-.148-.141-.148zM26.312 3.58c0-.169.044-.317.115-.434a.767.767 0 0 0-.182.522c0 .336.189.512.512.512.105 0 .205-.015.308-.046l.014-.077a.998.998 0 0 1-.255.034c-.336 0-.512-.175-.512-.511z" />
                            <path d="M26.605 3.632c0 .019.002.036.006.053h.528l.018-.088h-.549l-.003.035zM23.173 2.996l-.068.408.018.755h.205l.031-.089h-.16zM23.653 2.753h-.057l-.208.618.003.164zM23.789 2.99l-.114.318-.135.851h.3l.015-.089h-.239zM22.931 2.753h-.072l-.235 1.406h.292l.015-.089h-.22zM24.706 3.271c0-.076-.053-.104-.193-.104a.998.998 0 0 0-.25.032l-.069.019.031-.187a1.087 1.087 0 0 0-.065.018l-.042.257.059-.017a.942.942 0 0 1 .249-.034c.129 0 .192.021.201.083a.832.832 0 0 1 .067.006.277.277 0 0 0 .012-.073zM24.343 3.673a.383.383 0 0 1 .161-.029c.021 0 .028.001.059.004a.45.45 0 0 1-.036.176c.076-.041.126-.138.13-.264a.45.45 0 0 0-.067-.005c-.139.001-.221.041-.247.118zM24.633 3.952a.377.377 0 0 1-.315.138c-.163 0-.275-.127-.275-.312a.43.43 0 0 1 .068-.243.342.342 0 0 0-.125.182.582.582 0 0 0-.022.149c0 .185.122.312.268.312.16 0 .249-.049.315-.138l-.006.119h.26l.011-.089h-.184l.005-.118zM28.31 3.098a.321.321 0 0 1 .202-.072c.083 0 .162.022.269.076l.019-.117a.504.504 0 0 0-.206-.047.337.337 0 0 0-.284.16zM27.409 3.015h-.063l-.183 1.144h.301l.015-.089h-.239zM30.938 3.958a.358.358 0 0 1-.278.127c-.219 0-.363-.189-.363-.475 0-.217.073-.414.185-.543a.522.522 0 0 0-.164.187l.001-.002-.022-.002c-.08 0-.124.037-.166.188a.995.995 0 0 0 .083.26c0 .286.149.475.368.475.11 0 .195-.039.278-.127l-.015.112h.284l.015-.089h-.222l.016-.111zM31.125 2.753h-.072l-.04.246a.502.502 0 0 1 .061.067l.051-.313z" fill="#1b326c" />
                            <path d="M30.843 3.191c-.072 0-.132.044-.174.119a.17.17 0 0 1 .097-.031c.104 0 .159.079.159.224a.54.54 0 0 1-.06.264c.083-.058.137-.187.137-.353 0-.144-.055-.223-.159-.223zM29.885 3.015h-.062l-.184 1.144h.301l.015-.089h-.239zM29.083 3.673a.381.381 0 0 1 .16-.029c.021 0 .027.001.059.004a.45.45 0 0 1-.036.176c.076-.041.126-.138.13-.264a.458.458 0 0 0-.067-.005c-.139.001-.221.041-.246.118zM29.372 3.952a.375.375 0 0 1-.315.138c-.163 0-.274-.127-.274-.312a.43.43 0 0 1 .068-.243.389.389 0 0 0-.142.217l.039-.017-.039.234a.278.278 0 0 0 .261.209c.16 0 .25-.049.315-.138l-.005.119h.26l.01-.089h-.184l.006-.118zM29.444 3.271c0-.076-.052-.104-.193-.104a.998.998 0 0 0-.25.032l-.068.019.03-.187a1.087 1.087 0 0 0-.065.018l-.042.257.06-.017a.942.942 0 0 1 .249-.034c.129 0 .191.021.201.083a.832.832 0 0 1 .067.006.267.267 0 0 0 .011-.073zM24.981 3.38c0 .136.066.238.225.313.122.057.143.068.143.12l-.003.012c.054-.014.081-.043.081-.092 0-.052-.019-.069-.14-.126-.159-.075-.229-.174-.229-.319 0-.075.015-.144.049-.204a.328.328 0 0 0-.117.208c-.004.034-.008.066-.009.088zM25.368 3.265v.003a.223.223 0 0 1 .06-.008c.059-.001.139.005.226.017l.016-.096a1.556 1.556 0 0 0-.155-.01c-.098 0-.147.032-.147.094zM25.09 4.079a.638.638 0 0 1-.078-.01l-.068-.014.024-.158c-.022-.005-.043-.009-.066-.017l-.026.19h-.004l-.009.072.006.001.055.011a.813.813 0 0 0 .079.012c.071.006.132.01.17.01.226 0 .36-.06.425-.176-.076.059-.189.088-.343.088-.038 0-.093-.003-.165-.009z" fill="#1b326c" />
                            <path d="M27.821 3.25c-.009 0-.018 0-.026.002a.211.211 0 0 1 .026-.002zM27.792 3.252zM27.73 3.281zM27.771 3.257l-.021.009a.22.22 0 0 1 .021-.009zM27.695 3.33zM27.679 3.366l-.013.035a.234.234 0 0 1 .013-.035zM27.73 3.282zM27.712 3.302c-.006.007-.011.016-.016.025l.016-.025z" fill="#cf4044" />
                            <path d="M28.347 4.184a.948.948 0 0 0 .266-.041l.012-.071a.82.82 0 0 1-.196.024.482.482 0 0 1-.474-.318.776.776 0 0 1-.052-.289c0-.152.026-.29.073-.408a.75.75 0 0 1 .219-.311c-.008.004-.016.006-.023.011a.788.788 0 0 0-.179.15l-.036-.011v.001c-.05.092-.087.193-.114.331l-.022-.002c-.009 0-.018 0-.026.002h-.002a.13.13 0 0 0-.021.005l-.021.009c-.006.004-.013.008-.019.014v.001a.105.105 0 0 0-.017.019v.001c-.006.007-.011.016-.016.025l-.001.003a.209.209 0 0 0-.014.03l-.002.006-.013.035c.044-.041.086-.043.137-.042h.021a1.626 1.626 0 0 0-.014.217c0 .157.04.287.107.388.091.141.24.221.427.221z" fill="#1b326c" />
                            <path d="M27.916 2.915c-.099 0-.155.051-.247.186l.026-.173h-.272L27.24 4.07h.301c.053-.347.087-.551.125-.668a.284.284 0 0 1 .013-.035l.002-.006a.209.209 0 0 1 .014-.03l.001-.002c.006-.01.011-.019.017-.026v-.001a.105.105 0 0 1 .017-.019v-.001a.23.23 0 0 1 .019-.014c.006-.003.013-.007.021-.009l.021-.005h.002a.211.211 0 0 1 .048-.001 1.13 1.13 0 0 1 .114-.332l-.011-.002a.079.079 0 0 0-.028-.004zM26.069 3.729c0-.011.002-.026.005-.047l.079-.477h.154l.042-.278h-.153l.035-.17h-.299l-.164.983a.624.624 0 0 0-.009.103c0 .162.084.251.237.251.05 0 .099-.008.151-.021.021-.005.041-.009.065-.016l.04-.253a.25.25 0 0 1-.081.011c-.071-.001-.102-.027-.102-.086zM25.508 3.389c-.123-.057-.14-.071-.14-.121v-.003c0-.062.05-.094.146-.094.06 0 .14.006.216.018l.043-.265a1.917 1.917 0 0 0-.264-.022c-.336 0-.453.176-.452.386 0 .145.07.244.229.319.122.057.14.074.14.126 0 .049-.027.078-.081.092a.377.377 0 0 1-.091.011.883.883 0 0 1-.27-.045l-.041.264.068.014a1.802 1.802 0 0 0 .244.02c.316 0 .463-.121.463-.381.001-.158-.06-.25-.21-.319zM31.437 2.665h-.297l-.066.401c-.082-.108-.171-.156-.288-.156-.266 0-.49.32-.49.701 0 .286.145.475.363.475.11 0 .195-.039.278-.127l-.014.111h.285l.229-1.405zm-.673 1.136c-.103 0-.155-.076-.155-.226 0-.225.097-.384.234-.384.104 0 .159.079.159.224 0 .227-.098.386-.238.386zM27.182 3.76a.713.713 0 0 1-.312.072c-.175 0-.264-.068-.264-.2l.003-.036h.598a1.24 1.24 0 0 0 .037-.282c0-.254-.158-.416-.406-.416a.479.479 0 0 0-.41.248.828.828 0 0 0-.115.434c0 .336.176.512.512.512.087 0 .17-.013.255-.034.018-.004.035-.006.053-.012l.049-.286zm-.219-.395h-.332c.028-.132.096-.205.192-.205.089 0 .142.055.142.147l-.002.058zM24.15 2.665h-.467l-.292.87-.013-.87h-.432l-.235 1.405h.282l.18-1.074.026 1.074h.205l.385-1.08-.173 1.08h.301zM24.903 3.869s.071-.456.08-.522c.005-.037.007-.073.008-.109 0-.219-.137-.335-.395-.335-.111 0-.21.017-.36.061l-.042.257.069-.021a.948.948 0 0 1 .25-.032c.14 0 .193.028.193.104a.25.25 0 0 1-.012.074 1.55 1.55 0 0 0-.123-.009c-.219 0-.376.071-.46.198a.437.437 0 0 0-.068.243c0 .185.112.312.275.312a.375.375 0 0 0 .315-.138l-.006.118h.249l.027-.201zm-.461-.023c-.066 0-.108-.045-.108-.116 0-.116.086-.174.256-.174a.45.45 0 0 1 .067.005c-.004.169-.093.285-.215.285zM29.705 3.463c.02-.127.024-.17.024-.227 0-.219-.137-.335-.395-.335-.111 0-.21.017-.36.061l-.042.257.069-.019a.954.954 0 0 1 .25-.032c.141 0 .193.028.193.104a.25.25 0 0 1-.012.074 1.528 1.528 0 0 0-.122-.009c-.219 0-.376.071-.46.198a.43.43 0 0 0-.068.243c0 .185.112.312.274.312a.375.375 0 0 0 .315-.138l-.005.118h.249l.027-.201.063-.406zm-.525.383c-.065 0-.107-.045-.107-.116 0-.115.086-.174.257-.174.021 0 .035.001.067.005-.006.169-.094.285-.217.285zM30.297 3.25a.17.17 0 0 1 .021.001c.027-.138.063-.239.114-.332l-.01-.002a.145.145 0 0 0-.03-.003c-.099 0-.155.051-.247.186l.026-.173h-.272l-.183 1.143h.301c.108-.699.136-.82.28-.82z" fill="#fff" />
                        </svg>
                    </li>
                </ul>
            </div>
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
        ✓ 1. add section experience and leisure (ugabay)
        ✓ 2. other projects -> example design https://www.oakrayhotels.com/ (OAK RAY HOTELS IN SRI LANKA section) https://colorlib.com/preview/theme/charilife/index.html
        ✓ 3. gallery (instagram feed?) or use https://photoswipe.com/documentation
        ✓ 4. see bottom part at https://www.shangri-la.com/en/hambantota/shangrila/
        5. open weather widget https://www.shangri-la.com/en/hambantota/shangrila/
        6. continue with book now modal
    -->
    @bookNow
    @endbookNow
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__counter"></div>
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                    <button class="pswp__button pswp__button--share" title="Share"></button>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ce96d260379de23"></script>
    <script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyDOyCTE3idYqwiofr2B-_C0A1y6KXEUOac&amp;callback=initMap"></script>
</body>

</html>