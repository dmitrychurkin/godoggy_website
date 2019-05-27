import { Sidenav, Slider, Collapsible, FloatingActionButton, TapTarget, Tabs, Carousel } from 'materialize-css';
import isMobile from './detectmobilebrowser';
import Cookie from './cookie';

export default function () {

    const COOKIE_NAME = '__s';
    const navbar = document.getElementById('app-navbar')!;
    const mainSlider = document.getElementById('main-slider')!;
    const slideNav = document.getElementById('slide-nav')!;
    const collapsible = document.getElementById('collapsible')!;
    const fixedActionBtn = document.getElementById('fixed-action-btn')!;
    const roomTypes = document.getElementById('room-types')!;
    const accommodationLink = document.getElementById('accommodation-link') as HTMLAnchorElement;
    const offersCarousel = document.getElementById('offers-carousel')!;
    const offersCardTitle = document.querySelector('#offers-card .card-title') as HTMLElement;
    const offersCardText = document.querySelector('#offers-card .card-text') as HTMLElement;
    const getSliderHeight = (offset = 10) => window.innerHeight - navbar.offsetHeight - 40 - offset;

    const mainSliderInitializer = (oldInstance?: Slider) => {
        if (oldInstance) {
            oldInstance.destroy();
        }
        return Slider.init(mainSlider, {
            height: getSliderHeight()
        });
    };
    let mainSliderInstance = mainSliderInitializer();

    Sidenav.init(slideNav);
    Collapsible.init(collapsible);
    FloatingActionButton.init(fixedActionBtn, {
        toolbarEnabled: true
    });

    // show hint if on mobile
    if (isMobile() && !Cookie.hasItem(COOKIE_NAME)) {
        TapTarget.init(document.getElementById('tap-target')!, {
            onClose: () => Cookie.setItem(COOKIE_NAME, 1..toString())
        }).open();
    }

    // accommodation section
    const accommodationSectionTabs = (oldInstance?: Tabs) => {
        if (oldInstance) {
            oldInstance.destroy();
            roomTypes.querySelectorAll('.active').forEach(activeEl => activeEl.classList.remove('active'));
        }

        const tabInst = Tabs.init(roomTypes, {
            swipeable: true,
            onShow: ({ id }) => {
                const index = tabInst ? tabInst.index : 0;
                const child = tabContent && tabContent.children[index];
                accommodationLink.href = `/accommodation/${child ? child.id : id}`;
            }
        });

        const tabContent = document.querySelector('.tabs-content') as HTMLElement;
        tabContent.style.height = '';

        return tabInst;
    };

    let accommodationTabInstance = accommodationSectionTabs();

    // carousel offers
    const offersSectionCarousel = (oldInstance?: Carousel) => {
        if (oldInstance) {
            oldInstance.destroy();
        }
        return Carousel.init(offersCarousel, {
            onCycleTo: el => {
                offersCardTitle.innerHTML = (el.querySelector('.offer__title') as HTMLElement).innerHTML;
                offersCardText.innerHTML = (el.querySelector('.offer__desc') as HTMLElement).innerHTML;
            }
        });
    };
    let offersSectionCarouselInstance = offersSectionCarousel();

    // main resizer
    window.addEventListener('resize', () => {

        accommodationTabInstance = accommodationSectionTabs(accommodationTabInstance);

        offersSectionCarouselInstance = offersSectionCarousel(offersSectionCarouselInstance);

        if (window.innerHeight < 400) {
            return;
        }

        mainSliderInstance = mainSliderInitializer(mainSliderInstance);

    });

};
