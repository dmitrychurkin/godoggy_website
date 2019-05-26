import { Sidenav, Slider, Collapsible, FloatingActionButton, TapTarget, Tabs, Carousel } from 'materialize-css';
import isMobile from './detectmobilebrowser';
import Cookie from './cookie';

export default function () {

    const getSliderHeight = (offset = 10) => {
        const navbar = document.querySelector('.navbar-fixed');
        let navbarHeight = 105;
        if (navbar instanceof HTMLElement) {
            navbarHeight = navbar.offsetHeight;
        }
        return window.innerHeight - navbarHeight - 40 - offset;
    };

    const sliders = document.querySelectorAll('.slider');

    let sliderInstances = Slider.init(sliders, {
        height: getSliderHeight()
    });

    Sidenav.init(document.querySelectorAll('.sidenav'));
    Collapsible.init(document.querySelectorAll('.collapsible'));
    FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
        toolbarEnabled: true
    });

    // show hint if on mobile
    if (isMobile() && !Cookie.hasItem('__s')) {
        TapTarget.init(document.querySelectorAll('.tap-target'), {
            onClose: () => Cookie.setItem('__s', 1..toString())
        }).forEach(target => target.open());
    }

    // accommodation section
    const [learnMore] = Array.from(document.querySelectorAll('.accommodation .card-action a'));
    const roomTypes = document.querySelectorAll('#room-types');
    const accommodationSection = () => {
        const tabInst = Tabs.init(roomTypes, {
            swipeable: true,
            onShow: ({ id }) => {
                const index = Array.isArray(tabInst) ? tabInst[0].index : 0;
                const link = tabContent instanceof HTMLElement && typeof tabContent.children[index] === 'object' ? tabContent.children[index].id : id;
                learnMore.href = `/accommodation/${link}`;
            }
        });
        const tabContent = document.querySelector('.tabs-content');
        if (tabContent instanceof HTMLElement) {
            tabContent.style.height = '';
        }
        return tabInst;
    };
    let tabInstances = accommodationSection();

    // carousel offers
    Carousel.init(document.querySelectorAll('.offers .carousel'), {
        indicators: true,
        onCycleTo: console.dir
    });

    // main slider resizer
    window.addEventListener('resize', () => {

        tabInstances.forEach(tabInstance => {
            tabInstance.destroy();
            document.querySelectorAll('#room-types .active').forEach(activeEl => activeEl.classList.remove('active'));
        });
        tabInstances = accommodationSection();

        if (window.innerHeight < 400) {
            return;
        }

        sliderInstances.forEach(slider => {
            slider.destroy();
        });

        sliderInstances = Slider.init(sliders, {
            height: getSliderHeight()
        });

    });

};
