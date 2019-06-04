import Swiper, { SwiperOptions } from 'swiper';
import { Item } from 'photoswipe';
import photoSwipe from './photoswipe';

const GALLERY_SELECTOR = 'gallery';

const settings: SwiperOptions = {
    autoplay: true,
    breakpointsInverse: true,
    breakpoints: {
        0: {
          slidesPerView: 1
        },
        500: {
            slidesPerView: 2
        },
        800: {
            slidesPerView: 3
        },
        1100: {
            slidesPerView: 4
        },
        1300: {
            slidesPerView: 5
        }
    }
};

export default async () => {
    const uri: Array<string> = await getUris();
    const imgData: Array<Item> = await loadImages(uri);
    if (imgData.length > 0) {
        markWithClassName(`${GALLERY_SELECTOR}__ready`);
        imgData.forEach(({ src }, i) => addSlide(createSlide(src, i)));
        const swiper = new Swiper('.swiper-container', settings);
        swiper.on('tap', (...args: Array<any>) => {
            const [{ target: { parentNode: { dataset: { index } } } }] = args;
            photoSwipe(imgData, {
                index: +index,
                getThumbBoundsFn: num => {
                    swiper.slideTo(num);
                    const { left, top, width } = (document.querySelector(`.swiper-slide[data-index='${num}']`) as HTMLElement).getBoundingClientRect();
                    return {
                        x: left,
                        y: top + (window.pageYOffset || document.documentElement.scrollTop),
                        w: width
                    };
                }
            }).init();
        })
    }else {
        markWithClassName(`${GALLERY_SELECTOR}__failed`);
    }
};

function markWithClassName(className = 'gallery__ready'): void {
    const gallery = document.getElementById('gallery');
    if (gallery !== null) {
        gallery.classList.add(className);
    }
}

function createSlide(url: string, index: number): Node {
    const instaIco = (<HTMLElement>document.querySelector('.fa-instagram')).cloneNode();
    const swiperSlide = document.createElement('div') as HTMLElement;
    swiperSlide.className = 'swiper-slide';
    swiperSlide.style.backgroundImage = `url(${url})`;
    swiperSlide.dataset.index = `${index}`;
    swiperSlide.appendChild(instaIco);
    return swiperSlide;
}

function addSlide(slide: Node): void {
    document.querySelector('.swiper-wrapper')!.appendChild(slide);
}

function getUris(): Promise<Array<string>> {
    // fake request
    return new Promise(res => setTimeout(() => res([
        '/images/gallery-img-1.jpg',
        '/images/gallery-img-2.jpg',
        '/images/gallery-img-3.jpg',
        '/images/gallery-img-4.jpg',
        '/images/gallery-img-5.jpg',
        '/images/gallery-img-6.jpg'
    ]), 2000));
}

function loadImages(imageUri: Array<string>): Promise<Array<Item>> {
    let resolver: (value?: Array<Item> | undefined) => void;
    const images: Array<Item> = [];
    const checkNotify = () => {
        if (images.length == imageUri.length && typeof resolver ==='function') {
            resolver(images);
        }
    };

    for (let i = 0; i < imageUri.length; i++) {
        const uri = imageUri[i];
        const img = new Image();
        img.onload = () => {
            images.push({
                src: uri,
                w: img.width,
                h: img.height
            });
            checkNotify();
        };
        img.onerror = () => {
            imageUri.splice(--i, 1);
            checkNotify();
        };
        img.src = uri;
    }
    return new Promise(res => resolver = res);
}
