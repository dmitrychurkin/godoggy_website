import { RouteConfig } from "vue-router";
import { LOGIN_ROUTE, RESET_PWD_EMAIL, RESET_PWD_ROUTE } from "admin/constants";

export const routes: RouteConfig[] = [
  {
    ...LOGIN_ROUTE,
    component: () => import("./Login")
  },
  {
    ...RESET_PWD_EMAIL,
    component: () => import("./Email")
  },
  {
    ...RESET_PWD_ROUTE,
    path: `${RESET_PWD_ROUTE.path}/:token`,
    component: () => import("./Reset")
  }
];
