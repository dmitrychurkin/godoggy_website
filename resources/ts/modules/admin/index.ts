import Vue from 'vue';

const files = (<any>require).context('./', true, /\.vue$/i);
files.keys().map((key: any) => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const app = new Vue({
    el: '#app',
});
