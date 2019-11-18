import { Collapsible } from 'materialize-css';

export default () => {
    const collapsible = document.querySelectorAll('.collapsible');
    Collapsible.init(collapsible);
};