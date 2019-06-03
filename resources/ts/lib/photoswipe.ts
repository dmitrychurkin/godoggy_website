import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

type ImgData = {
    src: string;
    w: number;
    h: number;
};

// build items array
// const items = [
//     {
//         src: 'https://placekitten.com/600/400',
//         w: 600,
//         h: 400
//     },
//     {
//         src: 'https://placekitten.com/1200/900',
//         w: 1200,
//         h: 900
//     }
// ];

// // define options (if needed)
// var options = {
//     // optionName: 'option value'
//     // for example:
//     index: 0 // start at first slide
// };

export default async (imageUri: Array<string>) => {
    const items: Array<ImgData> = await loadImages(imageUri);
    const pswpElement = document.querySelector('.pswp') as HTMLElement;
    // Initializes and opens PhotoSwipe
    return new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {});
};

function loadImages(imageUri: Array<string>): Promise<Array<ImgData>> {
    let resolver: (value?: Array<ImgData> | PromiseLike<Array<ImgData>> | undefined) => void;
    const images: Array<ImgData> = [];
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