/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

// window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// const app = new Vue({
//     el: '#app',
// });

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', ev => {
        const { target } = ev;
        if (target.closest('.js-menu')) {
            const navbar = document.querySelector('.js-navbar');
            const mainNav = navbar.querySelector('.js-nav-main');
            navbar.classList.toggle('active');
            if (navbar.classList.contains('active')) {
                mainNav.style.height = `${mainNav.scrollHeight}px`;
                setTimeout(() => mainNav.style.height = 'auto', 300);
            } else {
                mainNav.style.height = `${mainNav.scrollHeight}px`;
                setTimeout(() => mainNav.style.height = `${0}px`, 50);
            }
        } else if (target.closest('.js-toggle')) {
            ev.preventDefault();
            const li = target.closest('li');
            const { classList } = li;
            const LINK_HEIGHT = 59;
            classList.toggle('active');
            if (classList.contains('active')) {
                li.style.height = `${li.offsetHeight + li.querySelector('.js-sub').offsetHeight}px`;
            } else {
                li.style.height = `${LINK_HEIGHT}px`;
            }
        }
    });
});
