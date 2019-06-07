import { Carousel } from 'materialize-css';

export default () => {
    const offersCarousel = document.getElementById('offers-carousel')!;
    const offersCardTitle = document.querySelector('#offers-card .card-title') as HTMLElement;
    const offersCardText = document.querySelector('#offers-card .card-text') as HTMLElement;
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

    window.addEventListener('resize', () => {
        offersSectionCarouselInstance = offersSectionCarousel(offersSectionCarouselInstance);
    });
};