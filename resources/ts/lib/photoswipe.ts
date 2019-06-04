import PhotoSwipe, { Item, Options } from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export default (items: Array<Item>, options: Options = {}) => new PhotoSwipe(document.querySelector('.pswp') as HTMLElement, PhotoSwipeUI_Default, items, options);
