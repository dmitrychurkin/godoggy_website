import { RouteConfig } from "vue-router";
// import store from "admin/plugins/vuex";
import { GET_ACCOMMODATION } from "admin/store/modules/rooms/action-types";
import {
  LOGIN_ROUTE,
  DASHBOARD_ROUTE,
  RESET_PWD_EMAIL,
  RESET_PWD_ROUTE,
  CUSTOMIZE_ROUTES
} from "admin/constants";
import { routes as authRoutes } from "./Auth";
import { routes as dashboardRoutes } from "./Dashboard";

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: () => import("./Auth"),
    redirect: LOGIN_ROUTE,
    children: authRoutes,
    meta: {
      redirectIfTokenExists: true
    }
  },
  {
    path: "/",
    component: () => import("./Dashboard"),
    children: dashboardRoutes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/test",
    component: () => import("./Test")
  },
  {
    path: "*",
    component: () => import("./NotFound")
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
