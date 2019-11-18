import 'admin/utils/class-component-hooks';
import { Vue } from 'vue-property-decorator';
import { Plugin } from 'vue-fragment';
import store from './plugins/vuex';
import vuetify from './plugins/vuetify';
import router from './plugins/router';
// import { api } from './lib/api';
import App from './components/App.vue';
import { LOGIN_ROUTE, BASE_URL } from './constants';
import { SET_REDIRECT } from './store/mutation-types';

Vue.use(Plugin);
// Vue.prototype.$axios = api;

new Vue({
  vuetify,
  router,
  store,
  beforeCreate() {
    this.$store.watch((...args: Array<any>) => {
      const [, getters] = args;
      return getters['auth/isAuthenticated'];
    }, isAuthenticated => {
      if (!isAuthenticated) {
        // TODO: change to meta
        const currentLocation = location.pathname.split(BASE_URL).slice(-1)[0].trim();
        const redirectTo = (!currentLocation ||
          (currentLocation === '/') ||
          (currentLocation === LOGIN_ROUTE.path)) ? '' : `/${currentLocation}`;
        this.$store.commit(SET_REDIRECT, redirectTo);
        this.$router.replace(LOGIN_ROUTE.path);
      }
    });
  },
  render: h => h(App)
}).$mount('#app');
