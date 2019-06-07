import { toast } from 'materialize-css';
import Cookie from '../lib/cookie';

export default () => {
    const COOKIE_POLICY_CUR = '__cp';
    const COOKIE_POLICY_SET = '__p';
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
};
