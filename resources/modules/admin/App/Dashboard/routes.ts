import { CUSTOMIZE_ROUTES, DASHBOARD_ROUTE } from "admin/constants";
import { RouteConfig } from "vue-router";

export const routes: RouteConfig[] = [
  {
    ...DASHBOARD_ROUTE,
    component: () => import("./Home")
  },
  {
    ...CUSTOMIZE_ROUTES.child.GENERAL,
    component: () => import("./General")
  },
  {
    ...CUSTOMIZE_ROUTES.child.ACCOMMODATION,
    component: () => import("./Accommodation"),
    beforeEnter: (...args) => {
      const [, , next] = args;
      next();
      // store.dispatch(`rooms/${GET_ACCOMMODATION}`);
    }
  }
];
