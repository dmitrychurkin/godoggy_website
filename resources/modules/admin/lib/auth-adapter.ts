import store from "admin/plugins/vuex";
import { AUTH_TOKEN } from "admin/constants";
import {
  SET_SESSION,
  UNSET_SESSION
} from "admin/store/modules/auth/mutation-types";

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN);
export const signToken = (authToken: string) => {
  store.commit(`auth/${SET_SESSION}`, authToken);
  localStorage.setItem(AUTH_TOKEN, authToken);
};
export const unSignToken = () => {
  store.commit(`auth/${UNSET_SESSION}`);
  localStorage.removeItem(AUTH_TOKEN);
};
