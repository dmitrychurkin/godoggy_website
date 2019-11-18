// import store from 'admin/plugins/vuex';
import {
  LOGIN_ROUTE,
  DASHBOARD_ROUTE,
  RESET_PWD_EMAIL,
  RESET_PWD_ROUTE,
  CUSTOMIZE_ROUTES,
} from 'admin/constants';
import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('./auth'),
    redirect: LOGIN_ROUTE,
    children: [
      {
        ...LOGIN_ROUTE,
        component: () => import('./auth/login')
      },
      {
        ...RESET_PWD_EMAIL,
        component: () => import('./auth/email')
      },
      {
        ...RESET_PWD_ROUTE,
        path: `${RESET_PWD_ROUTE.path}/:token`,
        component: () => import('./auth/reset')
      }
    ],
    meta: {
      redirectIfTokenExists: true,
    }
  },
  {
    path: '/',
    component: () => import('./dashboard'),
    children: [
      {
        ...DASHBOARD_ROUTE,
        component: () => import('./dashboard/home')
      },
      {
        ...CUSTOMIZE_ROUTES.child.GENERAL,
        component: () => import('./dashboard/customize/general')
      },
      {
        ...CUSTOMIZE_ROUTES.child.ACCOMMODATION,
        component: () => import('./dashboard/customize/accommodation')
      },
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/test',
    component: () => import('./test')
  },
  {
    path: '*',
    component: () => import('./404')
  }
];
/* const routes: RouteConfig[] = [
  {
    name: LOGIN_ROUTE.name,
    path: LOGIN_ROUTE.url,
    component: () => import('./login'),
    meta: {
      redirectIfTokenExists: true,
    }
  },
  {
    name: DASHBOARD_ROUTE.name,
    path: DASHBOARD_ROUTE.url,
    component: () => import('./dashboard'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/password',
    component: () => import('./password'),
    meta: {
      redirectIfTokenExists: true,
    },
    children: [
      {
        name: RESET_PWD_EMAIL.name,
        path: RESET_PWD_EMAIL.name,
        component: () => import('./password/email')
      },
      {
        name: RESET_PWD_ROUTE.name,
        path: RESET_PWD_ROUTE.name,
        component: () => import('./password/reset')
      }
    ]
  },
  {
    path: '/',
    redirect: () => {
      return {
        name: store.getters['auth/getToken'] ?
          DASHBOARD_ROUTE.name :
          LOGIN_ROUTE.name,
        replace: true
      };
    }
  }
]; */

export default routes;
