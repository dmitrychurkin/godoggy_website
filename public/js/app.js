/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/ts/app.ts":
/*!*****************************!*\
  !*** ./resources/ts/app.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
// import Navbar from './components/navbar';
window.addEventListener('DOMContentLoaded', function () {
    // new Navbar;
    /*document.addEventListener('click', ev => {
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
    const mql = window.matchMedia('(min-width: 1024px)');
    mql.addListener(({ matches }) => {
        const searchForm = document.querySelector('.js-search-form');
        const upperGroup = document.querySelector('.js-group');
        const nav = document.querySelector('.js-nav-main');
        if (matches) {
            upperGroup.insertBefore(searchForm, upperGroup.firstChild);
        }else {
            nav.insertBefore(searchForm, nav.firstChild);
        }

    });*/
    // new Navbar({
    //   menu: '.js-menu',
    //   toggle: '.js-toggle',
    //   navbar: '.js-navbar',
    //   navMain: '.js-nav-main',
    //   searchForm: '.js-search-form',
    //   group: '.js-group',
    //   sub: '.js-sub'
    // });
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
        toolbarEnabled: true
    });
    var sliders = document.querySelectorAll('.slider');
    var getSliderHeight = function (offset) {
        if (offset === void 0) { offset = 10; }
        var navbar = document.querySelector('.navbar-fixed');
        var navbarHeight = 105;
        if (navbar instanceof HTMLElement) {
            navbarHeight = navbar.offsetHeight;
        }
        return window.innerHeight - navbarHeight - 40 - offset;
    };
    var sliderInstances = M.Slider.init(sliders, {
        height: getSliderHeight()
    });
    window.addEventListener('resize', function () {
        if (window.innerHeight < 400) {
            return;
        }
        sliderInstances.forEach(function (slider) {
            slider.destroy();
        });
        sliderInstances = M.Slider.init(sliders, {
            height: getSliderHeight()
        });
    });
});


/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/ts/app.ts ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\godoggy_website\resources\ts\app.ts */"./resources/ts/app.ts");
module.exports = __webpack_require__(/*! D:\godoggy_website\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });