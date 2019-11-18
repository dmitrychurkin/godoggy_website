import { SET_SESSION, UNSET_SESSION, UPDATE_EMAIL } from './mutation-types';
import { Auth } from './state';

export default {
  [SET_SESSION]: (state: Auth, authToken: string) => {
    state.authToken = authToken;
    state.localStorageToken = authToken;
  },
  [UNSET_SESSION]: (state: Auth) => {
    state.authToken = '';
    state.localStorageToken = null;
  },
  [UPDATE_EMAIL]: (state: Auth, email = '') => {
    state.email = email.trim();
  }
};