import {
  SET_AUTH_VERIFIED,
  SET_REDIRECT,
  SET_SESSION,
  UNSET_SESSION,
  UPDATE_EMAIL
} from "./mutation-types";
import { Auth, IUser } from "./state";

export default {
  [SET_REDIRECT]: (state: Auth, redirectTo = "") => {
    state.redirect = redirectTo;
  },
  [SET_SESSION]: (state: Auth, user: IUser | null = null) => {
    state.user = user;
  },
  [UNSET_SESSION]: (state: Auth) => {
    state.user = null;
  },
  [SET_AUTH_VERIFIED]: (state: Auth, status: boolean) => {
    state.verified = status;
  },
  [UPDATE_EMAIL]: (state: Auth, email = "") => {
    state.email = email.trim();
  }
};
