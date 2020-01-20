import { RouteConfig } from "vue-router";
import { GET_ACCOMMODATION } from "admin/store/modules/rooms/action-types";
import { DASHBOARD_ROUTE, CUSTOMIZE_ROUTES } from "admin/constants";
import store from "admin/plugins/vuex";

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
      store.dispatch(`rooms/${GET_ACCOMMODATION}`);
    }
  }
];
