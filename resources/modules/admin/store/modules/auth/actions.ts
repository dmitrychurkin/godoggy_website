import { ActionContext } from "vuex";
import { VERIFY_TOKEN, LOGIN_USER, LOGOUT_USER, EMAIL_PWD_RESET, PWD_RESET } from "./action-types";
import { api } from "admin/lib/api";
import { LOGIN_ROUTE, $VALIDATE_AUTH_ROUTE, $LOGOUT_LOUTE, RESET_PWD_EMAIL, RESET_PWD_ROUTE } from "admin/constants";
import { App } from "admin/store/state";
import { unSignToken } from 'admin/lib/auth-adapter';
import { ILoginForm, IPasswordResetEmailForm, IPasswordResetForm } from "admin/interfaces";

export default {
  [VERIFY_TOKEN]: async ({ getters }: ActionContext<App, App>) => {
    if (getters.getToken) {
      try {
        await api({
          url: $VALIDATE_AUTH_ROUTE,
          method: 'head',
          $isRetry: true,
          $auth: true,
        });
      } catch { }
    } else {
      unSignToken();
    }
  },
  [LOGIN_USER]: (...args: [ActionContext<App, App>, ILoginForm]) => {
    const [, { email = '', password = '', remember = false }] = args;
    return api({
      url: LOGIN_ROUTE.path,
      method: 'post',
      $blockUntilResolved: true,
      data: {
        email, password, remember
      }
    });
  },
  [EMAIL_PWD_RESET]: (...args: [ActionContext<App, App>, IPasswordResetEmailForm]) => {
    const [, { email = '' }] = args;
    return api({
      url: RESET_PWD_EMAIL.path,
      method: 'post',
      $blockUntilResolved: true,
      data: {
        email
      }
    });
  },
  [PWD_RESET]: (...args: [ActionContext<App, App>, IPasswordResetForm]) => {
    const [, { email = '', password = '', password_confirmation = '', token }] = args;
    return api({
      url: RESET_PWD_ROUTE.path,
      method: 'post',
      $blockUntilResolved: true,
      data: {
        email, password, password_confirmation, token
      }
    });
  },
  [LOGOUT_USER]: async ({ getters }: ActionContext<App, App>) => {
    try {
      if (getters.isAuthenticated) {
        await api({
          url: $LOGOUT_LOUTE,
          method: 'head',
          $blockUntilResolved: true,
          $auth: true
        });
      }
    } catch { }
    finally {
      unSignToken();
    }
  }
}