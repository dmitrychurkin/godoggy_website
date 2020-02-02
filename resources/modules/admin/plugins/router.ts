import { routes } from "admin/App";
import { BASE_URL, DASHBOARD_ROUTE, LOGIN_ROUTE } from "admin/constants";
import store from "admin/plugins/vuex";
import { VERIFY_TOKEN } from "admin/store/modules/auth/action-types";
import { SET_REDIRECT } from "admin/store/modules/auth/mutation-types";
import { Vue } from "vue-property-decorator";
import VueRouter, { RouteConfig } from "vue-router";

const { dispatch, getters, commit } = store;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: enhanceRoutes(routes, { pathToRegexpOptions: { strict: true } }),
  mode: "history",
  base: BASE_URL
});

router.beforeEach(async (to, from, next) => {
  // verify for the first time
  await dispatch(`auth/${VERIFY_TOKEN}`);
  if (
    to.matched.some(record => record.meta.redirectIfAuthenticated) &&
    getters["auth/user"]
  ) {
    next({ ...DASHBOARD_ROUTE, replace: true });
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if user authenticated
    if (getters["auth/user"]) {
      next();
      if (getters["auth/redirect"]) {
        commit(`auth/${SET_REDIRECT}`);
      }
      return;
    }
    // if user is not authenticated
    next(
      from.name !== LOGIN_ROUTE.name && {
        ...LOGIN_ROUTE,
        replace: true
      }
    );
    commit(`auth/${SET_REDIRECT}`, to.fullPath);
    return;
  }
  next();
});

store.watch(
  (...args: Array<any>) => {
    const [, getters] = args;
    return Boolean(getters["auth/user"]);
  },
  isAuthenticated => {
    const { currentRoute } = router;
    if (
      !isAuthenticated &&
      currentRoute.matched.find(({ meta }) => meta.requiresAuth)
    ) {
      commit(`auth/${SET_REDIRECT}`, currentRoute.fullPath);
      router.replace(LOGIN_ROUTE.path);
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
