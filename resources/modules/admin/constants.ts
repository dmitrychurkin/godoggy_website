export const BASE_URL = "/admin/";
export const AUTH_TOKEN = "auth";
export const API_PREFIX = "/api";

export const $LOGOUT_LOUTE = "/logout";
export const $VALIDATE_AUTH_ROUTE = "/validate";
export const LOGIN_ROUTE = { path: "/login", name: "login" };
export const RESET_PWD_ROUTE = { path: "/password/reset", name: "reset" };
export const RESET_PWD_EMAIL = { path: "/password/email", name: "email" };
export const DASHBOARD_ROUTE = { path: "/dashboard", name: "dashboard" };
export const CUSTOMIZE_ROUTES = {
  self: {
    path: "/customize",
    name: "customize"
  },
  child: {
    GENERAL: {
      path: "/customize/general",
      name: "customize-general"
    },
    ACCOMMODATION: {
      path: "/customize/accommodation",
      name: "customize-accommodation"
    }
  }
};
