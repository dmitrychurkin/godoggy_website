import { Sidenav, Slider, Collapsible, FloatingActionButton, TapTarget } from 'materialize-css';
import isMobile from './detectmobilebrowser';

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

    if (isMobile()) {
        TapTarget.init(document.querySelectorAll('.tap-target')).forEach(target => target.open());
    }
    
    window.addEventListener('resize', () => {

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
