import { Slider } from 'materialize-css';

export default () => {
    const navbar = document.getElementById('app-navbar')!;
    const mainSlider = document.getElementById('main-slider')!;
    const OFFSET = 10;

    const mainSliderInitializer = (oldInstance?: Slider) => {
        if (oldInstance) {
            oldInstance.destroy();
        }
        return Slider.init(mainSlider, {
            height: window.innerHeight - navbar.offsetHeight - 40 - OFFSET
        });
    };

    let mainSliderInstance = mainSliderInitializer();

    window.addEventListener('resize', () => {
        if (window.innerHeight < 400) {
            return;
        }

        mainSliderInstance = mainSliderInitializer(mainSliderInstance);
    });
};