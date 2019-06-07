import { TapTarget } from 'materialize-css';
import isMobile from '../lib/detect-mobile-browser';
import Cookie from '../lib/cookie';

export default () => {
    const COOKIE_NAME = '__s';
    if (isMobile() && !Cookie.hasItem(COOKIE_NAME)) {
        TapTarget.init(document.getElementById('tap-target')!, {
            onClose: () => Cookie.setItem(COOKIE_NAME, 1..toString())
        }).open();
    }
};