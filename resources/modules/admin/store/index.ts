import state from './state';
import getters from './getters';
import mutations from './mutations';
import auth from './modules/auth';

export default {
  state,
  getters,
  mutations,
  modules: {
    auth
  }
};
