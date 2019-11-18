import { Auth } from './state';

export default {
  isAuthenticated: ({ authToken }: Auth) => Boolean(authToken),
  authToken: ({ authToken }: Auth) => authToken,
  getToken: ({ authToken, localStorageToken }: Auth) => (authToken || localStorageToken),
  email: ({ email }: Auth) => email
};