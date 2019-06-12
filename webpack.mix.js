const mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/ts/modules/landing/index.ts', 'public/js/landing.js')
    .react('resources/ts/modules/admin/index.jsx', 'public/js/admin.js')
    .sass('resources/sass/app.scss', 'public/css')
    .styles('node_modules/vuetify/dist/vuetify.min.css', 'public/css/admin.css');

if (mix.inProduction()) {
    mix.version();
} else {
    mix.browserSync('localhost:8000');
}