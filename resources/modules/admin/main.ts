import { Plugin } from "vue-fragment";
import { Component, Vue } from "vue-property-decorator";
import App from "./App";
import router from "./plugins/router";
import vuetify from "./plugins/vuetify";
import store from "./plugins/vuex";
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
]);

Vue.use(Plugin);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
