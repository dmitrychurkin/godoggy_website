import { Vue } from "vue-property-decorator";
import Vuex from "vuex";
import store from "admin/store";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  ...store
});
