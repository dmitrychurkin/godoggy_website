import Vue from 'vue';
import Vuetify from 'vuetify'
import App from './components/App.vue';

Vue.use(Vuetify);

//const files = (<any>require).context('./', true, /\.vue$/i);
//files.keys().map((key: any) => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const app = new Vue({
    render: h => h(App, {
        props: {
            appState: (<any>window).AppState
        }
    })
})
window.addEventListener('DOMContentLoaded', () => app.$mount('#app'));
