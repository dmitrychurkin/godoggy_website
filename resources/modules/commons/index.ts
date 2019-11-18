import { Sidenav, FloatingActionButton } from 'materialize-css';
import cookiePolicy from './components/cookie-policy';
import navHint from './components/nav-hint';

export default () => {
    cookiePolicy();
    navHint();
    Sidenav.init(document.getElementById('slide-nav')!);
    FloatingActionButton.init(document.getElementById('fixed-action-btn')!, {
        toolbarEnabled: true
    });
};