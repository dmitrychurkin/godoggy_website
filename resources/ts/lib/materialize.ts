import {
    Sidenav,
    Slider,
    Collapsible,
    FloatingActionButton,
    TapTarget,
    Tabs,
    Carousel,
    Modal,
    toast,
    FormSelect,
    Datepicker,
    DatepickerOptions,
    Range
} from 'materialize-css';
import isMobile from './detectmobilebrowser';
import Cookie from './cookie';

export default () => {

    const COOKIE_NAME = '__s';
    const COOKIE_POLICY_CUR = '__cp';
    const COOKIE_POLICY_SET = '__p';
    const modalBookNow = document.getElementById('modal-book-now')!;
    const navbar = document.getElementById('app-navbar')!;
    const mainSlider = document.getElementById('main-slider')!;
    const slideNav = document.getElementById('slide-nav')!;
    const collapsible = document.querySelectorAll('.collapsible');
    const fixedActionBtn = document.getElementById('fixed-action-btn')!;
    const roomTypes = document.getElementById('room-types')!;
    const accommodationLink = document.getElementById('accommodation-link') as HTMLAnchorElement;
    const offersCarousel = document.getElementById('offers-carousel')!;
    const offersCardTitle = document.querySelector('#offers-card .card-title') as HTMLElement;
    const offersCardText = document.querySelector('#offers-card .card-text') as HTMLElement;
    const selects = document.querySelectorAll('select');
    const arrivalPicker = document.getElementById('arrival-picker')!;
    const departurePicker = document.getElementById('departure-picker')!;
    const ranges = document.querySelectorAll('[type="range"]');
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

    // book now
    Modal.init(modalBookNow)
        // development only
        .open();
    FormSelect.init(selects);
    const today = new Date();
    const tommorrow = new Date();
    tommorrow.setDate(today.getDate() + 1);
    const initDatePicker = (el: HTMLElement, options: Partial<DatepickerOptions>) => Datepicker.init(el, { ...options, ...{ setDefaultDate: true, container: document.body } });

    initDatePicker(arrivalPicker, {
        minDate: today,
        defaultDate: today,
        onClose() {
            const selectedArrDate = this.date;
            if (selectedArrDate.getTime() >= departurePickerInstance.date.getTime()) {
                const nextDay = new Date();
                nextDay.setDate(selectedArrDate.getDate() + 1);
                departurePickerInstance.destroy();
                departurePickerInstance = initDatePicker(departurePicker, {
                    minDate: nextDay,
                    defaultDate: nextDay
                });
            }
        }
    });

    let departurePickerInstance = initDatePicker(departurePicker, {
        minDate: tommorrow,
        defaultDate: tommorrow
    });

    Range.init(ranges);

    // init toast with cookie policy
    const currentCookiePolicyVersion = Cookie.getItem(COOKIE_POLICY_CUR);
    if (!currentCookiePolicyVersion || (currentCookiePolicyVersion !== Cookie.getItem(COOKIE_POLICY_SET))) {
        setTimeout(() => {
            const cookieToast = toast({
                html: `<span>Updated Privacy Policy: We have updated our Privacy Policy and Cookies Policy to take into account the European Union General Data Protection Regulation.</span>
                        <button class="btn-flat toast-action" href="privacy/cookie" target="_blank">more</button>
                        <button id="toast-dismiss-btn" class="btn-flat toast-action">ok</button>`,
                displayLength: Infinity,
                classes: 'cookie-policy'
            });
            const [moreBtn, toastDismissBtn] = Array.from(document.querySelectorAll('.toast-action'));
            moreBtn.onclick = () => window.open('/privacy/cookie', '_blank');
            toastDismissBtn.onclick = () => {
                const cookiePolicyVersion = Cookie.getItem(COOKIE_POLICY_CUR);
                Cookie.setItem(COOKIE_POLICY_SET, cookiePolicyVersion || '1');
                cookieToast.dismiss();
            };

        }, 5000);
    }

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
