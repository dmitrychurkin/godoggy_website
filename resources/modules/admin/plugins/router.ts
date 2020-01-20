import { Vue } from "vue-property-decorator";
import VueRouter, { RouteConfig } from "vue-router";
import { routes } from "admin/App";
import store from "admin/plugins/vuex";
import { LOGIN_ROUTE, BASE_URL, DASHBOARD_ROUTE } from "admin/constants";
import { SET_REDIRECT, IS_SHOW_APP_LOADER } from "admin/store/mutation-types";
import { VERIFY_TOKEN } from "admin/store/modules/auth/action-types";

const { dispatch, getters, commit } = store;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: enhanceRoutes(routes, { pathToRegexpOptions: { strict: true } }),
  mode: "history",
  base: BASE_URL
});

router.beforeEach(async (to, from, next) => {
  if (
    to.matched.some(record => record.meta.redirectIfTokenExists) &&
    getters["auth/getToken"]
  ) {
    next({ ...DASHBOARD_ROUTE, replace: true });
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getters["auth/getToken"] && !getters["auth/isAuthenticated"]) {
      commit(IS_SHOW_APP_LOADER, true);
    }
    await dispatch(`auth/${VERIFY_TOKEN}`);
    commit(IS_SHOW_APP_LOADER);
    if (getters["auth/isAuthenticated"]) {
      next();
      commit(SET_REDIRECT);
    } else {
      next(
        from.name !== LOGIN_ROUTE.name && {
          ...LOGIN_ROUTE,
          replace: true
        }
      );
      commit(SET_REDIRECT, to.fullPath);
    }
    return;
  }
  next();
});

store.watch(
  (...args: Array<any>) => {
    const [, getters] = args;
    return getters["auth/isAuthenticated"];
  },
  isAuthenticated => {
    if (!isAuthenticated) {
      /* const currentLocation = location.pathname.split(BASE_URL).slice(-1)[0].trim();
    const redirectTo = (!currentLocation ||
      (currentLocation === '/') ||
      (currentLocation === LOGIN_ROUTE.path)) ? '' : `/${currentLocation}`;*/
      const { currentRoute } = router;
      const redirectTo = currentRoute.matched.find(
        ({ meta }) => meta.requiresAuth
      )
        ? currentRoute.fullPath
        : "";
      commit(SET_REDIRECT, redirectTo);
      if (currentRoute.name !== LOGIN_ROUTE.name) {
        router.replace(LOGIN_ROUTE.path);
      }
    }
  }
);

export function enhanceRoutes(
  routes: Array<RouteConfig>,
  options = {},
  shouldProcess?: (route: RouteConfig) => boolean
): Array<RouteConfig> {
  return routes.map(route => {
    if (typeof shouldProcess === "function" && !shouldProcess(route)) {
      return route;
    }
    let children: Array<RouteConfig> | undefined;
    if (Array.isArray(route.children) && route.children.length > 0) {
      children = enhanceRoutes(route.children, options);
    }
    return { ...route, ...options, children };
  });
}

export default router;
