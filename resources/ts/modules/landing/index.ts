import commons from '../commons';
import collapsible from '../commons/components/collapsible';
import bookNowModal from '../commons/components/book-now-modal';
import getElementPosition from '../commons/lib/get-element-position';

import mainSlider from './components/main-slider';
import accommodation from './components/accommodation';
import offers from './components/offers';
import gallery from './components/gallery';
import './components/map';

window.addEventListener('DOMContentLoaded', async () => {
    commons();
    collapsible();
    bookNowModal();

    mainSlider();
    accommodation();
    offers();
    gallery();

    serviceWrapperPosition();
    window.addEventListener('resize', serviceWrapperPosition);
    window.addEventListener('load', serviceWrapperPosition);

    function serviceWrapperPosition() {
        const offersDescription = document.getElementById('offers__desc')!;
        document.getElementById('service-wrapper')!.style.top = `${getElementPosition(offersDescription).top + offersDescription.offsetHeight + 80}px`;
    };
});
