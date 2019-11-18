import Vuex from 'vuex';
import { Vue } from 'vue-property-decorator';
import store from 'admin/store';

Vue.use(Vuex);

export const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  ...store
});
