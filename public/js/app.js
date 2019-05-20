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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var navbar_1 = __importDefault(__webpack_require__(/*! ./components/navbar */ "./resources/ts/components/navbar.ts"));
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
    new navbar_1.default({
        menu: '.js-menu',
        toggle: '.js-toggle',
        navbar: '.js-navbar',
        navMain: '.js-nav-main',
        searchForm: '.js-search-form',
        group: '.js-group',
        sub: '.js-sub'
    });
});


/***/ }),

/***/ "./resources/ts/components/base.ts":
/*!*****************************************!*\
  !*** ./resources/ts/components/base.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(/*! ../errors */ "./resources/ts/errors.ts");
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.prototype.getComponentElements = function (selectors) {
        return selectors.map(function (selector) {
            var maybeHTMLElement = document.querySelector("" + selector);
            if (!(maybeHTMLElement instanceof HTMLElement)) {
                throw new errors_1.HTMLElementNotFoundError("Probably you put wrong selector, but must be " + selector);
            }
            return maybeHTMLElement;
        });
    };
    return default_1;
}());
exports.default = default_1;


/***/ }),

/***/ "./resources/ts/components/navbar.ts":
/*!*******************************************!*\
  !*** ./resources/ts/components/navbar.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(__webpack_require__(/*! ./base */ "./resources/ts/components/base.ts"));
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar(_a) {
        var menu = _a.menu, toggle = _a.toggle, navbar = _a.navbar, navMain = _a.navMain, searchForm = _a.searchForm, group = _a.group, sub = _a.sub;
        var _this = _super.call(this) || this;
        _this.isAnimating = false;
        _this.subSelector = sub;
        var _b = _this.getComponentElements([navbar, navMain, searchForm, group]), navbarEl = _b[0], navMainEl = _b[1], searchFormEl = _b[2], groupEl = _b[3];
        _this.navbar = navbarEl;
        _this.navMain = navMainEl;
        _this.searchForm = searchFormEl;
        _this.group = groupEl;
        document.addEventListener('click', function (e) {
            var target = e.target;
            if (!(target instanceof Element)) {
                return;
            }
            if (target.closest("" + menu)) {
                _this.toggleMainMenu();
            }
            else if (target.closest("" + toggle)) {
                _this.toggleSubMenu(e, target);
            }
        });
        window.matchMedia("(min-width: " + Navbar.BREAKPOINT + "px)")
            .addListener(_this.replaceSearch());
        return _this;
    }
    Navbar.prototype.replaceSearch = function () {
        var _this = this;
        var _a = this, group = _a.group, searchForm = _a.searchForm, navMain = _a.navMain;
        var fn = function (arg) {
            var matches = (typeof arg === 'object') ? arg.matches : arg;
            if (matches) {
                group.insertBefore(searchForm, group.firstChild);
                _this.navbar.classList.remove('active');
                navMain.style.height = '';
                for (var _i = 0, _a = Array.from(_this.navbar.querySelectorAll('.active')); _i < _a.length; _i++) {
                    var activeEl = _a[_i];
                    if (activeEl instanceof HTMLElement) {
                        activeEl.classList.remove('active');
                        activeEl.style.height = '';
                    }
                }
            }
            else {
                navMain.insertBefore(searchForm, navMain.firstChild);
            }
        };
        fn(window.innerWidth >= Navbar.BREAKPOINT);
        return fn;
    };
    Navbar.prototype.toggleMainMenu = function () {
        var _this = this;
        if (this.isAnimating) {
            return;
        }
        var _a = this, classList = _a.navbar.classList, navMain = _a.navMain;
        this.isAnimating = true;
        classList.toggle('active');
        if (classList.contains('active')) {
            navMain.style.height = navMain.scrollHeight + "px";
            setTimeout(function () {
                navMain.style.height = 'auto';
                _this.isAnimating = false;
            }, 300);
        }
        else {
            navMain.style.height = navMain.scrollHeight + "px";
            setTimeout(function () {
                navMain.style.height = '';
                _this.isAnimating = false;
            }, 50);
        }
    };
    Navbar.prototype.toggleSubMenu = function (event, target) {
        if (window.innerWidth >= Navbar.BREAKPOINT) {
            return;
        }
        event.preventDefault();
        var li = target.closest('li');
        if (!(li instanceof HTMLElement)) {
            return;
        }
        var classList = li.classList;
        classList.toggle('active');
        if (classList.contains('active')) {
            var sub = li.querySelector(this.subSelector);
            if (!(sub instanceof HTMLElement)) {
                return;
            }
            li.style.height = li.offsetHeight + sub.offsetHeight + "px";
        }
        else {
            li.style.height = Navbar.LINK_HEIGHT + "px";
        }
    };
    Navbar.LINK_HEIGHT = 59;
    Navbar.BREAKPOINT = 1024;
    return Navbar;
}(base_1.default));
exports.default = Navbar;


/***/ }),

/***/ "./resources/ts/errors.ts":
/*!********************************!*\
  !*** ./resources/ts/errors.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ExtendableError = /** @class */ (function (_super) {
    __extends(ExtendableError, _super);
    function ExtendableError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, _this.constructor);
        }
        else {
            _this.stack = (new Error(message)).stack;
        }
        return _this;
    }
    return ExtendableError;
}(Error));
var HTMLElementNotFoundError = /** @class */ (function (_super) {
    __extends(HTMLElementNotFoundError, _super);
    function HTMLElementNotFoundError(message) {
        return _super.call(this, message) || this;
    }
    return HTMLElementNotFoundError;
}(ExtendableError));
exports.HTMLElementNotFoundError = HTMLElementNotFoundError;


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