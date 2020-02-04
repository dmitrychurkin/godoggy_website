import { IPasswordResetEmailForm } from "admin/App/Auth/Email";
import { ILoginForm } from "admin/App/Auth/Login";
import { IPasswordResetForm } from "admin/App/Auth/Reset";
import {
  $LOGOUT_LOUTE,
  $VALIDATE_AUTH_ROUTE,
  LOGIN_ROUTE,
  RESET_PWD_EMAIL,
  RESET_PWD_ROUTE
} from "admin/constants";
import api from "admin/lib/api";
import {
  EmailPasswordResponse,
  LogoutResponse,
  ResetPasswordResponse,
  UserResponse
} from "admin/lib/api/schema/responses/auth";
import { IS_SHOW_APP_LOADER } from "admin/store/mutation-types";
import { App } from "admin/store/state";
import { ActionContext } from "vuex";
import { NotificationLevel } from "../notifications/state";
import {
  EMAIL_PWD_RESET,
  LOGIN_USER,
  LOGOUT_USER,
  PWD_RESET,
  VERIFY_TOKEN
} from "./action-types";
import {
  SET_AUTH_VERIFIED,
  SET_SESSION,
  UNSET_SESSION
} from "./mutation-types";

export default {
  [VERIFY_TOKEN]: async ({ commit, getters }: ActionContext<App, App>) => {
    if (getters.verified) {
      return;
    }
    const resolveRequest = () => {
      commit(IS_SHOW_APP_LOADER, false, { root: true });
      commit(SET_AUTH_VERIFIED, true);
    };
    commit(IS_SHOW_APP_LOADER, true, { root: true });
    try {
      const res = await api<UserResponse>({
        url: $VALIDATE_AUTH_ROUTE,
        $retry: true
      });
      if (res != null) {
        commit(SET_SESSION, res.data.data);
        resolveRequest();
      }
    } catch {
      resolveRequest();
    }
  },
  [LOGIN_USER]: async (
    { commit }: ActionContext<App, App>,
    loginFormData: ILoginForm
  ) => {
    const res = await api<UserResponse>({
      url: LOGIN_ROUTE.path,
      method: "POST",
      data: loginFormData,
      $showNotification: true
    });
    commit(SET_SESSION, res?.data.data);
  },
  [EMAIL_PWD_RESET]: (
    ...args: [ActionContext<App, App>, IPasswordResetEmailForm]
  ) => {
    const [, passwordResetEmailFormData] = args;
    return api<EmailPasswordResponse>({
      url: RESET_PWD_EMAIL.path,
      method: "POST",
      data: passwordResetEmailFormData,
      $notificationConfig: { type: NotificationLevel.WARN }
    });
  },
  [PWD_RESET]: async (
    { commit }: ActionContext<App, App>,
    passwordResetFormData: IPasswordResetForm
  ) => {
    const res = await api<ResetPasswordResponse>({
      url: RESET_PWD_ROUTE.path,
      method: "POST",
      data: passwordResetFormData,
      $notificationConfig: { type: NotificationLevel.SUCCESS }
    });
    commit(SET_SESSION, res?.data.data);
  },
  [LOGOUT_USER]: async ({ commit }: ActionContext<App, App>) => {
    try {
      const res = await api<LogoutResponse>({
        url: $LOGOUT_LOUTE,
        method: "HEAD"
      });
      if (res != null) {
        commit(UNSET_SESSION);
      }
    } catch {
      commit(UNSET_SESSION);
    }
  }
};
