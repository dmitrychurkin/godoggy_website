<header class="js-navbar navbar">
  <div class="container">
    <a class="logo" href="/">
      <span class="logo-text">GoDoggy</span>
    </a>
    <div class="js-group group-donate">
      <a href="/donate" class="btn">Donate</a>
      <button class="js-menu menu-burger" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i></i>
      </button>
    </div>
  </div>
  <nav id="navbarSupportedContent" class="js-nav-main nav-main">
    <form class="js-search-form search-form" method="POST" action="/search">
      @csrf
      <input class="ipt" placeholder="Search" name="search" maxlength="128" />
      <button class="btn" type="submit">Submit</button>
    </form>
    <ul class="nav">
      @foreach($navbar as $nav)
      <li>
        <a href="{{$nav['main']['link']}}" class="link" aria-haspopup="true">
          <span>{{$nav['main']['name']}}</span>
          <div class="js-toggle link-toggle">
            @isset($nav['sub'])
            <svg class="icon">
              <use href="#icon-dropdown" />
            </svg>
            @endisset
          </div>
        </a>
        @isset($nav['sub'])
        <div class="js-sub sub-nav">
          <ul aria-label="submenu">
            @foreach($nav['sub'] as $child)
            <li>
              <a href="{{$child['link']}}" class="sub-link">
                <div class="label">
                  <svg>
                    <use href="#icon-label" />
                  </svg>
                </div>
                <span>{{$child['name']}}</span>
              </a>
            </li>
            @endforeach
          </ul>
        </div>
        @endisset
      </li>
      @endforeach
    </ul>
  </nav>
  <div class="svg-symbols">
    <svg>
      <symbol viewBox="0 0 10 5.469" id="icon-dropdown" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5.469a.468.468 0 0 1-.331-.137L.137.8A.469.469 0 0 1 .8.137l4.2 4.2 4.2-4.2A.469.469 0 0 1 9.863.8L5.332 5.332A.474.474 0 0 1 5 5.469z" />
      </symbol>
      <symbol viewBox="0 0 24 24" id="icon-label" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M4 18.99h12.04L21 12l-4.97-7H4l5 7-5 6.99z" />
      </symbol>
    </svg>
  </div>
</header>