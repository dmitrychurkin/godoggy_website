// import "admin/utils/class-component-hooks";
import { Component, Vue } from "vue-property-decorator";
import { Plugin } from "vue-fragment";
import store from "./plugins/vuex";
import router from "./plugins/router";
import vuetify from "./plugins/vuetify";
import App from "./App";
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
]);
// import { LOGIN_ROUTE } from "./constants";
// import { SET_REDIRECT } from "./store/mutation-types";

Vue.use(Plugin);

new Vue({
  vuetify,
  router,
  store,
  // beforeCreate() {
  //   this.$store.watch((...args: Array<any>) => {
  //     const [, getters] = args;
  //     return getters['auth/isAuthenticated'];
  //   }, isAuthenticated => {
  //     if (!isAuthenticated) {
  //       /* const currentLocation = location.pathname.split(BASE_URL).slice(-1)[0].trim();
  //       const redirectTo = (!currentLocation ||
  //         (currentLocation === '/') ||
  //         (currentLocation === LOGIN_ROUTE.path)) ? '' : `/${currentLocation}`;*/
  //       const redirectTo = this.$route.matched.find(({ meta }) => meta.requiresAuth) ?
  //         this.$route.fullPath : '';
  //       this.$store.commit(SET_REDIRECT, redirectTo);
  //       if (this.$route.name !== LOGIN_ROUTE.name) {
  //         this.$router.replace(LOGIN_ROUTE.path);
  //       }
  //     }
  //   });
  // },
  render: h => h(App)
}).$mount("#app");
