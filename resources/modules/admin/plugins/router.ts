import VueRouter from 'vue-router';
import { Vue } from 'vue-property-decorator';
import routes from 'admin/routes';
import store from 'admin/plugins/vuex';
import { LOGIN_ROUTE, BASE_URL, DASHBOARD_ROUTE } from 'admin/constants';
import { SET_REDIRECT, IS_SHOW_APP_LOADER } from 'admin/store/mutation-types';
import { enhanceRoutes } from 'admin/utils/route-helpers';
import { VERIFY_TOKEN } from 'admin/store/modules/auth/action-types';

const { dispatch, getters, commit } = store;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: enhanceRoutes(routes, { pathToRegexpOptions: { strict: true } }),
  mode: 'history',
  base: BASE_URL
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.redirectIfTokenExists) && getters['auth/getToken']) {
    next({ ...DASHBOARD_ROUTE, replace: true });
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getters['auth/getToken'] && !getters['auth/isAuthenticated']) {
      commit(IS_SHOW_APP_LOADER, true);
    }
    await dispatch(`auth/${VERIFY_TOKEN}`);
    commit(IS_SHOW_APP_LOADER);
    if (getters['auth/isAuthenticated']) {
      next();
      commit(SET_REDIRECT);
    } else {
      next(
        (from.name !== LOGIN_ROUTE.name) && ({ ...LOGIN_ROUTE, replace: true })
      );
      commit(SET_REDIRECT, to.fullPath);
    }
    return;
  }
  next();
});


export default router;
