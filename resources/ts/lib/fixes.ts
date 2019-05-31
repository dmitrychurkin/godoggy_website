import getElementPosition from './getElementPosition';

export default () => {
    serviceWrapperPosition();
    window.addEventListener('resize', serviceWrapperPosition);
    window.addEventListener('load', serviceWrapperPosition);
};


export function serviceWrapperPosition() {
    //const offersCarouselImg = document.querySelector('#offers-carousel .carousel-item.active img') as HTMLImageElement;
    const offersDescription = document.getElementById('offers__desc')!;
    //const descriptionOffset = offersCarouselImg.offsetHeight + offersDescription.offsetHeight + 50;
    //offersDescription.style.top = `${descriptionOffset}px`;
    document.getElementById('service-wrapper')!.style.top = `${getElementPosition(offersDescription).top + offersDescription.offsetHeight + 80}px`;
};