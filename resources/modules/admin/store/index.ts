import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import auth from "./modules/auth";
import rooms from "./modules/rooms";
import requests from "./modules/requests";
import notifications from "./modules/notifications";

export default {
  state,
  getters,
  mutations,
  modules: {
    auth,
    rooms,
    requests,
    notifications
  }
};
