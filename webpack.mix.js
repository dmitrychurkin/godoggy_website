const mix = require('laravel-mix');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
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

mix.ts('resources/modules/admin/main.ts', 'public/js/admin.js')
    .webpackConfig({
        resolve: {
            alias: {
                'admin': path.resolve(__dirname, 'resources/modules/admin/'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    oneOf: [
                        {
                            resourceQuery: /^\?vue/,
                            use: ['pug-plain-loader']
                        },
                        {
                            use: ['raw-loader', 'pug-plain-loader']
                        }
                    ]
                }
            ]
        },
        plugins: [
            new VuetifyLoaderPlugin({
                match(originalTag, { kebabTag, camelTag, path, component }) {
                    if (camelTag.startsWith('App')) {
                        return [camelTag, `import ${camelTag} from 'admin/components/common/${camelTag}.vue'`]
                    }
                }
            })
        ],
    })
    .ts('resources/modules/landing/index.ts', 'public/js/landing.js')
    .sass('resources/modules/landing/sass/app.scss', 'public/css/landing.css');
// .react('resources/ts/modules/admin/index.jsx', 'public/js/admin.js')
// .sass('resources/sass/app.scss', 'public/css')
// .styles('node_modules/vuetify/dist/vuetify.min.css', 'public/css/admin.css')
// .babelConfig({
//     plugins: [
//         ['@babel/plugin-proposal-decorators', { legacy: true }],
//         ['@babel/plugin-proposal-class-properties', { loose: true }],
//         '@babel/plugin-proposal-optional-catch-binding'
//     ]
// });

if (mix.inProduction()) {
    mix.version();
} else {
    mix.browserSync('localhost:8000')
        .sourceMaps();
}